"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, Newspaper, Users, Handshake, Mail, Plus } from "lucide-react";
import { apiFetch } from "@/lib/api";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    news: 0,
    team: 0,
    partners: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, news, team, partners, contacts] = await Promise.all([
          apiFetch("/projects"),
          apiFetch("/news"),
          apiFetch("/team"),
          apiFetch("/partners"),
          apiFetch("/contact"),
        ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          news: Array.isArray(news) ? news.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          partners: Array.isArray(partners) ? partners.length : 0,
          contacts: Array.isArray(contacts) ? contacts.filter((c) => !c.is_read).length : 0,
        });
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Projets", value: stats.projects, icon: FolderKanban, href: "/admin/projects", color: "green" },
    { label: "Actualités", value: stats.news, icon: Newspaper, href: "/admin/news", color: "blue" },
    { label: "Membres équipe", value: stats.team, icon: Users, href: "/admin/team", color: "green" },
    { label: "Partenaires", value: stats.partners, icon: Handshake, href: "/admin/partners", color: "blue" },
    { label: "Messages non lus", value: stats.contacts, icon: Mail, href: "/admin/contacts", color: "red" },
  ];

  return (
    <div>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Tableau de bord</h1>
          <p className={styles.pageSubtitle}>Bienvenue dans l'espace d'administration de la CVD.</p>
        </div>
      </header>

      {loading ? (
        <p>Chargement des statistiques…</p>
      ) : (
        <>
          <div className={styles.grid}>
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className={`${styles.card} ${styles[`card_${card.color}`]}`}
                >
                  <div className={styles.cardIcon}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.cardValue}>{card.value}</p>
                    <p className={styles.cardLabel}>{card.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <section className={styles.quickActions}>
            <h2 className={styles.sectionTitle}>Actions rapides</h2>
            <div className={styles.actionsGrid}>
              <Link href="/admin/projects/new" className={styles.actionBtn}>
                <Plus size={18} strokeWidth={2.5} />
                Nouveau projet
              </Link>
              <Link href="/admin/news/new" className={styles.actionBtn}>
                <Plus size={18} strokeWidth={2.5} />
                Nouvelle actualité
              </Link>
              <Link href="/admin/team/new" className={styles.actionBtn}>
                <Plus size={18} strokeWidth={2.5} />
                Nouveau membre
              </Link>
              <Link href="/admin/partners/new" className={styles.actionBtn}>
                <Plus size={18} strokeWidth={2.5} />
                Nouveau partenaire
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}