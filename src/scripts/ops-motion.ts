/**
 * Homepage motion grammar (theme-ops).
 *
 * One signature moment (the live system map in the hero) plus a scroll-driven
 * case study. Everything else stays quiet: line reveals on headings, short
 * staggers on lists, a magnetic primary CTA.
 *
 * Rules: content is visible by default, motion only adds; expo.out easing;
 * everything is disabled under prefers-reduced-motion via gsap.matchMedia.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

const EASE = 'expo.out';
const MOTION = '(prefers-reduced-motion: no-preference)';
const DESKTOP = '(min-width: 1024px)';

type Cleanup = () => void;

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

let mm: gsap.MatchMedia | null = null;

/* -------------------------------------------------------------------------- */
/* Hero: intro + live system map                                              */
/* -------------------------------------------------------------------------- */

function heroIntro(cleanups: Cleanup[]) {
  const title = $('[data-hero-title]');
  const fades = $$('[data-hero-fade]');
  const panel = $('[data-hero-panel]');
  if (!title) return;

  // Title: masked line reveal
  gsap.set(title, { opacity: 1 });
  SplitText.create(title, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, { yPercent: 105, duration: 1.15, ease: EASE, stagger: 0.09, delay: 0.05 }),
  });

  gsap.fromTo(
    fades,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, delay: 0.35 },
  );

  // Counters roll once
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count ?? 0);
    const state = { v: 0 };
    gsap.to(state, {
      v: end,
      duration: 1.8,
      delay: 0.7,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = Math.round(state.v).toLocaleString('en-US');
      },
    });
  });

  if (!panel) return;

  const paths = $$<SVGPathElement>('[data-draw]', panel);
  const nodes = $$<SVGGElement>('[data-node]', panel);

  gsap.set($('[data-static-packets]', panel), { opacity: 0 });

  const intro = gsap.timeline({ delay: 0.25 });
  intro
    .fromTo(
      panel,
      { opacity: 0, clipPath: 'inset(0% 0% 100% 0% round 16px)' },
      { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.2, ease: 'expo.inOut' },
    )
    .fromTo(
      nodes,
      { opacity: 0, scale: 0.9, transformOrigin: '50% 50%' },
      { opacity: 1, scale: 1, duration: 0.7, ease: EASE, stagger: 0.06 },
      0.75,
    )
    .fromTo(paths, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: EASE, stagger: 0.07 }, 0.95);

  const loop = packetLoop(panel);
  const stopLog = liveLog(panel);

  // Only run the loop while the panel is on screen
  let inView = true;
  const st = ScrollTrigger.create({
    trigger: panel,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      inView = self.isActive;
      if (self.isActive) loop.play();
      else loop.pause();
    },
  });

  const onVisibility = () => (document.hidden ? loop.pause() : inView && loop.play());
  document.addEventListener('visibilitychange', onVisibility);

  cleanups.push(() => {
    stopLog();
    st.kill();
    document.removeEventListener('visibilitychange', onVisibility);
  });
}

function packetLoop(panel: HTMLElement) {
  const packet = (k: string) => $<SVGCircleElement>(`[data-packet="${k}"]`, panel);
  const ring = $<SVGCircleElement>('[data-agent-ring]', panel);
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9, delay: 2 });

  const travel = (key: string, pathId: string, at: number, duration = 1) => {
    const el = packet(key);
    if (!el) return;
    tl.set(el, { opacity: 1 }, at)
      .to(
        el,
        {
          duration,
          ease: 'power2.inOut',
          motionPath: { path: pathId, align: pathId, alignOrigin: [0.5, 0.5] },
        },
        at,
      )
      .set(el, { opacity: 0 }, at + duration);
  };

  const pulse = (at: number) => {
    if (!ring) return;
    tl.fromTo(ring, { attr: { r: 46 }, opacity: 1 }, { attr: { r: 70 }, opacity: 0, duration: 0.9, ease: 'power2.out' }, at);
  };

  // Phase A — a receipt arrives, the agent writes it everywhere
  travel('in-1', '#hm-in-1', 0, 1.05);
  pulse(1.0);
  travel('out-1', '#hm-out-1', 1.2, 0.9);
  travel('out-2', '#hm-out-2', 1.3, 0.8);
  travel('out-3', '#hm-out-3', 1.4, 0.9);

  // Phase B — the CEO asks a question, the agent reads the books
  travel('in-2', '#hm-in-2', 3.3, 1.05);
  pulse(4.3);
  travel('out-2', '#hm-out-2', 4.5, 0.8);

  return tl;
}

