import * as React from "react";

export interface TabItem {
  /** Unique value for this tab. */
  value: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Optional count/badge shown after the label. */
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value (defaults to first tab). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Underline tab bar for switching views within a screen. */
export function Tabs(props: TabsProps): JSX.Element;
