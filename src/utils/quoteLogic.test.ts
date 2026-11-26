import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGeneralWhatsAppUrl,
  buildSoatWhatsAppUrl,
  formatPeruvianPlate,
  formatTariffDisplay,
  generateClaimTicketCode,
  getVehicleById,
  parseTabFromHash,
  validateContactForm,
  validatePeruvianPlate,
  validateReclamacionForm,
} from './quoteLogic';

test('formatPeruvianPlate normalizes standard auto and mototaxi plates', () => {
  assert.equal(formatPeruvianPlate('u1b234'), 'U1B-234');
  assert.equal(formatPeruvianPlate('abc-123'), 'ABC-123');
  assert.equal(formatPeruvianPlate('8421au'), '8421-AU');
  assert.equal(formatPeruvianPlate('  p3r 819!! '), 'P3R-819');
  assert.equal(formatPeruvianPlate('u1b'), 'U1B');
});

test('validatePeruvianPlate rejects empty/invalid plates and accepts valid plates', () => {
  assert.equal(validatePeruvianPlate('').valid, false);
  assert.equal(validatePeruvianPlate('ABC').valid, false);
  assert.equal(validatePeruvianPlate('ABCDEF').valid, false);
  assert.equal(validatePeruvianPlate('123456').valid, false);
  assert.equal(validatePeruvianPlate('U1B-234').valid, true);
  assert.equal(validatePeruvianPlate('8421-AU').valid, true);
});

test('tariff lookups match exact published SOATVELASQUEZ prices and avoid S/ 0 for trucks', () => {
  assert.equal(formatTariffDisplay(getVehicleById('auto').price), 'S/ 70');
  assert.equal(formatTariffDisplay(getVehicleById('mototaxi').price), 'S/ 80');
  assert.equal(formatTariffDisplay(getVehicleById('pickup').price), 'S/ 170');
  assert.equal(formatTariffDisplay(getVehicleById('furgoneta').price), 'S/ 210');
  assert.equal(formatTariffDisplay(getVehicleById('moto').price), 'S/ 240');
  assert.equal(formatTariffDisplay(getVehicleById('camion').price), 'Cotizar según tonelaje y placa');
});

test('buildSoatWhatsAppUrl generates properly encoded WhatsApp link to +51 958 506 048', () => {
  const url = buildSoatWhatsAppUrl({
    vehicleId: 'mototaxi',
    plate: '8421au',
    insurerId: 'la-positiva',
    usage: 'transporte',
  });
  assert.ok(url.startsWith('https://wa.me/51958506048?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /SOAT Mototaxi/);
  assert.match(decoded, /8421-AU/);
  assert.match(decoded, /La Positiva/);
  assert.match(decoded, /S\/ 80/);
});

test('buildGeneralWhatsAppUrl encodes custom message', () => {
  const url = buildGeneralWhatsAppUrl('Hola SOATVELASQUEZ.COM!');
  assert.equal(url, 'https://wa.me/51958506048?text=Hola%20SOATVELASQUEZ.COM!');
});

test('validateContactForm enforces required fields and email syntax', () => {
  const emptyErrors = validateContactForm({
    fullName: '',
    phone: '',
    email: 'invalid-email',
    subject: 'Consulta',
    message: 'Hola',
  });
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.message);

  const validErrors = validateContactForm({
    fullName: 'Carlos Mendoza',
    phone: '958506048',
    email: 'carlos@ejemplo.pe',
    subject: 'Seguro Vehicular',
    message: 'Deseo cotizar un seguro todo riesgo para mi camioneta.',
  });
  assert.deepEqual(validErrors, {});
});

test('validateReclamacionForm validates DNI/RUC, contact info, and detail length', () => {
  const errors = validateReclamacionForm({
    fullName: 'A',
    documentNumber: '123',
    phone: '123',
    email: 'bad',
    claimType: 'reclamo',
    detail: 'corto',
  });
  assert.ok(errors.fullName);
  assert.ok(errors.documentNumber);
  assert.ok(errors.phone);
  assert.ok(errors.email);
  assert.ok(errors.detail);

  const valid = validateReclamacionForm({
    fullName: 'María López Paredes',
    documentNumber: '45678912',
    phone: '950672922',
    email: 'maria@ejemplo.pe',
    claimType: 'queja',
    detail: 'Solicito revisión de atención telefónica realizada el día lunes.',
  });
  assert.deepEqual(valid, {});
});

test('generateClaimTicketCode and parseTabFromHash return deterministic results', () => {
  assert.equal(generateClaimTicketCode(123456), 'VR-2026-3456');
  assert.equal(parseTabFromHash('#cotizar-soat'), 'cotizar-soat');
  assert.equal(parseTabFromHash('#verifica-faq'), 'verifica-faq');
  assert.equal(parseTabFromHash('#unknown'), 'inicio');
  assert.equal(parseTabFromHash(''), 'inicio');
});
