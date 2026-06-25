/* @ds-bundle: {"format":3,"namespace":"VibedataDesignSystem_1cd9ed","components":[{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/data/Avatar.jsx":"8728582a275f","components/data/Card.jsx":"e402806b1010","components/data/StatCard.jsx":"79419f4fc50c","components/data/Tag.jsx":"2dec2879cfaa","components/feedback/Alert.jsx":"e25d06bc01f1","components/feedback/Badge.jsx":"ecdf4eb0175c","components/forms/Button.jsx":"ad13571cdb36","components/forms/Checkbox.jsx":"02ab227fe71c","components/forms/IconButton.jsx":"de17c0be7b3e","components/forms/Input.jsx":"9e8f5bf400e8","components/forms/Select.jsx":"5d45985342ed","components/forms/Switch.jsx":"1d937df10be4","components/navigation/Tabs.jsx":"4cca941f7963","ui_kits/marketing/Sections.jsx":"ded3f42765d4","ui_kits/studio/Screens.jsx":"50081e038516","ui_kits/studio/Shell.jsx":"9304125488a8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VibedataDesignSystem_1cd9ed = window.VibedataDesignSystem_1cd9ed || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Avatar.jsx
try { (() => {
const PALETTE = [{
  bg: "var(--pacific-soft)",
  fg: "var(--ocean)"
}, {
  bg: "var(--seafoam-soft)",
  fg: "#00a870"
}, {
  bg: "var(--navy-soft)",
  fg: "var(--navy)"
}];
function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?";
}

/** Avatar with image or initials fallback. */
function Avatar({
  name = "",
  src,
  size = 36,
  style = {}
}) {
  const [failed, setFailed] = React.useState(false);
  const pal = PALETTE[(name.charCodeAt(0) || 0) % PALETTE.length];
  const showImg = src && !failed;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      background: showImg ? "transparent" : pal.bg,
      color: pal.fg,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: Math.round(size * 0.4),
      overflow: "hidden",
      flexShrink: 0,
      userSelect: "none",
      ...style
    }
  }, showImg ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    onError: () => setFailed(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Borders preferred over heavy shadows. */
function Card({
  children,
  padding = 24,
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--bg-raised)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: "var(--shadow-raised)",
      fontFamily: "var(--font-sans)",
      color: "var(--text-primary)",
      cursor: interactive ? "pointer" : "default",
      transition: "box-shadow var(--duration-standard) var(--ease-default), border-color var(--duration-standard) var(--ease-default)",
      ...(interactive && hover ? {
        boxShadow: "var(--shadow-floating)",
        borderColor: "var(--arctic)"
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
/** Metric tile — mono value with optional trend delta. For dashboards. */
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaDirection = "up",
  icon = null,
  style = {}
}) {
  const positive = deltaDirection === "up";
  const deltaColor = positive ? "var(--success-alt)" : "var(--error-alt)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-raised)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: 20,
      fontFamily: "var(--font-sans)",
      boxShadow: "var(--shadow-raised)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--text-muted)",
      letterSpacing: "0.01em"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "var(--radius-md)",
      background: "var(--pacific-soft)",
      color: "var(--pacific)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 28,
      fontWeight: 600,
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-0.01em"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 12,
      fontWeight: 500,
      color: deltaColor,
      fontVariantNumeric: "tabular-nums"
    }
  }, /*#__PURE__*/React.createElement("span", null, positive ? "▲" : "▼"), /*#__PURE__*/React.createElement("span", null, delta)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
/** Outlined chip for metadata/keywords, optionally removable or with a leading dot. */
function Tag({
  children,
  dotColor,
  onRemove,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 8px 3px 10px",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border)",
      background: "var(--bg-raised)",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--text-secondary)",
      whiteSpace: "nowrap",
      ...style
    }
  }, dotColor && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "var(--radius-full)",
      background: dotColor,
      flexShrink: 0
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      display: "flex",
      background: "none",
      border: "none",
      padding: 0,
      marginLeft: 1,
      cursor: "pointer",
      color: "var(--text-muted)",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
