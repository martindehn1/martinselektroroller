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

## Suchmaschinen und Inhaltsseiten

Seit 13.09.2026 gibt es zehn zusätzliche statische Seiten: eine vollständige
Modellübersicht, drei Kategorien, drei ausführliche Modellchecks (Flow, Neo,
Falcon), das Autorenprofil, die Vergleichsmethode und die Probefahrt-Checkliste.
Alle 43 Modelle sind unter `/modelle/` im initialen HTML verfügbar. Die Startseite
behält ihre priorisierte Auswahl. Modell- und Kategorieverweise sind normale
HTML-Links; die alten Modell-Anker funktionieren weiterhin.

Nach Änderungen an `products.js`, `app.js` oder den redaktionellen Texten:

```sh
node scripts/build-seo.mjs
node scripts/check-seo.mjs
```

Die generierten HTML-Dateien werden mit veröffentlicht; IONOS benötigt weiterhin
keine Laufzeit-Abhängigkeiten. Das Änderungsdatum im Generator nur bei echten
Inhaltsänderungen aktualisieren. Der Generator erstellt Canonicals, individuelle
Metadaten, Breadcrumbs, Autoren-/Artikel-/Listen-Auszeichnungen und die Sitemap.
Flow und Neo enthalten Product/Offer-Daten ohne erfundene Bewertungen. Preise
müssen mit der konkret beschriebenen Variante übereinstimmen.

Das Google-Verifizierungs-Tag in `index.html` bleibt dauerhaft erhalten. Die
Sitemap liegt unter `https://rollerkompass.de/sitemap.xml`. `.htaccess` aktiviert
unterstützte Textkompression und Caching; HTML wird bei erneutem Abruf validiert.
Impressum und Datenschutz enthalten weiterhin einen vorhandenen Platzhalter;
vollständige Betreiberangaben müssen vor einer inhaltlichen Ergänzung vorliegen.

## Persönliche Produktfotos

Die Fotozuordnung stammt von Martin. Varianten der Classico-, Falcon- und
Vita-Care-Reihen teilen bei Bedarf ein gekennzeichnetes Archivfoto; es ist kein
Nachweis für die Ausstattung des aktuellen Angebots. Flow Li, Vita Care 4000 und
Vita Care Neo wurden anhand der offiziellen Futura-Seiten am 12.09.2026 ergänzt.
Die drei neuen Angebotslinks sind direkte Herstellerlinks ohne Affiliate-Zusatz.
Für den Neo wird seit dem SEO-Abgleich das tatsächliche Herstellerfoto verwendet;
Martins VitaCare-Archivfoto bleibt dem Vita Care 4000 zugeordnet.
Das separate Porträt zeigt Martin im Vorstellungsbereich. Neue Aufnahmen können
über die optionalen `personalPhoto`-Felder in `products.js` ausgetauscht werden.

Die Originalfotos füllen die gesamte Kartenbreite ohne Polaroid-Rahmen. Ein
quadratischer Ausschnitt reduziert freien Himmel und rückt Person und Fahrzeug
näher heran. Blake verwendet mit `personalPhoto.framing: "portrait"` einen
4:5-Ausschnitt, damit Helm und Vorderrad sichtbar bleiben. Personen und Fahrzeuge
werden nicht durch KI verändert; die erprobten KI-Erweiterungen sind nicht Teil
der veröffentlichten Produktfotos. Der kleine Polaroid im Startmotiv bleibt erhalten.

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

## Google-Angebotsdaten (15.09.2026)

Flow Li und VitaCare Neo enthalten verifizierte Futura-Verfügbarkeit sowie
Versand- und Widerrufsangaben für Deutschland. Dieselben Angaben stehen mit
Prüfdatum und Quellen sichtbar auf den Modellseiten. Sie gehören zu Futuras
externem Angebot. Rollerkompass ist kein Händler mit eigenem Checkout und daher
nicht für Googles Händlereinträge berechtigt; gültige Product/Offer-Daten bleiben
für Produkt-Snippets erhalten. Fehlende Bewertungen sind optionale Google-Hinweise.
Keine erfundenen Sterne und keine übernommenen Händlerbewertungen ergänzen. `offerDelivery` und `verifiedOffer` im Generator bei
neuen Angeboten zuerst mit den verlinkten Herstellerquellen abgleichen.

## Martins persönliche Neo-Rezension (15.09.2026)

Martin hat seine eigene Fahrt mit dem Neo beschrieben und ausdrücklich 5 von 5
Sternen vergeben. Die sichtbare Rezension und das verschachtelte `Product.review`
verwenden dieselbe Textquelle `neoReview` im Generator. Die Zusammenarbeit mit
Futura ist unmittelbar daneben offengelegt. Sein persönliches Superlativ-Fazit
ist kein Marktvergleich; die erwähnte Feldfahrt ist keine Offroad-Empfehlung.
Veröffentlichungsdatum und Fahrdatum werden nicht gleichgesetzt. Akkuvariante,
Distanz und eigene Reichweitenmessung sind nicht dokumentiert. Es gibt kein
`aggregateRating`, keine erfundene Kundenanzahl und keine Flow-Rezension.

## Eigene Klickmessung (15.09.2026)

`click-tracking.js` zählt Klicks auf Futura-Produktlinks getrennt nach Angebot/Quelle und sendet nur Modell, erlaubten Seitenpfad und Linkart an den separaten Messdienst. Partnerlinks bleiben unverändert. Event-Delegation deckt dynamische Karten, Tastaturaktivierung und Mittelklicks ab; Rechtsklick, Downloads, synthetische und verhinderte Klicks werden ignoriert.

Statistik: https://rollerkompass-klickstatistik.martin-dehn1.chatgpt.site (nur Martins angemeldetes Konto). Keine Cookies, Browser-Speicherung, Besucherkennung oder Übermittlung von URL-Suchparametern/Referrer; aggregierte Tageszähler. Einwilligungs-/Datenschutzhinweise beziehen sich nur auf diese eigene Messung, nicht auf Futuras Shop. Bei neuen Modellen/Seiten müssen `MODELS`/`PATHS` im Zähler und der Katalog des Messdienstes mit aktualisiert werden.

Testaufrufe mit `?rk_test=1` werden separat gezählt und bleiben aus den normalen Berichten ausgeschlossen. `?rk_tracking=off` schaltet die Messung für den Seitenaufruf aus. Lokale Hosts zählen standardmäßig nicht. Die eigene Messung stellt keine Verkaufszuordnung her.
