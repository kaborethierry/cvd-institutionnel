"use client";

/**
 * ContactForm
 * Formulaire de contact avec validation côté client.
 *
 * IMPORTANT : tant qu'aucun backend n'est configuré, le service
 * `sendContactMessage` retourne un statut explicite "not-configured".
 * Le formulaire NE SIMULE JAMAIS un succès.
 *
 * Une alternative mailto: est proposée si le service n'est pas configuré.
 */

import { useState } from "react";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import {
  sendContactMessage,
  isContactServiceConfigured,
  buildMailtoLink,
} from "@/services/contactService";
import {
  validateText,
  validateEmail,
  validateMessage,
  validateForm,
  isFormValid,
} from "@/lib/validators";
import styles from "./ContactForm.module.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

const RULES = {
  name: (value) =>
    validateText(value, { min: 2, max: 120, required: true }),
  email: (value) => validateEmail(value),
  subject: (value) =>
    validateText(value, { min: 3, max: 180, required: true }),
  message: (value) => validateMessage(value, { min: 10, max: 5000 }),
  consent: (value) =>
    value === true ? null : "Votre consentement est requis.",
};

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const serviceConfigured = isContactServiceConfigured();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const validationErrors = validateForm(values, RULES);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      setStatus("error");
      setFeedback("Veuillez corriger les champs en surbrillance.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setFeedback("");

    try {
      const result = await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });

      if (result.ok) {
        setStatus("success");
        setFeedback(
          result.message || "Votre message a bien été transmis."
        );
        setValues(INITIAL_VALUES);
      } else if (result.status === "not-configured") {
        setStatus("not-configured");
        setFeedback(result.message);
      } else {
        setStatus("error");
        setFeedback(
          result.message ||
            "L'envoi du message a échoué. Veuillez réessayer ou nous contacter par téléphone."
        );
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const mailtoFallback = buildMailtoLink(
    site.contact?.email || "",
    "Message depuis le site CVD"
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>Nous écrire</h2>

      <p className={styles.intro}>
        Vous pouvez nous contacter par téléphone ou par courriel. Le
        formulaire ci-dessous est en cours de configuration.
      </p>

      <div className={styles.field}>
        <label htmlFor="contact-name" className={styles.label}>
          Nom complet <span className={styles.required}>*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          disabled={submitting}
          required
        />
        {errors.name ? (
          <p id="contact-name-error" className={styles.error} role="alert">
            <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email" className={styles.label}>
          Adresse électronique <span className={styles.required}>*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          disabled={submitting}
          required
        />
        {errors.email ? (
          <p id="contact-email-error" className={styles.error} role="alert">
            <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject" className={styles.label}>
          Objet <span className={styles.required}>*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          className={`${styles.input} ${
            errors.subject ? styles.inputError : ""
          }`}
          aria-invalid={errors.subject ? "true" : undefined}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
          disabled={submitting}
          required
        />
        {errors.subject ? (
          <p id="contact-subject-error" className={styles.error} role="alert">
            <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          className={`${styles.textarea} ${
            errors.message ? styles.inputError : ""
          }`}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          disabled={submitting}
          required
        />
        {errors.message ? (
          <p id="contact-message-error" className={styles.error} role="alert">
            <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles.consent}>
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={handleChange}
          className={styles.checkbox}
          aria-invalid={errors.consent ? "true" : undefined}
          aria-describedby={
            errors.consent ? "contact-consent-error" : undefined
          }
          disabled={submitting}
        />
        <label htmlFor="contact-consent" className={styles.consentLabel}>
          J'accepte que mes informations soient utilisées pour répondre à ma
          demande. Voir la{" "}
          <a
            href="/politique-de-confidentialite"
            className={styles.consentLink}
          >
            politique de confidentialité
          </a>
          .
        </label>
      </div>
      {errors.consent ? (
        <p id="contact-consent-error" className={styles.error} role="alert">
          <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
          {errors.consent}
        </p>
      ) : null}

      {feedback ? (
        <div
          className={`${styles.feedback} ${styles[`feedback-${status}`]}`}
          role={status === "success" ? "status" : "alert"}
        >
          {status === "success" ? (
            <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} strokeWidth={2} aria-hidden="true" />
          )}
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={submitting}
          aria-busy={submitting || undefined}
        >
          {submitting ? (
            <span>Envoi en cours…</span>
          ) : (
            <>
              <span>Envoyer le message</span>
              <Send size={16} strokeWidth={2} aria-hidden="true" />
            </>
          )}
        </button>

        {!serviceConfigured && mailtoFallback ? (
          <a href={mailtoFallback} className={styles.mailtoLink}>
            Ou nous écrire directement par courriel
          </a>
        ) : null}
      </div>
    </form>
  );
}