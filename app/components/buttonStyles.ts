/**
 * The primary call to action.
 *
 * There were seven of these before, all red-on-cream caps and all slightly
 * different: six padding pairs, three font sizes, and a hover lift on some but
 * not others. They now share one shape. A call site adds only what is local to
 * it — `self-start`, `pointer-events-auto`, a grid position — and nothing that
 * changes how the button looks.
 *
 * Disabled states are built in, so a <button> can use it directly.
 */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center w-fit bg-cherish text-cream " +
  "px-[30px] py-4 max-[700px]:px-[22px] max-[700px]:py-[13px] " +
  "text-[15px] max-[700px]:text-[13px] font-extrabold uppercase " +
  "tracking-[0.1em] max-[700px]:tracking-[0.08em] " +
  "transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] " +
  "active:-translate-y-[2px] active:shadow-[0_6px_12px_-6px_rgba(231,49,49,0.6)] " +
  "disabled:opacity-60 disabled:cursor-not-allowed " +
  "disabled:hover:translate-y-0 disabled:hover:shadow-none";
