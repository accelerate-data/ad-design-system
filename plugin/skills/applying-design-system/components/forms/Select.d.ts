import * as React from "react";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  /** Label rendered above the control. */
  label?: string;
  /** Helper text below the control. */
  hint?: string;
  disabled?: boolean;
  /** <option> elements. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Styled native dropdown matching the input system. */
export function Select(props: SelectProps): JSX.Element;
