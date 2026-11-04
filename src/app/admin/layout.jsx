import AdminLayoutClient from "./layout-client";

export const metadata = {
  title: "Administration — CVD",
  robots: { index: false, follow: false },
};

// Désactive la validation "instant navigation" pour tout l'admin
export const instant = false;

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}