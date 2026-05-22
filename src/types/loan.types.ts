// ─── Applicant ───────────────────────────────────────────────────────────────

export interface ApplicantInfo {
  name: string;
  loanApplicationId: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface LoanEligibilityResponse {
  monthlySalary: number;
  liabilities: number;
  creditScore: number;
  riskAnalysis: string;
}

// ─── Risk ─────────────────────────────────────────────────────────────────────

export type RiskLevel = 'low' | 'medium' | 'high';

// ─── Fetch State ──────────────────────────────────────────────────────────────

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
