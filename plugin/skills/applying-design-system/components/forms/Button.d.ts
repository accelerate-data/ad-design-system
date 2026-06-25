import * as React from "react";

/**
 * Props for the Button.
 * @startingPoint section="Forms" subtitle="Button with all variants & sizes" viewport="700x420"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style mapped to action hierarchy. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
  /** Control height. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/** Primary action button for Vibedata surfaces. */
export function Button(props: ButtonProps): JSX.Element;
