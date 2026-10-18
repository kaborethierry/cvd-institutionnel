"use client";

/**
 * SiteHeader
 * Assemble TopBar et MainNavigation.
 * Gère l'état du menu mobile (ouvert/fermé) et la détection
 * de la route active pour fermer proprement le menu.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu à chaque changement de route
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <TopBar />
      <div className={styles.inner}>
        <MainNavigation
          pathname={pathname}
          onToggleMobile={() => setMenuOpen((v) => !v)}
          menuOpen={menuOpen}
        />
      </div>
      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}