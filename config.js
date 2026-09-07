const APP_VERSION = "1.0";

// Jahres-Faktor für Hochrechnung Monat -> Jahr (Sommerpause: 11 statt 12 Monate,
// wie in der Excel "Summe/Jahr" = Summe * 11).
const MONATE_PRO_JAHR = 11;

// Startsaison, falls im Gateway noch nichts liegt.
const DEFAULT_SEASON = "2026/27";

// Standard-Parametersätze (aus der bestehenden Excel "Parameter"-Tabelle).
// KEINE Personendaten — nur die €-Sätze. Personendaten kommen ausschließlich
// per einmaligem Cloud-Import (Seed) in die Nextcloud, nie ins Repo.
// value "" bedeutet "kein Zuschlag" (0 €) und ist als "—"-Option wählbar.
const DEFAULT_PARAMETER = {
  positionen: [
    { label: "Cheftrainer", betrag: 50 },
    { label: "Trainer", betrag: 50 },
    { label: "Co-Trainer", betrag: 30 },
    { label: "Betreuer", betrag: 30 }
  ],
  lizenzen: [
    { label: "ohne Lizenz", betrag: 0 },
    { label: "Basis", betrag: 0 },
    { label: "C", betrag: 25 },
    { label: "B", betrag: 50 },
    { label: "B Elite", betrag: 100 },
    { label: "A", betrag: 250 }
  ],
  landesebene: [
    { label: "nein", betrag: 0 },
    { label: "ja", betrag: 50 }
  ],
  jahrgangsleiter: [
    { label: "ja, bis E", betrag: 25 },
    { label: "ja, ab D", betrag: 50 }
  ]
};

// Die Datenbereiche der App (Reihenfolge = Tab-Reihenfolge).
const BEREICHE = [
  { id: "trainer", label: "Trainer", berechnet: true },
  { id: "schwerpunkt", label: "Schwerpunkttrainer", berechnet: false },
  { id: "foerderung", label: "Förderung", berechnet: false }
];

