import React from 'react';

/**
 * Full-bleed twilight architectural highway & urban mobility backdrop for the 100svh Hero.
 * Layered underneath the Azul Noche (#000A73) editorial scrim so both mobile and desktop
 * present a refined, atmospheric InsurTech visual with zero external image failures.
 */
export const HeroMobilityBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#00074D]" aria-hidden="true">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="skyTwilight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000A73" />
            <stop offset="40%" stopColor="#0B3178" />
            <stop offset="76%" stopColor="#1A6BAE" />
            <stop offset="100%" stopColor="#081E5E" />
          </linearGradient>
          <radialGradient id="horizonGlow" cx="68%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.68" />
            <stop offset="42%" stopColor="#1D70B8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#000A73" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="roadSurface" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#13427E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020B45" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#BAE6FD" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tailTrail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FA0001" stopOpacity="0" />
            <stop offset="55%" stopColor="#FA0001" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Twilight sky base */}
        <rect width="1600" height="900" fill="url(#skyTwilight)" />
        <rect width="1600" height="900" fill="url(#horizonGlow)" />

        {/* Subtle Swiss Architectural 1px Coordinate Grid */}
        <g stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="900" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />
          ))}
        </g>

        {/* Distant architectural urban skyline & palm horizon (Pucallpa twilight silhouette) */}
        <g fill="#051B5E" stroke="#60A5FA" strokeOpacity="0.22" strokeWidth="1">
          <rect x="0" y="455" width="1600" height="75" stroke="none" />
          <rect x="640" y="405" width="84" height="105" />
          <rect x="740" y="370" width="90" height="140" />
          <rect x="844" y="410" width="64" height="100" />
          <rect x="920" y="345" width="96" height="165" />
          <rect x="1032" y="395" width="70" height="115" />
          <rect x="1116" y="365" width="112" height="145" />
          <rect x="1244" y="408" width="74" height="102" />
          <rect x="1334" y="340" width="92" height="170" />
          <rect x="1442" y="390" width="98" height="120" />
        </g>
        {/* Architectural building window illumination */}
        <g fill="#BAE6FD" opacity="0.55">
          <rect x="656" y="422" width="50" height="3.5" />
          <rect x="656" y="438" width="36" height="3.5" />
          <rect x="756" y="390" width="56" height="3.5" />
          <rect x="756" y="408" width="40" height="3.5" />
          <rect x="756" y="426" width="56" height="3.5" />
          <rect x="936" y="368" width="64" height="3.5" />
          <rect x="936" y="386" width="46" height="3.5" />
          <rect x="936" y="404" width="64" height="3.5" />
          <rect x="1134" y="388" width="76" height="3.5" />
          <rect x="1134" y="406" width="54" height="3.5" />
          <rect x="1352" y="366" width="56" height="3.5" />
          <rect x="1352" y="384" width="42" height="3.5" />
        </g>

        {/* Perspective multi-lane boulevard */}
        <polygon points="0,515 1600,515 1600,900 0,900" fill="url(#roadSurface)" />
        {/* Horizon divider */}
        <line x1="0" y1="515" x2="1600" y2="515" stroke="#93C5FD" strokeOpacity="0.65" strokeWidth="2" />

        {/* Express lane perspective guidelines converging toward right-center vanishing point */}
        <g stroke="#BAE6FD" strokeOpacity="0.38" strokeWidth="1.8">
          <line x1="1080" y1="515" x2="140" y2="900" />
          <line x1="1080" y1="515" x2="580" y2="900" strokeDasharray="16 14" />
          <line x1="1080" y1="515" x2="1040" y2="900" />
          <line x1="1080" y1="515" x2="1520" y2="900" />
        </g>

        {/* Streetlight poles receding along avenue */}
        <g stroke="#BAE6FD" strokeOpacity="0.52" strokeWidth="2">
          <line x1="1410" y1="515" x2="1410" y2="325" />
          <line x1="1410" y1="325" x2="1365" y2="338" />
          <circle cx="1362" cy="340" r="6" fill="#E0F2FE" fillOpacity="0.9" stroke="none" />

          <line x1="1265" y1="515" x2="1265" y2="390" />
          <line x1="1265" y1="390" x2="1238" y2="399" />
          <circle cx="1236" cy="400" r="4.5" fill="#E0F2FE" fillOpacity="0.8" stroke="none" />

          <line x1="1185" y1="515" x2="1185" y2="438" />
          <circle cx="1172" cy="442" r="3" fill="#E0F2FE" fillOpacity="0.7" stroke="none" />
        </g>

        {/* Motion light trails (precision mobility feel) */}
        <path d="M 380 815 Q 780 655 1080 520" stroke="url(#headlightBeam)" strokeWidth="5" fill="none" />
        <path d="M 520 855 Q 845 680 1082 522" stroke="url(#headlightBeam)" strokeWidth="3" fill="none" />
        <path d="M 1075 524 Q 1235 648 1530 828" stroke="url(#tailTrail)" strokeWidth="4.5" fill="none" />
        <path d="M 1078 525 Q 1265 632 1585 774" stroke="url(#tailTrail)" strokeWidth="2.5" fill="none" />

        {/* Architectural foreground vehicle silhouette (sleek modern SUV profile) */}
        <g transform="translate(520, 585)" opacity="0.95">
          {/* Subtle road reflection */}
          <ellipse cx="265" cy="142" rx="235" ry="16" fill="#000428" opacity="0.78" />
          {/* Body silhouette */}
          <path
            d="M48 118 L38 92 C40 76 62 66 94 61 L168 24 C190 14 222 10 264 10 L368 12 C398 14 422 28 446 56 L496 66 C512 72 520 86 520 104 L512 120 L466 122 C464 96 442 82 420 82 C398 82 378 96 376 122 L176 122 C174 96 152 82 130 82 C108 82 88 96 86 122 Z"
            fill="#0A2463"
            stroke="#93C5FD"
            strokeOpacity="0.82"
            strokeWidth="1.8"
          />
          {/* Window cabin line */}
          <path
            d="M148 58 L206 26 L348 24 C372 25 390 36 408 58 Z"
            fill="#1D68A8"
            fillOpacity="0.58"
            stroke="#BAE6FD"
            strokeOpacity="0.72"
            strokeWidth="1.4"
          />
          {/* Aerodynamic precision accent line */}
          <line x1="92" y1="74" x2="466" y2="74" stroke="#7DD3FC" strokeOpacity="0.6" strokeWidth="1.2" />
          {/* Headlight & Taillight */}
          <path d="M488 78 L518 82 L514 91 L486 86 Z" fill="#FFFFFF" />
          <path d="M44 78 L66 76 L68 84 L45 86 Z" fill="#FA0001" />
          {/* Wheels */}
          <circle cx="131" cy="119" r="29" fill="#04103B" stroke="#93C5FD" strokeOpacity="0.85" strokeWidth="2.2" />
          <circle cx="131" cy="119" r="14" fill="none" stroke="#BAE6FD" strokeOpacity="0.7" strokeWidth="1.6" />
          <circle cx="421" cy="119" r="29" fill="#04103B" stroke="#93C5FD" strokeOpacity="0.85" strokeWidth="2.2" />
          <circle cx="421" cy="119" r="14" fill="none" stroke="#BAE6FD" strokeOpacity="0.7" strokeWidth="1.6" />
        </g>

        {/* Precision technical reticle accent in upper center-right */}
        <g stroke="#BAE6FD" strokeOpacity="0.28" strokeWidth="1" fill="none">
          <circle cx="880" cy="210" r="88" strokeDasharray="4 6" />
          <circle cx="880" cy="210" r="134" />
          <line x1="880" y1="55" x2="880" y2="365" />
          <line x1="725" y1="210" x2="1035" y2="210" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Editorial technical visual for the Pucallpa Mototaxi & Tarjeta de Circulación module.
 */