/** Inline alert / callout. Left accent border + soft tint by status. */
function Alert({
  title,
  children,
  variant = "info",
  icon = null,
  onDismiss,
  style = {}
}) {
  const variants = {
    info: {
      color: "var(--info-alt)",
      bg: "var(--pacific-soft)",
      border: "var(--pacific)"
    },
    success: {
      color: "var(--success-alt)",
      bg: "var(--seafoam-soft)",
      border: "var(--seafoam)"
    },
    warning: {
      color: "var(--warning-alt)",
      bg: "var(--warning-soft)",
      border: "var(--warning)"
    },
    error: {
      color: "var(--error-alt)",
      bg: "var(--error-soft)",
      border: "var(--error)"
    }
  };
  const v = variants[variant] || variants.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      gap: 12,
      padding: "12px 14px",
      background: v.bg,
      borderRadius: "var(--radius-md)",
      borderLeft: `3px solid ${v.border}`,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.color,
      fontSize: 18,
      display: "flex",
      flexShrink: 0,
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-primary)",
      marginBottom: children ? 2 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.5,
      color: "var(--text-secondary)"
    }
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onDismiss,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontSize: 16,
      display: "flex",
      flexShrink: 0,
      padding: 0,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
/** Small status pill. Soft tinted background + saturated text. */
function Badge({
  children,
  variant = "neutral",
  icon = null,
  style = {}
}) {
  const variants = {
    pacific: {
      background: "var(--pacific-soft)",
      color: "var(--pacific)"
    },
    seafoam: {
      background: "var(--seafoam-soft)",
      color: "#00a870"
    },
    navy: {
      background: "var(--navy-soft)",
      color: "var(--navy)"
    },
    success: {
      background: "var(--seafoam-soft)",
      color: "var(--success-alt)"
    },
    warning: {
      background: "var(--warning-soft)",
      color: "var(--warning-alt)"
    },
    error: {
      background: "var(--error-soft)",
      color: "var(--error-alt)"
    },
    info: {
      background: "var(--pacific-soft)",
      color: "var(--info-alt)"
    },
    neutral: {
      background: "var(--bg-surface)",
      color: "var(--text-secondary)"
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 9px",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.4,
      whiteSpace: "nowrap",
      ...v,
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Vibedata primary button. Steady, controlled — no spring or bounce.
 * Variants map to the brand's action hierarchy.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      fontSize: 13,
      padding: "0 12px",
      gap: 6
    },
    md: {
      height: 40,
      fontSize: 14,
      padding: "0 16px",
      gap: 8
    },
    lg: {
      height: 48,
      fontSize: 15,
      padding: "0 24px",
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-contrast)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--pacific)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--seafoam)",
      color: "var(--navy)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--error)",
      color: "#ffffff",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? hoverFor(variant) : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 500,
      fontFamily: "var(--font-sans)",
      lineHeight: 1,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      whiteSpace: "nowrap",
      transition: "background-color var(--duration-standard) var(--ease-default), border-color var(--duration-standard) var(--ease-default), box-shadow var(--duration-standard) var(--ease-default), color var(--duration-standard) var(--ease-default)",
      ...v,
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
function hoverFor(variant) {
  switch (variant) {
    case "primary":
      return {
        background: "var(--accent-hover)",
        boxShadow: "var(--glow-pacific)"
      };
    case "secondary":
      return {
        borderColor: "var(--pacific)",
        color: "var(--pacific)"
      };
    case "ghost":
      return {
        background: "var(--pacific-soft)"
      };
    case "accent":
      return {
        boxShadow: "var(--glow-seafoam)"
      };
    case "danger":
      return {
        background: "var(--error-alt)"
      };
    default:
      return {};
  }
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with brand Pacific fill when checked. Controlled or uncontrolled. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  id,
  ...rest
}) {
  const cbId = id || React.useId();
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 18,
      height: 18
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: cbId,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: 18,
      height: 18,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${on ? "var(--pacific)" : "var(--border-strong)"}`,
      background: on ? "var(--pacific)" : "var(--bg-raised)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "var(--transition-colors)"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Pass a Phosphor (or any) icon node as children.
 */
function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  }[size] || 40;
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-contrast)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent"
    }
  };
  const v = variants[variant] || variants.secondary;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? variant === "primary" ? {
    background: "var(--accent-hover)"
  } : {
    background: "var(--pacific-soft)",
    color: "var(--pacific)",
    borderColor: "var(--pacific)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dims,
      height: dims,
      fontSize: size === "sm" ? 16 : 18,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "var(--transition-colors)",
      ...v,
      ...hoverStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with label, hint, and error states.
 * Focus = Pacific border + 2px ring. Error = red border + ring.
 */
function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--error)" : focus ? "var(--pacific)" : "var(--border)";
  const ring = error ? "0 0 0 2px var(--error-soft)" : focus ? "0 0 0 2px var(--focus-ring)" : "none";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      color: "var(--text-muted)",
      fontSize: 16,
      display: "flex",
      pointerEvents: "none"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: 40,
      padding: iconLeft ? "0 12px 0 36px" : "0 12px",
      fontSize: 14,
      fontFamily: "var(--font-sans)",
      color: "var(--text-primary)",
      background: "var(--bg-raised)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: ring,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition: "border-color var(--duration-micro) var(--ease-default), box-shadow var(--duration-micro) var(--ease-default)",
      ...style
    }
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--error)",
      fontWeight: 500
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Vibedata inputs, with a chevron affordance. */
function Select({
  label,
  hint,
  id,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const selectId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: 40,
      padding: "0 36px 0 12px",
      fontSize: 14,
      fontFamily: "var(--font-sans)",
      color: "var(--text-primary)",
      background: "var(--bg-raised)",
      border: `1px solid ${focus ? "var(--pacific)" : "var(--border)"}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focus ? "0 0 0 2px var(--focus-ring)" : "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "border-color var(--duration-micro) var(--ease-default), box-shadow var(--duration-micro) var(--ease-default)",
      ...style
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 12,
      color: "var(--text-muted)",
      pointerEvents: "none",
      display: "flex",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Pacific track when on. Steady 150ms slide, no bounce. */
function Switch({
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  id,
  ...rest
}) {
  const swId = id || React.useId();
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 36,
      height: 20
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: swId,
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: 36,
      height: 20,
      margin: 0,
      cursor: "inherit"
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: on ? "var(--pacific)" : "var(--border-strong)",
      transition: "background-color var(--duration-micro) var(--ease-default)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: on ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "var(--radius-full)",
      background: "#ffffff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      transition: "left var(--duration-micro) var(--ease-default)"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Underline tab bar. Controlled (value/onChange) or uncontrolled (defaultValue).
 * Active tab: Pacific text + 2px Pacific underline.
 * tabs: [{ value, label, icon?, badge? }]
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, tabs.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(t.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "10px 12px",
        marginBottom: -1,
        background: "none",
        border: "none",
        borderBottom: `2px solid ${on ? "var(--pacific)" : "transparent"}`,
        color: on ? "var(--pacific)" : "var(--text-secondary)",
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        fontFamily: "var(--font-sans)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "color var(--duration-micro) var(--ease-default), border-color var(--duration-micro) var(--ease-default)"
      }
    }, t.icon, t.label, t.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        padding: "1px 6px",
        borderRadius: "var(--radius-full)",
        background: on ? "var(--pacific-soft)" : "var(--bg-surface)",
        color: on ? "var(--pacific)" : "var(--text-muted)"
      }
    }, t.badge));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sections.jsx
