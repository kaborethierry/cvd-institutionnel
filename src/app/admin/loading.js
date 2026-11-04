import AdminLayoutClient from "./layout-client";

export const metadata = {
  title: "Administration — CVD",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}