// Was die Personalkosten-App kann -- steht im Info-Reiter als Karte "Funktionen".
// WICHTIG: Das ist NICHT der Changelog. Hier steht der ZUSTAND ("der Betrag wird
// berechnet"), dort die Aenderung ("wird JETZT berechnet"). Wer eine Funktion
// umbaut oder abschaltet, zieht diesen Text mit -- und ebenso
// E:\SC1911-Tools-Anleitung.txt, wo dasselbe ausfuehrlich steht.
const APP_FUNKTIONEN = [
  {
    title: "Übersicht",
    items: [
      "Planung und Auswertung der Aufwandsentschädigungen aller Mannschaften — an Stelle der bisherigen Excel-Tabelle.",
      "Der Reiter „Übersicht“ zeigt die Summen je Bereich und je Mannschaft, monatlich und aufs Jahr hochgerechnet.",
      "Das Jahr wird mit elf Monaten gerechnet, nicht mit zwölf — wegen der Sommerpause, genau wie in der Excel."
    ]
  },
  {
    title: "Die drei Bereiche",
    items: [
      "„Trainer“, „Schwerpunkttrainer“ und „Förderung“ stehen als eigene Reiter mit bearbeitbaren Tabellen nebeneinander.",
      "Beim Trainer wird der Betrag gerechnet; bei Schwerpunkttrainern und in der Förderung wird er direkt eingetragen.",
      "Jede Tabelle hat eine Suche und Filter nach Mannschaft, Position und Lizenz."
    ]
  },
  {
    title: "Wie die Aufwandsentschädigung berechnet wird",
    items: [
      "Der Betrag ergibt sich aus Position, Lizenz, Landesebene und Jahrgangsleiter-Funktion und wird mit dem Stellenanteil multipliziert.",
      "Schon während des Tippens steht der errechnete Betrag im Formular.",
      "Je Person lässt sich der berechnete Wert von Hand überschreiben, wenn eine Vereinbarung davon abweicht.",
      "Beim Anlegen eines Trainers lassen sich Mannschaft und Lizenz aus dem zentralen Trainerprofil übernehmen — einmalig beim Anlegen, danach frei änderbar."
    ]
  },
  {
    title: "Parameter: die Euro-Sätze",
    items: [
      "Im Reiter „Parameter“ stehen die Sätze, aus denen sich die Berechnung speist. Sie gelten für alle Saisons gemeinsam.",
      "Wird eine Zeile umbenannt, zählt die Rückfrage, wie viele Personen den bisherigen Text tragen, und zieht sie beim Bestätigen mit. Sonst würde ihr Satz stillschweigend auf 0 € fallen.",
      "Beim Entfernen einer Zeile sagt die Rückfrage ebenfalls, wie viele Personen betroffen sind.",
      "Steht bei einer Person ein Wert, den der Parameter-Satz nicht mehr kennt, bleibt er im Feld stehen — mit dem Hinweis „nicht mehr im Parameter-Satz“, damit Speichern ihn nicht ungefragt löscht."
    ]
  },
  {
    title: "Mannschaften aus der einen Vereinsliste",
    items: [
      "Das Mannschaftsfeld schlägt die echten Mannschaften des Vereins vor — dieselbe Liste, die in der Tools-Übersicht gepflegt wird. Das gilt in allen drei Bereichen.",
      "Damit steht dieselbe Mannschaft überall gleich geschrieben, und die Auswertung „Nach Mannschaft“ zieht sie nicht in zwei Zeilen auseinander.",
      "Ein eigener Eintrag bleibt möglich: Stellen ohne feste Mannschaft — Torwarttrainer über alle Jahrgänge, Athletik — lassen sich frei eintippen."
    ]
  },
  {
    title: "Mehrere Saisons",
    items: [
      "Mehrere Saisons lassen sich parallel planen; eine bestehende Saison lässt sich als Startpunkt duplizieren.",
      "Zum Ansehen kann jeder die Saison wechseln, ohne dass sich das für andere verstellt. Die gemeinsam gültige Saison umzustellen ist ein Bearbeiten-Recht.",
      "Angelegt und gelöscht werden Saisons im Reiter „Einstellungen“."
    ]
  },
  {
    title: "Export",
    items: [
      "Die Personalübersicht lässt sich in drei Formaten ausgeben: als Text zum Weitergeben, als CSV für Excel und als PDF zum Drucken oder Ablegen.",
      "Im CSV sind die Zahlenspalten echte Zahlen und lassen sich direkt weiterrechnen.",
      "Welche Bereiche und welche Spalten mitkommen, ist frei wählbar."
    ]
  },
  {
    title: "Wer was darf",
    items: [
      "Das Werkzeug ist nur für die freigegebene Gruppe sichtbar, weil es sensible Kostendaten enthält.",
      "Sehen: alle Tabellen und Summen, schreibgeschützt.",
      "Bearbeiten: Personen und Parameter anlegen, ändern und löschen, dazu der Export und das Umstellen der gemeinsam gültigen Saison.",
      "Administrieren: zusätzlich der Reiter „Einstellungen“ mit der Saisonverwaltung und dem einmaligen Daten-Import.",
      "Der Reiter „Info“ steht jedem angemeldeten Nutzer offen."
    ]
  },
  {
    title: "Daten und Speicherung",
    items: [
      "Gespeichert wird in der Vereins-Nextcloud über die zentrale Anmeldung der Tools-Übersicht — ein eigenes Passwort braucht es nicht.",
      "Im Repo liegen nur die Euro-Sätze, keine Personendaten. Die Namen kommen ausschließlich über den einmaligen Import in die Nextcloud.",
      "Ändern zwei Geräte gleichzeitig denselben Stand, erkennt die App das, lädt den fremden Stand nach und sagt Bescheid.",
      "Fällt die Anmeldung weg, während die App offen ist, räumt sie den Bildschirm samt Personen-Dialog, Export-Dialog und Druckansicht, statt Namen und Beträge lesbar stehen zu lassen."
    ]
  },
  {
    title: "Am Handy",
    items: [
      "Die Ansicht ist für das Handy gebaut; Suche und Filter helfen dort mehr als die breite Tabelle.",
      "Die Eingabefelder sind groß genug, dass der iPhone-Browser beim Antippen nicht ungefragt in die Seite hineinzoomt."
    ]
  }
];

