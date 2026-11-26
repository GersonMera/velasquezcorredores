import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND_INFO, LegalDocId, MEDIA_ASSETS } from '../data/velasquezData';
import { buildGeneralWhatsAppUrl, validateContactForm } from '../utils/quoteLogic';
import { PucallpaOfficeMap } from '../components/EditorialArtwork';
import { ResilientImage } from '../components/ResilientImage';

interface NosotrosContactoViewProps {
  onOpenLegal: (doc: LegalDocId) => void;
}

export const NosotrosContactoView: React.FC<NosotrosContactoViewProps> = ({ onOpenLegal }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Consulta SOAT Digital');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm({ fullName, phone, email, subject, message });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  };

  const whatsappDirectUrl = buildGeneralWhatsAppUrl(
    'Hola Velasquez Corredores de Seguros! Quiero comunicarme con un asesor en Pucallpa.'
  );

  return (
    <div className="bg-white">
      {/* Header Band with Editorial Office Photography */}
      <section className="relative bg-[#000A73] text-white overflow-hidden border-b border-white/15">
        <div className="absolute inset-0">
          <ResilientImage
            src={MEDIA_ASSETS.oficinaCorredores}
            alt="Oficina de asesoría de Velasquez Corredores de Seguros E.I.R.L."
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#000A73]/95 via-[#000A73]/84 to-[#000A73]/55"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            Respaldo Institucional desde 2012 · Pucallpa, Perú
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {BRAND_INFO.legalName}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
            {BRAND_INFO.slogan}. Unimos atención digital inmediata las 24 horas con el respaldo real
            de una corredora formalmente constituida en Ucayali.
          </p>
        </div>
      </section>

      {/* INSTITUTIONAL CREDENTIALS (SWISS GRID 1PX) */}
      <section className="py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
            <div className="p-6 border-r border-b border-slate-200 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Razón Social
              </p>
              <p className="text-base font-bold text-[#101010]">{BRAND_INFO.legalName}</p>
              <p className="text-xs text-[#535353]">
                Tienda digital: {BRAND_INFO.digitalStore} (Ref. {BRAND_INFO.alternateStoreName})
              </p>
            </div>

            <div className="p-6 border-r border-b border-slate-200 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                RUC SUNAT
              </p>
              <p className="text-xl font-bold font-mono text-[#000A73] tabular-nums">
                {BRAND_INFO.ruc}
              </p>
              <p className="text-xs text-[#535353] tabular-nums">
                Estado: Activo y Habido desde {BRAND_INFO.sunatActiveSince}
              </p>
            </div>

            <div className="p-6 border-r border-b border-slate-200 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Registro Oficial SBS
              </p>
              <p className="text-xl font-bold font-mono text-[#000A73] tabular-nums">
                {BRAND_INFO.sbsReference}
              </p>
              <p className="text-xs text-[#535353]">
                Titular: {BRAND_INFO.managerName} ({BRAND_INFO.sbsScope})
              </p>
            </div>

            <div className="p-6 border-r border-b border-slate-200 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Ámbito y Domicilio
              </p>
              <p className="text-base font-bold text-[#101010]">Pucallpa y Cobertura Nacional</p>
              <p className="text-xs text-[#535353]">
                Oficina en Callería (CP {BRAND_INFO.postalCode}) y emisión digital 24/7
              </p>
            </div>
          </div>

          {/* Misión, Visión y Compromiso de Correduría */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-[#F4F6FA]">
            <div className="p-6 sm:p-7 space-y-2 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Nuestra Misión
              </p>
              <h3 className="text-lg font-bold text-[#101010]">Emisión Ágil y Protección Real</h3>
              <p className="text-sm text-[#535353] leading-relaxed">
                Brindar acceso inmediato y transparente al SOAT electrónico las 24 horas y a pólizas de seguros integrales en Pucallpa y todo el Perú, combinando la velocidad digital con el respaldo legal de una correduría formalmente registrada.
              </p>
            </div>

            <div className="p-6 sm:p-7 space-y-2 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Nuestra Visión
              </p>
              <h3 className="text-lg font-bold text-[#101010]">Liderazgo Regional y Nacional</h3>
              <p className="text-sm text-[#535353] leading-relaxed">
                Consolidar a SOATVELASQUEZ.COM como la plataforma de emisión de SOAT y asesoría de seguros más confiable de la Amazonía peruana, reconocida por su cercanía al transportista, mototaxista y empresas locales.
              </p>
            </div>

            <div className="p-6 sm:p-7 space-y-2 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14568D]">
                Respaldo y Valores
              </p>
              <h3 className="text-lg font-bold text-[#101010]">Supervisión SBS y Transparencia</h3>
              <p className="text-sm text-[#535353] leading-relaxed">
                Operamos con registro SBS N° J-0739 y representación ante La Positiva, Pacífico y Mapfre. Asesoramos sin intermediarios fantasmas ni sobrecostos ocultos, velando por la tranquilidad de cada asegurado.
              </p>
            </div>
          </div>

          {/* Office vs Digital 24/7 Distinction & Reference Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                  Ubicación y Horarios Diferenciados
                </p>
                <h2 className="text-2xl font-bold text-[#101010]">
                  Atención digital 24/7 y oficina en Callería, Pucallpa
                </h2>
              </div>

              <div className="border border-slate-200 divide-y divide-slate-200">
                <div className="p-5 flex items-start gap-3.5 bg-[#F4F6FA]">
                  <Clock className="w-5 h-5 mt-0.5 text-[#14568D] shrink-0" strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#000A73]">{BRAND_INFO.hoursDigital}</p>
                    <p className="text-xs text-[#535353]">
                      Cotización y emisión electrónica inmediata por WhatsApp {BRAND_INFO.whatsappDisplay}.
                    </p>
                  </div>
                </div>

                <div className="p-5 flex items-start gap-3.5 bg-white">
                  <Clock className="w-5 h-5 mt-0.5 text-[#535353] shrink-0" strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#101010]">{BRAND_INFO.hoursOffice}</p>
                    <p className="text-xs text-[#535353]">
                      Nota transparente: {BRAND_INFO.hoursOfficeNote}.
                    </p>
                  </div>
                </div>

                <div className="p-5 flex items-start gap-3.5 bg-white">
                  <MapPin className="w-5 h-5 mt-0.5 text-[#14568D] shrink-0" strokeWidth={1.6} />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#101010]">{BRAND_INFO.address}</p>
                    <p className="text-xs text-[#535353]">
                      Nota transparente: {BRAND_INFO.addressNote}.
                    </p>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white tabular-nums">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#535353] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#14568D]" strokeWidth={1.6} />
                      <span>Teléfonos oficiales</span>
                    </p>
                    <p className="text-sm font-semibold text-[#101010]">
                      WhatsApp: {BRAND_INFO.whatsappDisplay}
                    </p>
                    <p className="text-sm text-[#535353]">
                      Central: {BRAND_INFO.phoneCentralDisplay}
                    </p>
                    <p className="text-xs text-[#535353]">Fijo: {BRAND_INFO.landlineDisplay}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#535353] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#14568D]" strokeWidth={1.6} />
                      <span>Correos de contacto</span>
                    </p>
                    <a
                      href={`mailto:${BRAND_INFO.emails[0]}`}
                      className="block text-xs font-medium text-[#14568D] hover:underline break-all"
                    >
                      {BRAND_INFO.emails[0]}
                    </a>
                    <a
                      href={`mailto:${BRAND_INFO.emails[1]}`}
                      className="block text-xs text-[#535353] hover:underline break-all"
                    >
                      {BRAND_INFO.emails[1]}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <PucallpaOfficeMap />
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#535353]">
                <span>Referencia urbana: Callería, Pucallpa — Ucayali, Perú</span>
                <a
                  href={BRAND_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#14568D] hover:underline"
                >
                  Abrir referencia en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & LEGAL FRAMEWORK */}
      <section className="py-14 sm:py-20 bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                Mensaje Directo
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#101010]">
                Escríbenos a nuestra oficina
              </h2>
            </div>

            {submitted ? (
              <div className="border border-[#14568D]/30 bg-[#F4F6FA] p-6 space-y-3" data-testid="contact-confirmation">
                <div className="flex items-center gap-2 text-[#14568D]">
                  <CheckCircle2 className="w-5 h-5" strokeWidth={1.7} />
                  <h3 className="text-base font-bold text-[#101010]">Mensaje enviado</h3>
                </div>
                <p className="text-sm text-[#535353]">
                  Hemos recibido tu consulta. Un asesor de {BRAND_INFO.commercialName} se comunicará
                  contigo a la brevedad. Para emisiones urgentes de SOAT, usa nuestro WhatsApp 24/7.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520]"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                    <span>Escribir a WhatsApp 24/7</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-[#14568D] border border-[#14568D]/30 hover:bg-white cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#101010] mb-1">
                      Nombre completo
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Ana Torres Paredes"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-[#A81A26]">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#101010] mb-1">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 958 506 048"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#A81A26]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#101010] mb-1">
                      Correo electrónico (opcional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.pe"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#A81A26]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#101010] mb-1">
                      Motivo de consulta
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-[#F4F6FA] focus:bg-white focus:border-[#14568D] focus:outline-none"
                    >
                      <option value="Consulta SOAT Digital">Consulta SOAT Digital</option>
                      <option value="Tarjeta de Circulación / Mototaxi">
                        Tarjeta de Circulación / Mototaxi
                      </option>
                      <option value="Seguros Personales / Empresariales">
                        Seguros Personales / Empresariales
                      </option>
                      <option value="Soporte Postventa / Siniestro">
                        Soporte Postventa / Siniestro
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#101010] mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Indícanos tu consulta, número de placa o seguro de interés..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#A81A26]">{errors.message}</p>
                  )}
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
                  >
                    Enviar consulta
                  </button>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                    <span>WhatsApp inmediato</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Peruvian Legal Framework Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                Marco Legal Peruano
              </p>
              <h3 className="text-xl font-bold text-[#101010]">
                Transparencia y derechos del usuario
              </h3>
              <p className="text-sm text-[#535353] leading-relaxed">
                Operamos bajo la normativa de protección al consumidor y tratamiento de datos
                personales de la República del Perú (Ley N° 29733 y Ley N° 29571).
              </p>

              <div className="divide-y divide-slate-200 border border-slate-200 text-sm">
                <button
                  type="button"
                  onClick={() => onOpenLegal('datos')}
                  className="w-full px-4 py-3 text-left font-medium text-[#14568D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                >
                  Política de Protección de Datos (Ley N° 29733)
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terminos')}
                  className="w-full px-4 py-3 text-left font-medium text-[#14568D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                >
                  Términos de Servicio Digital
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('reembolso')}
                  className="w-full px-4 py-3 text-left font-medium text-[#14568D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                >
                  Política de Reembolso SOAT Electrónico
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('reclamaciones')}
                  className="w-full px-4 py-3 text-left font-bold text-[#000A73] bg-[#F4F6FA] hover:bg-slate-200/70 transition-colors cursor-pointer"
                >
                  Libro de Reclamaciones Virtual
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
