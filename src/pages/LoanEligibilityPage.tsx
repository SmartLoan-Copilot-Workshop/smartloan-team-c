import React from 'react';

import InfoCard from '../components/InfoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import RiskBadge from '../components/RiskBadge';
import { useLoanEligibility } from '../hooks/useLoanEligibility';
import { ApplicantInfo } from '../types/loan.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const APPLICANT: ApplicantInfo = {
  name: 'John Doe',
  loanApplicationId: 'LA-10234',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

// ─── Icons ────────────────────────────────────────────────────────────────────

const SalaryIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const LiabilityIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    />
  </svg>
);

const CreditIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
    {children}
  </h2>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`rounded-xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const LoanEligibilityPage: React.FC = () => {
  const { data, loading, error, checkEligibility } = useLoanEligibility();

  const handleCheck = () => checkEligibility(APPLICANT.loanApplicationId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <span className="text-base font-semibold text-gray-800">Smart Loan</span>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Loan Eligibility</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review the eligibility status for the selected loan application.
          </p>
        </div>

        {/* ── Applicant Information ────────────────────────────────────────── */}
        <section className="mb-6">
          <SectionLabel>Applicant Information</SectionLabel>
          <Card>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <span className="block text-xs text-gray-400">Applicant Name</span>
                  <span className="mt-0.5 block text-base font-semibold text-gray-900">
                    {APPLICANT.name}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400">Loan Application ID</span>
                  <span className="mt-0.5 block font-mono text-base font-semibold text-blue-600">
                    {APPLICANT.loanApplicationId}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={loading}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Checking…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Check Eligibility
                  </>
                )}
              </button>
            </div>
          </Card>
        </section>

        {/* ── Loading ──────────────────────────────────────────────────────── */}
        {loading && <LoadingSpinner size="lg" message="Fetching eligibility details…" />}

        {/* ── Error ────────────────────────────────────────────────────────── */}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-red-800">
                  Unable to fetch eligibility data
                </h3>
                <p className="mt-1 text-sm text-red-600">{error}</p>
                <button
                  onClick={handleCheck}
                  className="mt-3 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Empty State ───────────────────────────────────────────────────── */}
        {!data && !loading && !error && (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-7 w-7 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">No eligibility data</p>
            <p className="mt-1 text-xs text-gray-400">
              Click <span className="font-medium text-blue-600">Check Eligibility</span> above to
              fetch the applicant's loan eligibility details.
            </p>
          </div>
        )}

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {data && !loading && (
          <>
            {/* Divider */}
            <div className="my-8 border-t border-gray-100" />

            {/* Eligibility Details */}
            <section className="mb-8">
              <SectionLabel>Eligibility Details</SectionLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InfoCard
                  label="Monthly Salary"
                  value={formatCurrency(data.monthlySalary)}
                  subLabel="Gross monthly income"
                  icon={<SalaryIcon />}
                />
                <InfoCard
                  label="Liabilities"
                  value={formatCurrency(data.liabilities)}
                  subLabel="Total monthly obligations"
                  icon={<LiabilityIcon />}
                />
                <InfoCard
                  label="Credit Score"
                  value={data.creditScore.toLocaleString()}
                  subLabel="CIBIL / credit bureau score"
                  icon={<CreditIcon />}
                />
              </div>
            </section>

            {/* Risk Analysis */}
            <section>
              <SectionLabel>Risk Analysis</SectionLabel>
              <RiskBadge riskAnalysis={data.riskAnalysis} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LoanEligibilityPage;
