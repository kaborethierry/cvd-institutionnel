"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { apiFetch, imageUrl } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/team");
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" de l'équipe ?`)) return;
    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/team/${id}`, { method: "DELETE" });
      setTeam((prev) => prev.filter((t) => t.id !== id));
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
          <h1 className={styles.pageTitle}>Équipe dirigeante</h1>
          <p className={styles.pageSubtitle}>Gérez les membres de l'équipe.</p>
        </div>
        <Link href="/admin/team/new" className={styles.btnPrimary}>
          <Plus size={18} strokeWidth={2.5} />
          Nouveau membre
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
      ) : team.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucun membre pour le moment.</p>
          <Link href="/admin/team/new" className={styles.btnPrimary}>
            <Plus size={18} strokeWidth={2.5} />
            Ajouter un membre
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Fonction</th>
                <th>Ordre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    {member.image ? (
                      <img src={imageUrl(member.image)} alt={member.name} className={styles.tableImage} />
                    ) : (
                      <div className={styles.tablePlaceholder}>{member.name?.slice(0, 2).toUpperCase() || "?"}</div>
                    )}
                  </td>
                  <td><strong>{member.name}</strong></td>
                  <td>{member.role}</td>
                  <td>{member.sort_order || 0}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link
                        href={`/admin/team/${member.id}`}
                        className={`${styles.btnSecondary} ${styles.btnIcon}`}
                        aria-label={`Modifier ${member.name}`}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(member.id, member.name)}
                        className={`${styles.btnDanger} ${styles.btnIcon}`}
                        disabled={deletingId === member.id}
                        aria-label={`Supprimer ${member.name}`}
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