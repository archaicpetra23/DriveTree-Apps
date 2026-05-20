/**
 * StatsCard — Kartu statistik dengan animasi counter.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
  color: "blue" | "green" | "amber" | "purple";
  delay?: number;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-gradient-to-br from-blue-500 to-blue-600",
    text: "text-blue-700",
    shadow: "shadow-blue-500/20",
    border: "border-blue-100",
    glow: "bg-blue-400/10",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    text: "text-emerald-700",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-100",
    glow: "bg-emerald-400/10",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-gradient-to-br from-amber-500 to-amber-600",
    text: "text-amber-700",
    shadow: "shadow-amber-500/20",
    border: "border-amber-100",
    glow: "bg-amber-400/10",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-gradient-to-br from-purple-500 to-purple-600",
    text: "text-purple-700",
    shadow: "shadow-purple-500/20",
    border: "border-purple-100",
    glow: "bg-purple-400/10",
  },
};

export default function StatsCard({
  icon,
  label,
  value,
  suffix,
  color,
  delay = 0,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Counter animation
  useEffect(() => {
    if (!visible || typeof value !== "number") return;
    const target = value;
    if (target === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 1000;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, visible]);

  const c = colorClasses[color];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl bg-white border ${c.border} p-5 
        transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${c.glow} blur-2xl`} />

      <div className="relative flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center text-white text-xl shadow-lg ${c.shadow}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className={`text-2xl font-bold ${c.text}`}>
            {typeof value === "number" ? displayValue : value}
            {suffix && <span className="text-sm font-medium ml-1">{suffix}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