function liveLog(panel: HTMLElement): Cleanup {
  const list = $<HTMLOListElement>('[data-log]', panel);
  const source = $('[data-log-source]', panel);
  if (!list || !source) return () => {};

  let lines: { t: string; text: string }[] = [];
  try {
    lines = JSON.parse(source.textContent ?? '[]');
  } catch {
    return () => {};
  }
  if (!lines.length) return () => {};

  const tone = (t: string) => (t === 'ok' ? 'text-ops-live' : t === 'ai' ? 'text-ops-paper' : 'text-ops-mist');
  const stamp = () => new Date().toLocaleTimeString('en-GB', { hour12: false });

  // Re-stamp the server-rendered lines with real time
  $$('li > span:first-child', list).forEach((s) => (s.textContent = stamp()));

  let index = list.children.length;
  const id = window.setInterval(() => {
    if (document.hidden) return;
    const line = lines[index % lines.length];
    index += 1;

    const li = document.createElement('li');
    li.className = `flex gap-3 ${tone(line.t)}`;
    const time = document.createElement('span');
    time.className = 'text-ops-mist/70';
    time.textContent = stamp();
    const text = document.createElement('span');
    text.className = 'truncate';
    text.textContent = line.text;
    li.append(time, text);
    list.appendChild(li);
    gsap.from(li, { opacity: 0, y: 10, duration: 0.6, ease: EASE });

    while (list.children.length > 4) {
      const first = list.firstElementChild as HTMLElement | null;
      if (!first || first.dataset.leaving) break;
      first.dataset.leaving = 'true';
      gsap.to(first, {
        opacity: 0,
        height: 0,
        marginTop: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => first.remove(),
      });
      break;
    }
  }, 2300);

  return () => window.clearInterval(id);
}

/* -------------------------------------------------------------------------- */
/* Shared reveals                                                             */
/* -------------------------------------------------------------------------- */

function splitHeadings() {
  $$('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });
  });
}

function listStaggers() {
  const groups: Array<[string, string]> = [
    ['[data-builds] ul', ':scope > [data-build-row]'],
    ['#faq', 'details'],
    ['[data-process] ol', ':scope > li'],
  ];
  groups.forEach(([containerSel, itemSel]) => {
    const container = $(containerSel);
    if (!container) return;
    const items = $$(itemSel, container);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 22,
      duration: 0.85,
      ease: EASE,
      stagger: 0.07,
      scrollTrigger: { trigger: container, start: 'top 85%', once: true },
    });
  });
}

function portrait() {
  const frame = $('[data-portrait]');
  if (!frame) return;
  gsap.fromTo(
    frame,
    { clipPath: 'inset(16% 0% 0% 0% round 16px)' },
    {
      clipPath: 'inset(0% 0% 0% 0% round 16px)',
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top 92%', end: 'top 40%', scrub: 0.6 },
    },
  );
  const img = $('img', frame);
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.12 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  }
}

function magnetic(): Cleanup {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const cleanups: Cleanup[] = [];

  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/* -------------------------------------------------------------------------- */
/* Case scroller                                                              */
/* -------------------------------------------------------------------------- */

function drawIn(scope: Element) {
  gsap.fromTo($$('[data-draw]', scope), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: EASE, stagger: 0.07 });
  // The amber data flow only starts once the wiring is in place
  gsap.fromTo($$('.ops-flow', scope), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.8 });
  gsap.fromTo(
    $$('[data-node]', scope),
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.65, ease: EASE, stagger: 0.05 },
  );
  const bar = $('[data-bar]', scope);
  if (bar) {
    gsap.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1.3, ease: EASE, delay: 0.35 });
  }
}

