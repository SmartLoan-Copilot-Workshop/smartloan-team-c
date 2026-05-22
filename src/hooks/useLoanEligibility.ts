import { useCallback, useState } from 'react';

import { fetchLoanEligibility } from '../services/loanEligibilityService';
import { FetchState, LoanEligibilityResponse } from '../types/loan.types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseLoanEligibilityReturn extends FetchState<LoanEligibilityResponse> {
  checkEligibility: (loanApplicationId: string) => Promise<void>;
  reset: () => void;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_STATE: FetchState<LoanEligibilityResponse> = {
  data: null,
  loading: false,
  error: null,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLoanEligibility = (): UseLoanEligibilityReturn => {
  const [state, setState] = useState<FetchState<LoanEligibilityResponse>>(INITIAL_STATE);

  const checkEligibility = useCallback(async (loanApplicationId: string): Promise<void> => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchLoanEligibility(loanApplicationId);
      setState({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, checkEligibility, reset };
};
