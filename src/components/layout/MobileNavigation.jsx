"use client";

/**
 * MobileNavigation
 * Panneau mobile accessible.
 * - Ouverture/fermeture gérée par SiteHeader via `open`.
 * - Fermeture sur Échap.
 * - Fermeture sur clic hors panneau (overlay).
 * - Blocage du scroll du body quand ouvert.
 * - Fermeture après sélection d'un lien (via `pathname` de SiteHeader).
 * - Navigation clavier : focus sur le premier lien à l'ouverture.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import styles from "./MobileNavigation.module.css";

function isActivePath(pathname, href) {
  if (!pathname || !href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileNavigation({ open, onClose, pathname }) {
  const panelRef = useRef(null);

  // Bloquer le scroll quand ouvert
  useEffect(() => {
    if (!open) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Échap ferme le panneau
  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus sur le premier lien à l'ouverture
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const firstLink = panel.querySelector("a, button");
    if (firstLink && typeof firstLink.focus === "function") {
      firstLink.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Menu mobile"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Menu</span>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fermer le menu"
            onClick={onClose}
          >
            <X size={22} strokeWidth={2} aria-hidden="true" focusable="false" />
          </button>
        </div>

        <ul className={styles.list}>
          {mainNavigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href} className={styles.item}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    active ? styles.active : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
                {Array.isArray(item.children) && item.children.length > 0 ? (
                  <ul className={styles.subList}>
                    {item.children.map((child) => {
                      const childActive = isActivePath(pathname, child.href);
                      return (
                        <li key={child.href} className={styles.subItem}>
                          <Link
                            href={child.href}
                            className={`${styles.subLink} ${
                              childActive ? styles.subActive : ""
                            }`}
                            aria-current={childActive ? "page" : undefined}
                            onClick={onClose}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className={styles.footer}>
          <Link
            href="/contact"
            className={styles.contactButton}
            onClick={onClose}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}