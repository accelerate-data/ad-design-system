import * as React from "react";

export interface SwitchProps {
  /** Text label beside the switch. */
  label?: React.ReactNode;
  /** Controlled on/off state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

/** Toggle switch with Pacific track when on. */
export function Switch(props: SwitchProps): JSX.Element;
