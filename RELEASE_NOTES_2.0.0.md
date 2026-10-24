# NAS Card v2.0.0

- Aufnahme in den offiziellen HACS-Katalog; reguläre Installation über die HACS-Suche.
- Migration bestehender Custom Repositories dokumentiert: nur den benutzerdefinierten Eintrag entfernen, bestehende Installation und Dashboard-Konfigurationen behalten.
- Major-Version als HACS-Meilenstein: bedeutet nicht automatisch Breaking Changes. Bestehende Konfigurationsschlüssel bleiben erhalten.
- README auf Funktionen, Einrichtung, Bedienung, Voraussetzungen und Grenzen ausgerichtet.
- Security: HTML-Escaping für die Speichereinheit in Belegt/Frei/Gesamt ergänzt; Regressionstests für manipulierte Entity-Attribute und Konfigurationswerte.

Vorbereitung per Pull Request; noch kein Release veröffentlicht. Details: [Security-Review](SECURITY_REVIEW.md).
