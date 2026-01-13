
import { MonthlyWorkforce } from './types';

export const CONTRACT_TOTAL = 531;
export const PENALTY_PER_VACANCY = 1500; // ريال لكل وظيفة شاغرة شهرياً (افتراضي)

export const WORKFORCE_HISTORY: MonthlyWorkforce[] = [
  {
    month: 'فبراير', year: 2025, contractualManning: 531, rentalStaff: 11, actualOnSite: 520, usedVacation: 0, vacationPercentage: 0, vacancies: 11,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 400, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 80, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'مارس', year: 2025, contractualManning: 531, rentalStaff: 17, actualOnSite: 514, usedVacation: 0, vacationPercentage: 0, vacancies: 17,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 395, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 79, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'أبريل', year: 2025, contractualManning: 531, rentalStaff: 26, actualOnSite: 505, usedVacation: 0, vacationPercentage: 0, vacancies: 26,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 385, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 80, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'مايو', year: 2025, contractualManning: 531, rentalStaff: 21, actualOnSite: 510, usedVacation: 0, vacationPercentage: 0, vacancies: 21,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 390, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 80, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'يونيو', year: 2025, contractualManning: 531, rentalStaff: 14, actualOnSite: 517, usedVacation: 0, vacationPercentage: 0, vacancies: 14,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 397, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 80, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'يوليو', year: 2025, contractualManning: 531, rentalStaff: 19, actualOnSite: 512, usedVacation: 0, vacationPercentage: 0, vacancies: 19,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 392, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 80, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'أغسطس', year: 2025, contractualManning: 531, rentalStaff: 33, actualOnSite: 498, usedVacation: 0, vacationPercentage: 0, vacancies: 33,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 380, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 78, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'سبتمبر', year: 2025, contractualManning: 531, rentalStaff: 46, actualOnSite: 485, usedVacation: 0, vacationPercentage: 0, vacancies: 46,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 370, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 75, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'أكتوبر', year: 2025, contractualManning: 531, rentalStaff: 56, actualOnSite: 475, usedVacation: 0, vacationPercentage: 0, vacancies: 56,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 360, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 75, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'نوفمبر', year: 2025, contractualManning: 531, rentalStaff: 71, actualOnSite: 460, usedVacation: 0, vacationPercentage: 0, vacancies: 71,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 350, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 70, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'ديسمبر', year: 2025, contractualManning: 531, rentalStaff: 80, actualOnSite: 451, usedVacation: 0, vacationPercentage: 0, vacancies: 80,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 340, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 71, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  },
  {
    month: 'يناير', year: 2026, contractualManning: 531, rentalStaff: 70, actualOnSite: 461, usedVacation: 0, vacationPercentage: 0, vacancies: 70,
    breakdown: [
      { area: 'النظافة والخدمات', staffCount: 350, category: 'خدمات' },
      { area: 'العمليات المساندة', staffCount: 71, category: 'إداري' },
      { area: 'الفنيين والمهنيين', staffCount: 40, category: 'فني' }
    ]
  }
];
