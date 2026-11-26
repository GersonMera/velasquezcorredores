import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import {
  ALLIED_INSURERS,
  BRAND_INFO,
  EMISSION_STEPS,
  InsurerId,
  MEDIA_ASSETS,
  TabId,
  TARIFF_DISCLAIMER,
  VEHICLE_TARIFFS,
  VehicleCategoryId,
  VehicleUsage,
} from '../data/velasquezData';
import {
  buildSoatWhatsAppUrl,
  formatPeruvianPlate,
  formatTariffDisplay,
  getVehicleById,
} from '../utils/quoteLogic';
import { ResilientImage } from '../components/ResilientImage';
import { VehicleIcon } from '../components/VehicleIcons';
import {
  BrokerageServiceIcon,
  BrokerageServiceIconId,
  VerificacionApesegIcon,
} from '../components/BrokerageIcons';
import {
  microSwapVariants,
  staggerContainerVariants,
  staggerItemVariants,
  SWISS_EASE,
} from '../components/MotionPrimitives';

const STEP_SERVICE_ICONS: BrokerageServiceIconId[] = [
  'pago-seguro',
  'atencion-247',
  'emision-digital',
];

const BROKERAGE_SERVICES: {
  id: string;
  icon: BrokerageServiceIconId;
  title: string;
  description: string;
  cta: string;
  targetTab: TabId;
  startGuided?: boolean;
}[] = [
  {
    id: 'soat-digital',
    icon: 'emision-digital',
    title: 'Emisión SOAT Digital 24/7',
    description:
      'Certificado electrónico válido en todo el Perú, emitido al instante por WhatsApp.',
    cta: 'Cotizar SOAT',
    targetTab: 'cotizar-soat',
    startGuided: true,
  },
  {
    id: 'tarjeta-circulacion',
    icon: 'tarjeta-circulacion',
    title: 'Tarjeta de Circulación y Afiliación',
    description:
      'Asesoría en Pucallpa para mototaxis y transporte urbano (nuevo, renovación y duplicado).',
    cta: 'Ver trámites',
    targetTab: 'cotizar-soat',
  },
  {
    id: 'correduria-integral',
    icon: 'asesoria-corredor',
    title: 'Correduría y Otros Seguros',
    description:
      'Vehicular Todo Riesgo, Salud, Hogar, SCTR y pólizas empresariales con respaldo SBS.',
    cta: 'Explorar seguros',
    targetTab: 'otros-seguros',
  },
  {
    id: 'verificacion-apeseg',
    icon: 'verificacion-apeseg',
    title: 'Verificación Oficial APESEG',
    description:
      'Valida la vigencia de tu placa en segundos y consulta las coberturas obligatorias.',
    cta: 'Verificar SOAT',
    targetTab: 'verifica-faq',
  },
];

export interface SharedQuoteState {
  vehicleId: VehicleCategoryId;
  plate: string;
  insurerId: InsurerId;
  usage: VehicleUsage;
  tonnage: string;
}

interface InicioViewProps {
  quote: SharedQuoteState;
  onUpdateQuote: (patch: Partial<SharedQuoteState>) => void;
  onSelectTab: (tab: TabId) => void;
  onStartGuidedQuote: (vehicleId?: VehicleCategoryId) => void;
}

