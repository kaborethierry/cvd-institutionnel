"use client";

import { useEffect, useRef, useState } from "react";
import { imageUrl } from "@/lib/api";
import styles from "@/app/admin/admin.module.css";
import local from "./ImageField.module.css";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo (identique au backend)

/**
 * Champ image réutilisable : ajout, remplacement et suppression.
 *
 * Props :
 *  - id, label
 *  - currentImage : chemin actuellement enregistré en base (ou "")
 *  - file / onFileChange : nouveau fichier choisi (File | null)
 *  - removeImage / onRemoveChange : suppression de l'image actuelle demandée (boolean)
 */
export default function ImageField({
  id,
  label,
  currentImage,
  file,
  onFileChange,
  removeImage,
  onRemoveChange,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handlePick = (e) => {
    const picked = e.target.files && e.target.files[0];
    setLocalError("");
    if (!picked) return;

    if (!ALLOWED_TYPES.includes(picked.type)) {
      setLocalError("Format non supporté. Utilisez JPG, PNG, WebP ou GIF.");
      e.target.value = "";
      return;
    }
    if (picked.size > MAX_SIZE) {
      setLocalError("L'image est trop lourde. Taille maximale : 5 Mo.");
      e.target.value = "";
      return;
    }

    onFileChange(picked);
    onRemoveChange(false);
  };

  const clearPickedFile = () => {
    onFileChange(null);
    setLocalError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const existingSrc = imageUrl(currentImage);

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.formLabel}>{label}</label>

      <div className={local.wrapper}>
        {file && preview ? (
          <div className={local.previewRow}>
            <img src={preview} alt="Aperçu de la nouvelle image" className={local.preview} />
            <div className={local.previewColumn}>
              <p className={local.caption}>
                Nouvelle image : sera enregistrée à la validation du formulaire
                {existingSrc ? " et remplacera l'image actuelle." : "."}
              </p>
              <button
                type="button"
                onClick={clearPickedFile}
                className={`${styles.btnSecondary} ${local.smallButton}`}
              >
                Annuler ce fichier
              </button>
            </div>
          </div>
        ) : null}

        {!file && existingSrc && !removeImage ? (
          <div className={local.previewRow}>
            <img src={existingSrc} alt="Image actuelle" className={local.preview} />
            <div className={local.previewColumn}>
              <p className={local.caption}>Image actuelle</p>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={removeImage}
                  onChange={(e) => onRemoveChange(e.target.checked)}
                />
                Supprimer l'image actuelle
              </label>
            </div>
          </div>
        ) : null}

        {!file && existingSrc && removeImage ? (
          <div className={local.previewColumn}>
            <p className={local.removedNotice}>
              L'image actuelle sera supprimée à l'enregistrement.
            </p>
            <button
              type="button"
              onClick={() => onRemoveChange(false)}
              className={`${styles.btnSecondary} ${local.smallButton}`}
            >
              Conserver l'image
            </button>
          </div>
        ) : null}

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handlePick}
          className={`${styles.formInput} ${styles.fileInput}`}
        />
        <p className={styles.formHint}>
          {existingSrc ? "Choisissez un fichier pour remplacer l'image. " : ""}
          JPG, PNG, WebP ou GIF — 5 Mo maximum.
        </p>
        {localError ? <p className={local.error} role="alert">{localError}</p> : null}
      </div>
    </div>
  );
}