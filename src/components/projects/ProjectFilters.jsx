"use client";

/**
 * ProjectFilters
 * Filtres fonctionnels par domaine, bailleur et statut.
 * Toutes les options viennent des données réelles.
 * Accessible au clavier, bouton de réinitialisation.
 *
 * Props :
 * - filters    : objet { domainSlug, funder, status }
 * - onChange   : (newFilters) => void
 * - domains    : liste des domaines disponibles
 * - funders    : liste des bailleurs disponibles
 * - statuses   : liste des statuts disponibles
 */

import { X } from "lucide-react";
import { formatStatusLabel } from "@/lib/formatters";
import styles from "./ProjectFilters.module.css";

export default function ProjectFilters({
  filters = {},
  onChange,
  domains = [],
  funders = [],
  statuses = [],
}) {
  const active = Boolean(
    filters.domainSlug || filters.funder || filters.status
  );

  function update(key, value) {
    if (typeof onChange !== "function") return;
    const next = { ...filters };
    if (!value || value === "") {
      delete next[key];
    } else {
      next[key] = value;
    }
    onChange(next);
  }

  function reset() {
    if (typeof onChange === "function") onChange({});
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="filter-domain" className={styles.label}>
            Domaine
          </label>
          <select
            id="filter-domain"
            className={styles.select}
            value={filters.domainSlug || ""}
            onChange={(e) => update("domainSlug", e.target.value)}
          >
            <option value="">Tous les domaines</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-funder" className={styles.label}>
            Bailleur
          </label>
          <select
            id="filter-funder"
            className={styles.select}
            value={filters.funder || ""}
            onChange={(e) => update("funder", e.target.value)}
          >
            <option value="">Tous les bailleurs</option>
            {funders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="filter-status" className={styles.label}>
            Statut
          </label>
          <select
            id="filter-status"
            className={styles.select}
            value={filters.status || ""}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">Tous les statuts</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {formatStatusLabel(s)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.reset}
            onClick={reset}
            disabled={!active}
            aria-label="Réinitialiser les filtres"
          >
            <X size={14} strokeWidth={2} aria-hidden="true" focusable="false" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>
    </div>
  );
}