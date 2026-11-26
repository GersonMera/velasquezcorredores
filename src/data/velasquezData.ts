export type TabId =
  | 'inicio'
  | 'cotizar-soat'
  | 'otros-seguros'
  | 'verifica-faq'
  | 'nosotros-contacto';

export type VehicleCategoryId =
  | 'auto'
  | 'mototaxi'
  | 'pickup'
  | 'furgoneta'
  | 'moto'
  | 'camion';

export type InsurerId = 'la-positiva' | 'pacifico' | 'mapfre';

export type VehicleUsage = 'particular' | 'transporte';

export type LegalDocId = 'datos' | 'terminos' | 'reembolso' | 'reclamaciones';

export interface VehicleTariff {
  id: VehicleCategoryId;
  name: string;
  shortName: string;
  price: number | null;
  priceNote: string;
  subtitle: string;
  defaultUsage: VehicleUsage;
  highlightLocal?: boolean;
  examplePlate: string;
}

export interface InsurerInfo {
  id: InsurerId;
  name: string;
  tagline: string;
  logoSrc: string;
  emissionChannel: string;
  coverageScope: string;
}

export const MEDIA_ASSETS = {
  heroHighway: '/src/assets/images/hero_pucallpa_highway_1795480071852.jpg',
  heroVideoMp4: '/src/assets/videos/hero_timelapse_city.mp4',
  heroVideoWebm: '/src/assets/videos/hero_timelapse_city.webm',
  heroVideoPoster: '/src/assets/videos/hero_timelapse_poster.jpg',
  mototaxiPucallpa: '/src/assets/images/mototaxi_pucallpa_1795480076590.jpg',
  segurosFlota: '/src/assets/images/seguros_vehicular_flota_1795480074338.jpg',
  oficinaCorredores: '/src/assets/images/oficina_corredores_pucallpa_1795480073865.jpg',
  originalVerificaBanner: '/src/assets/images/original/banner_verifica.jpg',
  originalLogoPositiva: '/src/assets/images/original/aseguradora_1_positiva.jpg',
  originalLogoPacifico: '/src/assets/images/original/aseguradora_2_pacifico.jpg',
  originalLogoMapfre: '/src/assets/images/original/aseguradora_3_mapfre.jpg',
} as const;

export interface OtherInsuranceLine {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  coverages: string[];
  idealFor: string;
}

export interface FaqItem {
  id: string;
  category: 'emision' | 'coberturas' | 'siniestros' | 'circulacion';
  question: string;
  answer: string;
}

export const BRAND_INFO = {
  commercialName: 'Velasquez Corredores de Seguros',
  legalName: 'Velasquez Corredores de Seguros E.I.R.L.',
  digitalStore: 'SOATVELASQUEZ.COM',
  alternateStoreName: 'Cas del SOAT',
  managerName: 'Davi Antonino Velasquez Mejia',
  ruc: '20393852799',
  sunatActiveSince: '20/11/2012',
  sbsReference: 'N° J-0739',
  sbsScope: 'Seguros Generales y de Personas (Supervisado por SBS)',
  sbsNote: 'Intermediario habilitado ante la SBS con código de registro J-0739',
  slogan: 'Tu vehículo protegido, tu tranquilidad garantizada con Velasquez Corredores de Seguros',
  heroHeadline: 'Tu vehículo protegido, tu tranquilidad garantizada',
  institutionalDescription:
    'Somos una tienda de venta de SOAT digital con el respaldo de Velasquez Corredores de Seguros E.I.R.L.',
  whatsappNumberRaw: '51958506048',
  whatsappDisplay: '+51 958 506 048',
  whatsappBaseUrl: 'https://wa.me/51958506048',
  phoneCentralDisplay: '+51 950 672 922',
  phoneCentralHref: 'tel:+51950672922',
  landlineDisplay: '(061) 576880',
  landlineHref: 'tel:+5161576880',
  emails: ['velasquezcorredores@gmail.com', 'gerencia@velasquezcorredores.com'],
  address: 'Jr. Tarapacá N° 1025 (Mz. 08 Lote 07), Urb. Cercado de Pucallpa, Callería, Coronel Portillo, Ucayali',
  postalCode: '25000',
  addressNote: 'Domicilio fiscal y oficina en Pucallpa (Código Postal 25000. Ref. en tienda digital: Jr. Tarapacá 10125)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jr.+Tarapaca+1025+Pucallpa+Ucayali+Peru',
  hoursDigital: 'Tienda Digital SOAT: Abierto 24/7 todos los días',
  hoursOffice: 'Oficina Física: Lunes a Viernes 9:00 a. m. – 5:00 p. m.',
  hoursOfficeNote: 'Atención presencial en Jr. Tarapacá 1025 y citas coordinadas',
  apesegUrl: 'https://www.apeseg.org.pe/consultas-soat/',
  social: {
    facebook: 'https://www.facebook.com/velasquezcorredoresdeseguros',
    instagram: 'https://www.instagram.com/velasquez_corredores_de_seguro',
    instagramHandle: '@velasquez_corredores_de_seguro',
    tiktok: 'https://www.tiktok.com/@velasquezcorredores',
    tiktokHandle: '@velasquezcorredores',
  },
} as const;

