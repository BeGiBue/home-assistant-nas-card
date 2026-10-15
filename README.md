<h1 align="center">NAS Card</h1>

<p align="center">
  Custom-Card für NAS-Systeme – vorkonfiguriert für eine Synology DS720+.
</p>

## Screenshot

<p align="center">
  <img src="https://raw.githubusercontent.com/BeGiBue/home-assistant-nas-card/main/images/Screenshot.png" alt="NAS Card Screenshot" width="1000">
</p>

<p align="center">
  <strong>Version 1.1.4</strong><br>
  <a href="https://github.com/BeGiBue/home-assistant-nas-card/actions/workflows/validate.yml"><img src="https://github.com/BeGiBue/home-assistant-nas-card/actions/workflows/validate.yml/badge.svg" alt="HACS validation"></a>
</p>

## Funktionen

- Theme-sensitive Darstellung für Light Mode, Dark Mode und benutzerdefinierte Home-Assistant-Themes
- Editierbarer Haupttitel und Untertitel über native Home-Assistant-Textfelder
- Festes `mdi:nas` Symbol vor dem Haupttitel
- Alle Entitäten über native Home-Assistant-Entity-Picker auswählbar
- Freigestelltes DS720+-Standardbild direkt in der JavaScript-Komponente eingebettet – standardmäßig groß im Hintergrund, alternativ neben dem Titel; optional eigene Bild-URL verwendbar
- Temperatur, CPU, RAM/Speicher und Sicherheitsstatus
- Inbound- und Outbound-Durchsatz in zwei großen Statusfeldern
- Volume-Auslastung als Ringdiagramm mit Belegt/Frei/Gesamt
- Zwei Laufwerksbereiche mit Temperatur, Restlebensdauer, Sektoren und Status – Werte rechtsbündig wie in der Volume-Box
- Bezeichnungen in den Messfeldern oberhalb der Zustände
- Messwerte linksbündig mit Icon-Chip, großer Zahl und kleiner Einheit
- Warnfarben für CPU, RAM und Volume (orange ab 75/80/80 %, rot ab 90 %)
- DSM-Update-Zeile mit installierter und ggf. neuer Version
- Neustart, letzter Start und Herunterfahren unten; im breiten Layout in einer Reihe
- Neustart und Herunterfahren verlangen ein zweites Tippen zur Bestätigung
- "Letzter Start" besteht aus genau zwei Textzeilen und nutzt Home Assistants automatische Zustands-/Zeitformatierung
- Breite im Sections-Dashboard frei von 4 bis 12 Spalten einstellbar
- Höhe wird automatisch durch die Card bestimmt; im Layout-Editor nicht unter die benötigte Mindesthöhe einstellbar
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

### Automatisch

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=BeGiBue&repository=home-assistant-nas-card&category=plugin)

### Manuell

1. In HACS **Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/BeGiBue/home-assistant-nas-card` hinzufügen.
3. Als Typ **Dashboard** auswählen.
4. **NAS Card** installieren.
5. Home Assistant bzw. den Browser vollständig neu laden.

Das Repository enthält die offizielle HACS-Validierung unter `.github/workflows/validate.yml`. Sie läuft bei Änderungen auf `main`, bei Pull Requests und kann zusätzlich manuell gestartet werden. In `hacs.json` ist `nas-card.js` explizit als Plugin-Datei angegeben.

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

Das freigestellte DS720+-Standardbild ist direkt in der JavaScript-Komponente eingebettet. Es existiert nicht als separates Repository-Asset und wird für die Card nicht aus dem `images`-Ordner geladen.

Für ein anderes NAS kann im grafischen Editor eine eigene Bild-URL eingetragen werden, z. B.:

```yaml
image_url: /local/images/mein_nas.png
```

Mit `show_image: false` kann das Gerätebild vollständig ausgeblendet werden.

## Layout / Größe

Im Home-Assistant-Sections-Dashboard ist die Breite frei einstellbar. Die Card startet mit 12 Spalten und erlaubt 4 bis 12 Spalten.

Die Höhe wird bewusst nicht als Grid-Größe vorgegeben. Home Assistant lässt die Card damit die benötigte Höhe selbst bestimmen. Die Card meldet ihre Mindesthöhe (`min_rows`); im Layout-Editor lässt sich die Höhe daher nicht kleiner einstellen, als der Inhalt braucht. Das Layout orientiert sich von den Abständen und Proportionen an der Eaton UPS Card. Bei schmalen Breiten passt sich die interne Anordnung automatisch an.

## Letzter Start

Die untere mittlere Kachel zeigt nur zwei Textzeilen:

```text
Letzter Start
<formatierter Home-Assistant-Zustand>
```

Die Ausgabe läuft über Home Assistants eigene `formatEntityState()`-Formatierung. Damit werden Sprache, Datums-/Zeitdarstellung und Home-Assistant-Locale automatisch berücksichtigt.

## Release

Alle Versionen stehen unter [GitHub Releases](https://github.com/BeGiBue/home-assistant-nas-card/releases), die Änderungen im Detail in [`CHANGELOG.md`](CHANGELOG.md). Zu jeder Version gibt es eine Datei `RELEASE_NOTES_<Version>.md`.

## Hinweise zu Marken

Dieses Projekt ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Synology oder Home Assistant. Es wird weder von Synology noch von Home Assistant unterstützt oder herausgegeben.

**Synology** und **DiskStation** sind Marken ihrer jeweiligen Rechteinhaber.

## Lizenz

GNU Affero General Public License v3.0 only (**AGPL-3.0-only**).

Nutzung, Änderungen und Weitergabe sind unter den Bedingungen der AGPL erlaubt; abgeleitete Werke müssen unter derselben Lizenz stehen. Bei modifizierten Versionen, die über ein Netzwerk genutzt werden, muss der entsprechende Quellcode den Nutzern zugänglich gemacht werden.

Details stehen in [`LICENSE`](LICENSE).
