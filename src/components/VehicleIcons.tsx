import React from 'react';
import { VehicleCategoryId } from '../data/velasquezData';

export interface SvgIconProps {
  className?: string;
}

interface VehicleIconProps extends SvgIconProps {
  type: VehicleCategoryId;
}

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
};

/**
 * Minimalist 1.5px fine-line SVG icon for Auto / Sedán / Hatchback.
 */
export const AutoIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-auto"
  >
    {/* Body silhouette */}
    <path
      {...STROKE_PROPS}
      d="M9.5 24 H6 C5 24 4.5 23.2 4.5 22 V19.2 C4.5 17.5 6 16.2 8.2 15.8 L16.5 14.5 L23 9 C24.2 8 25.8 7.5 27.5 7.5 H40.5 C42.2 7.5 43.8 8.1 45 9.2 L50.5 14.5 L56.8 15.8 C58.6 16.2 59.5 17.5 59.5 19.2 V22 C59.5 23.2 59 24 58 24 H54.5"
    />
    {/* Lower chassis line */}
    <line {...STROKE_PROPS} x1="20.5" y1="24" x2="43.5" y2="24" />
    {/* Cabin greenhouse & B-pillar */}
    <path {...STROKE_PROPS} d="M21 14.5 H46.5 L41.8 10.2 H26.2 Z" />
    <line {...STROKE_PROPS} x1="33.5" y1="10.2" x2="33.5" y2="14.5" />
    {/* Minimalist headlight accent */}
    <line {...STROKE_PROPS} x1="55.5" y1="19" x2="58.5" y2="19" />
    {/* Wheels & hubs */}
    <circle {...STROKE_PROPS} cx="15" cy="24.5" r="4.6" />
    <circle {...STROKE_PROPS} cx="49" cy="24.5" r="4.6" />
    <circle {...STROKE_PROPS} cx="15" cy="24.5" r="1.4" />
    <circle {...STROKE_PROPS} cx="49" cy="24.5" r="1.4" />
  </svg>
);

/**
 * Minimalist 1.5px fine-line SVG icon for Mototaxi (3-wheel canopy vehicle typical of Pucallpa).
 */
export const MototaxiIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-mototaxi"
  >
    {/* Canopy roof and passenger compartment */}
    <path
      {...STROKE_PROPS}
      d="M13 24 H10 V13.5 C10 9.5 13 7 17.5 7 H36.5 C41.5 7 44.5 10 46 15 L48 24 H43.5"
    />
    {/* Front fairing, windshield & fork */}
    <path {...STROKE_PROPS} d="M46 15 H53.5 L55.5 24 H48" />
    <path {...STROKE_PROPS} d="M43.5 10.5 H49 L52.5 15" />
    {/* Interior passenger rail & partition */}
    <line {...STROKE_PROPS} x1="14" y1="15" x2="36.5" y2="15" />
    <line {...STROKE_PROPS} x1="25.5" y1="7" x2="25.5" y2="24" />
    <line {...STROKE_PROPS} x1="22.5" y1="24" x2="43.5" y2="24" />
    {/* Wheels */}
    <circle {...STROKE_PROPS} cx="17.5" cy="25" r="4.2" />
    <circle {...STROKE_PROPS} cx="49.5" cy="25" r="4.2" />
    <circle {...STROKE_PROPS} cx="17.5" cy="25" r="1.3" />
    <circle {...STROKE_PROPS} cx="49.5" cy="25" r="1.3" />
  </svg>
);

/**
 * Minimalist 1.5px fine-line SVG icon for Camioneta Pick Up / 4x4.
 */
export const CamionetaIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-pickup"
  >
    {/* Open cargo bed, double cab & sculpted hood */}
    <path
      {...STROKE_PROPS}
      d="M9 24 H4.5 V15 H23 V8 H38.5 C40 8 41.2 8.6 42.2 9.6 L46.5 14.5 L56.5 15.8 C58.6 16.1 59.5 17.5 59.5 19.3 V24 H54.5"
    />
    {/* Lower chassis */}
    <line {...STROKE_PROPS} x1="20.5" y1="24" x2="43.5" y2="24" />
    {/* Double cab window & vertical pillar */}
    <path {...STROKE_PROPS} d="M26 14.5 H42.5 L38.5 10.5 H26 Z" />
    <line {...STROKE_PROPS} x1="34" y1="10.5" x2="34" y2="24" />
    <line {...STROKE_PROPS} x1="23" y1="15" x2="23" y2="24" />
    {/* Cargo bed rail accent */}
    <line {...STROKE_PROPS} x1="7" y1="18" x2="20" y2="18" />
    {/* Rugged wheels */}
    <circle {...STROKE_PROPS} cx="15" cy="24.5" r="4.8" />
    <circle {...STROKE_PROPS} cx="49" cy="24.5" r="4.8" />
    <circle {...STROKE_PROPS} cx="15" cy="24.5" r="1.5" />
    <circle {...STROKE_PROPS} cx="49" cy="24.5" r="1.5" />
  </svg>
);

/**
 * Minimalist 1.5px fine-line SVG icon for Furgoneta / Panel Van.
 */
