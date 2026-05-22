---
title: 'Why I Switched From Node.js to Go for High-Load Backends'
description: 'After hitting the wall with Node.js at 8K concurrent connections, I migrated a critical service to Go. Here is what changed, what stayed the same, and what I learned building Go microservices for production workloads.'
pubDate: 2025-05-08
image: 'https://res.cloudinary.com/dy7kvvzgj/image/upload/v1753346476/becs06b6vgw2hnpio6rv_tboj6y.webp'
readtime: '10 min read'
category: 'dev-tips'
tags: ['golang', 'backend', 'performance', 'microservices']
authors: ['varmiguemunoz']
draft: false
---

## The Event Loop Is Not Infinite

Node.js is excellent. I've been writing Node backends since 2021 and I still use it for plenty of services. But there's a ceiling, and I hit it at a client's delivery management platform — the same infrastructure that runs [Shipday](https://shipday.com).

At roughly **8,000 concurrent WebSocket connections**, the event loop started queuing. P99 latency jumped from 80ms to 1.2 seconds. The fix wasn't more servers — the fix was reconsidering the tool.

I rewrote the real-time event dispatch service in Go. What followed was one of the cleaner engineering wins I've had.

---

## What Go Gives You That Node Doesn't

### True Concurrency

Node.js is single-threaded. Concurrency in Node is simulated through the event loop — it doesn't run two things at the same time; it switches between tasks so fast it feels concurrent.

Go has **goroutines**. They're actual lightweight threads managed by the Go runtime, not the OS. Spawning 100,000 goroutines is normal and cheap (~2KB stack each vs ~1MB for OS threads).

```go
func handleConnection(conn net.Conn) {
    defer conn.Close()
    // this runs in its own goroutine — truly concurrent
    processMessages(conn)
}

func main() {
    listener, _ := net.Listen("tcp", ":8080")
    for {
        conn, _ := listener.Accept()
        go handleConnection(conn) // non-blocking, goroutine spawned
    }
}
```

You can't write this in Node without worker threads, which add complexity and don't share memory cleanly.

### Predictable Memory

Node's garbage collector is generational and does fine for most workloads. But under high concurrency with lots of short-lived objects, GC pauses become noticeable.

Go's GC is also generational but built from the ground up for low-latency server workloads. In practice, our P99 GC pause went from ~15ms (Node) to ~1ms (Go) under identical load.

### The Type System Catches Real Bugs

TypeScript is good. Go's type system is better for backend services because it's **enforced at compile time with no escape hatches**. No `as any`, no implicit `undefined`, no optional chaining through data structures you're not sure about.

```go
type DeliveryEvent struct {
    OrderID    string    `json:"order_id"`
    Status     string    `json:"status"`
    Timestamp  time.Time `json:"timestamp"`
    DriverID   *string   `json:"driver_id,omitempty"` // explicitly nullable
}
```

When you receive this from a queue and process it, the compiler guarantees `OrderID` is a `string`. In TypeScript you're trusting the schema validator you wrote — and hoping you didn't forget to call it.

---

## The Migration Pattern

I didn't rewrite everything at once. I used the **strangler fig pattern**:

1. Identified the bottleneck service (real-time event dispatch)
2. Kept the Node.js API gateway in place
3. Stood up the Go service behind the gateway
4. Gradually routed traffic to Go (10% → 50% → 100% over 3 weeks)
5. Kept Node running in parallel until Go had 30 days of production uptime

This is how you migrate without a big bang rewrite.

---

## The Learning Curve Is Real

Go is opinionated in ways that surprise Node developers:

**No exceptions** — Go uses multiple return values for errors:
```go
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doSomething failed: %w", err)
}
```

You handle errors explicitly at every step. It's verbose but it makes error handling impossible to skip.

**No generics until Go 1.18** — If you're on an older codebase, you'll write a lot of `interface{}` and type assertions. Upgrade to 1.21+.

**Dependency injection is manual** — No NestJS-style DI container. You wire things together yourself. For large services, use `wire` or `fx`.

---

## Benchmarks: Real Numbers

Same service, same load test, same hardware (4 vCPU, 8GB RAM):

| Metric | Node.js (Express) | Go (net/http) |
|--------|-------------------|--------------------|
| Max concurrent | 8K connections | 85K connections |
| P50 latency | 12ms | 3ms |
| P99 latency | 1,200ms | 18ms |
| Memory (idle) | 180MB | 22MB |
| Memory (load) | 1.4GB | 310MB |

The memory difference alone justified the rewrite from an infrastructure cost perspective.

---

## When to Use Go vs Node

**Use Go when:**
- You need 10K+ concurrent connections
- You're building event streaming, real-time systems, or high-throughput APIs
- Memory efficiency matters (IoT, embedded, high-density VMs)
- You want to distribute a single binary with no runtime dependencies

**Stick with Node when:**
- You're building CRUD APIs under moderate load
- Your team knows JavaScript deeply and Go is a new tool
- You need the npm ecosystem (e.g., specific third-party integrations)
- You're building quickly and correctness > raw performance

---

## The Bottom Line

Go didn't replace Node.js in my stack — it replaced the parts of Node.js that Node.js is bad at. I write Go for performance-critical services and Node for everything that doesn't need to handle 50K concurrent connections.

If your backend is hitting latency walls or you're scaling horizontally just to compensate for single-thread limits, Go is worth the learning curve. It paid for itself in the first month of reduced infrastructure spend.

Questions? [Let's talk](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3T7zeEOYTFQmof-sbNifFo37K0uW123TO1tf3L6AEUr-2qhDbR8Txol7-9zoAdi6NfmfNTOtQs).
