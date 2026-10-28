<p align="center">
  <img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/images/nas-card-logo-160.png" alt="NAS Card" width="160">
</p>

<h1 align="center">NAS Card</h1>

<p align="center">
  Custom-Card für NAS-Systeme – vorkonfiguriert für eine Synology DS720+.
</p>

## Vorschau

**Normalbetrieb – schmal (350 px)**

<img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/screenshots/nas-card-normal-350-light.png" width="350" alt="NAS Card im Normalbetrieb, 350 px Kartenbreite, helles Theme">

**Normalbetrieb – breit (800 px)**

<img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/screenshots/nas-card-normal-800-light.png" width="800" alt="NAS Card im Normalbetrieb, 800 px Kartenbreite, helles Theme">

**Fehler – schmal (350 px)**

<img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/screenshots/nas-card-error-350-light.png" width="350" alt="NAS Card mit degradiertem Volume und fehlerhaftem Laufwerk 2, 350 px Kartenbreite, helles Theme">

**Fehler – breit (800 px)**

<img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/screenshots/nas-card-error-800-light.png" width="800" alt="NAS Card mit degradiertem Volume und fehlerhaftem Laufwerk 2, 800 px Kartenbreite, helles Theme">

<p align="center">
  <strong>Version 2.0.1</strong><br>
  <a href="https://github.com/BeGiBue/home-assistant-nas-card/actions/workflows/validate.yml"><img src="https://github.com/BeGiBue/home-assistant-nas-card/actions/workflows/validate.yml/badge.svg" alt="HACS validation"></a>
</p>

## Funktionen

- Theme-sensitive Darstellung für Light Mode, Dark Mode und benutzerdefinierte Home-Assistant-Themes
- Editierbarer Haupttitel und Untertitel über native Home-Assistant-Textfelder
- Alle Entitäten über native Home-Assistant-Entity-Picker auswählbar
- Freigestelltes DS720+-Standardbild direkt in der JavaScript-Komponente eingebettet – standardmäßig groß im Hintergrund, alternativ neben dem Titel; optional eigene Bild-URL verwendbar
- Temperatur, CPU, RAM/Speicher und Sicherheitsstatus
- Inbound- und Outbound-Durchsatz in zwei großen Statusfeldern
- Volume-Auslastung als Ringdiagramm mit Belegt/Frei/Gesamt
- Zwei Laufwerksbereiche mit Temperatur, Restlebensdauer, Sektoren und Status
- Warnfarben für CPU, RAM und Volume (orange ab 75/80/80 %, rot ab 90 %)
- DSM-Update-Zeile mit installierter und ggf. neuer Version
- Neustart, letzter Start und Herunterfahren unten; im breiten Layout in einer Reihe
- Neustart und Herunterfahren verlangen ein zweites Tippen zur Bestätigung
- Breite im Sections-Dashboard frei von 4 bis 12 Spalten einstellbar, Höhe automatisch
- Optimiert für Hochformat und Touch – iPhone, iPad und Raspberry-Pi-Kiosk: Schrift wächst mit der Kartenbreite, breites Layout ab 480 px

## Standard-Entitäten

Die Card ist für folgende Entitäten aus deiner Synology-Konfiguration vorkonfiguriert:

```text
sensor.diskstation_temperatur
sensor.diskstation_cpu_auslastung_gesamt
sensor.diskstation_speichernutzung_real
binary_sensor.diskstation_sicherheitsstatus
sensor.diskstation_download_durchsatz
sensor.diskstation_upload_durchsatz
sensor.diskstation_volume_1_verwendetes_volumen
sensor.diskstation_volume_1_belegter_speicherplatz
sensor.diskstation_volume_1_status
sensor.diskstation_drive_1_temperatur
binary_sensor.diskstation_drive_1_unterhalb_der_mindestrestlebensdauer
binary_sensor.diskstation_drive_1_max_fehlerhafte_sektoren_uberschritten
sensor.diskstation_drive_1_status
sensor.diskstation_drive_2_temperatur
binary_sensor.diskstation_drive_2_unterhalb_der_mindestrestlebensdauer
binary_sensor.diskstation_drive_2_max_fehlerhafte_sektoren_uberschritten
sensor.diskstation_drive_2_status
update.diskstation_dsm_update
button.diskstation_reboot
sensor.diskstation_letzter_start
button.diskstation_shutdown
```

