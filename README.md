# 💶 Personalkosten

Was die Trainerinnen und Trainer den Verein je Saison kosten — geplant, nicht
abgerechnet. Die App rechnet die Aufwandsentschädigungen aus hinterlegten
€-Sätzen hoch, sortiert nach Mannschaft, und trennt dabei sauber zwischen
regulären Trainern, Schwerpunkttrainern und Förderung.

**➡️ [Personalkosten öffnen](https://sc1911heiligenstadt.github.io/Personalkosten/)**

## Was drin ist

| Reiter | Wofür |
|---|---|
| **Übersicht** | Die Summe je Mannschaft und für den ganzen Verein |
| **Trainer** | Die einzelnen Trainer mit ihren Sätzen; Stammdaten lassen sich aus dem zentralen Trainerprofil übernehmen |
| **Schwerpunkttrainer** | Separat geführt, weil hier andere Sätze gelten |
| **Förderung** | Geförderte Stellen, getrennt ausgewiesen |
| **Parameter** | Die €-Sätze, aus denen alles hochgerechnet wird |
| **Einstellungen** | Aktive Saison; Personal-Export |

## Woher die Namen kommen

Trainerstammdaten werden **nicht doppelt gepflegt**. Über *Aus zentralem
Trainerprofil übernehmen* holt die App sie aus
[Trainerdaten](https://sc1911heiligenstadt.github.io/Trainerdaten/). Umgekehrt
liest Trainerdaten von hier die Pauschalen und Lizenzen.

## Zugang

Die Anmeldung läuft über die [Tools-Übersicht](https://sc1911heiligenstadt.github.io/ToolsUebersicht/) — dort einmal anmelden, danach ist dieses Werkzeug offen.

Die Rechte gelten in drei Stufen: **Sehen** (Übersicht und Trainer ansehen),
**Bearbeiten** (Trainer pflegen, Reiter *Parameter* mit den €-Sätzen) und
**Administrieren** (Reiter *Einstellungen*: Saison und Export). Wer welche Stufe
hat, legt die Tools-Übersicht fest.

Die Zahlen sind Personaldaten — die Sichtbarkeit dieses Werkzeugs ist deshalb
eng gesteckt.

## Lokal starten

Über den Eintrag `personalkosten` in `E:\.claude\launch.json` — der Server läuft dann auf `http://localhost:8781/`.

## Technik

Vanilla JavaScript ohne Build-Schritt — die Dateien werden so ausgeliefert, wie sie im Repo liegen. Veröffentlicht über GitHub Pages. Die Daten liegen in der Vereins-Nextcloud; der Zugriff läuft ausschließlich über den Login-Worker der Tools-Übersicht, nie mit Zugangsdaten im Browser.

---

Ein Werkzeug des 1. SC 1911 Heiligenstadt. Alle Werkzeuge auf einen Blick: [Tools-Übersicht](https://sc1911heiligenstadt.github.io/ToolsUebersicht/) · Erklärungen im [Toolbox Wiki](https://sc1911heiligenstadt.github.io/Vereinswiki/).
