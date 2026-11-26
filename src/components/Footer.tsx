import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND_INFO, LegalDocId, NAV_TABS, TabId } from '../data/velasquezData';
import { buildGeneralWhatsAppUrl } from '../utils/quoteLogic';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectTab: (tab: TabId) => void;
  onOpenLegal: (doc: LegalDocId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenLegal }) => {
  const whatsappUrl = buildGeneralWhatsAppUrl('Hola SOATVELASQUEZ.COM!');

  return (
    <footer className="bg-[#000A73] text-white border-t border-white/15 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top architectural grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 border-b border-white/15">
          {/* Col 1: Brand & Institutional Backing */}
          <div className="lg:col-span-5 py-12 lg:pr-10 lg:border-r border-white/15 space-y-5">
            <BrandLogo variant="dark" />
            <p className="text-sm text-slate-200 leading-relaxed max-w-md">
              {BRAND_INFO.institutionalDescription} Atención ágil en Pucallpa y cobertura
              SOAT electrónica a nivel nacional las 24 horas.
            </p>
            <div className="pt-2 space-y-1 text-xs text-slate-300 tabular-nums">
              <p className="font-semibold text-white">{BRAND_INFO.legalName}</p>
              <p>
                RUC {BRAND_INFO.ruc} · Activo en SUNAT desde {BRAND_INFO.sunatActiveSince}
              </p>
              <p className="text-slate-300/90">{BRAND_INFO.sbsNote}</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 py-10 lg:py-12 lg:px-8 border-t md:border-t-0 lg:border-r border-white/15 space-y-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Navegación
            </h2>
            <ul className="space-y-2.5 text-sm">
              {NAV_TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => onSelectTab(tab.id)}
                    className="text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={BRAND_INFO.apesegUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-200 hover:text-white transition-colors"
                >
                  <span>Verificar SOAT en APESEG</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Social */}
          <div className="lg:col-span-4 py-10 lg:py-12 lg:pl-8 border-t lg:border-t-0 border-white/15 space-y-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Canales Oficiales
            </h2>
            <div className="space-y-3 text-sm text-slate-200 tabular-nums">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" strokeWidth={1.5} />
                <span>
                  WhatsApp SOAT 24/7: <strong className="text-white">{BRAND_INFO.whatsappDisplay}</strong>
                </span>
              </a>
              <a
                href={BRAND_INFO.phoneCentralHref}
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" strokeWidth={1.5} />
                <span>
                  Central Asesoría: {BRAND_INFO.phoneCentralDisplay} · Fijo {BRAND_INFO.landlineDisplay}
                </span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.emails[0]}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" strokeWidth={1.5} />
                <span className="break-all">{BRAND_INFO.emails[0]}</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-300 shrink-0" strokeWidth={1.5} />
                <span>{BRAND_INFO.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-200">
              <a
                href={BRAND_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4 decoration-white/30"
              >
                Facebook
              </a>
              <a
                href={BRAND_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4 decoration-white/30"
              >
                Instagram ({BRAND_INFO.social.instagramHandle})
              </a>
              <a
                href={BRAND_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4 decoration-white/30"
              >
                TikTok ({BRAND_INFO.social.tiktokHandle})
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar (Peruvian Law N° 29733 + Libro de Reclamaciones) */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs text-slate-300">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {BRAND_INFO.legalName} — {BRAND_INFO.digitalStore}. Perú.
            </p>
            <p>
              Desarrollado por{' '}
              <a
                href="https://github.com/GersonMera"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline underline-offset-2 hover:text-sky-300 transition-colors"
              >
                GersonMera
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenLegal('datos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Protección de Datos (Ley N° 29733)
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terminos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Términos de Servicio Digital
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('reembolso')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Reembolso SOAT
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('reclamaciones')}
              className="font-semibold text-white border border-white/35 px-3 py-1.5 hover:bg-white hover:text-[#000A73] transition-colors cursor-pointer"
            >
              Libro de Reclamaciones
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
