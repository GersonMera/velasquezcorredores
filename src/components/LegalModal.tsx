import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { BRAND_INFO, LEGAL_DOCUMENTS, LegalDocId } from '../data/velasquezData';
import {
  generateClaimTicketCode,
  ReclamacionFormData,
  validateReclamacionForm,
} from '../utils/quoteLogic';
import {
  microSwapVariants,
  modalBackdropVariants,
  modalPanelVariants,
} from './MotionPrimitives';

interface LegalModalProps {
  docId: LegalDocId | null;
  onClose: () => void;
}

const INITIAL_CLAIM: ReclamacionFormData = {
  fullName: '',
  documentNumber: '',
  phone: '',
  email: '',
  claimType: 'reclamo',
  detail: '',
};

export const LegalModal: React.FC<LegalModalProps> = ({ docId, onClose }) => {
  const [claimForm, setClaimForm] = useState<ReclamacionFormData>(INITIAL_CLAIM);
  const [claimErrors, setClaimErrors] = useState<Record<string, string>>({});
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (!docId) return;
    setClaimErrors({});
    setSubmittedTicket(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [docId, onClose]);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateReclamacionForm(claimForm);
    setClaimErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmittedTicket(generateClaimTicketCode());
      setClaimForm(INITIAL_CLAIM);
    }
  };

  const isReclamaciones = docId === 'reclamaciones';
  const staticDoc = docId && !isReclamaciones ? LEGAL_DOCUMENTS[docId] : null;

  return (
    <AnimatePresence>
      {docId && (
        <motion.div
          key="legal-modal-backdrop"
          variants={modalBackdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-[#000A73]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key={docId}
            variants={modalPanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white border border-slate-200 w-full max-w-2xl max-h-[88vh] flex flex-col"
          >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-[#F4F6FA]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#14568D]">
              Marco Legal Peruano · RUC {BRAND_INFO.ruc}
            </p>
            <h2
              id="legal-modal-title"
              className="mt-1 text-xl font-bold text-[#101010]"
            >
              {isReclamaciones ? 'Libro de Reclamaciones Virtual' : staticDoc?.title}
            </h2>
            <p className="mt-0.5 text-xs text-[#535353]">
              {isReclamaciones
                ? `${BRAND_INFO.legalName} — Código de Protección y Defensa del Consumidor (Ley N° 29571)`
                : staticDoc?.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana legal"
            className="w-9 h-9 flex items-center justify-center border border-slate-200 bg-white text-[#101010] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.6} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {staticDoc ? (
            <div className="space-y-5">
              {staticDoc.sections.map((section) => (
                <div key={section.heading} className="space-y-1.5">
                  <h3 className="text-sm font-bold text-[#14568D]">{section.heading}</h3>
                  <p className="text-sm text-[#535353] leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          ) : submittedTicket ? (
            <motion.div
              key="claim-submitted"
              variants={microSwapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="border border-[#14568D]/30 bg-[#F4F6FA] p-6 space-y-3"
            >
              <div className="flex items-center gap-2.5 text-[#14568D]">
                <CheckCircle2 className="w-5 h-5" strokeWidth={1.6} />
                <h3 className="text-base font-bold text-[#101010]">
                  Hoja de reclamación registrada
                </h3>
              </div>
              <p className="text-sm text-[#535353]">
                Tu registro ha sido generado con el código{' '}
                <strong className="font-mono text-[#000A73] tabular-nums">{submittedTicket}</strong>.
                Conforme a la normativa peruana vigente, la atención y respuesta se emite en un plazo
                máximo de 15 días hábiles al correo indicado.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#14568D] hover:bg-[#000A73] transition-colors cursor-pointer"
              >
                Cerrar ventana
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleClaimSubmit} noValidate className="space-y-4">
              <p className="text-xs text-[#535353] leading-relaxed">
                <strong>Reclamo:</strong> disconformidad relacionada con los servicios de corretaje o
                emisión. <strong>Queja:</strong> disconformidad no relacionada directamente con el
                producto, sino con la atención al público.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="claim-name" className="block text-xs font-semibold text-[#101010] mb-1">
                    Nombres y apellidos
                  </label>
                  <input
                    id="claim-name"
                    type="text"
                    value={claimForm.fullName}
                    onChange={(e) => setClaimForm({ ...claimForm, fullName: e.target.value })}
                    placeholder="Ej. Juan Pérez Ríos"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                  />
                  {claimErrors.fullName && (
                    <p className="mt-1 text-xs text-[#A81A26]">{claimErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="claim-doc" className="block text-xs font-semibold text-[#101010] mb-1">
                    DNI / CE / RUC
                  </label>
                  <input
                    id="claim-doc"
                    type="text"
                    value={claimForm.documentNumber}
                    onChange={(e) => setClaimForm({ ...claimForm, documentNumber: e.target.value })}
                    placeholder="Ej. 45678912"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none tabular-nums"
                  />
                  {claimErrors.documentNumber && (
                    <p className="mt-1 text-xs text-[#A81A26]">{claimErrors.documentNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="claim-phone" className="block text-xs font-semibold text-[#101010] mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="claim-phone"
                    type="tel"
                    value={claimForm.phone}
                    onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                    placeholder="Ej. 958 506 048"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none tabular-nums"
                  />
                  {claimErrors.phone && (
                    <p className="mt-1 text-xs text-[#A81A26]">{claimErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="claim-email" className="block text-xs font-semibold text-[#101010] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    id="claim-email"
                    type="email"
                    value={claimForm.email}
                    onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                    placeholder="correo@ejemplo.pe"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                  />
                  {claimErrors.email && (
                    <p className="mt-1 text-xs text-[#A81A26]">{claimErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#101010] mb-1.5">Tipo de registro</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['reclamo', 'queja'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setClaimForm({ ...claimForm, claimType: type })}
                      className={`py-2 px-3 text-sm font-medium border transition-colors cursor-pointer ${
                        claimForm.claimType === type
                          ? 'bg-[#14568D] text-white border-[#14568D]'
                          : 'bg-white text-[#101010] border-slate-300 hover:bg-[#F4F6FA]'
                      }`}
                    >
                      {type === 'reclamo' ? 'Reclamo' : 'Queja'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="claim-detail" className="block text-xs font-semibold text-[#101010] mb-1">
                  Detalle y pedido concreto
                </label>
                <textarea
                  id="claim-detail"
                  rows={4}
                  value={claimForm.detail}
                  onChange={(e) => setClaimForm({ ...claimForm, detail: e.target.value })}
                  placeholder="Describe lo sucedido, fecha, número de placa si aplica y tu solicitud..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:border-[#14568D] focus:outline-none"
                />
                {claimErrors.detail && (
                  <p className="mt-1 text-xs text-[#A81A26]">{claimErrors.detail}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-[#535353] border border-slate-300 hover:bg-[#F4F6FA] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors cursor-pointer"
                >
                  Registrar en Libro de Reclamaciones
                </button>
              </div>
            </form>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
