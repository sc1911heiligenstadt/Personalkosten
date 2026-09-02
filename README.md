# 💶 Personalkosten

Was die Trainerinnen und Trainer den Verein je Saison kosten — geplant, nicht
abgerechnet. Die App rechnet die Aufwandsentschädigungen aus hinterlegten
€-Sätzen hoch, sortiert nach Mannschaft, und trennt dabei sauber zwischen
regulären Trainern, Schwerpunkttrainern und Förderung.

**➡️ [Personalkosten öffnen](https://sc1911heiligenstadt.github.io/Personalkosten/)**

## Was drin ist

| Reiter | Wofür |
|---|---|
| **Übersicht** | Die Summe je Mannschaft und für den ganzen Verein; hier sitzt auch der Export |
| **Trainer** | Die einzelnen Trainer mit ihren Sätzen; Stammdaten lassen sich aus dem zentralen Trainerprofil übernehmen |
| **Schwerpunkttrainer** | Separat geführt, weil hier andere Sätze gelten |
| **Förderung** | Geförderte Stellen, getrennt ausgewiesen |
| **Parameter** | Die €-Sätze, aus denen alles hochgerechnet wird (ab *Bearbeiten*) |
| **Einstellungen** | Saison anlegen, duplizieren, löschen (ab *Administrieren*) |
| **Info** | Was die App tut, die Änderungen und der Datenschutz-Hinweis |

Alle drei Personen-Tabellen haben Suche und Filter nach Mannschaft, Position und
Lizenz — am Handy der bequemere Weg als die breite Tabelle.

## Wie gerechnet wird

Der Betrag ergibt sich aus **Position**, **Lizenz**, **Landesebene** und
**Jahrgangsleiter-Funktion**, multipliziert mit dem **Stellenanteil**. Die
€-Sätze dahinter stehen im Reiter *Parameter*. Weicht eine Vereinbarung davon ab,
lässt sich der Wert je Person von Hand überschreiben. Aufs Jahr wird mit **11
Monaten** hochgerechnet — die Sommerpause bleibt außen vor, genau wie in der
alten Excel.

## Woher die Namen kommen

Trainerstammdaten werden **nicht doppelt gepflegt**. Über *Aus zentralem
Trainerprofil übernehmen* holt die App sie aus
[Trainerdaten](https://sc1911heiligenstadt.github.io/Trainerdaten/). Umgekehrt
liest Trainerdaten von hier die Pauschalen und Lizenzen.

Das Mannschaftsfeld schlägt die echten Mannschaften des Vereins vor — dieselbe
Liste wie in der Tools-Übersicht. Stellen ohne feste Mannschaft (Torwarttrainer
über alle Jahrgänge, Athletik) lassen sich trotzdem frei eintippen.

Im Repo liegen **nur die €-Sätze, keine Personendaten**. Die Namen kommen
ausschließlich über den einmaligen Import in die Nextcloud.

## Export

Der Knopf **„Personal exportieren“** in der Übersicht gibt die Personalübersicht
in drei Formaten aus: als **Text** zum Weitergeben, als **PDF** zum Drucken oder
Ablegen und als **CSV** für Excel — dort sind die Zahlenspalten echte Zahlen und
lassen sich direkt weiterrechnen. Welche Bereiche und welche Spalten
mitkommen, ist frei wählbar.

## Zugang

Die Anmeldung läuft über die [Tools-Übersicht](https://sc1911heiligenstadt.github.io/ToolsUebersicht/) — dort einmal anmelden, danach ist dieses Werkzeug offen.

Die Rechte gelten in drei Stufen: **Sehen** (alle Tabellen und Summen ansehen,
die Saison zum Nachschauen wechseln), **Bearbeiten** (Personen und Parameter
pflegen, exportieren, die gemeinsam gültige Saison umstellen) und
**Administrieren** (Reiter *Einstellungen*: Saisonverwaltung, dazu der einmalige
Daten-Import). Wer welche Stufe hat, legt die Tools-Übersicht fest.

Die Zahlen sind Personaldaten — die Sichtbarkeit dieses Werkzeugs ist deshalb
eng gesteckt. Fällt die Anmeldung weg, während die App offen ist, wird der
Bildschirm samt der Dialoge daneben geräumt; zurück geht es über ein Neuladen
der Seite.

## Lokal starten

Über den Eintrag `personalkosten` in `E:\.claude\launch.json` — der Server läuft dann auf `http://localhost:8781/`.

## Technik

| Datei | Zweck |
|---|---|
| `index.html` | sieben Reiter, zwei Dialoge (Person, Export) |
| `config.js` | Version, Jahres-Faktor, Standard-€-Sätze, Bereiche, Changelog |
| `db.js` | Anbindung an das Gateway der Tools-Übersicht |
| `app.js` | Tabellen, Berechnung, Export, Rechte, Speichern |
| `style.css` | Gestaltung |
| `tools/README.md` | Format und Weg des einmaligen Startbestands (nicht ausgeliefert) |

Vanilla JavaScript ohne Build-Schritt — die Dateien werden so ausgeliefert, wie sie im Repo liegen. Veröffentlicht über GitHub Pages. Die Daten liegen in der Vereins-Nextcloud; der Zugriff läuft ausschließlich über den Login-Worker der Tools-Übersicht, nie mit Zugangsdaten im Browser. Ändern zwei Geräte gleichzeitig denselben Stand, erkennt die App das, lädt den fremden Stand nach und sagt Bescheid.

---

Ein Werkzeug des 1. SC 1911 Heiligenstadt. Alle Werkzeuge auf einen Blick: [Tools-Übersicht](https://sc1911heiligenstadt.github.io/ToolsUebersicht/) · Erklärungen im [Toolbox Wiki](https://sc1911heiligenstadt.github.io/Vereinswiki/).
