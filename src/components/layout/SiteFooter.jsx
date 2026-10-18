/**
 * SiteFooter
 * Pied de page institutionnel.
 * L'année est mise en cache via "use cache" pour éviter l'erreur
 * Next.js 16 `new Date()` pendant le prerendering.
 */

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import FacebookIcon from "@/components/ui/FacebookIcon";
import { site } from "@/data/site";
import { footerNavigation, legalNavigation } from "@/data/navigation";
import styles from "./SiteFooter.module.css";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function SiteFooter() {
  const year = await getCurrentYear();
  const shortName = site.shortName || "CVD";
  const fullName = site.name || "Coordination des Volontaires de Dédougou";
  const description = site.description || "";

  const phoneRaw = site.contact?.phone || "";
  const phoneDisplay = site.contact?.phoneDisplay || phoneRaw;
  const phoneHref = phoneRaw ? `tel:${phoneRaw.replace(/[^\d+]/g, "")}` : null;
  const email = site.contact?.email || "";
  const emailHref = email ? `mailto:${email}` : null;
  const addressFull = site.address?.full || "";
  const facebook = site.social?.facebook || null;

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              {shortName}
            </span>
            <span className={styles.brandName}>{fullName}</span>
          </div>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>

        <div className={styles.cols}>
          {footerNavigation.map((col) => (
            <div key={col.title} className={styles.col}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Nous joindre</h3>
            <ul className={styles.list}>
              {phoneHref ? (
                <li>
                  <a href={phoneHref} className={styles.contactLink}>
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

              {emailHref ? (
                <li>
                  <a href={emailHref} className={styles.contactLink}>
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

              {addressFull ? (
                <li>
                  <span className={styles.contactText}>
                    <MapPin
                      size={14}
                      strokeWidth={2}
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span>{addressFull}</span>
                  </span>
                </li>
              ) : null}

              {facebook ? (
                <li>
                  <a
                    href={facebook}
                    className={styles.contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon
                      size={14}
                      aria-hidden="true"
                      focusable="false"
                    />
                    <span>Facebook</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {year} {fullName}. Tous droits réservés.
        </p>

        <ul className={styles.legalList}>
          {legalNavigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mention Développeur */}
      <div className={styles.credits}>
        <p className={styles.creditsText}>
          Propulsé par{" "}
          <a
            href="https://portfo-liard-six.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditsLink}
          >
            Wend-Puire Christian Thierry KABORE
          </a>
        </p>
      </div>
    </footer>
  );
}