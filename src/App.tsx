import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { LegalDocId, NAV_TABS, TabId, VehicleCategoryId } from './data/velasquezData';
import {
  buildGeneralWhatsAppUrl,
  getVehicleById,
  parseTabFromHash,
} from './utils/quoteLogic';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { VirtualAssistant } from './components/VirtualAssistant';
import { pageTransitionVariants } from './components/MotionPrimitives';
import { InicioView, SharedQuoteState } from './views/InicioView';
import { CotizarSoatView } from './views/CotizarSoatView';
import { OtrosSegurosView } from './views/OtrosSegurosView';
import { VerificaFaqView } from './views/VerificaFaqView';
import { NosotrosContactoView } from './views/NosotrosContactoView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window === 'undefined') return 'inicio';
    return parseTabFromHash(window.location.hash);
  });

  const [quote, setQuote] = useState<SharedQuoteState>({
    vehicleId: 'auto',
    plate: '',
    insurerId: 'la-positiva',
    usage: 'particular',
    tonnage: '',
  });

  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocId | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(parseTabFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    const targetHash = NAV_TABS.find((t) => t.id === tab)?.hash ?? '#inicio';
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  };

  const handleUpdateQuote = (patch: Partial<SharedQuoteState>) => {
    setQuote((prev) => ({ ...prev, ...patch }));
  };

  const handleStartGuidedQuote = (vehicleId?: VehicleCategoryId) => {
    if (vehicleId) {
      const veh = getVehicleById(vehicleId);
      setQuote((prev) => ({ ...prev, vehicleId, usage: veh.defaultUsage }));
    }
    handleSelectTab('cotizar-soat');
  };

  const mobileWhatsAppUrl = buildGeneralWhatsAppUrl('Hola SOATVELASQUEZ.COM!');

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#101010]">
        <Header activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* Header offset: h-16 (64px) on mobile/tablet, h-20 (80px) on desktop */}
        <main className="flex-1 pt-16 sm:pt-20 lg:pt-20 overflow-x-clip">
          <AnimatePresence
            mode="wait"
            onExitComplete={() =>
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
            }
          >
            <motion.div
              key={activeTab}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeTab === 'inicio' && (
                <InicioView
                  quote={quote}
                  onUpdateQuote={handleUpdateQuote}
                  onSelectTab={handleSelectTab}
                  onStartGuidedQuote={handleStartGuidedQuote}
                />
              )}
              {activeTab === 'cotizar-soat' && (
                <CotizarSoatView quote={quote} onUpdateQuote={handleUpdateQuote} />
              )}
              {activeTab === 'otros-seguros' && <OtrosSegurosView />}
              {activeTab === 'verifica-faq' && <VerificaFaqView />}
              {activeTab === 'nosotros-contacto' && (
                <NosotrosContactoView onOpenLegal={setLegalModalDoc} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onSelectTab={handleSelectTab} onOpenLegal={setLegalModalDoc} />

        {/* Compact Sticky Mobile Bottom Bar (Cotizar SOAT + WhatsApp 24/7) */}
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 grid grid-cols-2 gap-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
          role="region"
          aria-label="Acciones rápidas móviles"
        >
          <button
            type="button"
            onClick={() => handleSelectTab('cotizar-soat')}
            className={`py-2.5 px-3 text-xs font-semibold text-white transition-colors whitespace-nowrap ${
              activeTab === 'cotizar-soat'
                ? 'bg-[#14568D] hover:bg-[#000A73]'
                : 'bg-[#A81A26] hover:bg-[#8E1520]'
            }`}
          >
            {activeTab === 'cotizar-soat' ? 'Asistente SOAT' : 'Cotizar SOAT'}
          </button>
          <a
            href={mobileWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#14568D] bg-white border border-[#14568D] hover:bg-[#F4F6FA] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.7} aria-hidden="true" />
            <span>WhatsApp 24/7</span>
          </a>
        </div>

        <VirtualAssistant onSelectTab={handleSelectTab} />
        <LegalModal docId={legalModalDoc} onClose={() => setLegalModalDoc(null)} />
      </div>
    </MotionConfig>
  );
}
