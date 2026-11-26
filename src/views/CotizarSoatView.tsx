import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import {
  ALLIED_INSURERS,
  BRAND_INFO,
  CIRCULATION_SERVICES,
  MEDIA_ASSETS,
  TARIFF_DISCLAIMER,
  VEHICLE_TARIFFS,
  VehicleCategoryId,
} from '../data/velasquezData';
import {
  buildGeneralWhatsAppUrl,
  buildSoatWhatsAppUrl,
  formatPeruvianPlate,
  formatTariffDisplay,
  getVehicleById,
  validatePeruvianPlate,
} from '../utils/quoteLogic';
import { ResilientImage } from '../components/ResilientImage';
import { VehicleIcon } from '../components/VehicleIcons';
import {
  Atencion247Icon,
  BrokerageServiceIcon,
  BrokerageServiceIconId,
  EmisionDigitalIcon,
  PagoSeguroIcon,
  TarjetaCirculacionIcon,
  VerificacionApesegIcon,
} from '../components/BrokerageIcons';
import {
  collapseVariants,
  microSwapVariants,
  stepTransitionVariants,
} from '../components/MotionPrimitives';
import { SharedQuoteState } from './InicioView';

const CIRCULATION_SERVICE_ICONS: Record<string, BrokerageServiceIconId> = {
  Nuevo: 'tarjeta-circulacion',
  Renovación: 'afiliacion-vehicular',
  Duplicado: 'duplicado-tramite',
};

interface CotizarSoatViewProps {
  quote: SharedQuoteState;
  onUpdateQuote: (patch: Partial<SharedQuoteState>) => void;
}

const STEPS = [
  { id: 1, label: 'Vehículo' },
  { id: 2, label: 'Placa y uso' },
  { id: 3, label: 'Aseguradora' },
  { id: 4, label: 'Emitir SOAT' },
] as const;