export const InicioView: React.FC<InicioViewProps> = ({
  quote,
  onUpdateQuote,
  onSelectTab,
  onStartGuidedQuote,
}) => {
  const activeVehicle = getVehicleById(quote.vehicleId);
  const whatsappQuoteUrl = buildSoatWhatsAppUrl(quote);

  return (
    <div>
      {/* HERO INMERSIVO 100SVH (Móvil y Escritorio) */}
      <section className="relative min-h-[88svh] flex items-center overflow-hidden bg-[#000A73]">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={MEDIA_ASSETS.heroVideoPoster}
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
          >
            <source src={MEDIA_ASSETS.heroVideoWebm} type="video/webm" />
            <source src={MEDIA_ASSETS.heroVideoMp4} type="video/mp4" />
            <ResilientImage
              src={MEDIA_ASSETS.heroHighway}
              alt="Vehículos circulando en la ciudad — SOATVELASQUEZ.COM"
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          </video>
        </div>

        {/* Deep Azul Noche Editorial Scrims */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000A73]/92 via-[#000A73]/72 to-[#000A73]/38"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#000A73]/90 via-[#000A73]/25 to-black/30"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Headline & Backing */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-3 sm:space-y-5 text-white"
            >
              <motion.p
                variants={staggerItemVariants}
                className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300"
              >
                SOATVELASQUEZ.COM · Cobertura Nacional 24/7
              </motion.p>

              <motion.h1
                variants={staggerItemVariants}
                className="text-[clamp(1.75rem,4.5vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-white max-w-2xl"
              >
                {BRAND_INFO.heroHeadline}
              </motion.h1>

              <motion.p
                variants={staggerItemVariants}
                className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl"
              >
                Emisión inmediata de certificado electrónico verificable en APESEG con La Positiva, Pacífico y Mapfre. Asesoría técnica colegiada en Pucallpa y atención 24/7 a nivel nacional.
              </motion.p>

              {/* Quiet unboxed institutional metadata with separators (Zero-Pill Discipline) */}
              <motion.div
                variants={staggerItemVariants}
                className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300/90 tabular-nums border-t border-white/20"
              >
                <span>RUC {BRAND_INFO.ruc}</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span>Registro SBS {BRAND_INFO.sbsReference}</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span>Emisión Digital 24/7</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Instant Minimalist Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.08, ease: SWISS_EASE }}
              className="lg:col-span-5"
            >
              <div className="bg-white text-[#101010] shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-7 space-y-3.5 sm:space-y-4 lg:space-y-5 rounded-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4">
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                      Cotización Instantánea
                    </p>
                    <h2 className="mt-0.5 text-base sm:text-lg font-bold text-[#101010]">
                      Calcula tu SOAT digital
                    </h2>
                  </div>
                  <div className="w-10 h-7 sm:w-12 sm:h-8 flex items-center justify-center shrink-0">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={quote.vehicleId}
                        variants={microSwapVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <VehicleIcon
                          type={quote.vehicleId}
                          className="w-10 h-7 sm:w-12 sm:h-8 text-[#14568D] shrink-0"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Vehicle Class Selector */}
                <div className="space-y-1">
                  <label
                    htmlFor="hero-vehicle-select"
                    className="block text-xs font-semibold text-[#101010]"
                  >
                    Clase de vehículo
                  </label>
                  <select
                    id="hero-vehicle-select"
                    value={quote.vehicleId}
                    onChange={(e) => {
                      const nextId = e.target.value as VehicleCategoryId;
                      const nextVeh = getVehicleById(nextId);
                      onUpdateQuote({ vehicleId: nextId, usage: nextVeh.defaultUsage });
                    }}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm bg-[#F4F6FA] border border-slate-300 text-[#101010] font-medium focus:border-[#14568D] focus:bg-white focus:outline-none"
                  >
                    {VEHICLE_TARIFFS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} — {formatTariffDisplay(v.price)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Plate Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="hero-plate-input"
                    className="block text-xs font-semibold text-[#101010]"
                  >
                    Número de placa
                  </label>
                  <input
                    id="hero-plate-input"
                    type="text"
                    value={quote.plate}
                    onChange={(e) =>
                      onUpdateQuote({ plate: formatPeruvianPlate(e.target.value) })
                    }
                    placeholder={`Ej. ${activeVehicle.examplePlate}`}
                    maxLength={7}
                    autoComplete="off"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-sm sm:text-base font-mono font-medium tracking-widest uppercase bg-[#F4F6FA] border border-slate-300 text-[#101010] placeholder:text-slate-400 focus:border-[#14568D] focus:bg-white focus:outline-none tabular-nums"
                  />
                </div>

                {/* Insurer Segmented Selector */}
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-[#101010]">
                    Aseguradora aliada
                  </span>
                  <div className="grid grid-cols-3 border border-slate-300 divide-x divide-slate-300">
                    {ALLIED_INSURERS.map((insurer) => {
                      const selected = quote.insurerId === insurer.id;
                      return (
                        <button
                          key={insurer.id}
                          type="button"
                          onClick={() => onUpdateQuote({ insurerId: insurer.id })}
                          className={`py-1.5 sm:py-2.5 px-1 sm:px-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            selected
                              ? 'bg-[#14568D] text-white'
                              : 'bg-white text-[#535353] hover:bg-[#F4F6FA] hover:text-[#101010]'
                          }`}
                        >
                          {insurer.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Reference Tariff Summary */}
                <div className="bg-[#F4F6FA] border border-slate-200 px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#535353]">Tarifa referencial</p>
                    <p className="text-[10px] sm:text-[11px] text-[#535353]">
                      {activeVehicle.shortName} · Cobertura nacional
                    </p>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={activeVehicle.id}
                      variants={microSwapVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      data-testid="hero-price-readout"
                      className={`font-bold tabular-nums text-right ${
                        activeVehicle.price !== null
                          ? 'text-xl sm:text-2xl text-[#000A73]'
                          : 'text-xs text-[#14568D] max-w-[155px]'
                      }`}
                    >
                      {formatTariffDisplay(activeVehicle.price)}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Primary Conversion CTA (Rojo CTA #A81A26) + Secondary Step-by-Step */}
                <div className="space-y-2">
                  <a
                    href={whatsappQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.7} aria-hidden="true" />
                    <span>Emitir por WhatsApp 24/7</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onStartGuidedQuote()}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 text-xs font-semibold text-[#14568D] border border-[#14568D]/30 hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    <span>Configurador guiado paso a paso</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
                  </button>
                </div>

                <p className="text-[10px] sm:text-[11px] text-[#535353] leading-snug">
                  {TARIFF_DISCLAIMER}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 01. TARIFARIO TRANSPARENTE (SWISS ARCHITECTURAL GRID 1PX) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                01. Tarifario SOAT Digital
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                Precios claros por clase de vehículo
              </h2>
            </div>
            <p className="text-sm text-[#535353] max-w-md">
              Cobertura obligatoria a nivel nacional con emisión electrónica las 24 horas. Selecciona
              tu vehículo para iniciar la cotización por placa.
            </p>
          </div>

          {/* 6-Cell Swiss Grid 1px */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200"
          >
            {VEHICLE_TARIFFS.map((item, idx) => {
              const isSelected = quote.vehicleId === item.id;
              return (
                <motion.button
                  key={item.id}
                  variants={staggerItemVariants}
                  type="button"
                  onClick={() => onStartGuidedQuote(item.id)}
                  className={`group text-left p-6 sm:p-8 border-r border-b border-slate-200 transition-colors cursor-pointer flex flex-col justify-between min-h-[240px] ${
                    isSelected ? 'bg-[#F4F6FA]' : 'bg-white hover:bg-[#F4F6FA]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs font-mono text-[#535353] tabular-nums">
                        0{idx + 1}
                      </span>
                      <VehicleIcon
                        type={item.id}
                        className="w-14 h-9 text-[#14568D] group-hover:text-[#000A73] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-[#101010] group-hover:text-[#000A73] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#535353] leading-relaxed">
                        {item.subtitle}
                      </p>
                      {item.highlightLocal && (
                        <p className="text-xs font-semibold text-[#14568D] pt-1">
                          Atención especializada para transporte en Pucallpa
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#535353]">
                        Tarifa referencial
                      </p>
                      <p
                        className={`mt-1 font-bold tabular-nums ${
                          item.price !== null
                            ? 'text-2xl text-[#000A73]'
                            : 'text-sm text-[#14568D]'
                        }`}
                      >
                        {formatTariffDisplay(item.price)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#14568D] group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                      <span>Cotizar</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <p className="mt-4 text-xs text-[#535353]">{TARIFF_DISCLAIMER}</p>
        </div>
      </section>

      {/* 02. ASEGURADORAS ALIADAS */}
      <section className="py-16 sm:py-20 bg-[#F4F6FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                02. Aseguradoras Aliadas
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                Comparamos y emitimos con las compañías líderes del Perú
              </h2>
            </div>
            <p className="text-sm text-[#535353] max-w-md">
              Como corredores independientes te orientamos para emitir tu certificado electrónico en
              la aseguradora que mejor se adapte a tu placa y presupuesto.
            </p>
          </div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200 bg-white"
          >
            {ALLIED_INSURERS.map((insurer, idx) => (
              <motion.div
                key={insurer.id}
                variants={staggerItemVariants}
                className="group p-6 sm:p-8 border-r border-b border-slate-200 flex flex-col justify-between gap-6 hover:bg-[#F4F6FA] transition-colors"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs text-[#535353]">
                    <span className="font-mono font-semibold text-[#14568D] tabular-nums">0{idx + 1}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#535353]">
                      {insurer.tagline}
                    </span>
                  </div>

                  {/* Clean Borderless Brand Logo */}
                  <div className="w-full flex items-center justify-center py-2">
                    <ResilientImage
                      src={insurer.logoSrc}
                      alt={`Logo oficial de ${insurer.name}`}
                      className="h-36 sm:h-40 lg:h-44 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      fallbackClassName="bg-[#F4F6FA] text-[#000A73]"
                      fallbackLabel={insurer.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-[#000A73]">
                      {insurer.name}
                    </h3>
                    <p className="text-sm text-[#535353] leading-relaxed">
                      {insurer.emissionChannel}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5">
                    Cobertura nacional
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateQuote({ insurerId: insurer.id });
                      onStartGuidedQuote();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14568D] group-hover:text-[#A81A26] transition-colors cursor-pointer"
                  >
                    <span>Cotizar con {insurer.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 03. EMISIÓN DIGITAL EN 3 PASOS + BANNER APESEG */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
              03. Proceso Sin Fricción
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
              Tu certificado SOAT electrónico en 3 pasos
            </h2>
          </div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200"
          >
            {EMISSION_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                variants={staggerItemVariants}
                className="p-7 sm:p-8 border-r border-b border-slate-200 space-y-4 bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-block text-2xl font-bold font-mono text-[#14568D] tabular-nums">
                    {step.number}
                  </span>
                  <BrokerageServiceIcon
                    type={STEP_SERVICE_ICONS[idx] ?? 'emision-digital'}
                    className="w-8 h-8 text-[#14568D] shrink-0"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#101010]">{step.title}</h3>
                <p className="text-sm text-[#535353] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 04. Servicios de la Corredora (4-Cell Swiss Grid 1px con iconos 1.5px) */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                  04. Servicios de la Corredora
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                  Respaldo integral en SOAT, trámites y pólizas
                </h2>
              </div>
              <p className="text-sm text-[#535353] max-w-md">
                Velasquez Corredores de Seguros E.I.R.L. integra la agilidad digital con asesoría
                especializada en Pucallpa y todo el país.
              </p>
            </div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200"
            >
              {BROKERAGE_SERVICES.map((service) => (
                <motion.button
                  key={service.id}
                  variants={staggerItemVariants}
                  type="button"
                  onClick={() =>
                    service.startGuided
                      ? onStartGuidedQuote()
                      : onSelectTab(service.targetTab)
                  }
                  className="group text-left p-6 sm:p-7 border-r border-b border-slate-200 bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <BrokerageServiceIcon
                      type={service.icon}
                      className="w-9 h-9 text-[#14568D] group-hover:text-[#000A73] transition-colors"
                    />
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-[#101010] group-hover:text-[#000A73] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#535353] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14568D] group-hover:translate-x-0.5 transition-transform">
                    <span>{service.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* APESEG Verification Banner */}
          <div className="border border-[#14568D]/25 bg-[#F4F6FA] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[#14568D]">
                <VerificacionApesegIcon className="w-5 h-5 shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  Verificación Oficial en Perú
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#101010]">
                Comprueba la vigencia de tu SOAT electrónico en APESEG
              </h3>
              <p className="text-sm text-[#535353] leading-relaxed max-w-2xl">
                Cada certificado emitido mediante {BRAND_INFO.digitalStore} se registra de forma
                oficial y puede verificarse ingresando tu placa en el portal de la Asociación Peruana
                de Empresas de Seguros (APESEG).
              </p>
              <div className="pt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#14568D] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  Válido ante PNP y SUTRAN
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  Sin papeles ni envíos físicos
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={BRAND_INFO.apesegUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors whitespace-nowrap"
              >
                <span>Consultar en APESEG</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.7} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onSelectTab('verifica-faq')}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-5 text-sm font-semibold text-[#14568D] bg-white border border-[#14568D]/30 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver coberturas y preguntas</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
