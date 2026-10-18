/**
 * Page Politique de confidentialité.
 * Server Component.
 * Contenu factuel, sans engagement juridique inventé.
 * À compléter avec l'association avant mise en production.
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import styles from "./confidentialite.module.css";

export const metadata = {
  title: "Politique de confidentialité de la CVD",
  description:
    "Politique de confidentialité de la Coordination des Volontaires de Dédougou : traitement des données du formulaire de contact et droits des personnes.",
};

export default function ConfidentialitePage() {
  const email = site.contact?.email || "";
  const phone = site.contact?.phoneDisplay || site.contact?.phone || "";

  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Politique de confidentialité" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="confidentialite-title">
        <PageContainer>
          <SectionHeading
            id="confidentialite-title"
            eyebrow="Informations légales"
            title="Politique de confidentialité"
            description="Cette page précise comment la Coordination des Volontaires de Dédougou traite les données transmises via son site internet."
          />
        </PageContainer>
      </section>

      <section className={styles.content} aria-label="Contenu de la politique">
        <PageContainer>
          <article className={styles.article}>
            <h2 className={styles.h2}>Données collectées</h2>
            <p className={styles.p}>
              Le formulaire de contact du site invite les visiteurs à fournir
              leur nom, leur adresse électronique, l&apos;objet de leur message
              et le contenu de leur message. Aucune autre donnée personnelle
              n&apos;est collectée par le biais du site.
            </p>

            <h2 className={styles.h2}>Finalité du traitement</h2>
            <p className={styles.p}>
              Les informations transmises via le formulaire sont utilisées
              uniquement pour répondre aux demandes reçues. Elles ne font
              l&apos;objet d&apos;aucune cession, vente ou transmission à des
              tiers non concernés par le traitement de la demande.
            </p>

            <h2 className={styles.h2}>État actuel du formulaire</h2>
            <p className={styles.p}>
              Le formulaire de contact du site n&apos;est pas encore connecté à
              un service d&apos;envoi automatique. En attendant, un lien direct
              par courriel est proposé aux visiteurs qui souhaitent nous
              contacter.
            </p>

            <h2 className={styles.h2}>Vos droits</h2>
            <p className={styles.p}>
              Conformément aux principes applicables en matière de protection
              des données personnelles, vous pouvez demander l&apos;accès, la
              rectification ou la suppression des informations que vous nous
              avez transmises. Pour exercer ce droit, vous pouvez nous
              contacter :
            </p>
            <ul className={styles.list}>
              {email ? (
                <li>
                  Par courriel :{" "}
                  <a href={`mailto:${email}`} className={styles.link}>
                    {email}
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  Par téléphone :{" "}
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className={styles.link}
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
            </ul>

            <h2 className={styles.h2}>Cookies et traceurs</h2>
            <p className={styles.p}>
              Le site de la CVD n&apos;utilise pas de cookies publicitaires ni
              de traceurs à des fins de profilage. Seuls des cookies techniques
              strictement nécessaires au fonctionnement du site peuvent être
              utilisés.
            </p>

            <h2 className={styles.h2}>Mise à jour</h2>
            <p className={styles.p}>
              Cette politique de confidentialité pourra être mise à jour pour
              refléter les évolutions du site ou les exigences de
              l&apos;association. La version en vigueur est celle publiée sur
              cette page.
            </p>

            <p className={styles.note}>
              Note : cette page est fournie à titre informatif et devra être
              validée par la CVD avant publication définitive. Elle ne
              constitue pas un avis juridique.
            </p>
          </article>
        </PageContainer>
      </section>
    </>
  );
}