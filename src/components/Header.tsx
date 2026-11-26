import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { BRAND_INFO, NAV_TABS, TabId } from '../data/velasquezData';
import { buildGeneralWhatsAppUrl } from '../utils/quoteLogic';
import { BrandLogo } from './BrandLogo';
import { collapseVariants, SWISS_SPRING_UNDERLINE } from './MotionPrimitives';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (tab: TabId) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const whatsappDirectUrl = buildGeneralWhatsAppUrl('Hola SOATVELASQUEZ.COM! Necesito asesoría.');

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Desktop & Primary Bar (strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Unified SVG Brand Lockup */}
        <button
          type="button"
          onClick={() => handleNavigate('inicio')}
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006DF8] shrink-0"
          aria-label="Ir a Inicio — Velasquez Corredores de Seguros"
        >
          <BrandLogo variant="light" compact className="h-8 sm:h-9" />
        </button>

        {/* Zone 2: 5 Primary Navigation Tabs (Desktop) */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleNavigate(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#14568D] font-semibold'
                    : 'text-[#535353] hover:text-[#000A73]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-underline"
                    transition={SWISS_SPRING_UNDERLINE}
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-[#14568D]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Direct WhatsApp + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp SOAT 24/7 +51 958 506 048"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#14568D] border border-[#14568D]/30 hover:bg-[#F4F6FA] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => handleNavigate('cotizar-soat')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cotiza tu SOAT
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-slate-200 text-[#101010] hover:bg-[#F4F6FA] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.8} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            variants={collapseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="px-4 py-5 space-y-4">
              <div className="divide-y divide-slate-200 border border-slate-200">
                {NAV_TABS.map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleNavigate(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#F4F6FA] text-[#14568D] font-semibold'
                          : 'text-[#101010] hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-xs font-mono text-[#535353] tabular-nums">
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNavigate('cotizar-soat')}
                  className="py-3 px-4 text-center text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                >
                  Cotiza tu SOAT
                </button>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 text-center text-sm font-semibold text-[#14568D] border border-[#14568D] hover:bg-[#F4F6FA] transition-colors"
                >
                  WhatsApp 24/7
                </a>
              </div>

              <p className="text-xs text-[#535353] tabular-nums">
                Central asesoría: {BRAND_INFO.phoneCentralDisplay} · RUC {BRAND_INFO.ruc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
