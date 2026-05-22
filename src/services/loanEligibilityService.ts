import { LoanEligibilityResponse } from '../types/loan.types';

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';

/**
 * Set REACT_APP_USE_MOCK=false in .env to target a real backend.
 * Defaults to mock mode so the app works out-of-the-box without a server.
 */
const IS_MOCK_ENABLED = process.env.REACT_APP_USE_MOCK !== 'false';

// ─── Mock ─────────────────────────────────────────────────────────────────────

const MOCK_RESPONSE: LoanEligibilityResponse = {
  monthlySalary: 85000,
  liabilities: 15000,
  creditScore: 780,
  riskAnalysis: 'Low Risk - Eligible for loan approval',
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─── Service ──────────────────────────────────────────────────────────────────

export const fetchLoanEligibility = async (
  loanApplicationId: string,
): Promise<LoanEligibilityResponse> => {
  if (IS_MOCK_ENABLED) {
    await delay(1500); // simulate network latency
    return { ...MOCK_RESPONSE };
  }

  const url = `${API_BASE_URL}/api/loan-eligibility/${encodeURIComponent(loanApplicationId)}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  return response.json() as Promise<LoanEligibilityResponse>;
};
