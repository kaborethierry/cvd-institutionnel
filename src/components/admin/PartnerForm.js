"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import ImageField from "./ImageField";
import styles from "@/app/admin/admin.module.css";

export default function PartnerForm({ id }) {
  const router = useRouter();
  const isEdit = id !== undefined && id !== null;

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", full_name: "", website: "" });
  const [currentLogo, setCurrentLogo] = useState("");
  const [logo, setLogo] = useState(null);
  const [removeLogo, setRemoveLogo] = useState(false);

  useEffect(() => {
    if (!isEdit) return undefined;

    let cancelled = false;
    async function load() {
      try {
        const list = await apiFetch("/partners");
        if (cancelled) return;
        const partner = (Array.isArray(list) ? list : []).find((p) => p.id === Number(id));
        if (!partner) throw new Error("Partenaire introuvable.");

        setForm({
          name: partner.name || "",
          full_name: partner.full_name || "",
          website: partner.website || "",
        });
        setCurrentLogo(partner.logo || "");
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
      data.append("full_name", form.full_name.trim());
      data.append("website", form.website.trim());
      if (logo) data.append("logo", logo);
      else if (removeLogo) data.append("remove_image", "true");

      await apiFetch(isEdit ? `/partners/${id}` : "/partners", {
        method: isEdit ? "PUT" : "POST",
        body: data,
      });
      router.push("/admin/partners");
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
          <Link href="/admin/partners" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            Retour aux partenaires
          </Link>
          <h1 className={styles.pageTitle}>{isEdit ? "Modifier le partenaire" : "Nouveau partenaire"}</h1>
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
              <label htmlFor="name" className={styles.formLabel}>Nom court *</label>
              <input id="name" name="name" type="text" required maxLength={150} value={form.name} onChange={handleChange} className={styles.formInput} placeholder="Ex : ONUSIDA" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="full_name" className={styles.formLabel}>Nom complet</label>
              <input id="full_name" name="full_name" type="text" maxLength={255} value={form.full_name} onChange={handleChange} className={styles.formInput} placeholder="Programme commun des Nations Unies sur le VIH/Sida" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website" className={styles.formLabel}>Site web</label>
              <input id="website" name="website" type="url" maxLength={255} value={form.website} onChange={handleChange} className={styles.formInput} placeholder="https://…" />
            </div>

            <ImageField
              id="logo"
              label="Logo"
              currentImage={currentLogo}
              file={logo}
              onFileChange={setLogo}
              removeImage={removeLogo}
              onRemoveChange={setRemoveLogo}
            />

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                {submitting ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Ajouter le partenaire"}
              </button>
              <Link href="/admin/partners" className={styles.btnSecondary}>Annuler</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}