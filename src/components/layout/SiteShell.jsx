"use client";

import { usePathname } from "next/navigation";

/**
 * Affiche le header et le footer du site public,
 * sauf sur les pages /admin (qui ont leur propre interface).
 */
export default function SiteShell({ header, footer, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}