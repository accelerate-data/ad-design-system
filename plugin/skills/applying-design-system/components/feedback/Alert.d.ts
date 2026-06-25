import * as React from "react";

export interface AlertProps {
  /** Bold title line. */
  title?: React.ReactNode;
  /** Body copy. */
  children?: React.ReactNode;
  /** Status treatment. @default "info" */
  variant?: "info" | "success" | "warning" | "error";
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Show a dismiss button and handle its click. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/** Inline callout for system messages and validation summaries. */
export function Alert(props: AlertProps): JSX.Element;
