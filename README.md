# Rollerkompass

Öffentliche Website von Martin Dehn für ehrliche Vergleiche von E-Rollern, E-Choppern und Kabinenrollern.

Live: https://rollerkompass.de/

## Inhalt

- 43 Modelle mit Suche und Filtern, darunter sechs Kabinenroller und zwei Seniorenmobile
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

## Persönliche Produktfotos

Die Fotozuordnung stammt von Martin. Varianten der Classico-, Falcon- und
Vita-Care-Reihen teilen bei Bedarf ein gekennzeichnetes Archivfoto; es ist kein
Nachweis für die Ausstattung des aktuellen Angebots. Flow Li, Vita Care 4000 und
Vita Care Neo wurden anhand der offiziellen Futura-Seiten am 12.09.2026 ergänzt.
Die drei neuen Angebotslinks sind direkte Herstellerlinks ohne Affiliate-Zusatz.
Das separate Porträt zeigt Martin im Vorstellungsbereich. Neue Aufnahmen können
über die optionalen `personalPhoto`-Felder in `products.js` ausgetauscht werden.

## Herstellerbilder

Fehlende Fahrzeugfotos wurden am 12.09.2026 mit den offiziellen Futura-Galerien
abgeglichen. Die für die Modellkarten verwendeten Herstellerbilder liegen als
WebP im lokalen Asset-Verzeichnis. `imageSourcePage` und `imageSourceUrl` in
`products.js` dokumentieren die Herkunft; ein `imageNote` kennzeichnet ältere
Modellfotos. Die Kategorie „125er“ wurde als irrtümliche Einzelmodellkarte entfernt.

## Reihenfolge der Modelle

Die Modellübersicht steht direkt nach dem Einstieg. Flow Li, VitaCare Neo und
Falcon Blei führen die Übersicht an, gefolgt von Vita Care 4000, Falcon Double
und weiteren Kabinenrollern. Die Priorisierung beruht auf Martins Rückmeldungen
zu Futura-Nachfrage und Klicks. Die Reihenfolge in `products.js` gilt auch in
den Kategoriefiltern; das initiale HTML bildet dieselbe Reihenfolge ab.
Im ausführlichen Kabinenroller-Fokus steht der Flow vor Cruise, LimaQ7,
FUTURA TWO und E-Move.
