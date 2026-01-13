
export interface MonthlyWorkforce {
  month: string;
  year: number;
  contractualManning: number;
  rentalStaff: number;
  actualOnSite: number;
  usedVacation: number;
  vacationPercentage: number;
  vacancies: number;
  breakdown: AreaBreakdown[];
}

export interface AreaBreakdown {
  area: string;
  staffCount: number;
  category: string;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  COMPARISON = 'COMPARISON',
  AI_INSIGHTS = 'AI_INSIGHTS'
}