function caseScroller(motion: boolean, desktop: boolean): Cleanup {
  const root = $('[data-case-scroller]');
  if (!root) return () => {};

  const steps = $$('[data-case-step]', root);
  const visuals = $$('[data-case-visual]', root);
  const bars = $$('[data-case-progress]', root);
  const label = $('[data-case-label]', root);
  let current = 0;

  const activate = (i: number) => {
    if (i === current) return;
    current = i;
    visuals.forEach((v, j) => v.toggleAttribute('data-active', j === i));
    if (label) label.textContent = steps[i]?.dataset.caseSlug ?? '';
    if (!motion) bars.forEach((b, j) => gsap.set(b, { scaleX: j <= i ? 1 : 0 }));
    if (motion && visuals[i]) drawIn(visuals[i]);
  };

  if (desktop) {
    if (motion && visuals[0]) {
      ScrollTrigger.create({ trigger: root, start: 'top 65%', once: true, onEnter: () => drawIn(visuals[0]) });
    }
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && activate(i),
      });
      if (motion && bars[i]) {
        gsap.fromTo(
          bars[i],
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 55%', end: 'bottom 55%', scrub: true } },
        );
      }
    });
  } else if (motion) {
    steps.forEach((step) => {
      const diagram = $('[data-diagram]', step);
      if (diagram) ScrollTrigger.create({ trigger: diagram, start: 'top 82%', once: true, onEnter: () => drawIn(diagram) });
    });
  }

  // Reset to the first case when the breakpoint context is torn down
  return () => {
    current = 0;
    visuals.forEach((v, j) => v.toggleAttribute('data-active', j === 0));
    if (label) label.textContent = steps[0]?.dataset.caseSlug ?? '';
  };
}

/* -------------------------------------------------------------------------- */
/* Process rail                                                               */
/* -------------------------------------------------------------------------- */

function processRail(motion: boolean, desktop: boolean): Cleanup {
  const root = $('[data-process]');
  const list = root ? $('ol', root) : null;
  if (!root || !list || !motion) return () => {};

  const steps = $$('[data-process-step]', root);
  const line = $(desktop ? '[data-process-line]' : '[data-process-line-mobile]', root);
  if (!line) return () => {};

  steps.forEach((s) => s.removeAttribute('data-lit'));
  const axis = desktop ? 'scaleX' : 'scaleY';

  gsap.fromTo(
    line,
    { [axis]: 0 },
    {
      [axis]: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: list,
        start: desktop ? 'top 75%' : 'top 70%',
        end: desktop ? 'bottom 60%' : 'bottom 55%',
        scrub: 0.6,
        onUpdate: (self) => {
          steps.forEach((s, i) => s.toggleAttribute('data-lit', self.progress > 0.01 && self.progress >= i / steps.length));
        },
      },
    },
  );

  return () => steps.forEach((s) => s.setAttribute('data-lit', ''));
}

/* -------------------------------------------------------------------------- */
/* Boot                                                                       */
/* -------------------------------------------------------------------------- */

function init() {
  if (!$('[data-ops-page]')) return;
  mm?.revert();
  mm = gsap.matchMedia();

  // Motion that does not depend on the breakpoint
  mm.add(MOTION, () => {
    const cleanups: Cleanup[] = [];
    heroIntro(cleanups);
    splitHeadings();
    listStaggers();
    portrait();
    cleanups.push(magnetic());
    return () => cleanups.forEach((fn) => fn());
  });

  // Breakpoint-aware scroll choreography (also wires the no-motion fallbacks)
  mm.add({ motion: MOTION, desktop: DESKTOP }, (ctx) => {
    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
    const cleanups = [caseScroller(motion, desktop), processRail(motion, desktop)];
    return () => cleanups.forEach((fn) => fn());
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => {
  mm?.revert();
  mm = null;
});
