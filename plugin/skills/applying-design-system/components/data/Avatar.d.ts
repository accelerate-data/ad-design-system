import * as React from "react";

export interface AvatarProps {
  /** Full name — used for initials fallback and alt text. */
  name?: string;
  /** Image URL; falls back to initials if missing or it fails to load. */
  src?: string;
  /** Diameter in px. @default 36 */
  size?: number;
  style?: React.CSSProperties;
}

/** Round avatar with image or tinted initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
