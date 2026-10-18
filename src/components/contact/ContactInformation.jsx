/**
 * ContactInformation
 * Affiche les coordonnées officielles de la CVD.
 * Les données proviennent de @/data/site — aucune duplication.
 */

import { Phone, Mail, MapPin } from "lucide-react";
import FacebookIcon from "@/components/ui/FacebookIcon";
import { site } from "@/data/site";
import styles from "./ContactInformation.module.css";

export default function ContactInformation() {
  const phoneRaw = site.contact?.phone || "";
  const phoneDisplay = site.contact?.phoneDisplay || phoneRaw;
  const phoneHref = phoneRaw
    ? `tel:${phoneRaw.replace(/[^\d+]/g, "")}`
    : null;

  const email = site.contact?.email || "";
  const emailHref = email ? `mailto:${email}` : null;

  const addressFull = site.address?.full || "";
  const facebook = site.social?.facebook || null;

  return (
    <address className={styles.wrapper}>
      <h2 className={styles.title}>Nos coordonnées</h2>

      <ul className={styles.list}>
        {phoneHref ? (
          <li className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Phone size={18} strokeWidth={2} />
            </span>
            <div className={styles.content}>
              <p className={styles.label}>Téléphone</p>
              <a href={phoneHref} className={styles.link}>
                {phoneDisplay}
              </a>
            </div>
          </li>
        ) : null}

        {emailHref ? (
          <li className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Mail size={18} strokeWidth={2} />
            </span>
            <div className={styles.content}>
              <p className={styles.label}>Adresse électronique</p>
              <a href={emailHref} className={styles.link}>
                {email}
              </a>
            </div>
          </li>
        ) : null}

        {addressFull ? (
          <li className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <MapPin size={18} strokeWidth={2} />
            </span>
            <div className={styles.content}>
              <p className={styles.label}>Siège social</p>
              <p className={styles.value}>{addressFull}</p>
            </div>
          </li>
        ) : null}

        {facebook ? (
          <li className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <FacebookIcon size={18} />
            </span>
            <div className={styles.content}>
              <p className={styles.label}>Facebook</p>
              <a
                href={facebook}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Page officielle de la CVD
              </a>
            </div>
          </li>
        ) : null}
      </ul>
    </address>
  );
}