/** Small line icons for the six amenity categories. Simple geometric marks
 *  drawn to a 24x24 viewBox — no external dependencies, one file. */

type Props = { name: string; className?: string };

export function AmenityIcon({ name, className = "h-6 w-6" }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "parking":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    case "lockers":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18" />
          <circle cx="8" cy="12" r="0.6" fill="currentColor" />
          <circle cx="16" cy="12" r="0.6" fill="currentColor" />
        </svg>
      );
    case "changing":
      return (
        <svg {...common}>
          <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          <path d="M6 21 12 9l6 12" />
          <path d="M4 21h16" />
        </svg>
      );
    case "ac":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="9" rx="1.5" />
          <path d="M7 18v2M12 18v2M17 18v2" />
          <path d="M7 10h10M7 12h10" />
        </svg>
      );
    case "refreshments":
      return (
        <svg {...common}>
          <path d="M8 3h8l-1 4H9l-1-4Z" />
          <path d="M8 7l1 12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2l1-12" />
          <path d="M9 12h6" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.55a11 11 0 0 1 14 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="0.8" fill="currentColor" />
        </svg>
      );
    case "showers":
      return (
        <svg {...common}>
          <path d="M7 5a5 5 0 0 1 10 0v3" />
          <path d="M4 8h16" />
          <path d="M8 12v1M12 12v2M16 12v1M10 16v1M14 16v2M6 16v1M18 16v1" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
