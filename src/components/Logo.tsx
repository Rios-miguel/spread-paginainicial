type LogoProps = {
  className?: string;
  /** cor de preenchimento dos "nós" vazados; acompanha o fundo onde o logo está */
  holeColor?: string;
  withName?: boolean;
  nameClassName?: string;
};

/** Logo oficial da Spread (docs/brand/spread-logo.svg) em SVG inline. */
export function Logo({ className = "size-8", holeColor = "#131b1f", withName = true, nameClassName = "text-white" }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
        <path
          d="M72 24 C64 13 35 12 31 30 C27 46 50 48 57 50 C65 52 75 59 71 73 C66 89 36 89 28 76"
          fill="none"
          stroke="#F26A1B"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <circle cx="72" cy="24" r="6.5" fill={holeColor} stroke="#F26A1B" strokeWidth="4.5" />
        <circle cx="54.4" cy="49.4" r="5.5" fill={holeColor} stroke="#F26A1B" strokeWidth="4.5" />
        <circle cx="28" cy="76" r="7.5" fill="#F26A1B" stroke="#F26A1B" strokeWidth="4.5" />
      </svg>
      {withName && <span className={`text-xl font-semibold tracking-tight ${nameClassName}`}>Spread</span>}
    </span>
  );
}
