"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import ImageField from "./ImageField";
import styles from "@/app/admin/admin.module.css";

export default function TeamForm({ id }) {
  const router = useRouter();
  const isEdit = id !== undefined && id !== null;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", role: "", sort_order: "0" });
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;

    let cancelled = false;
    async function load() {
      try {
        const list = await apiFetch("/team");
        if (cancelled) return;
        const member = (Array.isArray(list) ? list : []).find((t) => t.id === Number(id));
        if (!member) throw new Error("Membre introuvable.");

        setForm({
          name: member.name || "",
          role: member.role || "",
          sort_order: String(member.sort_order ?? 0),
        });
        setCurrentImage(member.image || "");
      } catch (err) {
        if (!cancelled) setLoadError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", form.name.trim());
      data.append("role", form.role.trim());
      data.append("sort_order", form.sort_order === "" ? "0" : form.sort_order);
      if (image) data.append("image", image);
      else if (removeImage) data.append("remove_image", "true");

      await apiFetch(isEdit ? `/team/${id}` : "/team", {
        method: isEdit ? "PUT" : "POST",
        body: data,
      });
      router.push("/admin/team");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className={styles.loadingState}>Chargement…</p>;

  return (
    <div>
      <header className={styles.pageHeader}>
        <div>
          <Link href="/admin/team" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Retour à l'équipe
          </Link>
          <h1 className={styles.pageTitle}>{isEdit ? "Modifier le membre" : "Nouveau membre"}</h1>
        </div>
      </header>

      {loadError ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{loadError}</span>
        </div>
      ) : (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {error ? <p className={styles.formError} role="alert">{error}</p> : null}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Nom complet *</label>
              <input id="name" name="name" type="text" required maxLength={150} value={form.name} onChange={handleChange} className={styles.formInput} placeholder="Ex : DAYO Karamogo" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>Fonction *</label>
              <input id="role" name="role" type="text" required maxLength={200} value={form.role} onChange={handleChange} className={styles.formInput} placeholder="Ex : Président" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sort_order" className={styles.formLabel}>Ordre d'affichage</label>
              <input id="sort_order" name="sort_order" type="number" min={0} max={9999} step={1} value={form.sort_order} onChange={handleChange} className={styles.formInput} />
              <p className={styles.formHint}>Les plus petits nombres apparaissent en premier.</p>
            </div>

            <ImageField
              id="image"
              label="Photo"
              currentImage={currentImage}
              file={image}
              onFileChange={setImage}
              removeImage={removeImage}
              onRemoveChange={setRemoveImage}
            />

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                {submitting ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Ajouter le membre"}
              </button>
              <Link href="/admin/team" className={styles.btnSecondary}>Annuler</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}