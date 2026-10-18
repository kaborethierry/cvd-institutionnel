/**
 * Page d'accueil institutionnelle.
 * Assemble les sections depuis src/components/home/.
 * Server Component — aucune logique client.
 */

import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import MissionOverview from "@/components/home/MissionOverview";
import DomainsOverview from "@/components/home/DomainsOverview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import InterventionAreas from "@/components/home/InterventionAreas";
import TeamOverview from "@/components/home/TeamOverview";
import PartnersStrip from "@/components/home/PartnersStrip";
import InstitutionalCTA from "@/components/home/InstitutionalCTA";
import { site } from "@/data/site";

export const metadata = {
  title: site.metadata.defaultTitle,
  description: site.metadata.defaultDescription,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <MissionOverview />
      <DomainsOverview />
      <FeaturedProjects />
      <InterventionAreas />
      <TeamOverview />
      <PartnersStrip />
      <InstitutionalCTA />
    </>
  );
}