try { (() => {
/* Vibedata marketing site — section components.
   Exposes components on window for index.html to assemble. */
const {
  Button,
  Badge,
  Card
} = window.VibedataDesignSystem_1cd9ed;
const CDN = "../../assets/logos/";
function MktNav({
  theme,
  onToggle
}) {
  const logo = theme === "dark" ? CDN + "lockup-light.svg" : CDN + "lockup-dark.svg";
  const links = ["Product", "Solutions", "Docs", "Pricing", "Company"];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      padding: "0 32px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-raised)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      backdropFilter: "saturate(180%) blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Vibedata",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-secondary)",
      textDecoration: "none"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "Toggle theme",
    style: {
      width: 36,
      height: 36,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border)",
      background: "transparent",
      color: "var(--text-secondary)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: theme === "dark" ? "ph ph-sun" : "ph ph-moon"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md"
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md"
  }, "Get started")));
}
function MktHero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "72px 32px 56px",
      maxWidth: 1120,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow",
    style: {
      color: "var(--pacific)",
      display: "inline-block",
      marginBottom: 18
    }
  }, "Agentic data engineering"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44,
      lineHeight: 1.08,
      fontWeight: 600,
      letterSpacing: "-0.025em",
      color: "var(--text-primary)",
      margin: "0 0 18px",
      textWrap: "balance"
    }
  }, "Your data engineering standards, ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--pacific)"
    }
  }, "encoded and enforced")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: "var(--text-secondary)",
      maxWidth: 480,
      margin: "0 0 28px"
    }
  }, "Vibedata is the agentic coordination layer for data platforms. Build, deploy, and operate governed pipelines with your team's accumulated knowledge \u2014 not generic defaults."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-arrow-right"
    })
  }, "Start free"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "Book a demo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      marginTop: 28,
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check-circle",
    style: {
      color: "var(--seafoam)"
    }
  }), " dbt-native"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check-circle",
    style: {
      color: "var(--seafoam)"
    }
  }), " Microsoft Fabric"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check-circle",
    style: {
      color: "var(--seafoam)"
    }
  }), " Governed by default"))), /*#__PURE__*/React.createElement(HeroConsole, null));
}
function HeroConsole() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--smoke)",
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border)",
      overflow: "hidden",
      boxShadow: "var(--shadow-overlay)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#ff5f57"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#febc2e"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#28c840"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "#6b8899"
    }
  }, "vibedata \xB7 build agent")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      lineHeight: 1.85,
      color: "#90b4c8"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "\u203A"), " vibe build \"daily revenue mart, gold tier\""), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#6b8899"
    }
  }, "  \u2713 matched skill ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#90e0ef"
    }
  }, "modeling-revenue-recognition")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#6b8899"
    }
  }, "  \u2713 generated ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff"
    }
  }, "models/marts/fct_revenue_daily.sql")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#6b8899"
    }
  }, "  \u2713 added 6 tests \xB7 2 snapshots (SCD2)"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#6b8899"
    }
  }, "  \u2713 governance:pii tags applied"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00b4d8"
    }
  }, "deploy"), " opening PR #482 \u2192 quality gates running\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#00dd92"
    }
  }, "  \u25CF 42/42 gates green \xB7 ready to merge")));
}
function MktFeatures() {
  const items = [{
    icon: "ph-hammer",
    title: "Build",
    body: "Describe business intent. Agents validate domain fit and generate code that follows your team's conventions — naming, tests, medallion layers.",
    tag: "Intent → code"
  }, {
    icon: "ph-rocket-launch",
    title: "Deploy",
    body: "Every PR runs context-informed quality gates: documentation, code quality, test coverage, and Elementary data-quality checks.",
    tag: "Governed PRs"
  }, {
    icon: "ph-pulse",
    title: "Operate",
    body: "Resolved incidents are captured as new skills and tests, preventing recurrence. The library compounds with every pipeline.",
    tag: "Improvement flywheel"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px 32px",
      maxWidth: 1120,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow",
    style: {
      color: "var(--text-muted)"
    }
  }, "The coordination layer"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      margin: "10px 0 0"
    }
  }, "One loop: build, deploy, operate")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.title,
    interactive: true,
    padding: 26
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      background: "var(--pacific-soft)",
      color: "var(--pacific)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph " + it.icon
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: "var(--text-primary)",
      margin: "0 0 8px"
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--text-secondary)",
      margin: "0 0 16px"
    }
  }, it.body), /*#__PURE__*/React.createElement(Badge, {
    variant: "pacific"
  }, it.tag)))));
}
function MktMetrics() {
  const stats = [{
    v: "10×",
    l: "faster delivery vs. hand-rolled pipelines"
  }, {
    v: "100%",
    l: "lineage & governance coverage"
  }, {
    v: "3 min",
    l: "from intent to a reviewable PR"
  }, {
    v: "0",
    l: "institutional knowledge lost to role switches"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--bg-surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "44px 32px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 34,
      fontWeight: 600,
      color: "var(--pacific)",
      letterSpacing: "-0.02em"
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, s.l)))));
}
function MktCode() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px 32px",
      maxWidth: 1120,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "0.9fr 1.1fr",
      gap: 48,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ad-eyebrow",
    style: {
      color: "var(--text-muted)"
    }
  }, "Developer experience"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      margin: "10px 0 14px"
    }
  }, "Declarative, version-controlled data"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      color: "var(--text-secondary)",
      margin: "0 0 20px"
    }
  }, "Every data product is defined in code \u2014 testable, reproducible, and reviewable from dev to production. Agents generate it to your standards; you keep the diff."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "navy"
  }, "Git-native"), /*#__PURE__*/React.createElement(Badge, {
    variant: "seafoam"
  }, "Tested by default"), /*#__PURE__*/React.createElement(Badge, {
    variant: "info"
  }, "Fabric Lakehouse"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#0d1117",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border)",
      padding: "20px 22px",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      lineHeight: 1.75,
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#4d5f6a"
    }
  }, "-- fct_revenue_daily.sql"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "{{"), " config("), /*#__PURE__*/React.createElement("div", null, "    materialized=", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'incremental'"), ","), /*#__PURE__*/React.createElement("div", null, "    unique_key=", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'order_date'"), ","), /*#__PURE__*/React.createElement("div", null, "    tags=[", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'governance:pii'"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'tier:gold'"), "]"), /*#__PURE__*/React.createElement("div", null, ") ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "}}")), /*#__PURE__*/React.createElement("div", null, "\xA0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "select")), /*#__PURE__*/React.createElement("div", null, "    date_trunc(", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'day'"), ", created_at) ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "as"), " order_date,"), /*#__PURE__*/React.createElement("div", null, "    count(*)                        ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "as"), " orders,"), /*#__PURE__*/React.createElement("div", null, "    sum(amount_usd)                 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "as"), " revenue_usd"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "from"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00b4d8"
    }
  }, "{{ ref('stg_orders') }}")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "where"), " status = ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#caf0f8"
    }
  }, "'completed'")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#00dd92"
    }
  }, "group by"), " 1")));
}
function MktCTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "16px 32px 64px",
      maxWidth: 1120,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, var(--navy) 0%, #061a3a 100%)",
      borderRadius: "var(--radius-xl)",
      padding: "48px 44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 26,
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "-0.02em",
      margin: "0 0 8px"
    }
  }, "Ready to accelerate?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: "var(--arctic)",
      margin: 0,
      maxWidth: 440
    }
  }, "Join engineering teams shipping governed, high-quality data products at scale.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg"
  }, "Start free trial"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      background: "rgba(255,255,255,0.1)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)"
    }
  }, "Talk to sales"))));
}
function MktFooter({
  theme
}) {
  const logo = theme === "dark" ? CDN + "wordmark-light.svg" : CDN + "wordmark-dark.svg";
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border)",
      padding: "28px 32px",
      maxWidth: 1120,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Accelerate Data",
    style: {
      height: 22,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "\xA9 2026 Accelerate Data. All rights reserved."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontFamily: "var(--font-mono)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "vibedata \xB7 v2.4.1"));
}
Object.assign(window, {
  MktNav,
  MktHero,
  MktFeatures,
  MktMetrics,
  MktCode,
  MktCTA,
  MktFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Screens.jsx
try { (() => {
/* Vibedata Studio — screens. Exposes on window. */
const {
  Button,
  IconButton,
  Input,
  Badge,
  Tag,
  StatCard,
  Card,
  Tabs
} = window.VibedataDesignSystem_1cd9ed;
function statusBadge(status) {
  const map = {
    passed: ["success", "ph-check-circle", "Passed"],
    running: ["info", "ph-circle-notch", "Running"],
    failed: ["error", "ph-x-circle", "Failed"],
    queued: ["neutral", "ph-clock", "Queued"]
  };
  const [v, icon, label] = map[status] || map.queued;
  return /*#__PURE__*/React.createElement(Badge, {
    variant: v,
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph " + icon
    })
  }, label);
}

/* ---------------- Overview ---------------- */
function OverviewScreen() {
  const runs = [{
    name: "fct_revenue_daily",
    who: "build-agent",
    time: "2m ago",
    dur: "48s",
    status: "passed"
  }, {
    name: "dim_customers",
    who: "Dana Ortiz",
    time: "14m ago",
    dur: "1m 12s",
    status: "passed"
  }, {
    name: "stg_salesforce_opps",
    who: "ingestion-agent",
    time: "31m ago",
    dur: "22s",
    status: "running"
  }, {
    name: "fct_pipeline_health",
    who: "ci",
    time: "1h ago",
    dur: "—",
    status: "failed"
  }, {
    name: "snap_orders_scd2",
    who: "build-agent",
    time: "2h ago",
    dur: "3m 04s",
    status: "passed"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Models",
    value: "1,284",
    delta: "12 new this week",
    deltaDirection: "up",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-stack"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Avg build time",
    value: "48",
    unit: "s",
    delta: "9% faster",
    deltaDirection: "up",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-lightning"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Test coverage",
    value: "94",
    unit: "%",
    delta: "2 pts",
    deltaDirection: "up",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-flask"
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Open incidents",
    value: 3,
    delta: "2 more",
    deltaDirection: "down",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-warning"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.7fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: 0,
      color: "var(--text-primary)"
    }
  }, "Recent runs"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-arrow-right"
    })
  }, "View all")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("tbody", null, runs.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.name,
    style: {
      borderBottom: i < runs.length - 1 ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 20px",
      fontFamily: "var(--font-mono)",
      color: "var(--text-primary)"
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 8px",
      color: "var(--text-muted)"
    }
  }, r.who), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 8px",
      color: "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, r.dur), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 8px",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, r.time), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 20px",
      textAlign: "right"
    }
  }, statusBadge(r.status))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      margin: "0 0 4px",
      color: "var(--text-primary)"
    }
  }, "Quality gates"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      margin: "0 0 16px"
    }
  }, "Last deploy \xB7 PR #482"), [["Documentation", 100], ["Code quality", 96], ["Test coverage", 94], ["Data quality (Elementary)", 88]].map(([label, pct]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12.5,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--text-primary)"
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 3,
      background: "var(--bg-sunken)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: pct >= 90 ? "var(--seafoam)" : "var(--warning)"
    }
  })))), /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-check-circle"
    })
  }, "42 / 42 gates green"))));
}

