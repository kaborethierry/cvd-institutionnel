"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, AlertCircle } from "lucide-react";
import { apiFetch, imageUrl } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminDomainsPage() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch("/domains");
        setDomains(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Domaines d'intervention</h1>
          <p className={styles.pageSubtitle}>
            Les trois domaines de la CVD peuvent être modifiés (textes et image).
          </p>
        </div>
      </header>

      {error ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <p className={styles.loadingState}>Chargement…</p>
      ) : domains.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucun domaine en base de données.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Slug</th>
                <th>Résumé</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id}>
                  <td>
                    {domain.image ? (
                      <img src={imageUrl(domain.image)} alt={domain.title} className={styles.tableImage} />
                    ) : (
                      <div className={styles.tablePlaceholder}>{domain.title?.slice(0, 3).toUpperCase() || "?"}</div>
                    )}
                  </td>
                  <td><strong>{domain.title}</strong></td>
                  <td>{domain.slug}</td>
                  <td>{domain.summary || "—"}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link
                        href={`/admin/domains/${domain.id}`}
                        className={`${styles.btnSecondary} ${styles.btnIcon}`}
                        aria-label={`Modifier ${domain.title}`}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </Link>
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