// phone and mail are the exact vector icons from the design PDF
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

// instagram, linkedin and facebook are Font Awesome Free brand icons (CC BY 4.0, fontawesome.com)
export function InstagramIcon({ className }) {
  return (
    <FilledSvg className={className} width={448} height={512}>
      <path d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </FilledSvg>
  );
}

export function LinkedInIcon({ className }) {
  return (
    <FilledSvg className={className} width={448} height={512}>
      <path d="M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z" />
    </FilledSvg>
  );
}

export function FacebookIcon({ className }) {
  return (
    <FilledSvg className={className} width={320} height={512}>
      <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z" />
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

export function WhatsAppIcon({ className }) {
  return (
    <StrokeSvg className={className}>
      <path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8a3.6 3.6 0 0 1-1.5-1.5l.8-.8-1-2-1 .5z" />
    </StrokeSvg>
  );
}
