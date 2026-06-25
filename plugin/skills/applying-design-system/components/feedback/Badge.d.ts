import * as React from "react";

export interface BadgeProps {
  /** Color treatment by meaning. @default "neutral" */
  variant?: "pacific" | "seafoam" | "navy" | "success" | "warning" | "error" | "info" | "neutral";
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Compact status / label pill.
 *
 * @startingPoint section="Feedback" subtitle="Status badges in every variant" viewport="700x150"
 */
export function Badge(props: BadgeProps): JSX.Element;