export const CotizarSoatView: React.FC<CotizarSoatViewProps> = ({ quote, onUpdateQuote }) => {
  const [step, setStep] = useState<number>(1);
  const [stepDirection, setStepDirection] = useState<number>(1);
  const [plateError, setPlateError] = useState<string | null>(null);
  const [circulationType, setCirculationType] = useState<string>(CIRCULATION_SERVICES[0].code);

  const selectedVehicle = getVehicleById(quote.vehicleId);
  const selectedInsurer =
    ALLIED_INSURERS.find((i) => i.id === quote.insurerId) ?? ALLIED_INSURERS[0];

  const goToStep = (nextStep: number) => {
    setStepDirection(nextStep >= step ? 1 : -1);
    setStep(nextStep);
  };

  const handleSelectVehicle = (id: VehicleCategoryId) => {
    const vehicle = getVehicleById(id);
    onUpdateQuote({ vehicleId: id, usage: vehicle.defaultUsage });
  };

  const handleNextFromStep2 = () => {
    const check = validatePeruvianPlate(quote.plate);
    if (!check.valid) {
      setPlateError(check.error ?? 'Placa inválida.');
      return;
    }
    setPlateError(null);
    goToStep(3);
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep === step) return;
    if (targetStep < step) {
      goToStep(targetStep);
      return;
    }
    if (step === 2 && targetStep > 2) {
      const check = validatePeruvianPlate(quote.plate);
      if (!check.valid) {
        setPlateError(check.error ?? 'Placa inválida.');
        return;
      }
      setPlateError(null);
    }
    goToStep(targetStep);
  };

  const soatWhatsappUrl = buildSoatWhatsAppUrl(quote);
  const circulationWhatsappUrl = buildGeneralWhatsAppUrl(
    `Hola SOATVELASQUEZ.COM! Deseo consultar requisitos y tarifas para Tarjeta de Circulación (${circulationType}) y afiliación vehicular en Pucallpa.`
  );

  return (
    <div className="bg-white">
      {/* Page Header Band with Highway & Vehicle Photography */}
      <section className="relative bg-[#000A73] text-white overflow-hidden border-b border-white/15">
        <div className="absolute inset-0">
          <ResilientImage
            src={MEDIA_ASSETS.heroHighway}
            alt="Tránsito vehicular y emisión de SOAT digital — Velasquez Corredores de Seguros"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#000A73]/95 via-[#000A73]/82 to-[#000A73]/48"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            Emisión Digital Directa · Sin Carrito de Compras
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Cotizador guiado de SOAT electrónico
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
            Completa 4 pasos rápidos para validar tu placa con La Positiva, Pacífico o Mapfre y
            emitir tu certificado digital al instante por WhatsApp 24/7.
          </p>
        </div>
      </section>

      {/* 4-STEP CONFIGURATOR */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Progress Bar (1px Swiss Grid) */}
          <div
            role="tablist"
            aria-label="Pasos del cotizador SOAT"
            className="grid grid-cols-2 md:grid-cols-4 border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 mb-10"
          >
            {STEPS.map((s) => {
              const isCurrent = step === s.id;
              const isCompleted = step > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleStepClick(s.id)}
                  className={`px-4 py-4 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#14568D] text-white'
                      : isCompleted
                        ? 'bg-[#F4F6FA] text-[#000A73]'
                        : 'bg-white text-[#535353] hover:bg-[#F4F6FA]'
                  }`}
                >
                  <div>
                    <span className="block text-[11px] font-mono tabular-nums opacity-80">
                      PASO 0{s.id}
                    </span>
                    <span className="text-sm font-semibold">{s.label}</span>
                  </div>
                  {isCompleted && (
                    <Check className="w-4 h-4 text-[#14568D] shrink-0" strokeWidth={2} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Active Step Panel */}
            <div className="lg:col-span-8 border border-slate-200 bg-white p-6 sm:p-8 overflow-hidden">
              <AnimatePresence mode="wait" custom={stepDirection} initial={false}>
                {/* STEP 1: VEHICLE CLASS */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    custom={stepDirection}
                    variants={stepTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                      Paso 01
                    </p>
                    <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#101010]">
                      Selecciona la clase de tu vehículo
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-slate-200">
                    {VEHICLE_TARIFFS.map((vehicle) => {
                      const active = quote.vehicleId === vehicle.id;
                      return (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => handleSelectVehicle(vehicle.id)}
                          aria-pressed={active}
                          className={`p-5 text-left border-r border-b border-slate-200 transition-colors cursor-pointer space-y-3 ${
                            active
                              ? 'bg-[#F4F6FA] ring-1 ring-inset ring-[#14568D]'
                              : 'bg-white hover:bg-[#F4F6FA]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <VehicleIcon type={vehicle.id} className="w-12 h-8 text-[#14568D]" />
                            <span
                              className={`text-sm font-bold tabular-nums ${
                                vehicle.price !== null ? 'text-[#000A73]' : 'text-[#14568D] text-xs'
                              }`}
                            >
                              {formatTariffDisplay(vehicle.price)}
                            </span>
                          </div>
                          <div>
                            <p className="text-base font-bold text-[#101010]">{vehicle.name}</p>
                            <p className="mt-1 text-xs text-[#535353] leading-relaxed">
                              {vehicle.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
                    >
                      <span>Continuar a placa y uso</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                    </button>
                  </div>
                  </motion.div>
                )}

                {/* STEP 2: PLATE & USAGE */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    custom={stepDirection}
                    variants={stepTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                        Paso 02
                      </p>
                      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#101010]">
                        Ingresa tu placa y tipo de uso
                      </h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[#14568D] shrink-0">
                      <VehicleIcon type={quote.vehicleId} className="w-12 h-7" />
                      <PagoSeguroIcon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="step2-plate-input"
                        className="block text-xs font-semibold text-[#101010]"
                      >
                        Número de placa peruana
                      </label>
                      <input
                        id="step2-plate-input"
                        type="text"
                        value={quote.plate}
                        onChange={(e) => {
                          onUpdateQuote({ plate: formatPeruvianPlate(e.target.value) });
                          if (plateError) setPlateError(null);
                        }}
                        placeholder={`Ej. ${selectedVehicle.examplePlate}`}
                        maxLength={7}
                        className="w-full px-4 py-3 text-lg font-mono font-semibold uppercase tracking-widest border border-slate-300 bg-[#F4F6FA] focus:bg-white focus:border-[#14568D] focus:outline-none tabular-nums"
                      />
                      {plateError ? (
                        <p role="alert" className="text-xs font-medium text-[#A81A26]">
                          {plateError}
                        </p>
                      ) : (
                        <p className="text-xs text-[#535353]">
                          Se formatea automáticamente en mayúsculas (ej. {selectedVehicle.examplePlate}).
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <span className="block text-xs font-semibold text-[#101010]">
                        Uso del vehículo
                      </span>
                      <div className="grid grid-cols-2 border border-slate-300 divide-x divide-slate-300">
                        {(['particular', 'transporte'] as const).map((usageType) => {
                          const selected = quote.usage === usageType;
                          return (
                            <button
                              key={usageType}
                              type="button"
                              onClick={() => onUpdateQuote({ usage: usageType })}
                              className={`py-3 px-3 text-sm font-semibold transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-[#14568D] text-white'
                                  : 'bg-white text-[#535353] hover:bg-[#F4F6FA]'
                              }`}
                            >
                              {usageType === 'particular' ? 'Particular' : 'Transporte'}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-[#535353]">
                        Declara el uso real consignado en tu tarjeta vehicular.
                      </p>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {quote.vehicleId === 'camion' && (
                      <motion.div
                        key="tonnage-field"
                        variants={collapseVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-2">
                          <label
                            htmlFor="step2-tonnage-input"
                            className="block text-xs font-semibold text-[#101010]"
                          >
                            Tonelaje o capacidad de carga (referencial)
                          </label>
                          <input
                            id="step2-tonnage-input"
                            type="text"
                            value={quote.tonnage}
                            onChange={(e) => onUpdateQuote({ tonnage: e.target.value })}
                            placeholder="Ej. 5 toneladas / Volquete / Carga pesada"
                            className="w-full px-4 py-2.5 text-sm border border-slate-300 bg-[#F4F6FA] focus:bg-white focus:border-[#14568D] focus:outline-none"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#535353] border border-slate-300 hover:bg-[#F4F6FA] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.7} />
                      <span>Volver</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromStep2}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
                    >
                      <span>Comparar aseguradoras</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                    </button>
                  </div>
                  </motion.div>
                )}

                {/* STEP 3: INSURER COMPARISON */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    custom={stepDirection}
                    variants={stepTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                      Paso 03
                    </p>
                    <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#101010]">
                      Elige tu aseguradora aliada
                    </h2>
                    <p className="mt-1 text-sm text-[#535353]">
                      Las tres compañías emiten SOAT electrónico con plena validez nacional y
                      registro directo en APESEG.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-200 border border-slate-200">
                    {ALLIED_INSURERS.map((insurer) => {
                      const active = quote.insurerId === insurer.id;
                      return (
                        <button
                          key={insurer.id}
                          type="button"
                          onClick={() => onUpdateQuote({ insurerId: insurer.id })}
                          aria-pressed={active}
                          className={`w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#F4F6FA] ring-1 ring-inset ring-[#14568D]'
                              : 'bg-white hover:bg-[#F4F6FA]'
                          }`}
                        >
                          <div className="flex items-center gap-4 sm:gap-5">
                            <div className="w-24 sm:w-28 h-16 sm:h-18 border border-slate-200 overflow-hidden shrink-0">
                              <ResilientImage
                                src={insurer.logoSrc}
                                alt={`Logo ${insurer.name}`}
                                className="w-full h-full object-cover object-center"
                                fallbackClassName="bg-[#F4F6FA] text-[#000A73]"
                                fallbackLabel={insurer.name}
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-[#000A73]">
                                  {insurer.name}
                                </span>
                                <span className="text-xs text-[#535353]">{insurer.tagline}</span>
                              </div>
                              <p className="text-sm text-[#535353]">{insurer.emissionChannel}</p>
                            </div>
                          </div>

                          <div className="sm:text-right shrink-0">
                            <p className="text-base font-bold text-[#000A73] tabular-nums">
                              {formatTariffDisplay(selectedVehicle.price)}
                            </p>
                            <span
                              className={`text-xs font-semibold ${
                                active ? 'text-[#14568D]' : 'text-[#535353]'
                              }`}
                            >
                              {active ? 'Seleccionada' : 'Seleccionar'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#535353] border border-slate-300 hover:bg-[#F4F6FA] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.7} />
                      <span>Volver</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(4)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
                    >
                      <span>Ver resumen y emitir</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                    </button>
                  </div>
                  </motion.div>
                )}

                {/* STEP 4: SUMMARY & DIRECT CONVERSION */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    custom={stepDirection}
                    variants={stepTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                        Paso 04 · Listo para Emisión 24/7
                      </p>
                      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#101010]">
                        Resumen de tu solicitud SOAT digital
                      </h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[#14568D] shrink-0">
                      <VehicleIcon type={quote.vehicleId} className="w-12 h-7" />
                      <EmisionDigitalIcon className="w-7 h-7" />
                    </div>
                  </div>

                  <dl className="divide-y divide-slate-200 border border-slate-200 text-sm">
                    <div className="px-5 py-3.5 flex items-center justify-between bg-[#F4F6FA]">
                      <dt className="text-[#535353]">Clase de vehículo</dt>
                      <dd className="font-semibold text-[#101010]">{selectedVehicle.name}</dd>
                    </div>
                    <div className="px-5 py-3.5 flex items-center justify-between">
                      <dt className="text-[#535353]">Placa vehicular</dt>
                      <dd className="font-mono font-bold text-[#000A73] tracking-wider tabular-nums">
                        {quote.plate || 'Por confirmar'}
                      </dd>
                    </div>
                    <div className="px-5 py-3.5 flex items-center justify-between bg-[#F4F6FA]">
                      <dt className="text-[#535353]">Uso declarado</dt>
                      <dd className="font-semibold text-[#101010]">
                        {quote.usage === 'particular' ? 'Particular' : 'Transporte / Comercial'}
                      </dd>
                    </div>
                    <div className="px-5 py-3.5 flex items-center justify-between">
                      <dt className="text-[#535353]">Aseguradora seleccionada</dt>
                      <dd className="font-semibold text-[#101010]">{selectedInsurer.name}</dd>
                    </div>
                    {quote.vehicleId === 'camion' && quote.tonnage && (
                      <div className="px-5 py-3.5 flex items-center justify-between bg-[#F4F6FA]">
                        <dt className="text-[#535353]">Tonelaje indicado</dt>
                        <dd className="font-semibold text-[#101010]">{quote.tonnage}</dd>
                      </div>
                    )}
                    <div className="px-5 py-4 flex items-center justify-between bg-[#000A73] text-white">
                      <dt className="text-slate-200 font-medium">Tarifa referencial</dt>
                      <dd className="text-xl font-bold tabular-nums">
                        {formatTariffDisplay(selectedVehicle.price)}
                      </dd>
                    </div>
                  </dl>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <a
                      href={soatWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                      <span>Emitir por WhatsApp ({BRAND_INFO.whatsappDisplay})</span>
                    </a>
                    <a
                      href={BRAND_INFO.phoneCentralHref}
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-[#14568D] border border-[#14568D] hover:bg-[#F4F6FA] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4" strokeWidth={1.7} />
                      <span>Llamar Central ({BRAND_INFO.phoneCentralDisplay})</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#535353] border border-slate-300 hover:bg-[#F4F6FA] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.7} />
                      <span>Modificar aseguradora</span>
                    </button>
                    <p className="text-[11px] text-[#535353] text-right max-w-sm">
                      {TARIFF_DISCLAIMER}
                    </p>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Sticky Summary Sidebar */}
            <aside className="lg:col-span-4 border border-slate-200 bg-[#F4F6FA] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                    Resumen en Vivo
                  </p>
                  <h3 className="mt-0.5 text-base font-bold text-[#101010]">
                    {selectedVehicle.name}
                  </h3>
                </div>
                <div className="w-12 h-8 flex items-center justify-center shrink-0">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={quote.vehicleId}
                      variants={microSwapVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <VehicleIcon type={quote.vehicleId} className="w-12 h-8 text-[#14568D]" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#535353]">Placa</span>
                  <span className="font-mono font-semibold text-[#101010] tabular-nums">
                    {quote.plate || 'Sin ingresar'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#535353]">Uso</span>
                  <span className="font-medium text-[#101010]">
                    {quote.usage === 'particular' ? 'Particular' : 'Transporte'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#535353]">Aseguradora</span>
                  <span className="font-medium text-[#101010]">{selectedInsurer.name}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-[#535353]">Tarifa referencial</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={selectedVehicle.id}
                    variants={microSwapVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`font-bold tabular-nums text-right ${
                      selectedVehicle.price !== null
                        ? 'text-xl text-[#000A73]'
                        : 'text-xs text-[#14568D] max-w-[155px]'
                    }`}
                  >
                    {formatTariffDisplay(selectedVehicle.price)}
                  </motion.span>
                </AnimatePresence>
              </div>

              <a
                href={soatWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                <span>Enviar cotización a WhatsApp</span>
              </a>

              <ul className="pt-3 border-t border-slate-200 space-y-2.5 text-xs text-[#535353]">
                <li className="flex items-center gap-2.5">
                  <EmisionDigitalIcon className="w-5 h-5 text-[#14568D] shrink-0" />
                  <span>Certificado electrónico inmediato sin delivery</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <VerificacionApesegIcon className="w-5 h-5 text-[#14568D] shrink-0" />
                  <span>Registro oficial verificable en APESEG</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Atencion247Icon className="w-5 h-5 text-[#14568D] shrink-0" />
                  <span>Atención digital 24/7 por WhatsApp</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* MÓDULO ESPECIAL: MOTOTAXIS, AFILIACIÓN Y TARJETA DE CIRCULACIÓN */}
      <section className="py-16 sm:py-20 bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#14568D]">
                  <TarjetaCirculacionIcon className="w-5 h-5 shrink-0" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                    Servicio Especial en Pucallpa · Transporte Local
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                  Mototaxis, Afiliación y Tarjeta de Circulación
                </h2>
                <p className="text-sm sm:text-base text-[#535353] leading-relaxed">
                  Acompañamos a los conductores de mototaxi y transporte urbano en Pucallpa con la
                  asesoría para la solicitud de <strong>Tarjeta de Circulación</strong> (nuevo,
                  renovación o duplicado) ante la{' '}
                  <strong>Municipalidad Provincial de Coronel Portillo</strong> y procesos de
                  afiliación vehicular.
                </p>
              </div>

              {/* Interactive Modality Selector */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-semibold text-[#101010]">
                  Selecciona el trámite a consultar
                </span>
                <div className="grid grid-cols-3 border border-slate-300 bg-white divide-x divide-slate-300">
                  {CIRCULATION_SERVICES.map((svc) => {
                    const active = circulationType === svc.code;
                    return (
                      <button
                        key={svc.code}
                        type="button"
                        onClick={() => setCirculationType(svc.code)}
                        className={`py-2.5 px-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#14568D] text-white'
                            : 'bg-white text-[#535353] hover:bg-[#F4F6FA]'
                        }`}
                      >
                        {svc.code}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href={circulationWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                  <span>Consultar requisitos y tarifas ({circulationType}) por WhatsApp</span>
                </a>
                <p className="text-xs text-[#535353]">
                  Requisitos municipales y tarifas vigentes se confirman directamente por WhatsApp.
                  Para tu seguridad, no solicitamos PIN ni datos privados en formularios abiertos.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="h-full border border-slate-200 bg-white flex flex-col">
                <div className="relative flex-1 min-h-[280px] overflow-hidden bg-[#000A73]">
                  <ResilientImage
                    src={MEDIA_ASSETS.mototaxiPucallpa}
                    alt="Mototaxis y motocicletas circulando por avenida con palmeras en Pucallpa, Perú"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-5 py-3.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#000A73]">
                    Pucallpa · Transporte Urbano y Mototaxis
                  </span>
                  <span className="text-[#535353]">
                    Municipalidad Provincial de Coronel Portillo
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* 3-Column Swiss Grid detailing circulation options */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200 bg-white">
            {CIRCULATION_SERVICES.map((svc, idx) => {
              const active = circulationType === svc.code;
              const serviceIcon = CIRCULATION_SERVICE_ICONS[svc.code] ?? 'tarjeta-circulacion';
              return (
                <button
                  key={svc.code}
                  type="button"
                  onClick={() => setCirculationType(svc.code)}
                  aria-pressed={active}
                  className={`flex flex-col justify-start text-left p-6 sm:p-7 border-r border-b border-slate-200 space-y-3 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F4F6FA] ring-1 ring-inset ring-[#14568D]'
                      : 'bg-white hover:bg-[#F4F6FA]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-[#14568D] tabular-nums">
                      0{idx + 1} · {svc.code}
                    </span>
                    <BrokerageServiceIcon
                      type={serviceIcon}
                      className="w-8 h-8 text-[#14568D] shrink-0"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#101010]">{svc.title}</h3>
                  <p className="text-sm text-[#535353] leading-relaxed">{svc.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
