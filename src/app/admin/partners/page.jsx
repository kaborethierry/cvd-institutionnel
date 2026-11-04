"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { apiFetch, imageUrl } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadPartners = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/partners");
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer le partenaire "${name}" ?`)) return;
    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/partners/${id}`, { method: "DELETE" });
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Partenaires</h1>
          <p className={styles.pageSubtitle}>Gérez les partenaires de la CVD.</p>
        </div>
        <Link href="/admin/partners/new" className={styles.btnPrimary}>
          <Plus size={18} strokeWidth={2.5} />
          Nouveau partenaire
        </Link>
      </header>

      {error ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <p className={styles.loadingState}>Chargement…</p>
      ) : partners.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucun partenaire pour le moment.</p>
          <Link href="/admin/partners/new" className={styles.btnPrimary}>
            <Plus size={18} strokeWidth={2.5} />
            Ajouter un partenaire
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nom</th>
                <th>Nom complet</th>
                <th>Site web</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td>
                    {partner.logo ? (
                      <img src={imageUrl(partner.logo)} alt={partner.name} className={styles.tableImage} />
                    ) : (
                      <div className={styles.tablePlaceholder}>{partner.name?.slice(0, 3).toUpperCase() || "?"}</div>
                    )}
                  </td>
                  <td><strong>{partner.name}</strong></td>
                  <td>{partner.full_name || "—"}</td>
                  <td>{partner.website || "—"}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link
                        href={`/admin/partners/${partner.id}`}
                        className={`${styles.btnSecondary} ${styles.btnIcon}`}
                        aria-label={`Modifier ${partner.name}`}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(partner.id, partner.name)}
                        className={`${styles.btnDanger} ${styles.btnIcon}`}
                        disabled={deletingId === partner.id}
                        aria-label={`Supprimer ${partner.name}`}
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}