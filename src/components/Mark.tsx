import Image from "next/image";

export function Pivot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`pivot ${className}`} aria-hidden="true">
      <circle cx="100" cy="100" r="92" className="pivot-orbit" />
      <circle cx="100" cy="100" r="78" className="pivot-orbit soft" />
      <g className="pivot-arms">
        {[0, 120, 240].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <line x1="100" y1="100" x2="100" y2="24" />
            <circle cx="100" cy="16" r="3.6" />
          </g>
        ))}
      </g>
      <circle cx="100" cy="100" r="16" className="pivot-hub-ring" />
      <circle cx="100" cy="100" r="6.5" className="pivot-hub" />
    </svg>
  );
}

export function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`logo ${className}`}>
      <Image
        src="/logo.jpg"
        alt="شعار GTS للاستثمار الزراعي"
        width={640}
        height={640}
        priority={priority}
        className="logo-img"
      />
    </span>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z"
      />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="wa-icon">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.45.03.65.5.24.57.82 1.99.89 2.14.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.37-.42.49-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.17 1.36Z"
      />
    </svg>
  );
}
