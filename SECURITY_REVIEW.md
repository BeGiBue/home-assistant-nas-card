# Security-Review – home-assistant-nas-card

## Umfang und Grenzen

Manuelle Prüfung der gesamten JavaScript-Komponente: HTML-/Attributausgaben,
Konfigurationswerte, Entity-Zustände und Attribute, numerische Styles,
URL-Kontexte, Event-Handler, Home-Assistant-Dienste und WebSocket-Aufrufe.
Keine Fremdbibliotheken, Paketverwaltung oder eigenen Zugangsdaten im Laufzeitcode.
Die Karte verwendet die angemeldete HA-Sitzung; Backend-Berechtigungen bleiben die
Sicherheitsgrenze. Keine direkte Geräte-API und kein eigener WebSocket-Client.
Keine vollständige Prüfung des HA-Core oder der zugrunde liegenden Geräteintegration.

## Befunde

| ID | Risiko | Schweregrad | Korrektur / Status |
|---|---|---|---|
| NAS-01 | Stored XSS: `unit_of_measurement` wurde ungeescaped in drei `<dd>`-Elemente geschrieben. Ein manipulierbares Entity-Attribut konnte einen `<img onerror>`-Handler im HA-Frontend ausführen und im Kontext der angemeldeten Sitzung handeln. | **Hoch** | **Behoben:** die Ergebnisstrings werden vor dem Einfügen escaped. Ein Regressionstest deckt den Fall ab. |
| NAS-02 | Konfigurierte externe Bild-URL lädt im Browser; Bildanbieter sieht Verbindungsmetadaten, HTTP ist unverschlüsselt. Escaping verhindert Attributausbruch; `img.src` ist kein Navigations- oder Skriptkontext. | Niedrig / Konfigurationsrisiko | Dokumentiert: lokale Bildpfade nutzen, keine Credentials in URLs. Kein bestätigter XSS-Befund durch URL-Protokoll allein. |

## Geprüfte Vertrauensgrenzen

- Dynamische Texte, Update-Versionen, Titel und Entity-IDs werden escaped; interne Label/Icon-Strings sind Konstanten.
- Dienste werden ausschließlich nach Bedienung aufgerufen; Neustart und Herunterfahren verlangen standardmäßig ein zweites Tippen.
- Eine unabhängige Nachprüfung mit jsdom erzeugte vor der Korrektur injizierte Bildknoten und führte den Ereignis-Handler aus; mit der Korrektur entstehen keine injizierten Knoten.

## Automatische Prüfungen

Der Workflow „Validate“ läuft bei Pushes auf `main`, Pull Requests und manuell. Er führt die HACS-Prüfung, `node --check nas-card.js` und die Regressionstests (`node --test tests/*.test.mjs`) aus.

## Restrisiken

- Externe Bild-URLs (NAS-02) liegen in der Verantwortung des Nutzers.
- Berechtigungen für Aktionen werden nicht von der Karte, sondern von Home Assistant geprüft; die Bestätigung per zweitem Tippen schützt nur vor versehentlicher Bedienung.
- Keine Prüfung des Home-Assistant-Cores oder der Geräteintegration.
- Bedienung, grafischer Editor und bestehende Dashboard-Konfigurationen sollten vor Veröffentlichung in einer echten HA-Instanz geprüft werden.

Keine offenen kritischen oder hohen Befunde im geprüften Umfang.
