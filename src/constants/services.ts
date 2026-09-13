import { Service } from '../types';

// Static service data — used in Phase 1 before the DB is wired.
// In Phase 5/6 these will be fetched from Supabase.

export const SERVICES: Service[] = [
  {
    id: 'svc-hr',
    title: 'HR consulting',
    category: 'hr_consulting',
    description: 'Tailored human resources strategies for your organisation.',
    icon: 'people-outline',
  },
  {
    id: 'svc-biz',
    title: 'Business consulting',
    category: 'business_consulting',
    description: 'Expert guidance to help your business grow and scale.',
    icon: 'briefcase-outline',
  },
  {
    id: 'svc-tech',
    title: 'Technical recruitment',
    category: 'recruitment_technical',
    description: 'Find top engineering, data, and technology talent.',
    icon: 'code-slash-outline',
  },
  {
    id: 'svc-nontech',
    title: 'Non-technical recruitment',
    category: 'recruitment_non_technical',
    description: 'Hire exceptional professionals across all business functions.',
    icon: 'person-add-outline',
  },
];
