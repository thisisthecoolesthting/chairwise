export type OwnOfferTier = 'primary' | 'secondary';
export interface OwnOfferConfig {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta: string;
  url: string;
}
export const SITE_DOMAIN = 'chairwise.app';
export const SITE_NAME = 'ChairWise';
export const OWN_OFFERS: Record<OwnOfferTier, OwnOfferConfig> = {
  primary: {
    id: 'gates',
    name: 'Gates Timekeeping',
    eyebrow: 'From our team',
    headline: 'Run a small team? Free time clock pilot',
    body: 'Gates Timekeeping is a simple time clock, scheduling and timesheets tool for crews of 1–30. Currently a free early-access pilot, no card needed.',
    cta: 'Try Gates free',
    url: 'https://gatestimekeeping.com/trial',
  },
  secondary: {
    id: 'titancase',
    name: 'Titan Case',
    eyebrow: 'From our team',
    headline: 'A tough case for the phone on your desk',
    body: 'Protective iPhone cases from $24.99, with free US shipping and free 30-day returns.',
    cta: 'See Titan Case',
    url: 'https://titancase.shop/',
  },
};
