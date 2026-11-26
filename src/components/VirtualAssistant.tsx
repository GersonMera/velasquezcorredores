import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, ExternalLink, MessageSquare, Send, X } from 'lucide-react';
import { BRAND_INFO, TabId, VEHICLE_TARIFFS } from '../data/velasquezData';
import { buildGeneralWhatsAppUrl, formatTariffDisplay } from '../utils/quoteLogic';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'whatsapp' | 'tab' | 'external';
    label: string;
    href?: string;
    tab?: TabId;
  };
}

interface VirtualAssistantProps {
  onSelectTab: (tab: TabId) => void;
}

function getCurrentTimeLabel(): string {
  return new Date().toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildAssistantResponse(rawInput: string): Omit<ChatMessage, 'id' | 'sender' | 'time'> {
  const q = rawInput.toLowerCase().trim();

  if (/(precio|tarifa|costo|cuanto|cuánto|vale|mototaxi|auto|camion|moto|pickup|furgoneta)/.test(q)) {
    const summary = VEHICLE_TARIFFS.map(
      (v) => `- ${v.shortName}: ${formatTariffDisplay(v.price)}`
    ).join('\n');
    return {
      text: `Nuestras tarifas referenciales de SOAT digital son:\n${summary}\n\nEl precio exacto se confirma con tu número de placa.`,
      action: {
        type: 'tab',
        label: 'Ir al cotizador guiado',
        tab: 'cotizar-soat',
      },
    };
  }

  if (/(comprar|cotizar|emitir|sacar|adquirir|soat)/.test(q)) {
    return {
      text: 'Puedes cotizar y emitir tu SOAT electrónico en 4 pasos rápidos con La Positiva, Pacífico o Mapfre, y recibirlo al instante por WhatsApp 24/7.',
      action: {
        type: 'tab',
        label: 'Cotizar SOAT ahora',
        tab: 'cotizar-soat',
      },
    };
  }

  if (/(verificar|apeseg|vigencia|validez|validar|consulta)/.test(q)) {
    return {
      text: 'Todo SOAT electrónico emitido por nosotros se registra en línea en la base oficial de APESEG. Puedes comprobar la vigencia de tu placa directamente en su portal.',
      action: {
        type: 'external',
        label: 'Verificar en APESEG',
        href: BRAND_INFO.apesegUrl,
      },
    };
  }

  if (/(circulacion|circulación|afiliacion|afiliación|municipalidad|coronel portillo|duplicado)/.test(q)) {
    return {
      text: 'Brindamos asesoría en Pucallpa para trámites de Tarjeta de Circulación (nuevo, renovación y duplicado) y afiliación vehicular para mototaxis y transporte urbano.',
      action: {
        type: 'whatsapp',
        label: 'Consultar trámite por WhatsApp',
        href: buildGeneralWhatsAppUrl(
          'Hola SOATVELASQUEZ.COM! Necesito asesoría sobre Tarjeta de Circulación en Pucallpa.'
        ),
      },
    };
  }

  if (/(direccion|dirección|ubicacion|ubicación|oficina|horario|telefono|teléfono|correo|pucallpa|donde|dónde)/.test(q)) {
    return {
      text: `Nuestra tienda digital atiende 24/7. Oficina física en ${BRAND_INFO.address} (Lunes a Viernes 9:00 a. m. - 5:00 p. m.). Central: ${BRAND_INFO.phoneCentralDisplay}.`,
      action: {
        type: 'tab',
        label: 'Ver Nosotros y Contacto',
        tab: 'nosotros-contacto',
      },
    };
  }

  return {
    text: 'Para brindarte atención personalizada sobre tu consulta o placa, comunícate directamente con un asesor en nuestro canal oficial de WhatsApp 24/7.',
    action: {
      type: 'whatsapp',
      label: 'Hablar con un asesor',
      href: buildGeneralWhatsAppUrl(
        `Hola SOATVELASQUEZ.COM! Tengo la siguiente consulta: ${rawInput.trim()}`
      ),
    },
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: 'Hola. Soy el asistente virtual de Velasquez Corredores de Seguros. ¿En qué te puedo ayudar hoy?',
    time: getCurrentTimeLabel(),
  },
];

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ onSelectTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const sendUserQuery = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (typingTimerRef.current !== null) {
      window.clearTimeout(typingTimerRef.current);
    }

    const now = getCurrentTimeLabel();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const replyData = buildAssistantResponse(trimmed);
    typingTimerRef.current = window.setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyData.text,
        time: getCurrentTimeLabel(),
        action: replyData.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      typingTimerRef.current = null;
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserQuery(input);
  };

  const advisorWhatsAppUrl = buildGeneralWhatsAppUrl(
    'Hola SOATVELASQUEZ.COM! Quiero hablar con un asesor.'
  );

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual'}
        aria-expanded={isOpen}
        className="fixed bottom-16 right-4 lg:bottom-6 lg:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#000A73] hover:bg-[#14568D] text-white shadow-lg border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5" strokeWidth={1.8} />
        ) : (
          <MessageSquare className="w-5 h-5" strokeWidth={1.8} />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Asistente Virtual Soporte Velásquez"
            className="fixed bottom-30 right-4 lg:bottom-22 lg:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[370px] max-h-[72vh] bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#000A73] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#14568D] border border-white/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">Soporte Velásquez</p>
                  <p className="text-[11px] text-sky-200">Asistente Virtual · Atención 24/7</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="p-1.5 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F4F6FA]"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-[#14568D] text-white'
                          : 'bg-white text-[#101010] border border-slate-200'
                      }`}
                    >
                      {msg.text}

                      {msg.action && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200">
                          {msg.action.type === 'tab' && msg.action.tab ? (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectTab(msg.action!.tab!);
                                setIsOpen(false);
                              }}
                              className="text-xs font-semibold text-[#14568D] hover:text-[#000A73] underline underline-offset-2 cursor-pointer"
                            >
                              {msg.action.label}
                            </button>
                          ) : (
                            <a
                              href={msg.action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#A81A26] hover:text-[#8E1520] underline underline-offset-2"
                            >
                              <span>{msg.action.label}</span>
                              <ExternalLink className="w-3 h-3" strokeWidth={1.8} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="mt-1 text-[10px] text-[#535353] tabular-nums">
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start" aria-live="polite" aria-label="El asistente está escribiendo">
                  <div className="px-3.5 py-2.5 bg-white border border-slate-200 flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full bg-[#14568D]"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{
                          duration: 0.75,
                          repeat: Infinity,
                          delay: dot * 0.15,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Reply Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => sendUserQuery('Ver precios')}
                  className="px-3 py-1.5 text-xs font-semibold text-[#14568D] bg-white border border-[#14568D]/40 hover:bg-[#14568D] hover:text-white transition-colors cursor-pointer"
                >
                  Ver precios
                </button>
                <button
                  type="button"
                  onClick={() => sendUserQuery('Comprar SOAT')}
                  className="px-3 py-1.5 text-xs font-semibold text-[#14568D] bg-white border border-[#14568D]/40 hover:bg-[#14568D] hover:text-white transition-colors cursor-pointer"
                >
                  Comprar SOAT
                </button>
                <button
                  type="button"
                  onClick={() => sendUserQuery('Verificar SOAT')}
                  className="px-3 py-1.5 text-xs font-semibold text-[#14568D] bg-white border border-[#14568D]/40 hover:bg-[#14568D] hover:text-white transition-colors cursor-pointer"
                >
                  Verificar APESEG
                </button>
                <a
                  href={advisorWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#A81A26] hover:bg-[#8E1520] transition-colors"
                >
                  <span>Hablar con asesor</span>
                  <ExternalLink className="w-3 h-3" strokeWidth={1.8} />
                </a>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta aquí..."
                aria-label="Escribe tu consulta"
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[#F4F6FA] border border-slate-300 text-[#101010] focus:bg-white focus:border-[#14568D] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Enviar consulta"
                className="p-2.5 bg-[#14568D] hover:bg-[#000A73] text-white transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
