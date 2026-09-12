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
Bildschirmen bleiben die Personen und das Fahrzeug im Mittelpunkt; die Navigation ist
über das Menü erreichbar.

Die Startseite zeigt Martin und Luca auf einem Lastendreirad, ergänzt um ein
kleines gemeinsames Kabinenroller-Foto im Polaroid-Rahmen. Das Hauptmotiv ist
eine KI-gestützte Fotobearbeitung mit blau-türkisem Hintergrund; das Polaroid
und die Archivfotos zeigen die Originalaufnahmen. Der persönliche
Bereich enthält ein echtes Portrait mit Fahrzeug sowie sechs Fotos aus Martins
Archiv. Die WebP-Dateien haben responsive Auflösungen; die Originale bleiben
außerhalb des veröffentlichten Repositorys. Fahrzeugfotos aus dem Archiv werden
nicht als Nachweis für aktuelle Modellvarianten oder Tests verwendet.

## Lokal und Veröffentlichung

Statische Website ohne Build-Schritt oder Laufzeit-Abhängigkeiten.
Zum lokalen Anzeigen genügt ein statischer HTTP-Server im Projektverzeichnis.
Ein Push auf `main` startet den vorhandenen IONOS-Deploy-Now-Ablauf.
Zur Veröffentlichung gehört neben dem Orchestration-Lauf auch der separat
ausgelöste Lauf „Deploy Now: Deploy to IONOS“.
