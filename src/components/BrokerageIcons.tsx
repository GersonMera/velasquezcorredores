import React from 'react';

export interface BrokerageIconProps {
  className?: string;
}

export type BrokerageServiceIconId =
  | 'emision-digital'
  | 'verificacion-apeseg'
  | 'tarjeta-circulacion'
  | 'afiliacion-vehicular'
  | 'asesoria-corredor'
  | 'pago-seguro'
  | 'atencion-247'
  | 'duplicado-tramite';

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
};

/**
 * Emisión Digital SOAT: Smartphone / certificado electrónico con validación inmediata.
 */
export const EmisionDigitalIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-emision-digital"
  >
    <rect {...STROKE_PROPS} x="7.5" y="3.5" width="17" height="25" rx="2" />
    <line {...STROKE_PROPS} x1="13" y1="6.5" x2="19" y2="6.5" />
    <line {...STROKE_PROPS} x1="14.5" y1="25.5" x2="17.5" y2="25.5" />
    <path {...STROKE_PROPS} d="M12.2 15.8 L14.8 18.4 L20.2 12.6" />
    <line {...STROKE_PROPS} x1="11.5" y1="21.5" x2="20.5" y2="21.5" />
  </svg>
);

/**
 * Verificación Oficial APESEG: Escudo arquitectónico con marca de vigencia confirmada.
 */
export const VerificacionApesegIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-verificacion-apeseg"
  >
    <path
      {...STROKE_PROPS}
      d="M16 3.5 L26.5 7.2 V15.2 C26.5 21.8 22.1 26.6 16 28.8 C9.9 26.6 5.5 21.8 5.5 15.2 V7.2 Z"
    />
    <path {...STROKE_PROPS} d="M11.8 16.2 L14.8 19.2 L20.8 12.8" />
  </svg>
);

/**
 * Tarjeta de Circulación Municipal: Credencial oficial con identificación vehicular.
 */
export const TarjetaCirculacionIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-tarjeta-circulacion"
  >
    <rect {...STROKE_PROPS} x="3.5" y="6.5" width="25" height="19" rx="1.5" />
    <line {...STROKE_PROPS} x1="3.5" y1="11.5" x2="28.5" y2="11.5" />
    <rect {...STROKE_PROPS} x="7" y="15" width="6.5" height="6.5" rx="0.5" />
    <line {...STROKE_PROPS} x1="16.5" y1="15.8" x2="24.5" y2="15.8" />
    <line {...STROKE_PROPS} x1="16.5" y1="19.8" x2="22" y2="19.8" />
  </svg>
);

/**
 * Afiliación y Renovación Vehicular: Anillo continuo de vigencia y registro activo.
 */
export const AfiliacionVehicularIcon: React.FC<BrokerageIconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-afiliacion-vehicular"
  >
    <path {...STROKE_PROPS} d="M25.8 12.5 A10.5 10.5 0 0 0 7.2 10.5" />
    <polyline {...STROKE_PROPS} points="26.5,7.8 25.8,12.5 21.1,11.8" />
    <path {...STROKE_PROPS} d="M6.2 19.5 A10.5 10.5 0 0 0 24.8 21.5" />
    <polyline {...STROKE_PROPS} points="5.5,24.2 6.2,19.5 10.9,20.2" />
    <path {...STROKE_PROPS} d="M12.8 16.2 L15 18.4 L19.6 13.8" />
  </svg>
);

/**
 * Asesoría de Corredores de Seguros: Expediente de pólizas con sello de respaldo independiente.
 */
export const AsesoriaCorredorIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-asesoria-corredor"
  >
    <path {...STROKE_PROPS} d="M7.5 4.5 H19.5 L24.5 9.5 V27.5 H7.5 Z" />
    <polyline {...STROKE_PROPS} points="19.5,4.5 19.5,9.5 24.5,9.5" />
    <line {...STROKE_PROPS} x1="11.5" y1="14" x2="20.5" y2="14" />
    <line {...STROKE_PROPS} x1="11.5" y1="18" x2="18.5" y2="18" />
    <circle {...STROKE_PROPS} cx="13.5" cy="23" r="1.8" />
    <line {...STROKE_PROPS} x1="17.5" y1="23" x2="20.5" y2="23" />
  </svg>
);

