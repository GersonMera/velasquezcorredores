import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, MessageCircle } from 'lucide-react';
import { BRAND_INFO, MEDIA_ASSETS, OTHER_INSURANCE_LINES } from '../data/velasquezData';
import { buildGeneralWhatsAppUrl, validateContactForm } from '../utils/quoteLogic';
import { ResilientImage } from '../components/ResilientImage';

export const OtrosSegurosView: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<string>(OTHER_INSURANCE_LINES[0].title);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    line: string;
    whatsappUrl: string;
  } | null>(null);

  const handleSelectLine = (title: string) => {
    setSelectedLine(title);
    setSubmittedData(null);
    const el = document.getElementById('asesoria-otros-seguros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm({
      fullName,
      phone,
      email,
      subject: selectedLine,
      message,
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const waMsg = [
        `Hola ${BRAND_INFO.commercialName}! Solicito asesoría personalizada:`,
        `- Ramo: ${selectedLine}`,
        `- Nombre: ${fullName.trim()}`,
        `- Teléfono: ${phone.trim()}`,
        email.trim() ? `- Correo: ${email.trim()}` : '',
        `- Detalle: ${message.trim()}`,
      ]
        .filter(Boolean)
        .join('\n');

      setSubmittedData({
        name: fullName.trim(),
        line: selectedLine,
        whatsappUrl: buildGeneralWhatsAppUrl(waMsg),
      });
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="bg-white">
      {/* Header Band with Editorial Fleet Photography */}
      <section className="relative bg-[#000A73] text-white overflow-hidden border-b border-white/15">
        <div className="absolute inset-0">
          <ResilientImage
            src={MEDIA_ASSETS.segurosFlota}
            alt="Camioneta Pick Up y sedán ejecutivo asegurados por Velasquez Corredores de Seguros"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#000A73]/95 via-[#000A73]/82 to-[#000A73]/48"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            División Corporativa y Personal · {BRAND_INFO.legalName}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Correduría integral de seguros
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
            Más allá del SOAT digital, protegemos tu vehículo contra todo riesgo, la salud de tu
            familia, tu patrimonio comercial y la continuidad de tu empresa con respaldo técnico
            independiente.
          </p>
        </div>
      </section>

      {/* 4 Lines Editorial Swiss Grid (1px) */}
      <section className="py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-slate-200">
            {OTHER_INSURANCE_LINES.map((line) => {
              const isSelected = selectedLine === line.title;
              const directLineWhatsApp = buildGeneralWhatsAppUrl(
                `Hola ${BRAND_INFO.commercialName}! Quisiera cotizar un ${line.title}.`
              );
              return (
                <article
                  key={line.id}
                  className={`p-7 sm:p-10 border-r border-b border-slate-200 flex flex-col justify-between gap-7 transition-colors ${
                    isSelected ? 'bg-[#F4F6FA]' : 'bg-white hover:bg-[#F4F6FA]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#535353]">
                      <span className="font-mono font-semibold text-[#14568D] tabular-nums">
                        {line.number}
                      </span>
                      <span>{line.category}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#101010] tracking-tight">
                      {line.title}
                    </h2>

                    <p className="text-sm text-[#535353] leading-relaxed">{line.summary}</p>

                    <ul className="space-y-2 pt-2 border-t border-slate-200/80">
                      {line.coverages.map((cov) => (
                        <li key={cov} className="flex items-start gap-2.5 text-sm text-[#101010]">
                          <Check
                            className="w-4 h-4 mt-0.5 text-[#14568D] shrink-0"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                          <span>{cov}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs text-[#535353] pt-1">
                      <strong className="text-[#101010]">Ideal para:</strong> {line.idealFor}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => handleSelectLine(line.title)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
                    >
                      <span>Solicitar asesoría</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                    </button>
                    <a
                      href={directLineWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#14568D] border border-[#14568D]/30 hover:bg-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.6} />
                      <span>WhatsApp directo</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personalized Broker Consultation Form */}
      <section id="asesoria-otros-seguros" className="py-16 sm:py-20 bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
                Asesoría Directa con un Corredor
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101010] tracking-tight">
                Diseñamos tu comparativa sin compromiso
              </h2>
              <p className="text-sm text-[#535353] leading-relaxed">
                Un corredor de {BRAND_INFO.legalName} evalúa tus necesidades, compara primas y
                deducibles en aseguradoras de primer nivel y te acompaña en todo el proceso de
                emisión y atención de siniestros.
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-sm text-[#101010] tabular-nums">
                <p>
                  Central asesoría: <strong>{BRAND_INFO.phoneCentralDisplay}</strong>
                </p>
                <p>
                  WhatsApp directo: <strong>{BRAND_INFO.whatsappDisplay}</strong>
                </p>
                <p className="text-xs text-[#535353]">
                  {BRAND_INFO.emails[0]} · {BRAND_INFO.emails[1]}
                </p>
              </div>
              <figure className="border border-slate-200 bg-white overflow-hidden">
                <div className="aspect-4/3 overflow-hidden">
                  <ResilientImage
                    src={MEDIA_ASSETS.oficinaCorredores}
                    alt="Asesoría personalizada de seguros con corredores de Velasquez Corredores de Seguros"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-[#535353] border-t border-slate-200">
                  Evaluación independiente de pólizas vehiculares, salud, multirriesgo y flotas.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8">
              {submittedData ? (
                <div className="space-y-4" data-testid="other-insurance-confirmation">
                  <div className="flex items-center gap-2.5 text-[#14568D]">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={1.7} />
                    <h3 className="text-xl font-bold text-[#101010]">
                      Solicitud registrada correctamente
                    </h3>
                  </div>
                  <p className="text-sm text-[#535353] leading-relaxed">
                    Gracias, <strong>{submittedData.name}</strong>. Hemos registrado tu interés en{' '}
                    <strong>{submittedData.line}</strong>. Si prefieres atención inmediata, puedes
                    enviar el resumen ahora mismo a nuestro WhatsApp corporativo.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={submittedData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                      <span>Enviar resumen por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="px-5 py-3 text-sm font-semibold text-[#14568D] border border-[#14568D]/30 hover:bg-[#F4F6FA] cursor-pointer"
                    >
                      Nueva consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="other-line-select"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Tipo de seguro a cotizar
                    </label>
                    <select
                      id="other-line-select"
                      value={selectedLine}
                      onChange={(e) => setSelectedLine(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-[#F4F6FA] focus:bg-white focus:border-[#14568D] focus:outline-none"
                    >
                      {OTHER_INSURANCE_LINES.map((line) => (
                        <option key={line.id} value={line.title}>
                          {line.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="other-name"
                        className="block text-xs font-semibold text-[#101010] mb-1.5"
                      >
                        Nombre completo o empresa
                      </label>
                      <input
                        id="other-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Roberto Ríos Salazar"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-[#A81A26]">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="other-phone"
                        className="block text-xs font-semibold text-[#101010] mb-1.5"
                      >
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="other-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. 950 672 922"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none tabular-nums"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#A81A26]">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="other-email"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Correo electrónico (opcional)
                    </label>
                    <input
                      id="other-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@empresa.pe"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#A81A26]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="other-message"
                      className="block text-xs font-semibold text-[#101010] mb-1.5"
                    >
                      Detalles de lo que deseas asegurar
                    </label>
                    <textarea
                      id="other-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ej. Marca/año del vehículo, número de personas en plan de salud, tipo de local o flota..."
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-[#A81A26]">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors cursor-pointer"
                  >
                    Solicitar asesoría personalizada
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
