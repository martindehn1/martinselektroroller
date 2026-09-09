# Rollerkompass

Öffentliche Website von Martin Dehn für ehrliche Vergleiche von E-Rollern, E-Choppern und Kabinenrollern.

Live: https://rollerkompass.de/

## Inhalt

- 41 Modelle mit Suche und Filtern
- fünf Kabinenroller mit Empfehlung und ehrlichem Hinweis
- Direktvergleich für bis zu drei Modelle
- transparente Affiliate-Kennzeichnung und Herstellerquellen

## Gestaltung

Die Startseite folgt Design 3: Weiß, kräftiges Blau, persönliche Ansprache,
ein großes Gruppenmotiv sowie lesbare Modellchecks und Ratgeber. Auf kleinen
Bildschirmen bleibt das Gruppenmotiv vollständig sichtbar; die Navigation ist
über das Menü erreichbar.

Das aktuelle Gruppenmotiv ist eine **KI-Visualisierung mit einer Beispielperson,
kein echtes Foto von Martin**. Diese Kennzeichnung steht sichtbar am Bild.
Die Dateien `assets/hero-kabinenroller.webp` (1536 px) und
`assets/hero-kabinenroller-960.webp` (960 px) werden später durch Martins
echtes Gruppenfoto ersetzt. Anschließend Bildbeschreibung und Bildunterschrift
in `index.html` anpassen. Das Seitenlayout muss dafür nicht umgebaut werden.

## Lokal und Veröffentlichung

Statische Website ohne Build-Schritt oder Laufzeit-Abhängigkeiten.
Zum lokalen Anzeigen genügt ein statischer HTTP-Server im Projektverzeichnis.
Ein Push auf `main` startet den vorhandenen IONOS-Deploy-Now-Ablauf.
Zur Veröffentlichung gehört neben dem Orchestration-Lauf auch der separat
ausgelöste Lauf „Deploy Now: Deploy to IONOS“.
