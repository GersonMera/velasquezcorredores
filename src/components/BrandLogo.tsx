import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

/**
 * Unified adaptive SVG logo faithfully modeled after Velasquez Corredores de Seguros'
 * official emblem: sweeping aerodynamic curved red checkmark "V" (#FA0001) seated over
 * a blue perspective trapezoidal base, italicized bold "ELASQUEZ", and tapered wing
 * rules framing "CORREDORES DE SEGUROS".
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  compact = false,
  className = '',
}) => {
  const isDark = variant === 'dark';
  const trapGradId = isDark ? 'velTrapDark' : 'velTrapLight';
  const wordFill = isDark ? '#FFFFFF' : '#000A73';
  const subFill = isDark ? '#E2E8F0' : '#14568D';
  const wingFill = isDark ? '#FFFFFF' : '#14568D';

  if (compact) {
    return (
      <svg
        viewBox="0 0 286 48"
        className={`h-9 w-auto shrink-0 ${className}`}
        role="img"
        aria-label="Velasquez Corredores de Seguros"
      >
        <defs>
          <linearGradient id={`${trapGradId}-c`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006DF8" />
            <stop offset="100%" stopColor={isDark ? '#1D4ED8' : '#14568D'} />
          </linearGradient>
        </defs>

        {/* Blue perspective trapezoidal base */}
        <polygon
          points="15,25 56,25 74,42 5,42"
          fill={`url(#${trapGradId}-c)`}
        />

        {/* Sweeping curved aerodynamic red V checkmark matching official emblem */}
        <path
          d="M11 19 C22 19 29 27 33 36 C43 21 57 10 79 4 C65 12 49 23 35 41 L30 41 C26 30 20 23 11 19 Z"
          fill="#FA0001"
        />
        {/* Upper aerodynamic velocity swoop accent */}
        <path
          d="M42 18 C52 10 64 5 76 3 C64 7 53 13 44 20 Z"
          fill="#FA0001"
          opacity="0.88"
        />

        {/* Italic bold ELASQUEZ */}
        <text
          x="74"
          y="29"
          fill={wordFill}
          fontFamily="Montserrat, system-ui, sans-serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="24"
          letterSpacing="1.3"
        >
          ELASQUEZ
        </text>

        {/* Tapered wing rules + CORREDORES DE SEGUROS */}
        <polygon points="82,38 99,36.8 99,39.2" fill={wingFill} />
        <text
          x="103"
          y="40.5"
          fill={subFill}
          fontFamily="Montserrat, system-ui, sans-serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="8"
          letterSpacing="1.35"
        >
          CORREDORES DE SEGUROS
        </text>
        <polygon points="244,36.8 261,38 244,39.2" fill={wingFill} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 58"
      className={`h-12 w-auto shrink-0 ${className}`}
      role="img"
      aria-label="Velasquez Corredores de Seguros"
    >
      <defs>
        <linearGradient id={trapGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006DF8" />
          <stop offset="100%" stopColor={isDark ? '#1D4ED8' : '#14568D'} />
        </linearGradient>
      </defs>

      {/* Blue perspective trapezoidal base */}
      <polygon points="16,30 62,30 82,50 6,50" fill={`url(#${trapGradId})`} />

      {/* Sweeping curved aerodynamic red V checkmark */}
      <path
        d="M12 22 C25 22 33 32 38 43 C49 25 65 12 90 5 C73 14 55 27 40 49 L34 49 C29 36 22 27 12 22 Z"
        fill="#FA0001"
      />
      <path
        d="M48 21 C59 12 73 6 86 4 C73 8 60 15 50 23 Z"
        fill="#FA0001"
        opacity="0.88"
      />

      {/* Italic bold ELASQUEZ */}
      <text
        x="84"
        y="35"
        fill={wordFill}
        fontFamily="Montserrat, system-ui, sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="28"
        letterSpacing="1.5"
      >
        ELASQUEZ
      </text>

      {/* Tapered wing rules + CORREDORES DE SEGUROS */}
      <polygon points="94,45.5 113,44.2 113,46.8" fill={wingFill} />
      <text
        x="118"
        y="48"
        fill={subFill}
        fontFamily="Montserrat, system-ui, sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="9"
        letterSpacing="1.5"
      >
        CORREDORES DE SEGUROS
      </text>
      <polygon points="278,44.2 297,45.5 278,46.8" fill={wingFill} />
    </svg>
  );
};