/**
 * Validación de Placa y Pago Seguro: Placa peruana verificada con precisión.
 */
export const PagoSeguroIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-pago-seguro"
  >
    <rect {...STROKE_PROPS} x="3.5" y="8" width="25" height="16" rx="1.5" />
    <line {...STROKE_PROPS} x1="7" y1="11.8" x2="10.5" y2="11.8" />
    <line {...STROKE_PROPS} x1="14" y1="11.8" x2="18" y2="11.8" />
    <line {...STROKE_PROPS} x1="21.5" y1="11.8" x2="25" y2="11.8" />
    <line {...STROKE_PROPS} x1="7" y1="17.5" x2="16.5" y2="17.5" />
    <path {...STROKE_PROPS} d="M19.5 17.5 L21.4 19.4 L25 15.6" />
  </svg>
);

/**
 * Atención Directa 24/7: Reloj continuo con confirmación de respuesta rápida.
 */
export const Atencion247Icon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-atencion-247"
  >
    <circle {...STROKE_PROPS} cx="16" cy="16" r="11.5" />
    <polyline {...STROKE_PROPS} points="16,9.5 16,16 20.8,18.6" />
    <line {...STROKE_PROPS} x1="16" y1="4.5" x2="16" y2="6.2" />
    <line {...STROKE_PROPS} x1="27.5" y1="16" x2="25.8" y2="16" />
    <line {...STROKE_PROPS} x1="16" y1="27.5" x2="16" y2="25.8" />
    <line {...STROKE_PROPS} x1="4.5" y1="16" x2="6.2" y2="16" />
  </svg>
);

/**
 * Duplicado / Reemisión Documental: Doble lámina de reposición oficial.
 */
export const DuplicadoTramiteIcon: React.FC<BrokerageIconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    data-icon="service-duplicado-tramite"
  >
    <rect {...STROKE_PROPS} x="10.5" y="8.5" width="15.5" height="19" rx="1.5" />
    <path {...STROKE_PROPS} d="M10.5 23.5 H7.5 C6.7 23.5 6 22.8 6 22 V6 C6 5.2 6.7 4.5 7.5 4.5 H20 C20.8 4.5 21.5 5.2 21.5 6 V8.5" />
    <line {...STROKE_PROPS} x1="14" y1="14" x2="22.5" y2="14" />
    <line {...STROKE_PROPS} x1="14" y1="18" x2="22.5" y2="18" />
    <line {...STROKE_PROPS} x1="14" y1="22" x2="19.5" y2="22" />
  </svg>
);

interface BrokerageServiceIconProps extends BrokerageIconProps {
  type: BrokerageServiceIconId;
}

/**
 * Unified dispatcher for minimalist 1.5px brokerage service SVG icons.
 */
export const BrokerageServiceIcon: React.FC<BrokerageServiceIconProps> = ({
  type,
  className = 'w-8 h-8',
}) => {
  switch (type) {
    case 'emision-digital':
      return <EmisionDigitalIcon className={className} />;
    case 'verificacion-apeseg':
      return <VerificacionApesegIcon className={className} />;
    case 'tarjeta-circulacion':
      return <TarjetaCirculacionIcon className={className} />;
    case 'afiliacion-vehicular':
      return <AfiliacionVehicularIcon className={className} />;
    case 'asesoria-corredor':
      return <AsesoriaCorredorIcon className={className} />;
    case 'pago-seguro':
      return <PagoSeguroIcon className={className} />;
    case 'atencion-247':
      return <Atencion247Icon className={className} />;
    case 'duplicado-tramite':
      return <DuplicadoTramiteIcon className={className} />;
  }
};
