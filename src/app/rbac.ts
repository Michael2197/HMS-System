export type Role =
  | 'TOP_MANAGEMENT' | 'IT' | 'FINANCE' | 'HR' | 'EMPLOYEE' | 'INVENTORY' | 'SALES'
  | 'MARKETING' | 'PROCUREMENT' | 'LOGISTICS' | 'QC' | 'HUSBANDRY';

export const MODULE_ROLES: Record<string, Role[]> = {
  admin: ['IT', 'TOP_MANAGEMENT'],
  finance: ['FINANCE', 'TOP_MANAGEMENT'],
  hr: ['HR', 'TOP_MANAGEMENT'],
  hr_self: ['EMPLOYEE', 'HR', 'TOP_MANAGEMENT'],
  inventory: ['INVENTORY', 'TOP_MANAGEMENT'],
  sales: ['SALES', 'TOP_MANAGEMENT'],
  crm: ['SALES', 'TOP_MANAGEMENT'],
  marketing: ['MARKETING', 'TOP_MANAGEMENT'],
  procurement: ['PROCUREMENT', 'TOP_MANAGEMENT'],
  scm: ['LOGISTICS', 'PROCUREMENT', 'TOP_MANAGEMENT'],
  projects: ['TOP_MANAGEMENT', 'IT', 'HR', 'FINANCE', 'INVENTORY', 'SALES', 'PROCUREMENT'],
  reporting: ['FINANCE', 'TOP_MANAGEMENT'],
  quality: ['QC', 'TOP_MANAGEMENT'],
  compliance: ['QC', 'TOP_MANAGEMENT'],
  helpdesk: ['TOP_MANAGEMENT', 'IT', 'HR', 'EMPLOYEE', 'SALES'],
  husbandry: ['HUSBANDRY', 'TOP_MANAGEMENT'],
  manufacturing: ['TOP_MANAGEMENT'],
  ecommerce: ['TOP_MANAGEMENT']
};
export const ALL_ROLES: Role[] = [
  'TOP_MANAGEMENT', 'IT', 'FINANCE', 'HR', 'EMPLOYEE', 'INVENTORY', 'SALES',
  'MARKETING', 'PROCUREMENT', 'LOGISTICS', 'QC', 'HUSBANDRY'
];