/**
 * Page Contact.
 * Server Component — le formulaire est client (ContactForm).
 */

import PageContainer from "@/components/layout/PageContainer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";
import LocationSection from "@/components/contact/LocationSection";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contacter la CVD à Dédougou",
  description:
    "Contactez la Coordination des Volontaires de Dédougou par téléphone, par courriel ou via notre formulaire de contact.",
};

export default function ContactPage() {
  return (
    <>
      <PageContainer>
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />
      </PageContainer>

      <section className={styles.header} aria-labelledby="contact-title">
        <PageContainer>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Nous écrire, nous joindre"
            description="Que vous soyez un partenaire, un bénéficiaire ou simplement curieux de notre action, notre équipe est à votre écoute."
          />
        </PageContainer>
      </section>

      <section className={styles.content} aria-label="Coordonnées et formulaire">
        <PageContainer>
          <div className={styles.layout}>
            <div className={styles.info}>
              <ContactInformation />
            </div>

            <div className={styles.form}>
              <ContactForm />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className={styles.locationSection} aria-label="Emplacement">
        <PageContainer>
          <LocationSection />
        </PageContainer>
      </section>
    </>
  );
}