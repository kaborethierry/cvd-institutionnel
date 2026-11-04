"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  Users,
  Handshake,
  Layers,
  Mail,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import styles from "./admin.module.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/team", label: "Équipe", icon: Users },
  { href: "/admin/partners", label: "Partenaires", icon: Handshake },
  { href: "/admin/domains", label: "Domaines", icon: Layers },
  { href: "/admin/contacts", label: "Messages", icon: Mail },
];

export default function AdminLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLogin) return;
    const token = localStorage.getItem("cvd_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [isLogin, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  if (isLogin) return <>{children}</>;

  if (!isAuthorized) {
    return <div className={styles.splash}>Chargement…</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("cvd_token");
    localStorage.removeItem("cvd_user");
    router.replace("/admin/login");
  };

  return (
    <div className={styles.adminLayout}>
      <aside
        id="admin-sidebar"
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <span className={styles.logoMark}>CVD</span>
          <span className={styles.logoText}>Admin</span>
          <button
            type="button"
            className={styles.sidebarClose}
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Navigation administration">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank" className={styles.navLink}>
            <Home size={18} strokeWidth={2} />
            <span>Voir le site</span>
          </Link>
          <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} strokeWidth={2} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
        />
      ) : null}

      <div className={styles.contentArea}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
          <span className={styles.topbarTitle}>CVD · Administration</span>
        </header>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}