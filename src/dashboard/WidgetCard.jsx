// src/dashboard/WidgetCard.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Premium, compact, animated widget card.
 * Props:
 * - title, subtitle, actionText
 * - gradient (CSS gradient string)
 * - metricValue (0-100), metricLabel (string)
 * - trend (e.g. "+4.6% WoW" or "−1.2%")
 * - data (array<number>) for sparkline, optional
 */
export default function WidgetCard({
  title = "Widget",
  subtitle = "",
  actionText = "Open",
  gradient = "linear-gradient(90deg, #CDB996, #B99F79)",
  metricValue = 72,
  metricLabel = "Goal progress",
  trend = "+3.1%",
  data = [12, 18, 15, 22, 26, 24, 30, 28, 33, 36],
  onClick,
}) {
  // Sparkline path generator (simple & dependency-free)
  const width = 120;
  const height = 36;
  const max = Math.max(...data, 1);
  const step = width / Math.max(data.length - 1, 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - (v / max) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  // Circular progress (dependency-free)
  const size = 56;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, metricValue));
  const dash = (clamped / 100) * c;

  return (
    <motion.div
      className="widget-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.85), rgba(255,255,255,0.85))",
      }}
    >
      {/* Header */}
      <div className="widget-head">
        <div className="widget-title-wrap">
          <h4 className="widget-title">{title}</h4>
          {subtitle ? <p className="widget-subtitle">{subtitle}</p> : null}
        </div>
        <div
          className="widget-pill"
          style={{
            background: gradient,
          }}
        />
      </div>

      {/* Metric row */}
      <div className="widget-metrics">
        <div className="metric-ring">
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth={stroke}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeLinecap="round"
              stroke="url(#goldGradient)"
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${dash} ${c - dash}` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#CDB996" />
                <stop offset="100%" stopColor="#B99F79" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="metric-copy">
          <div className="metric-value">
            {clamped}
            <span>%</span>
          </div>
          <div className="metric-label">{metricLabel}</div>
          <div
            className={`metric-trend ${
              trend.trim().startsWith("-") ? "down" : "up"
            }`}
          >
            {trend}
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="widget-sparkline">
        <svg width={width} height={height}>
          <polyline
            fill="none"
            stroke="rgba(0,0,0,0.14)"
            strokeWidth="2"
            points={points}
          />
        </svg>
      </div>

      {/* Action */}
      <motion.button
        className="widget-action"
        whileTap={{ scale: 0.98 }}
        style={{ background: gradient }}
      >
        {actionText}
      </motion.button>
    </motion.div>
  );
}
