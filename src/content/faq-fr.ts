import type { FaqContent } from "./faq";

export const faq: FaqContent = {
  title: "Questions fréquentes",
  items: {
    "/organize-pdf": [
      {
        question: "Comment changer l'ordre des pages d'un PDF ?",
        answer: "Glissez votre PDF dans la zone ci-dessus : ses pages s'affichent en miniatures. Faites-les glisser dans l'ordre voulu, puis cliquez sur « Organiser le PDF » pour télécharger le nouveau document.",
      },
      {
        question: "Faut-il installer un logiciel pour organiser un PDF ?",
        answer: "Non. Tout se fait en ligne, dans votre navigateur, gratuitement et sans inscription, sur ordinateur, tablette ou mobile.",
      },
      {
        question: "Mes fichiers sont-ils en sécurité ?",
        answer: "Oui. Vos fichiers sont transférés via une connexion chiffrée (TLS) et supprimés automatiquement de nos serveurs après le traitement.",
      },
    ],
  },
};
