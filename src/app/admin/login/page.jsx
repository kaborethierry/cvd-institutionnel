"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";
import styles from "./login.module.css";

const FEATURES = [
  "Projets et actualités",
  "Équipe dirigeante et partenaires",
  "Messages reçus via le formulaire de contact",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Déjà connecté : direction le tableau de bord
  useEffect(() => {
    if (localStorage.getItem("cvd_token")) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Veuillez renseigner votre email et votre mot de passe.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Email ou mot de passe incorrect.");
      }

      localStorage.setItem("cvd_token", data.token);
      localStorage.setItem("cvd_user", JSON.stringify(data.user));

      router.push("/admin");
    } catch (err) {
      if (err instanceof TypeError) {
        setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.wrapper}>
      {/* Panneau de présentation (desktop) */}
      <aside className={styles.brand} aria-hidden="true">
        <span className={styles.circleA} />
        <span className={styles.circleB} />
        <div className={styles.brandInner}>
          <div className={styles.brandLogo}>CVD</div>
          <h2 className={styles.brandTitle}>
            Coordination des Volontaires de Dédougou
          </h2>
          <p className={styles.brandText}>
            Gérez le contenu de votre site depuis un seul espace, simple et sécurisé.
          </p>
          <ul className={styles.brandList}>
            {FEATURES.map((feature) => (
              <li key={feature}>
                <span className={styles.brandCheck}>
                  <Check size={14} strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Formulaire */}
      <section className={styles.panel}>
        <div className={styles.card}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Retour au site</span>
          </Link>

          <div className={styles.header}>
            <div className={styles.logoMark} aria-hidden="true">
              CVD
            </div>
            <h1 className={styles.title}>Espace administrateur</h1>
            <p className={styles.subtitle}>
              Connectez-vous pour gérer le contenu du site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Adresse email
              </label>
              <div className={styles.inputWrap}>
                <Mail size={18} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="admin@cvd.bf"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Mot de passe
              </label>
              <div className={styles.inputWrap}>
                <Lock size={18} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.input} ${styles.inputWithToggle}`}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={2} />
                  ) : (
                    <Eye size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <div className={styles.errorBox} role="alert">
                <AlertCircle size={16} strokeWidth={2} />
                <span>{error}</span>
              </div>
            ) : null}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>

          <p className={styles.footerNote}>
            Accès réservé aux administrateurs de la CVD.
          </p>
        </div>
      </section>
    </main>
  );
}