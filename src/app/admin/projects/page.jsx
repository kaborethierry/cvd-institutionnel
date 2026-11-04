"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { apiFetch, imageUrl } from "@/lib/api";
import styles from "../admin.module.css";

const STATUS_LABELS = {
  "en-cours": { label: "En cours", className: styles.badgeProgress },
  termine: { label: "Terminé", className: styles.badgeDone },
  "a-confirmer": { label: "À confirmer", className: styles.badgePending },
  planifie: { label: "Planifié", className: styles.badgePlanned },
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/projects");
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer le projet "${title}" ? Cette action est irréversible.`)) return;

    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
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
          <h1 className={styles.pageTitle}>Projets</h1>
          <p className={styles.pageSubtitle}>Gérez les projets de la CVD.</p>
        </div>
        <Link href="/admin/projects/new" className={styles.btnPrimary}>
          <Plus size={18} strokeWidth={2.5} />
          Nouveau projet
        </Link>
      </header>

      {error ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <p className={styles.loadingState}>Chargement des projets…</p>
      ) : projects.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucun projet pour le moment.</p>
          <Link href="/admin/projects/new" className={styles.btnPrimary}>
            <Plus size={18} strokeWidth={2.5} />
            Créer le premier projet
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Statut</th>
                <th>Période</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const status = STATUS_LABELS[project.status];
                return (
                  <tr key={project.id}>
                    <td>
                      {project.image ? (
                        <img src={imageUrl(project.image)} alt={project.title} className={styles.tableImage} />
                      ) : (
                        <div className={styles.tablePlaceholder}>
                          {project.title?.slice(0, 3).toUpperCase() || "?"}
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{project.short_title || project.title}</strong>
                      {project.featured ? <div className={styles.formHint}>★ Mis en avant</div> : null}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${status ? status.className : ""}`}>
                        {status ? status.label : project.status}
                      </span>
                    </td>
                    <td>
                      {project.start_date || "—"}
                      {project.end_date ? ` → ${project.end_date}` : ""}
                    </td>
                    <td>
                      <div className={styles.tableActions}>
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className={`${styles.btnSecondary} ${styles.btnIcon}`}
                          aria-label={`Modifier ${project.title}`}
                        >
                          <Pencil size={16} strokeWidth={2} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id, project.title)}
                          className={`${styles.btnDanger} ${styles.btnIcon}`}
                          disabled={deletingId === project.id}
                          aria-label={`Supprimer ${project.title}`}
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}