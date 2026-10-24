/**
 * TopBar
 * Bandeau supérieur discret : coordonnées, adresse postale et lien Facebook.
 * Sur mobile, seul le téléphone reste visible.
 */

import { Phone, Mail, MapPin } from "lucide-react";
import FacebookIcon from "@/components/ui/FacebookIcon";
import { site } from "@/data/site";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const phoneRaw = site.contact?.phone || "";
  const phoneDisplay = site.contact?.phoneDisplay || phoneRaw;
  const phoneHref = phoneRaw ? `tel:${phoneRaw.replace(/[^\d+]/g, "")}` : null;
  const email = site.contact?.email || "";
  const emailHref = email ? `mailto:${email}` : null;
  const facebook = site.social?.facebook || null;

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {phoneHref ? (
            <li className={styles.item}>
              <a href={phoneHref} className={styles.link}>
                <Phone
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                <span>{phoneDisplay}</span>
              </a>
            </li>
          ) : null}

          {/* Adresse Postale */}
          <li className={`${styles.item} ${styles.hideSmall}`}>
            <span className={styles.link}>
              <MapPin
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                focusable="false"
              />
              <span>BP : 11 Dédougou secteur 5 Trypano</span>
            </span>
          </li>

          {emailHref ? (
            <li className={`${styles.item} ${styles.hideSmall}`}>
              <a href={emailHref} className={styles.link}>
                <Mail
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                  focusable="false"
                />
                <span>{email}</span>
              </a>
            </li>
          ) : null}

          {facebook ? (
            <li className={`${styles.item} ${styles.hideSmall}`}>
              <a
                href={facebook}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook officielle de la CVD"
              >
                <FacebookIcon size={14} aria-hidden="true" focusable="false" />
                <span>Facebook</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}