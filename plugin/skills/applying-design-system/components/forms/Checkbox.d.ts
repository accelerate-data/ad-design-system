import * as React from "react";

export interface CheckboxProps {
  /** Text label beside the box. */
  label?: React.ReactNode;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

/** Checkbox with Pacific fill when checked. */
export function Checkbox(props: CheckboxProps): JSX.Element;
