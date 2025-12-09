export type ModuleStatus = 'ready' | 'design' | 'sync' | 'queued';

export type ModuleMetric = {
  label: string;
  value: string;
};

export type ModuleBlueprintAction = {
  label: string;
  route: string;
  emphasis?: 'primary' | 'secondary';
};

export type ModuleBlueprint = {
  key: string;
  title: string;
  description: string;
  status: ModuleStatus;
  statusDetail: string;
  metrics: ModuleMetric[];
  actions: ModuleBlueprintAction[];
};

export type HeroMetric = {
  label: string;
  value: string;
  helper: string;
};

export type MobileHighlightCard = {
  key: string;
  title: string;
  body: string;
  badge: string;
  tone: 'accent' | 'teal' | 'aqua' | 'neutral';
};

export const designTokens = {
  colors: {
    surface: '#FFFFFF',
    ink: '#05070b',
    neutral: '#444444',
    accent: '#ed1d24',
    teal: '#38a69a',
    aqua: '#3d9bb5',
    backdrop: '#f6f8fb',
    borderLight: 'rgba(7, 23, 41, 0.08)',
    borderStrong: 'rgba(7, 23, 41, 0.16)',
  },
  gradients: {
    hero: 'linear-gradient(120deg, #ed1d24, #3d9bb5)',
    aqua: 'linear-gradient(160deg, #38a69a, #3d9bb5)',
  },
  radius: {
    xs: '6px',
    sm: '12px',
    md: '20px',
    pill: '999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadow: {
    soft: '0 25px 45px rgba(5, 7, 11, 0.08)',
    crisp: '0 8px 18px rgba(5, 7, 11, 0.12)',
  },
};

export const moduleStatusTokens: Record<
  ModuleStatus,
  { label: string; color: string }
> = {
  ready: { label: 'Ready for dev', color: designTokens.colors.teal },
  design: { label: 'In design', color: designTokens.colors.aqua },
  sync: { label: 'Sync required', color: designTokens.colors.accent },
  queued: { label: 'In backlog', color: designTokens.colors.neutral },
};

export const appMeta = {
  productName: 'Helios FSM',
  tagline: 'Prism-inspired orchestration layer',
  description:
    'MERN + React Native platform covering dispatch, offline jobs, planograms, pricing, and mobility.',
};

export const heroMetrics: HeroMetric[] = [
  {
    label: 'Job types templated',
    value: '6',
    helper: 'Pool, DSD, Landscaping, Pest, Windows, Cleaning',
  },
  {
    label: 'Offline-first flows',
    value: '12',
    helper: 'Checklists, planograms, barcodes, PDF ops',
  },
  {
    label: 'AWS targets',
    value: '3',
    helper: 'ECS API, S3+CF web, S3 media',
  },
];

