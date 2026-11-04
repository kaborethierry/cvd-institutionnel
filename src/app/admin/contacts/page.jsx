"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import styles from "../admin.module.css";
import local from "./contacts.module.css";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch("/contact");
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggle = async (message) => {
    const willOpen = openId !== message.id;
    setOpenId(willOpen ? message.id : null);

    if (willOpen && !message.is_read) {
      try {
        await apiFetch(`/contact/${message.id}/read`, { method: "PUT" });
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, is_read: 1 } : m))
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (message) => {
    if (!window.confirm(`Supprimer le message de "${message.name}" ? Cette action est irréversible.`)) return;
    try {
      setDeletingId(message.id);
      setError("");
      await apiFetch(`/contact/${message.id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      if (openId === message.id) setOpenId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Messages</h1>
          <p className={styles.pageSubtitle}>
            Messages reçus via le formulaire de contact
            {messages.length > 0 ? ` — ${unreadCount} non lu${unreadCount > 1 ? "s" : ""}` : ""}.
          </p>
        </div>
      </header>

      {error ? (
        <div className={styles.alertError} role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <p className={styles.loadingState}>Chargement des messages…</p>
      ) : messages.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className={local.list}>
          {messages.map((message) => {
            const isOpen = openId === message.id;
            return (
              <article
                key={message.id}
                className={`${local.item} ${!message.is_read ? local.itemUnread : ""}`}
              >
                <button
                  type="button"
                  className={local.head}
                  onClick={() => handleToggle(message)}
                  aria-expanded={isOpen}
                >
                  <span className={local.headMain}>
                    <span className={local.subject}>{message.subject}</span>
                    <span className={local.sender}>
                      {message.name} — {message.email}
                    </span>
                  </span>
                  <span className={local.meta}>
                    <span>{formatDate(message.created_at)}</span>
                    <span className={`${styles.badge} ${message.is_read ? "" : styles.badgePending}`}>
                      {message.is_read ? "Lu" : "Non lu"}
                    </span>
                  </span>
                </button>

                {isOpen ? (
                  <div className={local.detail}>
                    <p className={local.message}>{message.message}</p>
                    <div className={local.actions}>
                      <a
                        href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                        className={styles.btnPrimary}
                      >
                        <Mail size={16} strokeWidth={2} />
                        Répondre par e-mail
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(message)}
                        className={styles.btnDanger}
                        disabled={deletingId === message.id}
                      >
                        <Trash2 size={16} strokeWidth={2} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}