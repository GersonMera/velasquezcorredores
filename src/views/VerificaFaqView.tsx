import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  BRAND_INFO,
  FAQ_ITEMS,
  FaqItem,
  MEDIA_ASSETS,
  SOAT_COVERAGES_SUMMARY,
} from '../data/velasquezData';
import { buildGeneralWhatsAppUrl } from '../utils/quoteLogic';
import { ResilientImage } from '../components/ResilientImage';
import { collapseVariants, microSwapVariants } from '../components/MotionPrimitives';

type FaqFilter = 'all' | FaqItem['category'];

const FAQ_FILTERS: { id: FaqFilter; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'emision', label: 'Emisión digital' },
  { id: 'coberturas', label: 'Coberturas y uso' },
  { id: 'siniestros', label: 'En caso de accidente' },
  { id: 'circulacion', label: 'Circulación Pucallpa' },
];

export const VerificaFaqView: React.FC = () => {
  const [filter, setFilter] = useState<FaqFilter>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const visibleFaqs =
    filter === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((item) => item.category === filter);

  const supportWhatsAppUrl = buildGeneralWhatsAppUrl(
    'Hola SOATVELASQUEZ.COM! Tengo una consulta sobre la verificación o cobertura de mi SOAT.'
  );

  return (
    <div className="bg-white">
      {/* Header Band with Verification Banner Background */}
      <section className="relative bg-[#000A73] text-white overflow-hidden border-b border-white/15">
        <div className="absolute inset-0">
          <ResilientImage
            src={MEDIA_ASSETS.originalVerificaBanner}
            alt="Verificación oficial de SOAT en APESEG y consultas frecuentes — SOATVELASQUEZ.COM"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#000A73]/94 via-[#000A73]/82 to-[#000A73]/48"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            Transparencia y Respaldo Normativo
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Verifica tu SOAT en APESEG y preguntas frecuentes
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
            Comprueba en segundos la vigencia oficial de tu certificado electrónico y resuelve tus
            dudas sobre coberturas y uso en todo el Perú.
          </p>
        </div>
      </section>

      {/* APESEG OFFICIAL VERIFICATION MODULE */}
      <section className="py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#14568D]/25 bg-[#F4F6FA] grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-7 sm:p-10 space-y-5 lg:border-r border-slate-200">
              <div className="flex items-center gap-2 text-[#14568D]">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  Consulta Oficial Nacional
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                Cómo validar tu SOAT electrónico en APESEG
              </h2>

              <p className="text-sm text-[#535353] leading-relaxed">
                El portal de la <strong>Asociación Peruana de Empresas de Seguros (APESEG)</strong>{' '}
                centraliza la información oficial de todos los certificados SOAT electrónicos
                vigentes emitidos por La Positiva, Pacífico, Mapfre y demás aseguradoras supervisadas.
              </p>

              <div className="pt-2">
                <a
                  href={BRAND_INFO.apesegUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                >
                  <span>Ir al portal oficial de APESEG</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </a>
                <p className="mt-2.5 text-xs font-mono text-[#535353] break-all">
                  {BRAND_INFO.apesegUrl}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 bg-white space-y-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Verificación en 3 pasos
              </h3>
              <ol className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-[#14568D] tabular-nums">01</span>
                  <p className="text-[#535353]">
                    Ingresa al enlace oficial de consultas de APESEG desde tu celular o computadora.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-[#14568D] tabular-nums">02</span>
                  <p className="text-[#535353]">
                    Digita el número de placa de tu vehículo sin espacios ni guiones y completa el
                    código de seguridad.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono font-bold text-[#14568D] tabular-nums">03</span>
                  <p className="text-[#535353]">
                    Visualiza inmediatamente el estado <strong>Activo</strong>, compañía emisora,
                    fecha de inicio y vencimiento.
                  </p>
                </li>
              </ol>
            </div>
          </div>

          {/* Original Official Visual Walkthrough from SOATVELASQUEZ.COM */}
          <figure className="mt-6 border border-slate-200 bg-white overflow-hidden">
            <div className="w-full bg-[#000A73]">
              <ResilientImage
                src={MEDIA_ASSETS.originalVerificaBanner}
                alt="Guía visual paso a paso de SOATVELASQUEZ.COM para verificar la validez del SOAT en APESEG"
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="px-5 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-[#535353]">
              <span className="font-semibold text-[#101010]">
                Guía visual oficial de consulta en APESEG
              </span>
              <span>Material informativo original de SOATVELASQUEZ.COM</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* COVERAGES TABLE */}
      <section className="py-14 sm:py-18 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
              Coberturas Legales Referenciales en Perú
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
              ¿Qué cubre el SOAT electrónico?
            </h2>
            <p className="text-sm text-[#535353]">
              El Seguro Obligatorio de Accidentes de Tránsito ampara a ocupantes del vehículo y
              terceros no ocupantes (peatones) afectados en un accidente de tránsito.
            </p>
          </div>

          <div className="border-t border-l border-slate-200">
            {SOAT_COVERAGES_SUMMARY.map((cov) => (
              <div
                key={cov.item}
                className="grid grid-cols-1 md:grid-cols-12 border-r border-b border-slate-200 bg-white hover:bg-[#F4F6FA] transition-colors"
              >
                <div className="md:col-span-3 p-5 font-bold text-sm text-[#101010] md:border-r border-slate-200">
                  {cov.item}
                </div>
                <div className="md:col-span-3 px-5 pb-3 md:py-5 font-semibold text-sm text-[#14568D] tabular-nums md:border-r border-slate-200">
                  {cov.reference}
                </div>
                <div className="md:col-span-6 px-5 pb-5 md:py-5 text-sm text-[#535353] leading-relaxed">
                  {cov.detail}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#535353] bg-[#F4F6FA] border border-slate-200 px-4 py-3">
            Aviso transparente: Detalles de coberturas, topes en UIT vigentes y condiciones
            particulares se encuentran sujetos a la póliza de cada aseguradora y a la normativa
            vigente del Ministerio de Transportes y Comunicaciones (MTC).
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-14 sm:py-20 bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                Preguntas Frecuentes
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                Resolvemos tus dudas al instante
              </h2>
            </div>

            {/* Category filter tabs (interactive segmented buttons) */}
            <div className="flex flex-wrap gap-1.5">
              {FAQ_FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFilter(f.id);
                      setOpenFaqId(null);
                    }}
                    className={`px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#14568D] text-white border-[#14568D]'
                        : 'bg-white text-[#535353] border-slate-300 hover:text-[#101010]'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white divide-y divide-slate-200 border-x border-b">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout="position"
                    variants={microSwapVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#101010]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#14568D] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`${faq.id}-answer`}
                          variants={collapseVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 text-sm text-[#535353] leading-relaxed bg-[#F4F6FA]/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="bg-white border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#101010]">
                ¿Necesitas ayuda con tu placa o vigencia?
              </h3>
              <p className="text-sm text-[#535353]">
                Escríbenos directamente a nuestro canal 24/7 y te orientamos sin costo.
              </p>
            </div>
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
