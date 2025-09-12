// components/StatusBadge.tsx
"use client";
import { STATUS_CONFIG } from "@/lib/Admin/data";

interface StatusBadgeProps {
  status: keyof typeof STATUS_CONFIG;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
    >
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};