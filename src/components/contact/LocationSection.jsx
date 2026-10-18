/**
 * LocationSection
 * Présente l'emplacement du siège de la CVD avec une carte interactive.
 */

import { MapPin } from "lucide-react";
import { site } from "@/data/site";
import styles from "./LocationSection.module.css";

export default function LocationSection({ title = "Notre siège" } = {}) {
  const address = site.address?.full || "";
  const city = site.address?.city || "";
  const country = site.address?.country || "";

  if (!address) return null;

  return (
    <section className={styles.section} aria-labelledby="location-title">
      <div className={styles.header}>
        <div className={styles.iconWrap} aria-hidden="true">
          <MapPin size={22} strokeWidth={2} />
        </div>
        <div>
          <h2 id="location-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.address}>{address}</p>
          {city || country ? (
            <p className={styles.meta}>
              {[city, country].filter(Boolean).join(", ")}
            </p>
          ) : null}
        </div>
      </div>

      {/* Carte Google Maps ciblant Dédougou */}
      <div className={styles.mapWrap}>
        <iframe
          title="Localisation de la CVD à Dédougou"
          src="https://www.google.com/maps?q=Dédougou,Burkina Faso&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}