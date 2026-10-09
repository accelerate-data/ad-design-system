/* @ds-bundle: {"format":3,"namespace":"ADDesignSystem_1cd9ed","components":[{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/data/Avatar.jsx":"8728582a275f","components/data/Card.jsx":"e402806b1010","components/data/StatCard.jsx":"79419f4fc50c","components/data/Tag.jsx":"2dec2879cfaa","components/feedback/Alert.jsx":"e25d06bc01f1","components/feedback/Badge.jsx":"ecdf4eb0175c","components/forms/Button.jsx":"ad13571cdb36","components/forms/Checkbox.jsx":"02ab227fe71c","components/forms/IconButton.jsx":"de17c0be7b3e","components/forms/Input.jsx":"9e8f5bf400e8","components/forms/Select.jsx":"5d45985342ed","components/forms/Switch.jsx":"1d937df10be4","components/navigation/Tabs.jsx":"4cca941f7963","ui_kits/marketing/Sections.jsx":"ded3f42765d4","ui_kits/studio/Screens.jsx":"50081e038516","ui_kits/studio/Shell.jsx":"9304125488a8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ADDesignSystem_1cd9ed = window.ADDesignSystem_1cd9ed || {});

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
 * Primary button. Steady, controlled — no spring or bounce.
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
/** Native select styled to match the design system inputs, with a chevron affordance. */
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
