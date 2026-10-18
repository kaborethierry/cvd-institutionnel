@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ================================================
echo   CVD - Creation de l'arborescence complete
echo ================================================
echo.

REM --- Nettoyage des assets par defaut de Next.js ---
echo [0/9] Nettoyage des assets par defaut...
del "public\next.svg" 2>nul
del "public\vercel.svg" 2>nul
del "public\file.svg" 2>nul
del "public\globe.svg" 2>nul
del "public\window.svg" 2>nul

REM ============================================
REM PUBLIC
REM ============================================
echo [1/9] public/ images...
mkdir "public\images\logo" 2>nul
mkdir "public\images\hero" 2>nul
mkdir "public\images\association" 2>nul
mkdir "public\images\equipe" 2>nul
mkdir "public\images\domaines" 2>nul
mkdir "public\images\projets" 2>nul
mkdir "public\images\partenaires" 2>nul
mkdir "public\documents" 2>nul

type nul > "public\images\partenaires\README.md"
type nul > "public\documents\README.md"

REM ============================================
REM SRC/APP
REM ============================================
echo [2/9] src/app/ racine...
mkdir "src\app" 2>nul
type nul > "src\app\loading.js"
type nul > "src\app\error.js"
type nul > "src\app\not-found.js"
type nul > "src\app\sitemap.js"
type nul > "src\app\robots.js"
type nul > "src\app\manifest.js"

echo [3/9] src/app/ association...
mkdir "src\app\association\histoire" 2>nul
mkdir "src\app\association\missions" 2>nul
mkdir "src\app\association\equipe" 2>nul
mkdir "src\app\association\zones-intervention" 2>nul
type nul > "src\app\association\page.js"
type nul > "src\app\association\histoire\page.js"
type nul > "src\app\association\missions\page.js"
type nul > "src\app\association\equipe\page.js"
type nul > "src\app\association\zones-intervention\page.js"

echo [4/9] src/app/ domaines, projets, partenaires...
mkdir "src\app\domaines\[slug]" 2>nul
type nul > "src\app\domaines\page.js"
type nul > "src\app\domaines\[slug]\page.js"

mkdir "src\app\projets\[slug]" 2>nul
type nul > "src\app\projets\page.js"
type nul > "src\app\projets\[slug]\page.js"

mkdir "src\app\partenaires" 2>nul
type nul > "src\app\partenaires\page.js"

echo [5/9] src/app/ actualites, contact, politique, api...
mkdir "src\app\actualites\[slug]" 2>nul
type nul > "src\app\actualites\page.js"
type nul > "src\app\actualites\[slug]\page.js"

mkdir "src\app\contact" 2>nul
type nul > "src\app\contact\page.js"

mkdir "src\app\politique-de-confidentialite" 2>nul
type nul > "src\app\politique-de-confidentialite\page.js"

mkdir "src\app\api" 2>nul
type nul > "src\app\api\README.md"

REM ============================================
REM SRC/COMPONENTS
REM ============================================
echo [6/9] src/components/ layout, home, association...
mkdir "src\components\layout" 2>nul
for %%C in (SiteHeader TopBar MainNavigation MobileNavigation SiteFooter PageContainer Breadcrumbs) do (
    type nul > "src\components\layout\%%C.jsx"
    type nul > "src\components\layout\%%C.module.css"
)

mkdir "src\components\home" 2>nul
for %%C in (HeroSection HeroCarousel IntroSection MissionOverview DomainsOverview FeaturedProjects InterventionAreas TeamOverview PartnersStrip InstitutionalCTA) do (
    type nul > "src\components\home\%%C.jsx"
    type nul > "src\components\home\%%C.module.css"
)

mkdir "src\components\association" 2>nul
for %%C in (AssociationIdentity HistoryTimeline MissionVision ObjectivesList ValuesGrid) do (
    type nul > "src\components\association\%%C.jsx"
    type nul > "src\components\association\%%C.module.css"
)

echo [7/9] src/components/ team, domains, projects...
mkdir "src\components\team" 2>nul
for %%C in (TeamGrid TeamMemberCard TeamCircle) do (
    type nul > "src\components\team\%%C.jsx"
    type nul > "src\components\team\%%C.module.css"
)

mkdir "src\components\domains" 2>nul
for %%C in (DomainCard DomainGrid DomainDetail) do (
    type nul > "src\components\domains\%%C.jsx"
    type nul > "src\components\domains\%%C.module.css"
)

mkdir "src\components\projects" 2>nul
for %%C in (ProjectCard ProjectsGrid ProjectFilters ProjectDetail ProjectMetadata) do (
    type nul > "src\components\projects\%%C.jsx"
    type nul > "src\components\projects\%%C.module.css"
)

echo [8/9] src/components/ partners, news, contact, ui...
mkdir "src\components\partners" 2>nul
for %%C in (PartnerGrid PartnerCard) do (
    type nul > "src\components\partners\%%C.jsx"
    type nul > "src\components\partners\%%C.module.css"
)

mkdir "src\components\news" 2>nul
for %%C in (NewsCard NewsGrid NewsArticle) do (
    type nul > "src\components\news\%%C.jsx"
    type nul > "src\components\news\%%C.module.css"
)

mkdir "src\components\contact" 2>nul
for %%C in (ContactInformation ContactForm LocationSection) do (
    type nul > "src\components\contact\%%C.jsx"
    type nul > "src\components\contact\%%C.module.css"
)

mkdir "src\components\ui" 2>nul
for %%C in (SectionHeading PrimaryButton SecondaryButton IconLabel ImageFrame EmptyState StatusBadge SectionDivider) do (
    type nul > "src\components\ui\%%C.jsx"
    type nul > "src\components\ui\%%C.module.css"
)

REM ============================================
REM SRC/DATA - LIB - SERVICES - STYLES
REM ============================================
echo [9/9] src/data...
mkdir "src\data" 2>nul
for %%F in (site association objectives domains team partners projects interventionAreas navigation news) do (
    type nul > "src\data\%%F.js"
)

echo [9/9] src/lib...
mkdir "src\lib" 2>nul
for %%F in (utils formatters metadata constants imageConfig validators) do (
    type nul > "src\lib\%%F.js"
)

echo [9/9] src/services...
mkdir "src\services" 2>nul
for %%F in (projectsService partnersService newsService contactService) do (
    type nul > "src\services\%%F.js"
)

echo [9/9] src/styles...
mkdir "src\styles" 2>nul
for %%F in (tokens reset typography utilities animations) do (
    type nul > "src\styles\%%F.css"
)

REM ============================================
REM RACINE
REM ============================================
echo Fichiers racine...
type nul > ".env.example"
type nul > "PROJECT_STRUCTURE.md"

echo.
echo ================================================
echo   TERMINE - Arborescence CVD creee.
echo ================================================
echo.
echo Verification :
echo   dir /s /b src\components\*.jsx ^| find /c ".jsx"
echo   dir /s /b src\components\*.module.css ^| find /c ".module.css"
echo.

pause