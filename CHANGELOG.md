# Changelog

## 2.1.2 - 2026-11-11

- The card no longer rebuilds its content on every value change (which happened every few seconds because of the throughput values). It adjusts only what changed: tiles, drives, buttons and the device image stay in place, so the keyboard focus is kept, the ring and bars glide and the image is not reloaded. / Die Karte baut ihren Inhalt nicht mehr bei jeder Wertänderung neu auf (wegen der Durchsatzwerte geschah das alle paar Sekunden). Sie gleicht nur an, was sich geändert hat: Kacheln, Laufwerke, Schaltflächen und Gerätebild bleiben bestehen, der Tastaturfokus bleibt erhalten, Ring und Balken gleiten, das Bild wird nicht neu geladen.
- Fixed: "Tap again" on Restart or Shut down was lost as soon as a new value arrived, so confirming often did not work. The confirmation now stays for its 4 seconds; a tap while "Sent" is shown no longer triggers a second call. / Behoben: „Nochmal tippen" bei Neustart oder Herunterfahren ging verloren, sobald ein neuer Wert eintraf; das Bestätigen klappte dadurch oft nicht. Die Bestätigung bleibt jetzt ihre 4 Sekunden stehen; ein Tippen während „Gesendet" löst keinen zweiten Aufruf mehr aus.
- Fixed: the card could jitter with the page scrollbar appearing and disappearing, at the switch to the wide layout (480 px) and at widths where the usage ring or the drive headers grew with the card. All layout steps (340, 480, 560, 620 px) now switch with ±12 px tolerance; the ring has fixed sizes instead of growing with the card. / Behoben: Die Karte konnte mit ein- und ausblendender Scrollleiste zappeln, am Wechsel zum breiten Layout (480 px) und bei Breiten, in denen der Belegungsring oder die Laufwerks-Köpfe mit der Karte wuchsen. Alle Layout-Stufen (340, 480, 560, 620 px) schalten jetzt mit ±12 px Toleranz; der Ring hat feste Größen, statt mit der Karte zu wachsen.
- Fixed: a long action title ("Herunterfahren") could stick out of its button; it now wraps with a hyphen. / Behoben: Ein langer Aktionstitel („Herunterfahren") konnte aus seiner Schaltfläche ragen; er wird jetzt mit Trennstrich umbrochen.
- A custom image that cannot be loaded is no longer requested again on every update. / Ein eigenes Bild, das sich nicht laden lässt, wird nicht mehr bei jeder Aktualisierung erneut angefordert.
- Fixed: a changed installed DSM version was only shown after another value changed. / Behoben: Eine geänderte installierte DSM-Version erschien erst, wenn sich ein anderer Wert änderte.
- Browser tests added. / Browser-Tests ergänzt.

## 2.1.1 - 2026-11-08

- Fixed: the card could jitter (font size and height switching back and forth quickly) when its width was close to a font step (e.g. 400 px) and the page scrollbar appeared and disappeared as a result. The font step is now chosen with ±12 px hysteresis and no longer flips on small width changes. / Behoben: Die Card konnte zappeln (Schrift und Höhe wechselten schnell hin und her), wenn ihre Breite knapp an einer Schriftstufe lag (z. B. 400 px) und die Scrollleiste der Seite dadurch ein- und ausgeblendet wurde. Die Schriftstufe wird jetzt mit ±12 px Hysterese gewählt und kippt bei kleinen Breitenänderungen nicht mehr.

## 2.1.0 - 2026-11-04

- The card and its editor now appear in English by default and in German when Home Assistant is set to German. / Karte und Editor erscheinen jetzt standardmäßig auf Englisch und auf Deutsch, wenn Home Assistant auf Deutsch eingestellt ist.
- README shortened and available in English and German. / README gekürzt und auf Englisch und Deutsch verfügbar.

## 2.0.1 - 2026-10-28

- Aufräumarbeiten ohne Funktionsänderung: mehrfach vorhandene Regeln (Kartengröße, „Wert nicht verfügbar“, Warnfarben-Stufen) an je einer Stelle zusammengeführt, einen ungenutzten Merker, eine nie zutreffende Prüfung und veraltete Kommentare entfernt. Aussehen, Konfiguration und Verhalten bleiben unverändert.
- Repository verschlankt: nicht benötigte Logo-Dateien, interne Release-Checkliste und die Pflicht-Dateien `RELEASE_NOTES_<Version>.md` entfernt (der Release-Text kommt jetzt aus diesem Changelog), doppelte Aussagen und den Release-Abschnitt aus der README genommen.

## 2.0.0 - 2026-10-24

- Aufnahme in den offiziellen HACS-Katalog; reguläre Installation über die HACS-Suche.
- Migration bestehender Custom Repositories dokumentiert: nur den benutzerdefinierten Eintrag entfernen, bestehende Installation und Dashboard-Konfigurationen behalten.
- Major-Version als HACS-Meilenstein: bedeutet nicht automatisch Breaking Changes. Bestehende Konfigurationsschlüssel bleiben erhalten.
- README auf Funktionen, Einrichtung, Bedienung, Voraussetzungen und Grenzen ausgerichtet.
- Security: HTML-Escaping für die Speichereinheit in Belegt/Frei/Gesamt ergänzt; Regressionstests für manipulierte Entity-Attribute und Konfigurationswerte.

## 1.1.5

- Neue, im Browser erstellte Vorschauen aus dem unveränderten Original-Code in der README.
- Vorschau-Bilder über absolute Raw-URLs für die Anzeige in GitHub und HACS eingebunden.
- Versionsangaben für das Patch-Release aktualisiert.

Keine Änderungen an der Funktionsweise der Karte oder Integration.

## 1.1.4 - 2026-10-08

### Dokumentation

- README korrigiert: Breite 4 bis 12 Spalten (nicht 1 bis 12), Höhe mit Mindesthöhe statt „nicht skalierbar“, Ringdiagramm statt Tortendiagramm, Aktionszeile je nach Layout; neuer Abschnitt „Release“.
- Release-Checkliste auf den aktuellen Ablauf gebracht (vorher Stand 1.0.1).
- Überflüssige Platzhalterdatei `images/.keepfolder` entfernt.

## 1.1.3 - 2026-10-07

### Geändert

- Laufwerke stehen auch in der kompakten Ansicht wieder nebeneinander; untereinander erst, wenn eine Box schmaler als 11em würde (z. B. iPhone SE). In schmalen Laufwerksboxen entfällt das Festplatten-Symbol im Kopf und die Status-Pill wird enger, damit der Text in der Box bleibt.
- Etwas kompakter: kleineres Ringdiagramm, flachere Kacheln für Letzter Start, Neustart und Herunterfahren. Bei ca. 460 px Kartenbreite (7"-Raspberry-Display hochkant) 916 statt 1118 px hoch; mit `scale: 0.85` 779 px.

## 1.1.2 - 2026-10-07

### Geändert

- Laufwerke: Symbole vor Temperatur, Lebensdauer und Sektoren entfernt; Warn- und Fehlerzustände färben stattdessen den Wert.

### Behoben

- Kompakte Ansicht (z. B. iPhone): Die Laufwerksboxen standen nebeneinander, Status-Pill und Werte ragten aus den Boxen. Laufwerke stehen jetzt untereinander und erst nebeneinander, wenn jede Box mindestens 15em breit wird (wächst mit Schrift und `scale`).

## 1.1.1 - 2026-10-06

### Geändert

- Laufwerke: Bezeichnung links, Wert rechts – wie Belegt/Frei/Gesamt in der Volume-Box; Status als Pill im Kopf.
- Kompakter für das iPad Pro 13": Netzwerkwerte im breiten Layout einzeilig, geringere Abstände; bei 650–799 px Kartenbreite ca. 40 px niedriger.
- Innenabstand oben in px statt em, damit der Titel auf gleicher Höhe beginnt wie bei der Eaton UPS Card.

### Behoben

- Die Card meldet ihre benötigte Mindesthöhe (`min_rows`); im Layout-Editor lassen sich nicht mehr zu wenige Zeilen einstellen.
- Ein zusätzlich noch geladener alter 1.0.1-Loader konnte die Laufwerksanzeige überschreiben (z. B. „Temperatur31,0 °C“). Die Card ist dagegen jetzt geschützt.

## 1.1.0 - 2026-10-06

### Geändert

- Optimiert für Hochformat (iPhone, iPad, Raspberry-Pi-Kiosk): alle Größen in em, die Schrift wächst mit der Kartenbreite; breites Layout ab 480 px (Option layout: auto | wide | compact).
- Einzeldatei: nas-card.js enthält jetzt alles; nas-card-core.js und das Überschreiben per !important entfallen (HACS lädt nur die Datei aus hacs.json).
- Glas-Look: Hintergrund, Rand und Blur kommen vom Theme. Messwerte linksbündig mit Icon-Chip; CPU, RAM und Volume mit Warnfarben (orange ab 75/80/80 %, rot ab 90 %).
- Gerätebild groß im Hintergrund (Option image_mode: background | inline) mit Deckkraft 52 %.
- Neustart und Herunterfahren verlangen ein zweites Tippen (confirm_actions: false schaltet es ab).
- Neue Option scale (0,8 – 1,8) für Kiosk-Displays; die Card zeichnet nur bei geänderten Werten neu.

## 1.0.1 - 2026-10-02

- Lizenz auf GNU Affero General Public License v3.0 only (AGPL-3.0-only) umgestellt.
- Versionsangaben in Repository, README und Loader vereinheitlicht.
- HACS-Validierung für Pushes auf `main`, Pull Requests und manuelle Ausführung vorbereitet.
- README und Release-Unterlagen für die Veröffentlichung in HACS aktualisiert.

## 1.0.0 - 2026-10-02

- Erste öffentliche Veröffentlichung der NAS Card.
- Theme-sensitive Darstellung für Home Assistant Light/Dark Mode und eigene Themes.
- Native Home-Assistant-Konfiguration über `getConfigForm()` mit Entity-Pickern und Textfeldern.
- Frei editierbarer Titel und Untertitel; festes `mdi:nas` Symbol vor dem Haupttitel.
- Breite im Sections-Dashboard frei einstellbar; Höhe wird automatisch durch die Card bestimmt.
- Zentrierte Daten- und Statusdarstellung in den Feldern.
- Systemwerte für Temperatur, CPU, RAM/Speicher und Sicherheitsstatus.
- Inbound/Outbound-Anzeige in großen Statusfeldern.
- Volume-Tortendiagramm mit Belegt/Frei/Gesamt.
- Zwei Laufwerksbereiche mit Temperatur, Restlebensdauer, Sektoren und Status; Bezeichnungen stehen über den Zuständen.
- DSM/Update-Anzeige.
- Neustart, letzter Start und Herunterfahren in einer einheitlichen unteren Aktionszeile.
- "Letzter Start" auf zwei Zeilen begrenzt und mit Home Assistants automatischer Zustandsformatierung.
- Freigestelltes DS720+-Standardbild direkt in der JavaScript-Komponente eingebettet; optional durch eigene Bild-URL ersetzbar.
- HACS-Metadaten und manuell startbare HACS-Validierung enthalten.