Alle Entitäten können im grafischen Karteneditor geändert werden. Dadurch ist die Card nicht auf die DS720+ beschränkt.

## Installation über HACS

Das Projekt ist im offiziellen HACS-Katalog verfügbar.

1. HACS öffnen und nach **NAS Card** suchen.
2. Die Karte auswählen und herunterladen.
3. Browser vollständig neu laden; in der Companion-App gegebenenfalls den Frontend-Cache zurücksetzen.

[![In HACS öffnen](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BeGiBue&repository=home-assistant-nas-card&category=plugin)

### Bestehende Custom-Repository-Installation migrieren

1. Prüfen, dass **NAS Card** im offiziellen HACS-Katalog verfügbar ist.
2. Danach unter **HACS → ⋮ → Benutzerdefinierte Repositories** nur den Eintrag für dieses Repository entfernen.
3. **Die bestehende Installation nicht deinstallieren.** Installation, Dashboard-Ressource und Kartenkonfigurationen beibehalten.
4. HACS neu laden bzw. **Informationen aktualisieren**, anschließend die weiterhin installierte Karte und angebotene Updates prüfen.
5. Nach einem Update das Frontend vollständig neu laden und die vorhandenen Dashboard-Karten prüfen.

Für den Wechsel in den Katalog müssen Karten und YAML-Konfigurationen nicht neu angelegt werden. Die Major-Version kennzeichnet diesen Meilenstein und bedeutet nicht automatisch Breaking Changes; vorhandene Konfigurationsschlüssel bleiben erhalten.

## Card hinzufügen

Minimal:

```yaml
type: custom:nas-card
```

Mit eigenen Bezeichnungen:

```yaml
type: custom:nas-card
title: DS720+
subtitle: Synology NAS
```

Vollständiges Beispiel mit den Standard-Entitäten:

```yaml
type: custom:nas-card
title: DS720+
subtitle: Synology NAS
show_image: true
temperature_entity: sensor.diskstation_temperatur
cpu_entity: sensor.diskstation_cpu_auslastung_gesamt
memory_entity: sensor.diskstation_speichernutzung_real
security_entity: binary_sensor.diskstation_sicherheitsstatus
inbound_entity: sensor.diskstation_download_durchsatz
outbound_entity: sensor.diskstation_upload_durchsatz
volume_title: Volume 1
volume_percent_entity: sensor.diskstation_volume_1_verwendetes_volumen
volume_used_entity: sensor.diskstation_volume_1_belegter_speicherplatz
volume_status_entity: sensor.diskstation_volume_1_status
drive1_title: Drive 1
drive1_temperature_entity: sensor.diskstation_drive_1_temperatur
drive1_lifetime_entity: binary_sensor.diskstation_drive_1_unterhalb_der_mindestrestlebensdauer
drive1_sectors_entity: binary_sensor.diskstation_drive_1_max_fehlerhafte_sektoren_uberschritten
drive1_status_entity: sensor.diskstation_drive_1_status
drive2_title: Drive 2
drive2_temperature_entity: sensor.diskstation_drive_2_temperatur
drive2_lifetime_entity: binary_sensor.diskstation_drive_2_unterhalb_der_mindestrestlebensdauer
drive2_sectors_entity: binary_sensor.diskstation_drive_2_max_fehlerhafte_sektoren_uberschritten
drive2_status_entity: sensor.diskstation_drive_2_status
update_title: DSM Update
update_entity: update.diskstation_dsm_update
reboot_entity: button.diskstation_reboot
last_start_entity: sensor.diskstation_letzter_start
shutdown_entity: button.diskstation_shutdown
```

## Optionen

| Option | Werte | Standard | Beschreibung |
|---|---|---|---|
| `scale` | `0.8` – `1.8` | `1` | Skaliert die gesamte Card, z. B. für Kiosk-Displays. |
| `image_mode` | `background` \| `inline` | `background` | `background`: Gerätebild groß im Hintergrund. `inline`: Gerätebild neben dem Titel. |
| `layout` | `auto` \| `wide` \| `compact` | `auto` | `auto`: breites Layout ab 480 px Kartenbreite. `wide` / `compact` erzwingen das jeweilige Layout. |
| `confirm_actions` | `true` \| `false` | `true` | Neustart und Herunterfahren erst nach einem zweiten Tippen auslösen. |

Beispiel für ein Kiosk-Display:

```yaml
type: custom:nas-card
scale: 1.3
image_mode: background
layout: auto
```

## Grafischer Editor

Die Card verwendet Home Assistants eingebauten Formular-Editor (`getConfigForm()`). Dadurch werden Titel und Untertitel als native Textfelder und Entitäten als native Entity-Picker dargestellt.

Die Gruppen **Allgemein**, **System**, **Netzwerk**, **Volume**, **Laufwerk 1**, **Laufwerk 2**, **Update** und **Aktionen** können im Editor aufgeklappt werden.

## Volume-Ringdiagramm

Für das Ringdiagramm werden zwei Werte verwendet:

- `volume_percent_entity`: Belegung in Prozent
- `volume_used_entity`: tatsächlich belegter Speicherplatz

Die Card berechnet daraus automatisch den Gesamt- und den freien Speicherplatz. Die Einheit des belegten Speicherplatzes wird dabei beibehalten.

## Bild

Das DS720+-Standardbild ist direkt in `nas-card.js` eingebettet und wird nicht aus dem `images`-Ordner geladen.

Für ein anderes NAS kann im grafischen Editor eine eigene Bild-URL eingetragen werden, z. B.:

```yaml
image_url: /local/images/mein_nas.png
```

Mit `show_image: false` kann das Gerätebild vollständig ausgeblendet werden.

## Layout / Größe

Im Home-Assistant-Sections-Dashboard ist die Breite frei einstellbar. Die Card startet mit 12 Spalten und erlaubt 4 bis 12 Spalten.

Die Höhe wird bewusst nicht als Grid-Größe vorgegeben. Home Assistant lässt die Card damit die benötigte Höhe selbst bestimmen. Die Card meldet ihre Mindesthöhe (`min_rows`); im Layout-Editor lässt sich die Höhe daher nicht kleiner einstellen, als der Inhalt braucht. Bei schmalen Breiten passt sich die interne Anordnung automatisch an.

## Letzter Start

Die untere mittlere Kachel zeigt nur zwei Textzeilen:

```text
Letzter Start
<formatierter Home-Assistant-Zustand>
```

Die Ausgabe läuft über Home Assistants eigene `formatEntityState()`-Formatierung. Damit werden Sprache, Datums-/Zeitdarstellung und Home-Assistant-Locale automatisch berücksichtigt.

## Voraussetzungen und Grenzen

Benötigt werden Home Assistant mit Custom-Card-Unterstützung und die in der Konfiguration zugeordneten Entitäten. Die Karte richtet die Geräteintegration nicht selbst ein. Nicht verfügbare Messwerte werden als solche angezeigt; Gerätestatus und Aktualität hängen von der zugrunde liegenden Integration ab.

Aktionen laufen über die angemeldete Home-Assistant-Sitzung und deren Berechtigungen. Die Bestätigung per zweitem Tippen verhindert versehentliche Bedienung; sie ersetzt keine Berechtigungsprüfung. Eigene Bild-URLs werden vom Browser geladen und können dessen IP-Adresse und Metadaten an den Bildanbieter übertragen. Für lokale Bilder `/local/…` verwenden und keine Zugangsdaten in URLs eintragen.

Die Berechnung von freiem und gesamtem Speicher setzt zusammengehörige Belegungswerte in Prozent und Speichereinheiten voraus. Die Karte zeigt zwei Laufwerke; sie ersetzt keine NAS-Überwachung.

## Hinweise zu Marken

Dieses Projekt ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Synology oder Home Assistant. Es wird weder von Synology noch von Home Assistant unterstützt oder herausgegeben.

**Synology** und **DiskStation** sind Marken ihrer jeweiligen Rechteinhaber.

## Lizenz

GNU Affero General Public License v3.0 only (**AGPL-3.0-only**).

Nutzung, Änderungen und Weitergabe sind unter den Bedingungen der AGPL erlaubt; abgeleitete Werke müssen unter derselben Lizenz stehen. Bei modifizierten Versionen, die über ein Netzwerk genutzt werden, muss der entsprechende Quellcode den Nutzern zugänglich gemacht werden.

Details stehen in [`LICENSE`](LICENSE).
