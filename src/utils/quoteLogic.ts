import {
  ALLIED_INSURERS,
  BRAND_INFO,
  InsurerId,
  NAV_TABS,
  TabId,
  VEHICLE_TARIFFS,
  VehicleCategoryId,
  VehicleTariff,
  VehicleUsage,
} from '../data/velasquezData';

/**
 * Formats raw Peruvian license plate input into clean uppercase alphanumeric form
 * with standard hyphen separation (e.g. "u1b234" -> "U1B-234", "8421au" -> "8421-AU").
 */
export function formatPeruvianPlate(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
  if (cleaned.length <= 3) {
    return cleaned;
  }
  // Mototaxi / motorcycle plates often start with 4 digits + 2 letters (e.g. 8421-AU)
  if (/^\d{4}[A-Z0-9]{1,2}$/.test(cleaned)) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  // Standard car / pickup / truck plates: 3 chars + 3 chars (e.g. U1B-234, ABC-123)
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
}

export function validatePeruvianPlate(plate: string): { valid: boolean; error?: string } {
  const normalized = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!normalized) {
    return { valid: false, error: 'Ingresa el número de placa de tu vehículo.' };
  }
  if (normalized.length < 5 || normalized.length > 6) {
    return {
      valid: false,
      error: 'La placa peruana debe tener 6 caracteres alfanuméricos (ej. U1B-234 o 8421-AU).',
    };
  }
  if (!/[A-Z]/.test(normalized) || !/\d/.test(normalized)) {
    return {
      valid: false,
      error: 'La placa debe combinar letras y números (ej. U1B-234).',
    };
  }
  return { valid: true };
}

export function getVehicleById(id: VehicleCategoryId): VehicleTariff {
  return VEHICLE_TARIFFS.find((v) => v.id === id) ?? VEHICLE_TARIFFS[0];
}

export function formatTariffDisplay(price: number | null): string {
  if (price === null) {
    return 'Cotizar según tonelaje y placa';
  }
  return `S/ ${price}`;
}

export interface SoatQuoteParams {
  vehicleId: VehicleCategoryId;
  plate: string;
  insurerId: InsurerId;
  usage: VehicleUsage;
  tonnage?: string;
}

export function buildSoatWhatsAppUrl(params: SoatQuoteParams): string {
  const vehicle = getVehicleById(params.vehicleId);
  const insurer = ALLIED_INSURERS.find((i) => i.id === params.insurerId) ?? ALLIED_INSURERS[0];
  const plateFormatted = params.plate.trim() ? formatPeruvianPlate(params.plate) : 'Por confirmar';
  const usageLabel = params.usage === 'particular' ? 'Particular' : 'Transporte / Comercial';
  const priceLabel = formatTariffDisplay(vehicle.price);

  const lines = [
    'Hola SOATVELASQUEZ.COM! Quiero emitir mi SOAT digital:',
    `- Vehículo: ${vehicle.name}`,
    `- Placa: ${plateFormatted}`,
    `- Uso: ${usageLabel}`,
    `- Aseguradora de preferencia: ${insurer.name}`,
    `- Tarifa referencial: ${priceLabel}`,
  ];

  if (params.vehicleId === 'camion' && params.tonnage?.trim()) {
    lines.push(`- Tonelaje estimado: ${params.tonnage.trim()}`);
  }

  const encoded = encodeURIComponent(lines.join('\n'));
  return `${BRAND_INFO.whatsappBaseUrl}?text=${encoded}`;
}

export function buildGeneralWhatsAppUrl(message: string): string {
  return `${BRAND_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (data.fullName.trim().length < 3) {
    errors.fullName = 'Ingresa tu nombre completo.';
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 9) {
    errors.phone = 'Ingresa un teléfono o WhatsApp válido (mínimo 9 dígitos).';
  }
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }
  if (data.message.trim().length < 8) {
    errors.message = 'Cuéntanos brevemente tu consulta para asesorarte mejor.';
  }
  return errors;
}

export interface ReclamacionFormData {
  fullName: string;
  documentNumber: string;
  phone: string;
  email: string;
  claimType: 'reclamo' | 'queja';
  detail: string;
}

export function validateReclamacionForm(data: ReclamacionFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (data.fullName.trim().length < 3) {
    errors.fullName = 'Ingresa tus nombres y apellidos completos.';
  }
  const docClean = data.documentNumber.replace(/\D/g, '');
  if (docClean.length < 8 || docClean.length > 11) {
    errors.documentNumber = 'Ingresa un DNI (8 dígitos), CE o RUC (11 dígitos) válido.';
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 9) {
    errors.phone = 'Ingresa un teléfono de contacto válido.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido para enviarte la respuesta.';
  }
  if (data.detail.trim().length < 15) {
    errors.detail = 'Describe brevemente el detalle de tu reclamo o queja (mínimo 15 caracteres).';
  }
  return errors;
}

export function generateClaimTicketCode(seedTimestamp: number = Date.now()): string {
  const suffix = String(seedTimestamp % 10000).padStart(4, '0');
  return `VR-2026-${suffix}`;
}

export function parseTabFromHash(hash: string): TabId {
  const normalized = hash.trim().toLowerCase().replace(/^#/, '');
  const matched = NAV_TABS.find((t) => t.id === normalized);
  return matched ? matched.id : 'inicio';
}
