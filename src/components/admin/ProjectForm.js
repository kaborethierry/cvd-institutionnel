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
  short_title: "",
  summary: "",
  description: "",
  domain_id: "",
  status: "en-cours",
  start_date: "",
  end_date: "",
  featured: false,
  funders: "",
  partners: "",
  locations: "",
  activities: "",
};

const listToText = (value) => (Array.isArray(value) ? value.join("\n") : "");
const textToList = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function ProjectForm({ id }) {
  const router = useRouter();
  const isEdit = id !== undefined && id !== null;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [domains, setDomains] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const requests = [apiFetch("/domains")];
        if (isEdit) requests.push(apiFetch("/projects"));
        const [domainsData, projectsData] = await Promise.all(requests);
        if (cancelled) return;

        setDomains(Array.isArray(domainsData) ? domainsData : []);

        if (isEdit) {
          const project = (Array.isArray(projectsData) ? projectsData : []).find(
            (p) => p.id === Number(id)
          );
          if (!project) throw new Error("Projet introuvable.");

          setForm({
            title: project.title || "",
            slug: project.slug || "",
            short_title: project.short_title || "",
            summary: project.summary || "",
            description: project.description || "",
            domain_id: project.domain_id ? String(project.domain_id) : "",
            status: project.status || "a-confirmer",
            start_date: project.start_date || "",
            end_date: project.end_date || "",
            featured: Boolean(project.featured),
            funders: listToText(project.funders),
            partners: listToText(project.partners),
            locations: listToText(project.locations),
            activities: listToText(project.activities),
          });
          setCurrentImage(project.image || "");
          setSlugTouched(true);
        }
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title" && !isEdit && !slugTouched) {
        next.slug = slugify(value);
      }
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
      data.append("short_title", form.short_title.trim());
      data.append("summary", form.summary.trim());
      data.append("description", form.description.trim());
      data.append("domain_id", form.domain_id);
      data.append("status", form.status);
      data.append("start_date", form.start_date.trim());
      data.append("end_date", form.end_date.trim());
      data.append("featured", form.featured ? "true" : "false");
      ["funders", "partners", "locations", "activities"].forEach((key) => {
        data.append(key, JSON.stringify(textToList(form[key])));
      });
      if (image) data.append("image", image);
      else if (removeImage) data.append("remove_image", "true");

      await apiFetch(isEdit ? `/projects/${id}` : "/projects", {
        method: isEdit ? "PUT" : "POST",
        body: data,
      });
      router.push("/admin/projects");
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
          <Link href="/admin/projects" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Retour aux projets
          </Link>
          <h1 className={styles.pageTitle}>{isEdit ? "Modifier le projet" : "Nouveau projet"}</h1>
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
              <input id="slug" name="slug" type="text" required maxLength={200} value={form.slug} onChange={handleChange} className={styles.formInput} placeholder="mon-super-projet" />
              <p className={styles.formHint}>Lettres, chiffres et tirets uniquement. Doit être unique.</p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="short_title" className={styles.formLabel}>Titre court</label>
              <input id="short_title" name="short_title" type="text" maxLength={100} value={form.short_title} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="summary" className={styles.formLabel}>Résumé</label>
              <textarea id="summary" name="summary" rows={3} value={form.summary} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description complète</label>
              <textarea id="description" name="description" rows={6} value={form.description} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="domain_id" className={styles.formLabel}>Domaine</label>
                <select id="domain_id" name="domain_id" value={form.domain_id} onChange={handleChange} className={styles.formSelect}>
                  <option value="">— Aucun domaine —</option>
                  {domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>{domain.title}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.formLabel}>Statut</label>
                <select id="status" name="status" value={form.status} onChange={handleChange} className={styles.formSelect}>
                  <option value="en-cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="a-confirmer">À confirmer</option>
                  <option value="planifie">Planifié</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="start_date" className={styles.formLabel}>Date de début</label>
                <input id="start_date" name="start_date" type="text" maxLength={20} value={form.start_date} onChange={handleChange} className={styles.formInput} placeholder="2025 ou 2025-04" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="end_date" className={styles.formLabel}>Date de fin</label>
                <input id="end_date" name="end_date" type="text" maxLength={20} value={form.end_date} onChange={handleChange} className={styles.formInput} placeholder="2026 ou 2026-03" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="funders" className={styles.formLabel}>Bailleurs</label>
              <textarea id="funders" name="funders" rows={3} value={form.funders} onChange={handleChange} className={styles.formTextarea} placeholder="Un bailleur par ligne" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="partners" className={styles.formLabel}>Partenaires du projet</label>
              <textarea id="partners" name="partners" rows={3} value={form.partners} onChange={handleChange} className={styles.formTextarea} placeholder="Un partenaire par ligne" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="locations" className={styles.formLabel}>Localisations</label>
              <textarea id="locations" name="locations" rows={3} value={form.locations} onChange={handleChange} className={styles.formTextarea} placeholder="Une localisation par ligne" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="activities" className={styles.formLabel}>Activités</label>
              <textarea id="activities" name="activities" rows={5} value={form.activities} onChange={handleChange} className={styles.formTextarea} placeholder="Une activité par ligne" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                Mettre ce projet en avant sur l'accueil
              </label>
            </div>

            <ImageField
              id="image"
              label="Image du projet"
              currentImage={currentImage}
              file={image}
              onFileChange={setImage}
              removeImage={removeImage}
              onRemoveChange={setRemoveImage}
            />

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                {submitting ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Créer le projet"}
              </button>
              <Link href="/admin/projects" className={styles.btnSecondary}>Annuler</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}