/* ---------------- Build (agent) ---------------- */
function BuildScreen() {
  const [submitted, setSubmitted] = React.useState(false);
  const [value, setValue] = React.useState("Daily revenue mart, gold tier, with SCD2 customer snapshots");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      maxWidth: 860,
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "var(--radius-md)",
      background: "var(--pacific-soft)",
      color: "var(--pacific)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 17
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sparkle"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "Build agent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "Describe the data product. It builds to your team's standards."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Business intent",
    value: value,
    onChange: e => setValue(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-sparkle"
    }),
    onClick: () => setSubmitted(true)
  }, "Build")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    dotColor: "var(--seafoam)"
  }, "tier:gold"), /*#__PURE__*/React.createElement(Tag, {
    dotColor: "var(--pacific)"
  }, "incremental"), /*#__PURE__*/React.createElement(Tag, null, "governance:pii"), /*#__PURE__*/React.createElement(Tag, null, "fabric-lakehouse")))), submitted && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PlanStep, {
    icon: "ph-magic-wand",
    title: "Matched skill",
    detail: "modeling-revenue-recognition",
    tone: "pacific"
  }), /*#__PURE__*/React.createElement(PlanStep, {
    icon: "ph-file-sql",
    title: "Generated model",
    detail: "models/marts/fct_revenue_daily.sql",
    tone: "navy"
  }), /*#__PURE__*/React.createElement(PlanStep, {
    icon: "ph-camera",
    title: "Added snapshot",
    detail: "snap_customers \u2014 SCD Type 2",
    tone: "navy"
  }), /*#__PURE__*/React.createElement(PlanStep, {
    icon: "ph-flask",
    title: "Generated tests",
    detail: "6 tests \xB7 unique, not_null, relationships",
    tone: "navy"
  }), /*#__PURE__*/React.createElement(PlanStep, {
    icon: "ph-shield-check",
    title: "Governance",
    detail: "governance:pii tags applied \xB7 lineage resolved",
    tone: "seafoam"
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-check-circle"
    })
  }, "Ready to review"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Draft PR #483 \xB7 4 files changed")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md"
  }, "View diff"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-git-pull-request"
    })
  }, "Open PR"))))));
}
function PlanStep({
  icon,
  title,
  detail,
  tone
}) {
  const colors = {
    pacific: "var(--pacific)",
    seafoam: "#00a870",
    navy: "var(--text-secondary)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      background: "var(--bg-raised)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check-circle",
    style: {
      color: "var(--seafoam)",
      fontSize: 18,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph " + icon,
    style: {
      color: colors[tone] || "var(--text-muted)",
      fontSize: 17,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginLeft: "auto",
      textAlign: "right"
    }
  }, detail));
}

