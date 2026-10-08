---
title: 'Rust for Backend Engineers: An Honest Assessment After 6 Months'
description: 'I spent 6 months building production services in Rust. Here is what actually matters — the borrow checker, async runtime tradeoffs, ecosystem maturity, and whether it is worth it for a full-stack engineer in 2025.'
pubDate: 2025-05-20
image: 'https://res.cloudinary.com/dy7kvvzgj/image/upload/v1753346481/fozwisstu33btc3psvbg_vx0ff9.webp'
readtime: '12 min read'
category: 'dev-tips'
tags: ['rust', 'backend', 'systems programming', 'performance']
authors: ['varmiguemunoz']
draft: false
---

## Why I Looked at Rust

After the Go migration I wrote about [in a previous post](/blog/go-backend-why-i-switched-from-nodejs), I had a natural question: if Go is faster than Node, and Rust is faster than Go, should I be writing Rust?

The honest answer is: **sometimes**. But the reasons are more nuanced than raw performance benchmarks.

---

## What Makes Rust Different From Everything Else

Every language before Rust made a choice between two options:

- **Manual memory management** (C, C++) — fast, no GC pauses, but segfaults, use-after-free, and data races are your problem
- **Garbage collected** (Go, Java, Node, Python) — safe, but GC pauses and higher memory usage

Rust makes a third choice: **compile-time memory safety without a garbage collector**. The borrow checker is the mechanism that enforces this. It ensures, at compile time:

1. Every value has exactly one owner
2. You can have either one mutable reference OR any number of immutable references — never both simultaneously
3. References never outlive the data they point to

This is not theoretical. It means Rust programs cannot have:
- Null pointer dereferences
- Buffer overflows
- Use-after-free bugs
- Data races in multi-threaded code

Not fewer of these bugs — **zero**. The compiler rejects code that would cause them.

---

## The Borrow Checker in Practice

The first month with Rust is a fight against the borrow checker. Here's a real example from a message processing service I built:

```rust
fn process_messages(messages: &mut Vec<Message>) {
    for msg in messages.iter() {
        if msg.needs_retry() {
            messages.push(msg.clone()); // COMPILE ERROR
            // cannot borrow `messages` as mutable because it is also borrowed as immutable
        }
    }
}
```

This is the borrow checker being correct. Pushing to a Vec while iterating over it is undefined behavior in C++. Rust refuses to compile it.

The idiomatic fix:

```rust
fn process_messages(messages: &mut Vec<Message>) {
    let retries: Vec<Message> = messages
        .iter()
        .filter(|msg| msg.needs_retry())
        .cloned()
        .collect();

    messages.extend(retries);
}
```

Collect what you need to add, then extend. Two passes, zero danger.

After month two, you stop fighting the borrow checker and start working with it. It's teaching you to write code that's correct by construction.

---

## Async Rust: The Hard Part

Rust's async story is mature but **complex**. Unlike Go (which has goroutines built into the runtime) or Node (which has a built-in event loop), Rust requires you to pick an async runtime:

- **Tokio** — the production standard, battle-tested, used by Discord, Cloudflare, AWS
- **async-std** — simpler API, smaller ecosystem
- **smol** — minimal footprint for embedded use cases

For backend services, the answer is Tokio. But the async model takes time to internalize.

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let handle1 = tokio::spawn(async {
        sleep(Duration::from_millis(100)).await;
        println!("Task 1 done");
    });

    let handle2 = tokio::spawn(async {
        sleep(Duration::from_millis(50)).await;
        println!("Task 2 done");
    });

    let _ = tokio::join!(handle1, handle2);
}
```

This spawns two tasks concurrently. Task 2 finishes first (50ms vs 100ms). Clean, predictable. But the `async/await` syntax propagates — once you go async, everything in the call chain needs to handle it.

---

## The Ecosystem in 2025

Rust's ecosystem has matured significantly. For backend web services:

- **Axum** — ergonomic, built on Hyper/Tokio, my recommendation for new projects
- **Actix-web** — battle-tested, extremely fast, slightly more complex API
- **SQLx** — async SQL with compile-time query verification (yes, it checks your SQL at build time)
- **Serde** — serialization/deserialization, best in class

```rust
use axum::{routing::get, Router};

async fn health() -> &'static str {
    "OK"
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/health", get(health));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

That's a working HTTP server in ~15 lines. The DX has improved dramatically since 2021.

---

## Rust vs Go: When Does It Matter?

| Scenario | Go | Rust |
|----------|----|----|
| CRUD API | ✅ Simpler | Overkill |
| High-concurrency server | ✅ Excellent | ✅ Excellent |
| Zero GC pause requirement | Acceptable | ✅ Zero GC |
| WASM compilation | Limited | ✅ First-class |
| Systems/embedded | ❌ | ✅ |
| Team ramp-up time | 2-4 weeks | 2-3 months |
| Compile times | Fast | Slow (improving) |

Go is faster to ship. Rust is faster at runtime. For 90% of backend services, Go's performance is sufficient. Rust is worth it when:

1. You need deterministic latency (no GC pauses ever)
2. You're compiling to WebAssembly
3. You're building systems-level components (databases, runtimes, OS tools)
4. Safety guarantees have regulatory or business-critical weight

---

## The Compile Time Problem

Rust is notoriously slow to compile. A medium-sized service might take 45-90 seconds for a clean build. Incremental builds are faster (10-20 seconds), but compared to Go (5 seconds cold) or Node (immediate), it adds friction.

Mitigations that actually help:
- `cargo-watch` for development (recompiles on save)
- `mold` linker drops link time by 40-60%
- Shared build caches in CI (sccache)
- Split your monolith into workspace crates to enable parallel compilation

---

## My Honest Take After 6 Months

Rust made me a better programmer in other languages. Understanding the borrow checker changes how you think about data ownership and lifetimes — and that thinking carries over to Go, TypeScript, and even SQL schema design.

Would I use Rust for a client project? Depends on the requirements:

- **Building a startup MVP or business automation?** Go or Node.
- **Building infrastructure that needs to run for 10 years without memory issues?** Rust.
- **Building a WASM-based tool or CLI?** Rust every time.

The language is genuinely excellent. The learning curve is genuinely steep. Both things are true simultaneously.

If you're curious about where Rust fits in your architecture, [let's talk](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3T7zeEOYTFQmof-sbNifFo37K0uW123TO1tf3L6AEUr-2qhDbR8Txol7-9zoAdi6NfmfNTOtQs).
