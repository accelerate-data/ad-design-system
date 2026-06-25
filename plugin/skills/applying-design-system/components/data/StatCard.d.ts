import * as React from "react";

export interface StatCardProps {
  /** Metric name. */
  label: string;
  /** The metric value (rendered in mono, tabular). */
  value: string | number;
  /** Optional unit suffix (e.g. "ms", "rows"). */
  unit?: string;
  /** Trend delta text (e.g. "12% vs last week"). */
  delta?: string;
  /** Direction of the delta. @default "up" */
  deltaDirection?: "up" | "down";
  /** Optional icon node. */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * KPI / metric tile for dashboards.
 *
 * @startingPoint section="Data" subtitle="Metric tiles with trend deltas" viewport="700x180"
 */
export function StatCard(props: StatCardProps): JSX.Element;
