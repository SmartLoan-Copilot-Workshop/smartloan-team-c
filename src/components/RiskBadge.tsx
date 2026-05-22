import React from 'react';

import { RiskLevel } from '../types/loan.types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RiskBadgeProps {
  riskAnalysis: string;
}

interface RiskConfig {
  badge: string;
  panel: string;
  dot: string;
  label: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getRiskLevel = (riskAnalysis: string): RiskLevel => {
  const lower = riskAnalysis.toLowerCase();
  if (lower.includes('low')) return 'low';
  if (lower.includes('medium') || lower.includes('moderate')) return 'medium';
  return 'high';
};

const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  low: {
    badge: 'bg-green-100 text-green-800 border border-green-200',
    panel: 'bg-green-50 border-green-200',
    dot: 'bg-green-500',
    label: 'Low Risk',
  },
  medium: {
    badge: 'bg-orange-100 text-orange-800 border border-orange-200',
    panel: 'bg-orange-50 border-orange-200',
    dot: 'bg-orange-500',
    label: 'Medium Risk',
  },
  high: {
    badge: 'bg-red-100 text-red-800 border border-red-200',
    panel: 'bg-red-50 border-red-200',
    dot: 'bg-red-500',
    label: 'High Risk',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const RiskBadge: React.FC<RiskBadgeProps> = ({ riskAnalysis }) => {
  const level = getRiskLevel(riskAnalysis);
  const config = RISK_CONFIG[level];

  return (
    <div className={`flex items-start gap-4 rounded-xl border p-5 ${config.panel}`}>
      <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${config.dot}`} />
      <div className="flex flex-col gap-1.5">
        <span
          className={`inline-flex w-fit rounded-full px-3 py-0.5 text-xs font-semibold ${config.badge}`}
        >
          {config.label}
        </span>
        <p className="text-sm leading-relaxed text-gray-700">{riskAnalysis}</p>
      </div>
    </div>
  );
};

export default RiskBadge;