export const MototaxiEditorialVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[280px] bg-[#000A73] overflow-hidden border border-[#14568D]/20 flex items-center justify-center">
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Esquema técnico de asesoría en Tarjeta de Circulación para mototaxis en Pucallpa"
      >
        <defs>
          <linearGradient id="motoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000A73" />
            <stop offset="100%" stopColor="#14568D" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#motoBg)" />
        {/* 1px Swiss Grid */}
        <g stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`mv-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="420" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`mh-${i}`} x1="0" y1={i * 52} x2="600" y2={i * 52} />
          ))}
        </g>

        {/* Schematic Municipal Circulation Credential */}
        <g transform="translate(40, 34)">
          <rect
            x="0"
            y="0"
            width="290"
            height="162"
            fill="#FFFFFF"
            fillOpacity="0.07"
            stroke="#93C5FD"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <rect x="0" y="0" width="290" height="30" fill="#FFFFFF" fillOpacity="0.12" />
          <text
            x="16"
            y="19"
            fill="#FFFFFF"
            fontFamily="Montserrat, sans-serif"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.8"
          >
            TARJETA DE CIRCULACIÓN
          </text>
          <text x="16" y="52" fill="#CBD5E1" fontFamily="Open Sans, sans-serif" fontSize="9.5">
            MUNICIPALIDAD PROVINCIAL DE CORONEL PORTILLO
          </text>
          <line x1="16" y1="65" x2="274" y2="65" stroke="#FFFFFF" strokeOpacity="0.22" />
          <text x="16" y="88" fill="#93C5FD" fontFamily="IBM Plex Mono, monospace" fontSize="10">
            MODALIDAD: NUEVO / RENOVACIÓN / DUPLICADO
          </text>
          <text x="16" y="112" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600">
            PLACA EJEMPLO: 8421-AU
          </text>
          <text x="16" y="138" fill="#CBD5E1" fontFamily="Open Sans, sans-serif" fontSize="10">
            Requisito indispensable: SOAT electrónico vigente
          </text>
        </g>

        {/* Large blueprint technical mototaxi drawing with generous bottom breathing room */}
        <g transform="translate(245, 224) scale(0.92)" stroke="#FFFFFF" strokeWidth="2.1" fill="none">
          <path d="M35 120 H15 V60 C15 36 32 18 62 18 H164 C194 18 214 36 226 68 L238 120 H210" />
          <path d="M226 68 H270 L282 120 H238" />
          <path d="M214 44 H246 L266 68" />
          <line x1="35" y1="68" x2="164" y2="68" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="106" y1="18" x2="106" y2="120" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="88" y1="120" x2="206" y2="120" />
          <circle cx="62" cy="124" r="24" />
          <circle cx="62" cy="124" r="9" stroke="#93C5FD" />
          <circle cx="246" cy="124" r="24" />
          <circle cx="246" cy="124" r="9" stroke="#93C5FD" />
          {/* Ground datum line */}
          <line x1="-220" y1="149" x2="320" y2="149" stroke="#60A5FA" strokeOpacity="0.5" strokeWidth="1.2" />
        </g>

        {/* Architectural accent mark */}
        <polygon points="520,34 556,34 540,52 504,52" fill="#FA0001" />
      </svg>
    </div>
  );
};

/**
 * Precision Swiss architectural street reference map for Callería, Pucallpa.
 */
export const PucallpaOfficeMap: React.FC = () => {
  return (
    <div className="relative w-full h-72 sm:h-80 bg-[#F4F6FA] border border-slate-200 overflow-hidden">
      <svg
        viewBox="0 0 640 340"
        className="w-full h-full object-cover"
        role="img"
        aria-label="Mapa referencial de ubicación en Jr. Tarapacá 1025, Callería, Pucallpa"
      >
        <rect width="640" height="340" fill="#F4F6FA" />

        {/* Urban blocks */}
        <g fill="#E8EEF6" stroke="#CBD5E1" strokeWidth="1">
          <rect x="30" y="30" width="110" height="75" />
          <rect x="165" y="30" width="120" height="75" />
          <rect x="310" y="30" width="120" height="75" />
          <rect x="30" y="130" width="110" height="80" />
          <rect x="165" y="130" width="120" height="80" fill="#DCE8F5" />
          <rect x="310" y="130" width="120" height="80" />
          <rect x="30" y="235" width="110" height="75" />
          <rect x="165" y="235" width="120" height="75" />
          <rect x="310" y="235" width="120" height="75" />
        </g>

        {/* Río Ucayali corridor on right edge */}
        <path
          d="M 505 0 C 485 110, 525 220, 495 340 L 640 340 L 640 0 Z"
          fill="#14568D"
          fillOpacity="0.16"
        />
        <path
          d="M 505 0 C 485 110, 525 220, 495 340"
          fill="none"
          stroke="#14568D"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <text
          x="534"
          y="175"
          fill="#14568D"
          fontFamily="Montserrat, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2"
          transform="rotate(-90 534 175)"
        >
          RÍO UCAYALI
        </text>

        {/* Main streets */}
        <g stroke="#FFFFFF" strokeWidth="12">
          <line x1="0" y1="118" x2="480" y2="118" />
          <line x1="0" y1="222" x2="480" y2="222" />
          <line x1="152" y1="0" x2="152" y2="340" />
          <line x1="298" y1="0" x2="298" y2="340" />
          <line x1="444" y1="0" x2="444" y2="340" />
        </g>

        {/* Highlighted Jr. Tarapacá axis */}
        <line x1="0" y1="118" x2="480" y2="118" stroke="#14568D" strokeWidth="2.5" strokeDasharray="6 4" />

        {/* Street labels */}
        <g fill="#535353" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="600">
          <text x="42" y="114">JR. TARAPACÁ</text>
          <text x="318" y="218">JR. CORONEL PORTILLO</text>
          <text x="148" y="295" transform="rotate(-90 148 295)">AV. SÁENZ PEÑA</text>
          <text x="200" y="174" fill="#14568D" fontSize="9.5">PLAZA DE ARMAS</text>
          <text x="205" y="187" fill="#535353" fontSize="8.5">(REF. CALLERÍA)</text>
        </g>

        {/* Pin marker for Jr. Tarapacá 1025 */}
        <g transform="translate(298, 118)">
          <circle cx="0" cy="0" r="22" fill="#A81A26" fillOpacity="0.15" />
          <circle cx="0" cy="0" r="8" fill="#A81A26" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="16" y="-24" width="212" height="44" fill="#000A73" />
          <text x="26" y="-6" fill="#FFFFFF" fontFamily="Montserrat, sans-serif" fontSize="10.5" fontWeight="700">
            VELASQUEZ CORREDORES
          </text>
          <text x="26" y="10" fill="#CBD5E1" fontFamily="Open Sans, sans-serif" fontSize="9.5">
            Jr. Tarapacá 1025 · Callería, Pucallpa
          </text>
        </g>
      </svg>
    </div>
  );
};