export const FurgonetaIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-furgoneta"
  >
    {/* Commercial van silhouette */}
    <path
      {...STROKE_PROPS}
      d="M10 24 H5 V10 C5 8.2 6.4 7 8.2 7 H43 C45 7 46.8 8.2 48.4 10.4 L53.5 15.8 L57.5 17.2 C58.9 17.7 59.5 18.8 59.5 20.2 V24 H54"
    />
    {/* Lower chassis */}
    <line {...STROKE_PROPS} x1="20.5" y1="24" x2="43.5" y2="24" />
    {/* Front windshield cabin window */}
    <path {...STROKE_PROPS} d="M39.5 10.5 H45.2 L49.6 15.5 H39.5 Z" />
    {/* Side cargo door panel */}
    <rect {...STROKE_PROPS} x="10" y="11" width="24.5" height="8" rx="0.5" />
    <line {...STROKE_PROPS} x1="22.5" y1="11" x2="22.5" y2="19" />
    {/* Wheels */}
    <circle {...STROKE_PROPS} cx="15.2" cy="24.5" r="4.5" />
    <circle {...STROKE_PROPS} cx="48.8" cy="24.5" r="4.5" />
    <circle {...STROKE_PROPS} cx="15.2" cy="24.5" r="1.4" />
    <circle {...STROKE_PROPS} cx="48.8" cy="24.5" r="1.4" />
  </svg>
);

/**
 * Minimalist 1.5px fine-line SVG icon for Moto Lineal / Motocicleta.
 */
export const MotoIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-moto"
  >
    {/* Front & rear tires */}
    <circle {...STROKE_PROPS} cx="15" cy="24" r="5.4" />
    <circle {...STROKE_PROPS} cx="49" cy="24" r="5.4" />
    <circle {...STROKE_PROPS} cx="15" cy="24" r="1.6" />
    <circle {...STROKE_PROPS} cx="49" cy="24" r="1.6" />
    {/* Frame, swingarm & front fork */}
    <path {...STROKE_PROPS} d="M15 24 L25 18 H37.5 L44.5 12 L49 24" />
    {/* Seat & fuel tank */}
    <path {...STROKE_PROPS} d="M19.5 15 H31 L36.5 12 H43.5" />
    {/* Handlebar & headlamp */}
    <path {...STROKE_PROPS} d="M40.5 9 H47 L49 11.2" />
    {/* Engine cradle */}
    <path {...STROKE_PROPS} d="M27.5 18 L31 24 H39 L41.5 17.5" />
  </svg>
);

/**
 * Minimalist 1.5px fine-line SVG icon for Camión / Transporte de Carga.
 */
export const CamionIcon: React.FC<SvgIconProps> = ({ className = 'w-14 h-8' }) => (
  <svg
    viewBox="0 0 64 36"
    className={className}
    aria-hidden="true"
    data-icon="vehicle-camion"
  >
    {/* Cargo container */}
    <rect {...STROKE_PROPS} x="4.5" y="6.5" width="35" height="17.5" />
    <line {...STROKE_PROPS} x1="16" y1="6.5" x2="16" y2="24" />
    <line {...STROKE_PROPS} x1="28" y1="6.5" x2="28" y2="24" />
    {/* Tractor cab */}
    <path {...STROKE_PROPS} d="M39.5 24 H43.5 M53.5 24 H59.5 V17.2 L54.8 11 H42.5 V24" />
    {/* Cab window */}
    <path {...STROKE_PROPS} d="M45.5 13.8 H53.2 L56.2 17.5 H45.5 Z" />
    {/* Chassis bar */}
    <line {...STROKE_PROPS} x1="4.5" y1="24" x2="10" y2="24" />
    <line {...STROKE_PROPS} x1="28" y1="24" x2="43.5" y2="24" />
    {/* Dual rear + front axle */}
    <circle {...STROKE_PROPS} cx="14.5" cy="24.6" r="4.2" />
    <circle {...STROKE_PROPS} cx="23.8" cy="24.6" r="4.2" />
    <circle {...STROKE_PROPS} cx="48.5" cy="24.6" r="4.2" />
    <circle {...STROKE_PROPS} cx="14.5" cy="24.6" r="1.3" />
    <circle {...STROKE_PROPS} cx="23.8" cy="24.6" r="1.3" />
    <circle {...STROKE_PROPS} cx="48.5" cy="24.6" r="1.3" />
  </svg>
);

/**
 * Unified dispatcher rendering the minimalist 1.5px fine-line SVG icon for each SOAT vehicle class.
 */
export const VehicleIcon: React.FC<VehicleIconProps> = ({ type, className = 'w-12 h-8' }) => {
  switch (type) {
    case 'auto':
      return <AutoIcon className={className} />;
    case 'mototaxi':
      return <MototaxiIcon className={className} />;
    case 'pickup':
      return <CamionetaIcon className={className} />;
    case 'furgoneta':
      return <FurgonetaIcon className={className} />;
    case 'moto':
      return <MotoIcon className={className} />;
    case 'camion':
      return <CamionIcon className={className} />;
  }
};
