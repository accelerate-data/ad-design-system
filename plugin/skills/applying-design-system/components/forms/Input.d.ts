import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Label rendered above the field. */
  label?: string;
  /** Helper text below the field (hidden when error is set). */
  hint?: string;
  /** Error message; switches the field to the error state. */
  error?: string;
  /** Optional leading icon node. */
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Single-line text field with label, hint, and error states. */
export function Input(props: InputProps): JSX.Element;
