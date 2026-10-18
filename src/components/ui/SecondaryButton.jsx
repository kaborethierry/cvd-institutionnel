/**
 * SecondaryButton
 * Action secondaire, contour vert sur fond neutre.
 * Peut être rendu comme <button> ou <Link>.
 *
 * Props identiques à PrimaryButton.
 */

import Link from "next/link";
import styles from "./SecondaryButton.module.css";

export default function SecondaryButton({
  children,
  href,
  type = "button",
  onClick,
  disabled = false,
  size = "md",
  fullWidth = false,
  icon: Icon,
  ariaLabel,
}) {
  const className = [
    styles.button,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {Icon ? (
        <Icon
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}