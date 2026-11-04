"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/utils";
import ImageField from "./ImageField";
import styles from "@/app/admin/admin.module.css";

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  date: "",
};

export default function NewsForm({ id }) {
  const router = useRouter();
  const isEdit = id !== undefined && id !== null;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      setForm((prev) => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
      return undefined;
    }

    let cancelled = false;
    async function load() {
      try {
        const list = await apiFetch("/news");
        if (cancelled) return;
        const item = (Array.isArray(list) ? list : []).find((n) => n.id === Number(id));
        if (!item) throw new Error("Actualité introuvable.");

        setForm({
          title: item.title || "",
          slug: item.slug || "",
          excerpt: item.excerpt || "",
          content: item.content || "",
          category: item.category || "",
          date: item.date ? String(item.date).split("T")[0] : "",
        });
        setCurrentImage(item.image || "");
        setSlugTouched(true);
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
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && !isEdit && !slugTouched) next.slug = slugify(value);
      return next;
    });
    if (name === "slug") setSlugTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", form.title.trim());
      data.append("slug", form.slug.trim());
      data.append("excerpt", form.excerpt.trim());
      data.append("content", form.content.trim());
      data.append("category", form.category.trim());
      data.append("date", form.date);
      if (image) data.append("image", image);
      else if (removeImage) data.append("remove_image", "true");

      await apiFetch(isEdit ? `/news/${id}` : "/news", {
        method: isEdit ? "PUT" : "POST",
        body: data,
      });
      router.push("/admin/news");
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
          <Link href="/admin/news" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Retour aux actualités
          </Link>
          <h1 className={styles.pageTitle}>{isEdit ? "Modifier l'actualité" : "Nouvelle actualité"}</h1>
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
              <input id="title" name="title" type="text" required maxLength={255} value={form.title} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="slug" className={styles.formLabel}>Slug (URL) *</label>
              <input id="slug" name="slug" type="text" required maxLength={200} value={form.slug} onChange={handleChange} className={styles.formInput} placeholder="mon-actualite" />
              <p className={styles.formHint}>Lettres, chiffres et tirets uniquement. Doit être unique.</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="excerpt" className={styles.formLabel}>Résumé</label>
              <textarea id="excerpt" name="excerpt" rows={3} value={form.excerpt} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="content" className={styles.formLabel}>Contenu complet</label>
              <textarea id="content" name="content" rows={10} value={form.content} onChange={handleChange} className={styles.formTextarea} />
              <p className={styles.formHint}>Laissez une ligne vide entre les paragraphes.</p>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.formLabel}>Catégorie</label>
                <input id="category" name="category" type="text" maxLength={100} value={form.category} onChange={handleChange} className={styles.formInput} placeholder="Événement, Vie de la structure…" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.formLabel}>Date</label>
                <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className={styles.formInput} />
              </div>
            </div>

            <ImageField
              id="image"
              label="Image de l'actualité"
              currentImage={currentImage}
              file={image}
              onFileChange={setImage}
              removeImage={removeImage}
              onRemoveChange={setRemoveImage}
            />

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                {submitting ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Publier l'actualité"}
              </button>
              <Link href="/admin/news" className={styles.btnSecondary}>Annuler</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}