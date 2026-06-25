import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "secondary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label — required since there is no text. */
  "aria-label": string;
  /** Icon node (e.g. a Phosphor <i className="ph ph-gear" />). */
  children: React.ReactNode;
}

/** Square, icon-only button for toolbars and compact actions. */
export function IconButton(props: IconButtonProps): JSX.Element;
