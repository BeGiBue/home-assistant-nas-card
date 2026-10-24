# Security-Review – home-assistant-nas-card

Prüfdatum: 2026-10-24. Geprüfte Ausgangsbasis: `e996a2bae3a5e229fea63b1b50b989df2483d7b8`; Zielversion **2.0.0**.
Zeilenangaben der Befunde beziehen sich auf diese Ausgangsbasis.

## Umfang und Grenzen

Manuelle Prüfung der gesamten JavaScript-Komponente: HTML-/Attributausgaben,
Konfigurationswerte, Entity-Zustände und Attribute, numerische Styles,
URL-Kontexte, Event-Handler, Home-Assistant-Dienste und WebSocket-Aufrufe.
Keine Fremdbibliotheken, Paketverwaltung oder eigenen Zugangsdaten im Laufzeitcode.
Die Karte verwendet die angemeldete HA-Sitzung; Backend-Berechtigungen bleiben die
Sicherheitsgrenze. Keine direkte Geräte-API und kein eigener WebSocket-Client.
Keine vollständige Prüfung des HA-Core oder der zugrunde liegenden Geräteintegration.

## Befunde

| ID | Datei / Zeile | Risiko | Schweregrad | Korrektur / Status |
|---|---|---|---|---|
| NAS-01 | `nas-card.js:165`, Datenquelle Zeilen 140–141 | Stored XSS: `unit_of_measurement` wird über `fmt()` ungeescaped in drei `<dd>`-Elemente geschrieben. Ein manipulierbares Entity-Attribut kann einen `<img onerror>`-Handler im HA-Frontend ausführen und im Kontext der angemeldeten Sitzung handeln. | **Hoch** | **Behoben:** alle drei vollständigen Ergebnisstrings vor Einfügen mit `_e()` escapen. Regressionstest schlägt auf Ausgangsbasis fehl und besteht mit Fix. |
| NAS-02 | `nas-card.js:142`, 147, 151 | Konfigurierte externe Bild-URL lädt im Browser; Bildanbieter sieht Verbindungsmetadaten, HTTP ist unverschlüsselt. Escaping verhindert Attributausbruch; `img.src` ist kein Navigations- oder Skriptkontext. | Niedrig / Konfigurationsrisiko | Dokumentiert: lokale Bildpfade nutzen, keine Credentials in URLs. Kein bestätigter XSS-Befund durch URL-Protokoll allein. |

Die unabhängige Nachprüfung mit jsdom erzeugte mit dem Ausgangscode drei injizierte
Bildknoten und führte den Ereignis-Handler aus; mit der Korrektur entstehen null
injizierte Knoten. Die übrigen dynamischen Texte, Update-Versionen, Titel und
Entity-IDs werden escaped; interne Label/Icon-Strings sind Konstanten. Dienste
werden ausschließlich nach Bedienung aufgerufen, Neustart/Abschalten standardmäßig
mit zweitem Tippen bestätigt.

## Verifikation

- `node --check nas-card.js`: bestanden.
- `node tests/security.test.mjs`: **2 Tests bestanden**.
- Dieselben Tests auf unverändertem Ausgangscode: **1 erwarteter Fehler**, NAS-01 reproduziert.
- `git diff --check`: bestanden.
- CI führt Syntax- und Regressionstests neben bestehender HACS-Prüfung aus.

## Release-Einschätzung

Keine offenen kritischen oder hohen Befunde im geprüften Umfang. Vor Veröffentlichung
HACS-CI sowie Bedienung, grafischen Editor und bestehende Dashboard-Konfigurationen
in einer echten HA-Instanz prüfen. Keine Releases oder Tags durch diesen Auftrag.
Die Major-Version markiert die Aufnahme in den offiziellen HACS-Katalog; sie bedeutet
nicht automatisch Breaking Changes.
