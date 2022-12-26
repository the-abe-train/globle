import { Messages } from "../../lib/locale";

export const French: Messages = {
  name: "Français",
  helpTitle: "Comment jouer",
  help1: `Chaque jour, il y a un nouveau pays mystère. Votre but est de deviner 
  le pays mystère avec le moins d'essais possible. Chaque tentative apparaîtra sur 
  le globe avec une couleur indiquant la distance avec le pays mystère. Plus la couleur 
  est <b>chaude</b>, plus vous êtes proche de la réponse.`,
  help2: `Par exemple, si le pays mystère est <b>Japon</b>, les pays suivant apparaitront 
  avec ces couleurs:`,
  help3: `Un nouveau pays mystère sera disponible chaque jour!`,
  France: "France",
  Nepal: "Népal",
  Mongolia: "Mongolie",
  "South Korea": "Corée du Sud",
  Aux1: `<b>["Cliquez sur", "Touchez"]</b> le globe pour jouer!`,
  Aux2: "Vous avez une question?",
  Aux3: "Consultez la FAQ",
  Aux4: "Globle: Capitals", // TODO: Translate this
  Aux5: "is now Available.", // TODO: Translate this
  Aux6: "Click here to play!", // TODO: Translate this
  Footer1: "Auteur: The Abe Train",
  Footer2: "Le jeu vous plaît?",
  Footer3: "Payez-moi un café.",
  Loading: "Chargement...",
  FAQTitle: "FAQ",
  q1: "1. De quelle manière est calculée la distance entre ma tentative et la réponse?",
  a1: "La distance entre les pays est définie comme étant la distance minimale entre leurs frontières.",
  q2: "2. Comment puis-je jouer si je suis daltonien ou malvoyant?",
  a2: "La section <button>Paramètres</button> contient un mode de jeu à contraste élevé.",
  q3: "3. Qu'est-ce qui détermine la validité d'un pays dans le jeu?",
  a3: "Globle s'appuie sur cette <a>convention</a> afin de déterminer ce qui constitue une tentative valide.",
  q4: "4. Y a-t-il des pays autonomes mais non souverains dans le jeu?",
  a4: "Certains territoires apparaitront avec une couleur neutre lorsque leur pays souverain est deviné, par exemple le Groenland pour le Danemark. L'emplacement de ces territoires n'affecte pas la couleur attribuée au pays souverain. La plupart des petits territoires n'apparaissent pas dans le jeu, par exemple Curaçao.",
  q5: "5. J'ai trouvé le pays mystère d'aujourd'hui! Quand vais-je pouvoir rejouer?",
  a5: "Le pays mystère change et vos tentatives sont réinitialisées à minuit dans votre fuseau horaire.",
  q6: "6. Est-ce que les noms alternatifs de pays sont acceptés?",
  a6: "Il y a beaucoup de pays avec plusieurs noms acceptables. Certains noms alternatifs ou anciens sont acceptés, par exemple la Birmanie pour le Myanmar. Aussi, les acronymes sont acceptés pour les pays avec des noms composés de plusieurs mots, par exemple EAU pour les Émirats arabes unis.",
  q7: "7. Un pays est manquant ou une frontière est incorrecte. Que puis-je faire?",
  a7: "La géographie peut être un sujet sensible, et certaines frontières sont contestées. Si vous pensez qu'une correction s'impose, s'il vous plait veuillez m'en informer en ouvrant un billet (\"issue\") sur {GitHub} ou en m'envoyant un message privé sur {Twitter}.",
  GameTitle: "Jeu",
  Game1: "Entrez le nom d'un pays ici.",
  Game2: "Entrer",
  Game3:
    "Entrez le nom de n'importe quel pays pour faire votre première tentative.",
  Game4: `Vous pouvez faire glisser le globe, <span>["cliquer", "appuyer"]</span> dessus ou effectuer un zoom pour vous aider à trouver votre prochaine tentative.`,
  Game5: "Tentative invalide",
  Game6: "Pays déjà tenté",
  Game7: "Le pays mystère est: {answer}!",
  Game8: "Frontière la plus proche",
  StatsTitle: "Statistiques",
  Stats1: "Dernière victoire",
  Stats2: "Tentatives d'aujourd'hui",
  Stats3: "Parties gagnées",
  Stats4: "Série actuelle",
  Stats5: "Série max",
  Stats6: "Moyenne de tentatives",
  Stats7: "Moy. tentatives",
  Stats8: "Réinitialiser",
  Stats9: "Partager",
  Stats10: "Voulez-vous vraiment réinitialiser vos statistiques?",
  Stats11: "Statistiques réinitialisées.",
  Stats12: "Copié dans le presse-papier!",
  SettingsTitle: "Paramètres",
  Settings1: "Thème diurne",
  Settings2: "Thème nocturne",
  Settings3: "Mode contraste élevé activé",
  Settings4: "Mode contraste élevé désactivé",
  Settings5: "Pays",
  Settings6: "Villes",
  Settings7: "Langue",
  Settings8: "Globle: Édition Ville arrive bientôt!",
  Settings9: "S'entraîner",
  Settings10: "Mode arc-en-ciel activé",
  Settings11: "Mode arc-en-ciel désactivé",
  Answer: "Réponse",
  Closest: "Selon la distance",
  Guessed: "Selon les tentatives",
  PracticeMode: "Vous êtes dans le mode entraînement.",
  PracticeExit: "Quitter le mode entraînement",
  PracticeNew: "Nouvelle partie d'entraînement",
  SortByGuesses: "Trier par ordre des tentatives",
  SortByDistance: "Trier par distance",
  Copied: "Copied!", // TODO: Translate this
  Shared: "Shared!", // TODO: Translate this
  ShareErr: "This browser cannot share", // TODO: Translate this
  ShamelessPlug: "New game from the creator of Globle!", // TODO: Translate this
  Yes: "Yes", // TODO: Translate this
  No: "No", // TODO: Translate this
};