export const adminBlueprint: ModuleBlueprint[] = [
  {
    key: 'dispatch',
    title: 'Dispatch Board',
    description:
      'Live map + timeline with GPS trails, crew load insights, and role-aware job assignment.',
    status: 'ready',
    statusDetail: 'Calendar, drag-to-assign, socket hydration baseline covered.',
    metrics: [
      { label: 'Active territories', value: '8' },
      { label: 'Real-time pings', value: '15 sec' },
    ],
    actions: [
      { label: 'Open board', route: '/dispatch', emphasis: 'primary' },
      { label: 'Manage crews', route: '/users' },
    ],
  },
  {
    key: 'inventory',
    title: 'Inventory & Planograms',
    description:
      'Planogram builder, inventory custom fields, barcode cache, and QuickBooks sync hooks.',
    status: 'design',
    statusDetail: 'Builder UX + offline caching flows specced for DSD.',
    metrics: [
      { label: 'Assigned planograms', value: '42' },
      { label: 'Barcode mappings', value: '3.2K' },
    ],
    actions: [
      { label: 'Launch builder', route: '/planograms', emphasis: 'primary' },
      { label: 'Barcode settings', route: '/inventory/barcodes' },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing & Templates',
    description:
      'Client/location-aware price lists, reusable job templates, and checklist governance.',
    status: 'ready',
    statusDetail: 'Template versions + recurrence logic outlined.',
    metrics: [
      { label: 'Price lists', value: '18' },
      { label: 'Checklist versions', value: '27' },
    ],
    actions: [
      { label: 'Price matrix', route: '/pricing', emphasis: 'primary' },
      { label: 'Checklist studio', route: '/checklists' },
    ],
  },
  {
    key: 'reports',
    title: 'Reporting & Exports',
    description:
      'Ad-hoc reporting, CSV/PDF exporters, and RBAC-aware bulk invoice packaging.',
    status: 'sync',
    statusDetail: 'Awaiting integration wiring + background job queue.',
    metrics: [
      { label: 'Report widgets', value: '24' },
      { label: 'Export types', value: '11' },
    ],
    actions: [
      { label: 'Build report', route: '/reports', emphasis: 'primary' },
      { label: 'Export console', route: '/exports' },
    ],
  },
  {
    key: 'integrations',
    title: 'Zoho + QuickBooks Sync',
    description:
      'Two-way sync dashboard with retries, error triage, and connection health monitors.',
    status: 'queued',
    statusDetail: 'Connector scaffolding ready; awaiting credentials.',
    metrics: [
      { label: 'Sync jobs/day', value: '640' },
      { label: 'Failed retries', value: '<1%' },
    ],
    actions: [
      { label: 'Connections', route: '/integrations', emphasis: 'primary' },
      { label: 'View logs', route: '/integrations/logs' },
    ],
  },
  {
    key: 'portal',
    title: 'Client Portal',
    description:
      'Multi-location view for upcoming jobs, invoices, service requests, and offline caching.',
    status: 'design',
    statusDetail: 'React Native IA aligned with admin modules.',
    metrics: [
      { label: 'Beta clients', value: '12' },
      { label: 'Locations cached', value: '180' },
    ],
    actions: [
      {
        label: 'Portal preview',
        route: '/client-experience',
        emphasis: 'primary',
      },
      { label: 'Request flow', route: '/service-requests' },
    ],
  },
];

export const mobileTechHighlights: MobileHighlightCard[] = [
  {
    key: 'offline-checklists',
    title: 'Checklist lockstep',
    body: 'All required steps, photos, and signatures cached offline with per-item validation.',
    badge: 'Required 8/8',
    tone: 'accent',
  },
  {
    key: 'planogram-exec',
    title: 'Planogram companion',
    body: 'Cell-by-cell guidance with barcode confirmation and actual quantity capture.',
    badge: 'DSD ready',
    tone: 'aqua',
  },
  {
    key: 'inventory-sync',
    title: 'Parts & inventory',
    body: 'Local barcode dictionary with quick-add favorites and queued usage sync.',
    badge: 'Scan mode',
    tone: 'teal',
  },
  {
    key: 'gps-session',
    title: 'GPS session',
    body: 'Foreground/background breadcrumbs for dispatch map and check-in/out proof.',
    badge: 'Tracking on',
    tone: 'neutral',
  },
];

export const clientPortalHighlights: MobileHighlightCard[] = [
  {
    key: 'upcoming-service',
    title: 'Next service',
    body: 'Shows arrival window, assigned crew, and planogram/instructions per location.',
    badge: 'Tomorrow 9:00a',
    tone: 'aqua',
  },
  {
    key: 'invoices',
    title: 'Invoices & payments',
    body: 'Review issued invoices, capture signatures, and pay offline with queued sync.',
    badge: '2 open',
    tone: 'accent',
  },
  {
    key: 'reports',
    title: 'Service reports',
    body: 'Tap to open PDF with photos, checklist results, and planogram summary.',
    badge: 'Latest posted',
    tone: 'teal',
  },
];
