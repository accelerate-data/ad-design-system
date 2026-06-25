import * as React from "react";

export interface TagProps {
  children: React.ReactNode;
  /** Optional leading status dot color (any CSS color / token). */
  dotColor?: string;
  /** Show a remove (×) button and handle its click. */
  onRemove?: () => void;
  style?: React.CSSProperties;
}

/** Outlined, mono metadata chip — keys, tags, filters. */
export function Tag(props: TagProps): JSX.Element;
