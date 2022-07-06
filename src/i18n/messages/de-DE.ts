import { Messages } from "../../lib/locale";

export const German: Messages = {
  name: "Deutsch",
  helpTitle: "Spielanleitung",
  help1: `Jeden Tag gibt es ein neues geheimes Land. Dein Ziel ist es, dieses Land
  in so wenig Versuchen wie möglich zu erraten. Jeder falsche Versuch wir die auf
  dem Globus mit einer Farbe angezeigt, die die Nähe zum gesuchten Land verdeutlicht.
  Je <b>wärmer</b> die Farbe, desto näher bist du an der richtigen Lösung.`,
  help2: `Als Beispiel, wenn <b>Japan</b> das gesuchte Land ist, dann würden die folgenden
  Länder mit diesen Farben angezeigt werden:`,
  help3: `Es gibt jeden Tag ein neues geheimes Land!`,
  France: "Frankreich",
  Nepal: "Nepal",
  Mongolia: "Mongolei",
  "South Korea": "Süd Korea",
  Aux1: `<b>["Klick auf", "Drücke"]</b> den Globus zum Spielen!`,
  Aux2: "Hast du eine Frage?",
  Aux3: "Schau dir das FAQ an",
  Footer1: "von The Abe Train",
  Footer2: "Gefällt dir das Spiel?",
  Footer3: "Kauf mir einen Kaffee",
  Loading: "Laden...",
  FAQTitle: "FAQ",
  q1: "1. Wie wird die Distanz zwischen der richtigen Lösung und meinem Versuch berechnet?",
  a1: "Distanz zwischen Ländern ist der minimale Abstand zwischen ihren Grenzen.",
  q2: "2. Wie kann ich das Spiel spielen, wenn ich farbenblind oder anders visuell eingeschränkt bin?",
  a2: "Ein kontrastreicher Farbenfehlsichtigkeitsmodus kann in den <button>Einstellungen</button> aktiviert werden.",
  q3: "3. Wie entscheidet das Spiel was ein Land ist?",
  a3: "Globle nutzt dieses <a>Framework</a> um zu entscheiden, was ein gültiger Versuch ist.",
  q4: "4. Sind unsouveräne aber eigenständige Länder mit im Spiel?",
  a4: "Manche Gebiete erscheinen in einer neutralen Farbe wenn ihre souveränen Länder geraten wurden, z.B. Grönland bei Dänemark. Der Ort dieser Gebiete beeinflusst nicht die Farbe des souveränen Landes. Die meisten kleinen Gebiete tauchen nicht im Spiel auf, wie z.B. Curaçao.",
  q5: "5. Ich habe das heutige geheime Land gefunden! Wann kann ich wieder spielen?",
  a5: "Das geheime Land und deine Versuche setzen sich um Mitternacht in deiner Zeitzone zurück.",
  q6: "6. Werden alternative Schreibweisen akzeptiert?",
  a6: "Viele Länder haben unterschiedliche Namen. Manche alternative und ehemalige Namen werden akzeptiert, z.B. Burma für Myanmar. Zu dem werden Abkürzungen für einige Länder akzeptiert, z.B. UAE für United Arab Emirates.",
  q7: "7. Ein Land fehlt oder ist fehlerhaft. Was kann ich tun?",
  a7: "Geographie kann ein schwieriges Thema sein, einige Ländergrenzen sind umstritten. Wenn du glaubst, dass eine Änderung notwendig ist, dann öffne bitte höflich ein Issue auf {GitHub} oder schreib mir eine DM auf {Twitter}.",
  GameTitle: "Spiel",
  Game1: "Gib dein Land hier ein",
  Game2: "Eingeben",
  Game3: "Gib hier den Namen des Landes ein um zu beginnen.",
  Game4: `Zieh, <span>["klick auf", "drücke"]</span>, und zoom in den Globus um dir beim nächsten Versuch zu helfen.`,
  Game5: "Ungültiger Versuch",
  Game6: "Das Land wurde schon versucht",
  Game7: "Das geheime Land ist {answer}!",
  Game8: "Nächste Grenze",
  StatsTitle: "Statistiken",
  Stats1: "Letzter Sieg",
  Stats2: "Heutige Versuche",
  Stats3: "Gewonnene Spiele",
  Stats4: "Erfolgsserie",
  Stats5: "Längste Erfolgsserie",
  Stats6: "Durchschnittliche Versuche",
  Stats7: "Ø. Versuche",
  Stats8: "Zurücksetzen",
  Stats9: "Teilen",
  Stats10: "Bist du dir sicher, dass du deine Statistiken löschen möchtest?",
  Stats11: "Statistiken gelöscht.",
  Stats12: "In die Zwischenablage kopiert!",
  SettingsTitle: "Einstellungen",
  Settings1: "Tag Theme",
  Settings2: "Nacht Theme",
  Settings3: "Farbenfehlsichtigkeitsmodus On",
  Settings4: "Farbenfehlsichtigkeitsmodus Off",
  Settings5: "Länder",
  Settings6: "Städte",
  Settings7: "Sprache",
  Settings8: "Globle: Städte Edition kommt bald!",
  Settings9: "Üben",
  Settings10: "Regenbogen aktiviert",
  Settings11: "Regenbogen deaktiviert",
  Answer: "Answer", //TODO: Translate
  Closest: "Closest", //TODO: Translate
  Guessed: "Guessed", //TODO: Translate
  PracticeMode: "You are in practice mode.", //TODO: Translate
  PracticeExit: "Exit practice mode", //TODO: Translate
  PracticeNew: "New practice game", //TODO: Translate
  SortByGuesses: "Sort by order of guesses", //TODO: Translate
  SortByDistance: "Sort by distance", //TODO: Translate
};