const APP_CHANGELOG = [
  {
    version: "1.4",
    groups: [
      {
        title: "Im Info-Reiter steht jetzt, was die App kann",
        items: [
          "Die Liste der Änderungen und die Versionsnummer sind aus dem Info-Reiter verschwunden.",
          "Stattdessen steht dort die Karte „Funktionen“: was die App kann, nach Themen geordnet.",
          "Was sich geändert hat, steht weiterhin in den Neuigkeiten auf der Startseite der Tools-Übersicht."
        ]
      }
    ]
  },
  {
    version: "1.3",
    groups: [
      {
        title: "Beschriftungen im Formular sind mit ihrem Feld verbunden",
        items: [
          "Die Beschriftung stand zwar über jedem Feld, war aber nicht mit ihm verknüpft. Ein Vorleseprogramm nennt dann nur ‚Eingabefeld‘, und ein Klick auf die Beschriftung setzte den Schreibzeiger nicht ins Feld.",
          "Das gilt jetzt für alle Felder des Formulars. Am Bildschirm ändert sich nichts."
        ]
      }
    ]
  },
  {
    version: "1.2",
    groups: [
      {
        title: "Umbenannte €-Sätze reißen die Berechnung nicht mehr auseinander",
        items: [
          "Personen finden ihren €-Satz über den Text im Reiter „Parameter“. Wurde dort eine Zeile umbenannt — „Cheftrainer“ zu „Cheftrainerin“, „B Elite“ zu „B-Elite“ —, fand die Berechnung nichts mehr und rechnete den Satz stillschweigend mit 0 € weiter: die Aufwandsentschädigung sank, ohne dass irgendwo etwas stand.",
          "Beim Umbenennen wird jetzt gezählt, wie viele Personen den bisherigen Text tragen — über alle Saisons. Wer bestätigt, benennt um und zieht diese Personen mit; wer abbricht, bekommt den alten Text zurück ins Feld.",
          "Beim Entfernen einer Zeile sagt die Rückfrage, wie viele Personen betroffen sind und dass ihre Aufwandsentschädigung entsprechend sinkt.",
          "Die Bezeichnung wird erst beim Verlassen des Feldes übernommen, nicht mehr bei jedem einzelnen Tastendruck. Der €-Betrag daneben zählt weiterhin live mit."
        ]
      },
      {
        title: "Eine Person verliert ihre Position nicht mehr beim bloßen Speichern",
        items: [
          "Stand bei einer Person ein Wert, den der Parameter-Satz nicht mehr kennt, zeigte das Formular beim Öffnen ein leeres Feld — und ein Klick auf „Speichern“, ohne irgendetwas anzufassen, schrieb diese Leere in den Bestand.",
          "Solche Werte stehen jetzt als eigene Auswahl im Feld, mit dem Hinweis „nicht mehr im Parameter-Satz“. Damit bleibt sichtbar, was hinterlegt war, und Speichern löscht nichts mehr ungefragt."
        ]
      }
    ]
  },
  {
    version: "1.1",
    groups: [
      {
        title: "Import fragt jetzt nach dem ganzen Bestand",
        items: [
          "Der Daten-Import ersetzt seit jeher alle Saisons auf einmal, gezählt hat die Rückfrage aber nur die gerade geöffnete Saison. Wer eine neue, noch leere Saison angelegt hatte, bekam dort den Import-Hinweis angeboten — und ein Klick darauf räumte ohne ein Wort den kompletten Mehrsaison-Bestand ab.",
          "Die Rückfrage zählt jetzt über alle Saisons und benennt, was ersetzt wird: wie viele Saisons, welche, und wie viele Personen darin stehen.",
          "Bringt die Importdatei keine eigenen €-Sätze mit — der Normalfall beim Excel-Bestand —, bleiben die im Reiter „Parameter“ gepflegten Sätze erhalten, statt auf die Startwerte zurückzufallen. Bringt sie welche mit, sagt die Rückfrage das ausdrücklich dazu.",
          "Der allererste Import in einen noch leeren Stand läuft wie bisher ohne Rückfrage durch."
        ]
      }
    ]
  },
  {
    version: "1.0",
    groups: [
      {
        title: "Personalkosten",
        items: [
          "Planung und Auswertung der Aufwandsentschädigungen aller Mannschaften — an Stelle der bisherigen Excel-Tabelle.",
          "Drei Bereiche als bearbeitbare Tabellen: Trainer, Schwerpunkttrainer und Förderung.",
          "Kosten-Übersicht mit Summen je Bereich und je Mannschaft, monatlich und aufs Jahr hochgerechnet — das Jahr mit 11 Monaten, wie in der Excel, wegen der Sommerpause.",
          "Tabellen mit Suche und Filter nach Mannschaft, Position und Lizenz.",
          "Mehrere Saisons planbar; eine bestehende Saison lässt sich als Startpunkt duplizieren."
        ]
      },
      {
        title: "Wie die Aufwandsentschädigung berechnet wird",
        items: [
          "Der Betrag ergibt sich aus Position, Lizenz, Landesebene und Jahrgangsleiter-Funktion und wird mit dem Stellenanteil multipliziert.",
          "Die Euro-Sätze dahinter stehen im Reiter „Parameter“ und sind dort pflegbar.",
          "Je Person lässt sich der berechnete Wert von Hand überschreiben, wenn eine Vereinbarung davon abweicht.",
          "Beim Anlegen eines Trainers können Mannschaft und Lizenz aus dem zentralen Trainerprofil übernommen werden — einmalig beim Anlegen, danach frei änderbar.",
          "Schon während des Tippens steht der errechnete Betrag im Formular."
        ]
      },
      {
        title: "Mannschaften aus der einen Vereinsliste",
        items: [
          "Beim Anlegen oder Bearbeiten einer Person schlägt das Mannschaftsfeld die echten Mannschaften des Vereins vor — dieselbe Liste, die in der Tools-Übersicht gepflegt wird. Das gilt in allen drei Bereichen: Trainer, Schwerpunkttrainer und Förderung.",
          "Damit steht dieselbe Mannschaft überall gleich geschrieben, und die Auswertung „Nach Mannschaft“ fasst nicht dieselbe Mannschaft in zwei Zeilen auseinander.",
          "Ein eigener Eintrag bleibt möglich: Stellen ohne feste Mannschaft — Torwarttrainer über alle Jahrgänge, Athletik — lassen sich weiterhin frei eintippen."
        ]
      },
      {
        title: "Export",
        items: [
          "Die Personalübersicht lässt sich in drei Formaten ausgeben: als Text zum Weitergeben, als PDF zum Drucken oder Ablegen und als CSV für Excel.",
          "Im CSV sind die Zahlenspalten echte Zahlen und lassen sich direkt weiterrechnen.",
          "Frei wählbar, welche Bereiche und welche Spalten enthalten sein sollen."
        ]
      },
      {
        title: "Wer darf was",
        items: [
          "Das Werkzeug ist nur für die freigegebene Gruppe sichtbar, weil es sensible Kostendaten enthält.",
          "Sehen: alle Tabellen und Summen, schreibgeschützt. Die Saison lässt sich zum Ansehen wechseln, ohne dass das für andere etwas verstellt.",
          "Bearbeiten: Personen und Parameter anlegen, ändern und löschen. Dazu der Export und das Umstellen der gemeinsam gültigen Saison.",
          "Administrieren: zusätzlich die Saisonverwaltung im Reiter „Einstellungen“ und der einmalige Daten-Import.",
          "Der Reiter „Info“ steht jedem angemeldeten Nutzer offen.",
          "Fällt die Anmeldung weg, während die App offen ist, räumt sie den Bildschirm samt Personen-Dialog, Export-Dialog und Druckansicht, statt Namen und Beträge im Hintergrund lesbar zu lassen."
        ]
      },
      {
        title: "Bedienung am Handy",
        items: [
          "Die Ansicht ist für das Handy gebaut; Suche und Filter helfen dort mehr als die breite Tabelle.",
          "Eingabefelder sind mindestens 16 Pixel groß, damit der iPhone-Browser beim Antippen nicht ungefragt in die Seite hineinzoomt und verschoben stehen bleibt."
        ]
      },
      {
        title: "Daten und Speicherung",
        items: [
          "Gespeichert wird in der Vereins-Nextcloud über die zentrale Anmeldung der Tools-Übersicht — ein eigenes Passwort braucht es nicht.",
          "Im Repo liegen nur die Euro-Sätze, keine Personendaten; die Namen kommen ausschließlich über den einmaligen Import in die Nextcloud.",
          "Ändern zwei Geräte gleichzeitig denselben Stand, erkennt die App das, lädt den fremden Stand nach und sagt Bescheid."
        ]
      }
    ]
  }
];
