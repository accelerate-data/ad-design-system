import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. @default 24 */
  padding?: number;
  /** Add hover elevation + pointer for clickable cards. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** Generic surface container — the base for panels and content blocks. */
export function Card(props: CardProps): JSX.Element;
