/**
 * MainNavigation
 * Logo + liens de navigation principaux + bouton contact + burger mobile.
 */

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import styles from "./MainNavigation.module.css";

function isActivePath(pathname, href) {
  if (!pathname || !href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainNavigation({
  pathname,
  onToggleMobile,
  menuOpen,
}) {
  const fullName = site.name || "Coordination des Volontaires de Dédougou";

  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      <Link href="/" className={styles.brand} aria-label={fullName}>
        <Image
          src="/images/logo/cvd-logo.png"
          alt={`Logo de la ${fullName}`}
          width={160}
          height={48}
          className={styles.brandLogo}
          priority
        />
      </Link>

      <ul className={styles.links}>
        {mainNavigation.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href} className={styles.linkItem}>
              <Link
                href={item.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <Link href="/contact" className={styles.contactButton}>
          Nous contacter
        </Link>
        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={onToggleMobile}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={2} aria-hidden="true" focusable="false" />
          ) : (
            <Menu size={22} strokeWidth={2} aria-hidden="true" focusable="false" />
          )}
        </button>
      </div>
    </nav>
  );
}