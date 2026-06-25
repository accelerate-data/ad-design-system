import React from "react";

/** Surface container. Borders preferred over heavy shadows. */
export function Card({ children, padding = 24, interactive = false, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: "var(--shadow-raised)",
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)",
        cursor: interactive ? "pointer" : "default",
        transition: "box-shadow var(--duration-standard) var(--ease-default), border-color var(--duration-standard) var(--ease-default)",
        ...(interactive && hover ? { boxShadow: "var(--shadow-floating)", borderColor: "var(--arctic)" } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
