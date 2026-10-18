/**
 * HistoryTimeline
 * Chronologie de l'histoire de la CVD.
 * N'affiche QUE les événements documentés dans association.history.
 * Aucune date inventée.
 */

import PageContainer from "@/components/layout/PageContainer";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import { History } from "lucide-react";
import { association } from "@/data/association";
import styles from "./HistoryTimeline.module.css";

export default function HistoryTimeline() {
  const events = Array.isArray(association.history)
    ? [...association.history].sort((a, b) => (a.year || 0) - (b.year || 0))
    : [];

  return (
    <section className={styles.section} aria-labelledby="history-title">
      <PageContainer>
        <SectionHeading
          id="history-title"
          eyebrow="Notre histoire"
          title="Les étapes confirmées de notre engagement"
          description="La Coordination des Volontaires de Dédougou inscrit son action dans la durée, au service des communautés."
        />

        {events.length > 0 ? (
          <ol className={styles.timeline}>
            {events.map((event, index) => (
              <li
                key={`${event.year}-${index}`}
                className={styles.entry}
                aria-label={`${event.dateDisplay || event.year} : ${event.title}`}
              >
                <div className={styles.marker} aria-hidden="true">
                  <span className={styles.markerDot} />
                </div>

                <div className={styles.content}>
                  <p className={styles.date}>
                    {event.dateDisplay || event.year}
                  </p>
                  <h3 className={styles.title}>{event.title}</h3>
                  {event.description ? (
                    <p className={styles.description}>{event.description}</p>
                  ) : null}
                  {event.confirmed === false ? (
                    <p className={styles.toConfirm}>À confirmer</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState
            icon={History}
            title="L'histoire de la CVD sera publiée prochainement"
            description="Les étapes historiques sont en cours de validation par l'association."
          />
        )}
      </PageContainer>
    </section>
  );
}