export const NAV_TABS: { id: TabId; label: string; shortLabel: string; hash: string }[] = [
  { id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', hash: '#inicio' },
  { id: 'cotizar-soat', label: 'Cotizar SOAT', shortLabel: 'Cotizar SOAT', hash: '#cotizar-soat' },
  { id: 'otros-seguros', label: 'Otros Seguros', shortLabel: 'Otros Seguros', hash: '#otros-seguros' },
  { id: 'verifica-faq', label: 'Verifica y FAQ', shortLabel: 'Verifica y FAQ', hash: '#verifica-faq' },
  { id: 'nosotros-contacto', label: 'Nosotros y Contacto', shortLabel: 'Contacto', hash: '#nosotros-contacto' },
];

export const VEHICLE_TARIFFS: VehicleTariff[] = [
  {
    id: 'auto',
    name: 'SOAT Autos',
    shortName: 'Auto / Sedán',
    price: 70,
    priceNote: 'Desde S/ 70',
    subtitle: 'Automóviles particulares, sedán, hatchback y station wagon.',
    defaultUsage: 'particular',
    examplePlate: 'U1B-234',
  },
  {
    id: 'mototaxi',
    name: 'SOAT Mototaxi',
    shortName: 'Mototaxi',
    price: 80,
    priceNote: 'Desde S/ 80',
    subtitle: 'Solución clave para transporte local en Pucallpa y Ucayali.',
    defaultUsage: 'transporte',
    highlightLocal: true,
    examplePlate: '8421-AU',
  },
  {
    id: 'pickup',
    name: 'SOAT Camioneta Pick Up',
    shortName: 'Pick Up',
    price: 170,
    priceNote: 'Desde S/ 170',
    subtitle: 'Camionetas 4x2, 4x4, cabina simple y doble cabina.',
    defaultUsage: 'particular',
    examplePlate: 'P3R-819',
  },
  {
    id: 'furgoneta',
    name: 'SOAT Furgoneta',
    shortName: 'Furgoneta',
    price: 210,
    priceNote: 'Desde S/ 210',
    subtitle: 'Paneles, vans de reparto urbano y transporte comercial liviano.',
    defaultUsage: 'transporte',
    examplePlate: 'C7K-405',
  },
  {
    id: 'moto',
    name: 'SOAT Moto Lineal',
    shortName: 'Moto Lineal',
    price: 240,
    priceNote: 'Desde S/ 240',
    subtitle: 'Motocicletas lineales particulares y de movilidad diaria.',
    defaultUsage: 'particular',
    examplePlate: '5912-8U',
  },
  {
    id: 'camion',
    name: 'SOAT Camiones / Carga',
    shortName: 'Camión / Carga',
    price: null,
    priceNote: 'Cotizar según tonelaje y placa',
    subtitle: 'Vehículos pesados, volquetes, remolcadores y carga interprovincial.',
    defaultUsage: 'transporte',
    examplePlate: 'W4T-902',
  },
];

export const TARIFF_DISCLAIMER =
  'Precios referenciales vigentes sujetos a confirmación por número de placa, clase vehicular y tipo de uso.';

export const ALLIED_INSURERS: InsurerInfo[] = [
  {
    id: 'la-positiva',
    name: 'La Positiva',
    tagline: 'Seguros Generales',
    logoSrc: MEDIA_ASSETS.originalLogoPositiva,
    emissionChannel: 'Certificado SOAT electrónico con registro inmediato en APESEG.',
    coverageScope: 'Cobertura obligatoria a nivel nacional según normativa vigente.',
  },
  {
    id: 'pacifico',
    name: 'Pacífico',
    tagline: 'Seguros',
    logoSrc: MEDIA_ASSETS.originalLogoPacifico,
    emissionChannel: 'Emisión digital directa y respaldo en red nacional de clínicas.',
    coverageScope: 'Cobertura obligatoria a nivel nacional según normativa vigente.',
  },
  {
    id: 'mapfre',
    name: 'Mapfre',
    tagline: 'Perú',
    logoSrc: MEDIA_ASSETS.originalLogoMapfre,
    emissionChannel: 'Certificado electrónico verificable al instante desde tu celular.',
    coverageScope: 'Cobertura obligatoria a nivel nacional según normativa vigente.',
  },
];

export const EMISSION_STEPS = [
  {
    number: '01',
    title: 'Ingresa tu placa y elige aseguradora',
    description:
      'Selecciona la clase de tu vehículo, digita tu placa peruana y compara opciones entre La Positiva, Pacífico o Mapfre.',
  },
  {
    number: '02',
    title: 'Confirma y realiza tu pago seguro',
    description:
      'Un asesor valida tu placa al instante por WhatsApp 24/7 y te brinda los canales oficiales de pago de la corredora.',
  },
  {
    number: '03',
    title: 'Recibe tu certificado electrónico al instante',
    description:
      'Te enviamos el PDF oficial del SOAT digital listo para circular y verificable de inmediato en el portal de APESEG.',
  },
];

export const CIRCULATION_SERVICES = [
  {
    code: 'Nuevo',
    title: 'Trámite de Tarjeta de Circulación Nueva',
    description:
      'Asesoría documentaria para unidades de mototaxi y transporte urbano que solicitan su habilitación inicial ante la Municipalidad Provincial de Coronel Portillo.',
  },
  {
    code: 'Renovación',
    title: 'Renovación de Tarjeta de Circulación',
    description:
      'Orientación en requisitos vigentes, verificación de SOAT activo y gestión ordenada para evitar multas o interrupciones de ruta en Callería y Pucallpa.',
  },
  {
    code: 'Duplicado',
    title: 'Duplicado y Afiliación Vehicular',
    description:
      'Soporte para solicitud de duplicado por pérdida o deterioro, además de acompañamiento en procesos de afiliación vehicular para transportistas.',
  },
];

export const OTHER_INSURANCE_LINES: OtherInsuranceLine[] = [
  {
    id: 'vehicular-todo-riesgo',
    number: '01',
    title: 'Seguro Vehicular Todo Riesgo',
    category: 'Protección Automotriz Integral',
    summary:
      'A diferencia del SOAT (que cubre únicamente lesiones personales), esta póliza protege el valor de tu auto o camioneta ante accidentes, robos y daños materiales a terceros.',
    coverages: [
      'Daño propio por choque, vuelco e incendio',
      'Robo total o parcial de accesorios según plan',
      'Responsabilidad civil frente a terceros',
      'Asistencia vial, grúa y chofer de reemplazo según aseguradora',
    ],
    idealFor: 'Autos particulares, camionetas Pick Up y vehículos financiados.',
  },
  {
    id: 'seguros-salud',
    number: '02',
    title: 'Seguros de Salud',
    category: 'Bienestar Personal y Familiar',
    summary:
      'Planes médicos diseñados para proteger a tu familia con atención ambulatoria, hospitalaria, emergencias y red de clínicas afiliadas a nivel nacional.',
    coverages: [
      'Consultas médicas ambulatorias y exámenes de diagnóstico',
      'Hospitalización, cirugías y atención de emergencias',
      'Cobertura oncológica y maternidad según condiciones del plan',
      'Asesoría en elección de copagos y red de clínicas',
    ],
    idealFor: 'Personas independientes, familias y profesionales en Ucayali y todo el Perú.',
  },
  {
    id: 'seguro-multirriesgo',
    number: '03',
    title: 'Seguro Multirriesgo',
    category: 'Patrimonio, Comercio y Hogar',
    summary:
      'Resguarda tu vivienda, tienda comercial, almacén o equipamiento frente a imprevistos estructurales, incendios, robos y eventos de la naturaleza.',
    coverages: [
      'Incendio, rayo, explosión y daños por agua',
      'Robo de mercadería, mobiliario y equipos electrónicos',
      'Responsabilidad civil extracontractual del local',
      'Lucro cesante y continuidad operativa para negocios',
    ],
    idealFor: 'Comercios, ferreterías, boticas, depósitos y viviendas familiares.',
  },
  {
    id: 'seguros-empresariales',
    number: '04',
    title: 'Seguros Empresariales',
    category: 'Corporativo y Flotas',
    summary:
      'Estructuración técnica de pólizas obligatorias y patrimoniales para empresas, contratistas, transporte fluvial o terrestre y flotas de vehículos.',
    coverages: [
      'SCTR Salud y Pensión para personal operativo y obras',
      'Seguro de flotas vehiculares y transporte de carga',
      'Vida Ley y pólizas de responsabilidad civil general',
      'Acompañamiento técnico directo de corredora en siniestros',
    ],
    idealFor: 'Empresas constructoras, distribuidoras, transportistas y pymes en crecimiento.',
  },
];

export const SOAT_COVERAGES_SUMMARY = [
  {
    item: 'Fallecimiento',
    reference: 'Hasta 4 UIT por persona',
    detail: 'Indemnización a los beneficiarios legales en caso de fallecimiento producto de un accidente de tránsito.',
  },
  {
    item: 'Invalidez permanente',
    reference: 'Hasta 4 UIT por persona',
    detail: 'Cobertura proporcional al grado de incapacidad permanente evaluado según tabla legal vigente.',
  },
  {
    item: 'Incapacidad temporal',
    reference: 'Hasta 1 UIT por persona',
    detail: 'Compensación por días de descanso médico acreditado derivados del accidente de tránsito.',
  },
  {
    item: 'Gastos médicos',
    reference: 'Hasta 5 UIT por persona',
    detail: 'Atención de emergencia, hospitalización, medicinas y rehabilitación en centros de salud.',
  },
  {
    item: 'Gastos de sepelio',
    reference: 'Hasta 1 UIT por persona',
    detail: 'Reembolso o cobertura de gastos funerarios conforme a la normativa peruana del SOAT.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-electronico',
    category: 'emision',
    question: '¿El SOAT electrónico tiene la misma validez legal que el certificado físico en Perú?',
    answer:
      'Sí. En el Perú el SOAT electrónico cuenta con plena validez legal ante la Policía Nacional del Perú (PNP), SUTRAN y municipalidades. No necesitas llevar un papel impreso, aunque te entregamos el certificado en PDF para que lo conserves en tu celular y puedas consultarlo en el portal oficial de APESEG.',
  },
  {
    id: 'faq-tiempo',
    category: 'emision',
    question: '¿En cuánto tiempo recibo mi SOAT digital después de confirmar el pago?',
    answer:
      'Nuestra tienda digital atiende las 24 horas, los 7 días de la semana. Una vez validada la placa y confirmado el pago, la emisión del certificado electrónico se realiza en minutos y se registra en línea en la base de consultas de APESEG.',
  },
  {
    id: 'faq-accidente',
    category: 'siniestros',
    question: '¿Qué debo hacer en caso de accidente de tránsito si tengo SOAT?',
    answer:
      'Primero garantiza la atención médica inmediata de los heridos trasladándolos al establecimiento de salud más cercano e indicando el número de placa del vehículo. Luego realiza la denuncia policial en la comisaría de la jurisdicción y comunícate con la central de la aseguradora (La Positiva, Pacífico o Mapfre) o con nuestro equipo para orientarte.',
  },
  {
    id: 'faq-particular-transporte',
    category: 'coberturas',
    question: '¿Cuál es la diferencia entre uso particular y uso transporte al cotizar el SOAT?',
    answer:
      'El uso particular aplica a vehículos destinados a movilidad personal o familiar sin fines de lucro. El uso transporte o comercial aplica a mototaxis, taxis, reparto, furgonetas comerciales o carga. Declarar el uso real es indispensable para que la tarifa y la vigencia correspondan correctamente a tu tarjeta de propiedad y circulación.',
  },
  {
    id: 'faq-tarifas-referenciales',
    category: 'emision',
    question: '¿Por qué el precio final se confirma con el número de placa?',
    answer:
      'Las aseguradoras determinan la prima exacta según el historial, clase vehicular, uso declarado, región de circulación y, en el caso de camiones, el tonelaje registrado en SUNARP. Los precios publicados (desde S/ 70 para autos y S/ 80 para mototaxis) son referenciales y se confirman al instante antes de realizar tu pago.',
  },
  {
    id: 'faq-tarjeta-circulacion',
    category: 'circulacion',
    question: '¿Qué trámites de Tarjeta de Circulación asesoran en Pucallpa?',
    answer:
      'Brindamos orientación para solicitudes de Tarjeta de Circulación nueva, renovación y duplicado ante la Municipalidad Provincial de Coronel Portillo, así como soporte en afiliación vehicular para conductores de mototaxi y transporte local. Los requisitos y tasas se confirman directamente por WhatsApp.',
  },
];

export const LEGAL_DOCUMENTS: Record<
  Exclude<LegalDocId, 'reclamaciones'>,
  { title: string; subtitle: string; sections: { heading: string; body: string }[] }
> = {
  datos: {
    title: 'Política de Protección de Datos Personales',
    subtitle: 'Ley N° 29733 — República del Perú',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        body: 'Velasquez Corredores de Seguros E.I.R.L. (RUC 20393852799), con domicilio referencial en Jr. Tarapacá 1025, Callería, Pucallpa, recopila únicamente los datos necesarios (placa vehicular, nombre, teléfono y correo) para gestionar cotizaciones de SOAT electrónico, pólizas de seguros y asesoría en trámites vehiculares.',
      },
      {
        heading: '2. Finalidad y confidencialidad',
        body: 'La información proporcionada se emplea exclusivamente para consultar tarifas ante las aseguradoras aliadas (La Positiva, Pacífico y Mapfre), emitir certificados solicitados por el titular y brindar soporte postventa. No comercializamos bases de datos con terceros ajenos a la operación aseguradora.',
      },
      {
        heading: '3. Derechos ARCO',
        body: 'Conforme a la Ley N° 29733 y su Reglamento, el titular puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo a gerencia@velasquezcorredores.com, velasquezcorredores@gmail.com o comunicándose al +51 950 672 922.',
      },
      {
        heading: '4. Uso de cookies y medición',
        body: 'El sitio puede emplear cookies técnicas esenciales para su funcionamiento y herramientas de análisis estadístico de tráfico con el fin de mejorar la experiencia de cotización, sin almacenar datos bancarios ni contraseñas.',
      },
    ],
  },
  terminos: {
    title: 'Términos y Condiciones del Servicio Digital',
    subtitle: 'SOATVELASQUEZ.COM — Intermediación de Seguros',
    sections: [
      {
        heading: '1. Naturaleza del servicio',
        body: 'SOATVELASQUEZ.COM es el canal digital de atención de Velasquez Corredores de Seguros E.I.R.L. para la cotización y gestión de emisión de SOAT electrónico (producto digital sin envío físico) y seguros patrimoniales o personales en el territorio peruano.',
      },
      {
        heading: '2. Veracidad de los datos',
        body: 'El solicitante es responsable de verificar que el número de placa, clase vehicular y tipo de uso informados coincidan con su Tarjeta de Identificación Vehicular (TIV). Las tarifas mostradas en la web son referenciales y se confirman antes del pago.',
      },
      {
        heading: '3. Vigencia y validación',
        body: 'La cobertura y vigencia del SOAT electrónico se rigen por las condiciones de la compañía de seguros emisora (La Positiva, Pacífico o Mapfre) y la normativa del Ministerio de Transportes y Comunicaciones (MTC). El cliente puede verificar su vigencia en el portal oficial de APESEG.',
      },
    ],
  },
  reembolso: {
    title: 'Política de Anulación y Reembolso SOAT Electrónico',
    subtitle: 'Certificados Digitales de Emisión Inmediata',
    sections: [
      {
        heading: '1. Antes de la emisión del certificado',
        body: 'Si realizaste un pago y por incompatibilidad de placa, error de clase vehicular o desistimiento previo aún no se ha emitido el certificado electrónico en el sistema de la aseguradora, procede la devolución íntegra del importe por el mismo canal de pago.',
      },
      {
        heading: '2. Después de la emisión del certificado',
        body: 'Una vez emitido y registrado el SOAT electrónico en la aseguradora y en APESEG, cualquier solicitud de anulación, endoso de corrección o extorno queda sujeta estrictamente a los plazos y procedimientos administrativos de la aseguradora emisora.',
      },
      {
        heading: '3. Canal de atención',
        body: 'Para consultas sobre correcciones o devoluciones, comunícate de inmediato con nuestro WhatsApp +51 958 506 048 o a los correos gerencia@velasquezcorredores.com / velasquezcorredores@gmail.com indicando tu número de placa y comprobante.',
      },
    ],
  },
};