/* ---------------- Catalog ---------------- */
function CatalogScreen() {
  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const models = [{
    name: "fct_revenue_daily",
    layer: "mart",
    tier: "gold",
    mat: "incremental",
    tests: 6,
    owner: "build-agent",
    pii: true
  }, {
    name: "dim_customers",
    layer: "mart",
    tier: "gold",
    mat: "table",
    tests: 8,
    owner: "Dana Ortiz",
    pii: true
  }, {
    name: "stg_orders",
    layer: "staging",
    tier: "silver",
    mat: "view",
    tests: 4,
    owner: "ci",
    pii: false
  }, {
    name: "stg_salesforce_opps",
    layer: "staging",
    tier: "silver",
    mat: "view",
    tests: 5,
    owner: "ingestion-agent",
    pii: false
  }, {
    name: "snap_customers",
    layer: "snapshot",
    tier: "gold",
    mat: "snapshot",
    tests: 3,
    owner: "build-agent",
    pii: true
  }, {
    name: "int_order_items",
    layer: "intermediate",
    tier: "silver",
    mat: "ephemeral",
    tests: 2,
    owner: "Dana Ortiz",
    pii: false
  }];
  const tierColor = {
    gold: "var(--warning)",
    silver: "var(--arctic)"
  };
  const filtered = models.filter(m => (tab === "all" || m.layer === tab) && m.name.includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search models\u2026",
    value: q,
    onChange: e => setQ(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-magnifying-glass"
    })
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      className: "ph ph-plus"
    })
  }, "New model")), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: "all",
      label: "All",
      badge: models.length
    }, {
      value: "staging",
      label: "Staging"
    }, {
      value: "intermediate",
      label: "Intermediate"
    }, {
      value: "mart",
      label: "Marts"
    }, {
      value: "snapshot",
      label: "Snapshots"
    }]
  }), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: "1px solid var(--border)"
    }
  }, ["Model", "Tier", "Materialization", "Tests", "Owner", ""].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "10px 16px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filtered.map((m, i) => /*#__PURE__*/React.createElement("tr", {
    key: m.name,
    style: {
      borderBottom: i < filtered.length - 1 ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--text-primary)"
    }
  }, m.name), m.pii && /*#__PURE__*/React.createElement(Tag, {
    dotColor: "var(--error)"
  }, "pii"))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    dotColor: tierColor[m.tier]
  }, m.tier)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, m.mat), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px",
      color: "var(--text-secondary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, m.tests), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px",
      color: "var(--text-muted)"
    }
  }, m.owner), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 16px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    size: "sm",
    "aria-label": "Open"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-dots-three"
  })))))))));
}

