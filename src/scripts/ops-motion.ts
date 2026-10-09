import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = 'expo.out';
const MOTION = '(prefers-reduced-motion: no-preference)';
const DESKTOP = '(min-width: 1024px)';

type Cleanup = () => void;

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

let mm: gsap.MatchMedia | null = null;

/* -------------------------------------------------------------------------- */
/* Hero: intro over the film                                                  */
/* -------------------------------------------------------------------------- */

// Heavy, spring like ease shared with the nav (cubic-bezier(0.32, 0.72, 0, 1))
const FLUID = (t: number) => {
  // solve the bezier for x, return y
  const x1 = 0.32, y1 = 0.72, x2 = 0, y2 = 1;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const d = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(x) < 1e-5 || d === 0) break;
    u -= x / d;
  }
  return ((ay * u + by) * u + cy) * u;
};

function heroIntro() {
  const title = $('[data-hero-title]');
  const fades = $$('[data-hero-fade]');
  if (!title) return;

  // Title: masked line reveal
  gsap.set(title, { opacity: 1 });
  SplitText.create(title, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.2, ease: FLUID, stagger: 0.09, delay: 0.1 }),
  });

  // Supporting copy: a heavy fade up out of a soft blur
  gsap.fromTo(
    fades,
    { opacity: 0, y: 32, filter: 'blur(12px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: FLUID, stagger: 0.08, delay: 0.4, clearProps: 'filter' }
  );
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
    ['[data-cases] ol', ':scope > [data-case-row]'],
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
    }
  );
  const img = $('img', frame);
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.12 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } }
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
/* Case results                                                               */
/* -------------------------------------------------------------------------- */

function caseCounts() {
  $$('[data-case-count]').forEach((el) => {
    const end = Number(el.dataset.caseCount ?? 0);
    const state = { v: 0 };
    gsap.to(state, {
      v: end,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = Math.round(state.v).toLocaleString('en-US');
      },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
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
          steps.forEach((s, i) =>
            s.toggleAttribute('data-lit', self.progress > 0.01 && self.progress >= i / steps.length)
          );
        },
      },
    }
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
    heroIntro();
    caseCounts();
    splitHeadings();
    listStaggers();
    portrait();
    cleanups.push(magnetic());
    return () => cleanups.forEach((fn) => fn());
  });

  // Breakpoint-aware scroll choreography (also wires the no-motion fallbacks)
  mm.add({ motion: MOTION, desktop: DESKTOP }, (ctx) => {
    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
    const cleanups = [processRail(motion, desktop)];
    return () => cleanups.forEach((fn) => fn());
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => {
  mm?.revert();
  mm = null;
});
