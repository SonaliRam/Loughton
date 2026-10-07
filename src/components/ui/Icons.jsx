// phone, mail and instagram are the exact vector icons from the design PDF
function FilledSvg({ className = "h-6 w-6", width, height, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function StrokeSvg({ className = "h-6 w-6", size = 24, strokeWidth = 1.5, children }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function PhoneIcon({ className }) {
  return (
    <FilledSvg className={className} width={31.87} height={31.84}>
      <path d="M6.1 3.42C3.54 5.59 3.05 10.02 4.33 13C5.39 15.44 9.51 19.53 11.53 21.44C15.15 24.84 18.74 28.14 24.1 25.89C25.3 25.39 27.9 23.88 26.98 22.3L23.22 18.6C23.05 18.53 22.92 18.66 22.8 18.75C20.93 20.09 20.48 22.3 17.42 21.39C13.75 20.31 9.94 16.5 8.83 12.83C7.87 9.71 10.08 9.3 11.44 7.39C11.53 7.26 11.66 7.13 11.59 6.96L7.89 3.21C7.27 2.86 6.64 2.96 6.1 3.42M6.33 0.2C7.82 0 8.95 0.35 10.08 1.31C10.99 2.09 13.95 4.99 14.26 5.98C15.17 8.86 12.87 9.5 11.63 11.25C11.32 11.69 11.53 11.94 11.71 12.4C12.7 15 15.05 17.32 17.6 18.39C18.09 18.59 18.47 18.89 18.93 18.56C20.78 17.25 21.83 14.49 24.79 16.19C25.58 16.64 28.31 19.42 28.97 20.21C31.87 23.76 28.59 27.02 25.33 28.45C17.6 31.84 11.86 26.07 6.96 20.92C3.24 17.01 0 13.48 0.91 7.61C1.3 5.1 3.53 0.58 6.33 0.2" />
    </FilledSvg>
  );
}

export function MailIcon({ className }) {
  return (
    <FilledSvg className={className} width={36.96} height={25.99}>
      <path d="M33.2 23.82L23.86 14.59C21.96 16.67 20.02 18.33 16.98 17.49C15.21 17 14.34 15.72 13.04 14.59L3.75 23.82L33.2 23.82M34.79 22.23L34.79 3.76L25.48 12.97L34.79 22.23M2.16 22.23L11.47 12.97L2.16 3.76L2.16 22.23M33.2 2.17L3.75 2.17L16.31 14.69C17.64 15.79 19.32 15.79 20.64 14.69L33.2 2.17M0 23.17L0 2.82C0.29 1.31 1.44 0.16 2.99 0L33.82 0C35.52 0.07 36.88 1.45 36.96 3.14L36.95 22.99C36.81 24.64 35.47 25.91 33.82 25.99L2.99 25.99C1.54 25.87 0.18 24.64 0 23.17" />
    </FilledSvg>
  );
}

export function InstagramIcon({ className }) {
  return (
    <FilledSvg className={className} width={32.7} height={32.85}>
      <path d="M8.69 3.32C5.71 3.56 3.29 6.02 3.04 8.99L3.04 24.17C3.37 27.24 5.95 29.61 9.02 29.75C13.76 29.54 18.74 30.03 23.45 29.75C26.6 29.56 29.1 27.27 29.43 24.11L29.43 8.93C29.13 5.88 26.64 3.47 23.57 3.3C18.71 3.01 13.57 3.5 8.69 3.32M9.28 0.22C13.81 0 18.49 0.35 23.04 0.2C28.31 0.32 32.22 4.2 32.47 9.46C32.7 14.32 32.35 19.4 32.4 24.28C31.9 29.02 27.85 32.62 23.1 32.67C18.59 32.53 13.98 32.85 9.49 32.67C4.02 32.45 0.23 28.72 0 23.24L0 9.63C0.15 4.31 3.97 0.48 9.28 0.22" />
      <path d="M15.76 11.08C11.61 11.45 9.4 16.15 11.75 19.61C14.03 22.96 19.11 22.66 21.03 19.1C23.09 15.29 20.05 10.7 15.76 11.08M15.81 8.1C22.26 7.74 26.67 14.65 23.72 20.39C20.98 25.7 13.56 26.52 9.76 21.89C5.34 16.53 8.92 8.49 15.81 8.1" />
      <path d="M24.75 5.82C26.47 5.66 27.54 7.72 26.44 9.04C25.47 10.2 23.53 9.87 23.06 8.41C22.68 7.2 23.49 5.95 24.75 5.82" />
    </FilledSvg>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <StrokeSvg className={className} size={16} strokeWidth={1.5}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </StrokeSvg>
  );
}

export function ChevronDownIcon({ className }) {
  return (
    <StrokeSvg className={className} size={16} strokeWidth={1.5}>
      <path d="M5 9l7 7 7-7" />
    </StrokeSvg>
  );
}

export function CheckCircleIcon({ className }) {
  return (
    <StrokeSvg className={className} size={48} strokeWidth={1}>
      <circle cx="12" cy="12" r="11" />
      <path d="M8 12.5l3 3 5-6" />
    </StrokeSvg>
  );
}

export function StarIcon({ className }) {
  return (
    <FilledSvg className={className} width={24} height={24}>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
    </FilledSvg>
  );
}

export function MenuIcon({ className }) {
  return (
    <StrokeSvg className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </StrokeSvg>
  );
}

export function CloseIcon({ className }) {
  return (
    <StrokeSvg className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </StrokeSvg>
  );
}

// dummy line icons, replace later with the exact icons from the design
export function CalendarIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18M7.5 14h5M7.5 17.5h3" />
    </StrokeSvg>
  );
}

export function ClockIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </StrokeSvg>
  );
}

export function HeartCircleIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16s-3.75-2.3-3.75-4.9A2.1 2.1 0 0 1 12 9.9a2.1 2.1 0 0 1 3.75 1.2C15.75 13.7 12 16 12 16z" />
    </StrokeSvg>
  );
}

export function LockIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <rect x="5" y="11" width="14" height="10" rx="3" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" />
    </StrokeSvg>
  );
}

export function HeartIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z" />
    </StrokeSvg>
  );
}

export function ShieldIcon({ className }) {
  return (
    <StrokeSvg className={className} strokeWidth={1}>
      <path d="M12 3l7 3v5.5c0 4.6-3 7.7-7 9.5-4-1.8-7-4.9-7-9.5V6z" />
      <path d="M12 9v6M9 12h6" />
    </StrokeSvg>
  );
}