/* ---------------- Generic placeholder ---------------- */
function PlaceholderScreen({
  title,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "var(--text-muted)",
      minHeight: 360,
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-surface)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph " + icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      maxWidth: 320
    }
  }, "This surface is part of the Vibedata Studio kit. Open Overview, Build, or Models for the worked-through screens."));
}
Object.assign(window, {
  OverviewScreen,
  BuildScreen,
  CatalogScreen,
  PlaceholderScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio/Shell.jsx
try { (() => {
/* Vibedata Studio — app shell (sidebar + topbar). Exposes on window. */
const {
  Avatar,
  Badge
} = window.VibedataDesignSystem_1cd9ed;
const STUDIO_CDN = "../../assets/logos/";
function StudioSidebar({
  active,
  onNavigate
}) {
  const groups = [{
    label: "Workspace",
    items: [{
      id: "overview",
      icon: "ph-squares-four",
      label: "Overview"
    }, {
      id: "build",
      icon: "ph-sparkle",
      label: "Build",
      badge: "AI"
    }, {
      id: "catalog",
      icon: "ph-stack",
      label: "Models"
    }]
  }, {
    label: "Delivery",
    items: [{
      id: "runs",
      icon: "ph-play-circle",
      label: "Runs"
    }, {
      id: "tests",
      icon: "ph-flask",
      label: "Tests & quality"
    }, {
      id: "lineage",
      icon: "ph-graph",
      label: "Lineage"
    }]
  }, {
    label: "Knowledge",
    items: [{
      id: "skills",
      icon: "ph-book-bookmark",
      label: "Skills"
    }, {
      id: "settings",
      icon: "ph-gear-six",
      label: "Settings"
    }]
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 244,
      flexShrink: 0,
      background: "var(--bg-base)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "16px 18px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: STUDIO_CDN + "mark-light.svg",
    alt: "",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "Vibedata"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "Studio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "12px 10px"
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      padding: "0 10px 6px"
    }
  }, g.label), g.items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNavigate(it.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "8px 10px",
        marginBottom: 1,
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        backgroundColor: on ? "var(--pacific-soft)" : "transparent",
        color: on ? "var(--pacific)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: 13.5,
        fontWeight: on ? 600 : 500,
        transition: "color var(--duration-micro) var(--ease-default)"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "ph " + it.icon,
      style: {
        fontSize: 17
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.badge && /*#__PURE__*/React.createElement(Badge, {
      variant: "seafoam"
    }, it.badge));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Dana Ortiz",
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "Dana Ortiz"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, "Platform team")), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-up-down",
    style: {
      color: "var(--text-muted)",
      fontSize: 15
    }
  })));
}
function StudioTopBar({
  title,
  subtitle,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "14px 24px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-base)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      margin: "2px 0 0"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, children));
}
Object.assign(window, {
  StudioSidebar,
  StudioTopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
