"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { apiFetch, imageUrl } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/news");
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer l'actualité "${title}" ? Cette action est irréversible.`)) return;

    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((n) => n.id !== id));
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
          <h1 className={styles.pageTitle}>Actualités</h1>
          <p className={styles.pageSubtitle}>Gérez les actualités de la CVD.</p>
        </div>
        <Link href="/admin/news/new" className={styles.btnPrimary}>
          <Plus size={18} strokeWidth={2.5} />
          Nouvelle actualité
        </Link>
      </header>

      {error ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <p className={styles.loadingState}>Chargement des actualités…</p>
      ) : news.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucune actualité pour le moment.</p>
          <Link href="/admin/news/new" className={styles.btnPrimary}>
            <Plus size={18} strokeWidth={2.5} />
            Créer la première actualité
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image ? (
                      <img src={imageUrl(item.image)} alt={item.title} className={styles.tableImage} />
                    ) : (
                      <div className={styles.tablePlaceholder}>
                        {item.title?.slice(0, 3).toUpperCase() || "?"}
                      </div>
                    )}
                  </td>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.category || "—"}</td>
                  <td>{item.date ? String(item.date).split("T")[0] : "—"}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link
                        href={`/admin/news/${item.id}`}
                        className={`${styles.btnSecondary} ${styles.btnIcon}`}
                        aria-label={`Modifier ${item.title}`}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        className={`${styles.btnDanger} ${styles.btnIcon}`}
                        disabled={deletingId === item.id}
                        aria-label={`Supprimer ${item.title}`}
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