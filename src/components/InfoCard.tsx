import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InfoCardProps {
  label: string;
  value: string;
  subLabel?: string;
  icon: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

const InfoCard: React.FC<InfoCardProps> = ({ label, value, subLabel, icon }) => (
  <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</span>
    </div>
    <span className="text-2xl font-bold text-gray-900">{value}</span>
    {subLabel && <span className="text-xs text-gray-400">{subLabel}</span>}
  </div>
);

export default InfoCard;
