"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import ImageField from "./ImageField";
import styles from "@/app/admin/admin.module.css";

export default function DomainForm({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", slug: "", summary: "", description: "" });
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const list = await apiFetch("/domains");
        if (cancelled) return;
        const domain = (Array.isArray(list) ? list : []).find((d) => d.id === Number(id));
        if (!domain) throw new Error("Domaine introuvable.");

        setForm({
          title: domain.title || "",
          slug: domain.slug || "",
          summary: domain.summary || "",
          description: domain.description || "",
        });
        setCurrentImage(domain.image || "");
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
  }, [id]);

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
      data.append("title", form.title.trim());
      data.append("slug", form.slug.trim());
      data.append("summary", form.summary.trim());
      data.append("description", form.description.trim());
      if (image) data.append("image", image);
      else if (removeImage) data.append("remove_image", "true");

      await apiFetch(`/domains/${id}`, { method: "PUT", body: data });
      router.push("/admin/domains");
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
          <Link href="/admin/domains" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Retour aux domaines
          </Link>
          <h1 className={styles.pageTitle}>Modifier le domaine</h1>
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
              <label htmlFor="title" className={styles.formLabel}>Titre *</label>
              <input id="title" name="title" type="text" required maxLength={150} value={form.title} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="slug" className={styles.formLabel}>Slug (URL) *</label>
              <input id="slug" name="slug" type="text" required maxLength={150} value={form.slug} onChange={handleChange} className={styles.formInput} />
              <p className={styles.formHint}>Attention : modifier le slug change l'adresse de la page du domaine.</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="summary" className={styles.formLabel}>Résumé</label>
              <textarea id="summary" name="summary" rows={3} value={form.summary} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description complète</label>
              <textarea id="description" name="description" rows={8} value={form.description} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <ImageField
              id="image"
              label="Image du domaine"
              currentImage={currentImage}
              file={image}
              onFileChange={setImage}
              removeImage={removeImage}
              onRemoveChange={setRemoveImage}
            />

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                {submitting ? "Enregistrement…" : "Enregistrer les modifications"}
              </button>
              <Link href="/admin/domains" className={styles.btnSecondary}>Annuler</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}