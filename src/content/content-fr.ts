import type {
  tool as _tool,
  web2pdftool as _web2pdftool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../../content";

export const tool: _tool = {
  Organize_PDF: {
    title: "Organiser PDF",
    seoTitle: "Réorganiser les Pages en Ligne - Outil d'Organisateur PDF",
    description: "Réorganisez facilement les pages de votre document PDF selon l'ordre ou la séquence de votre choix.",
    color: "#6c5ce7",
    type: ".pdf",
    to: "/organize-pdf",
    keywords: "réorganiser les pages PDF, organisateur PDF, organiser PDF en ligne, réorganiser les pages PDF, arrangeur de pages PDF en ligne",
    features: [
      {
        title: "Glisser-Déposer Simple",
        description: "Réorganisez facilement les pages en utilisant une interface simple de glisser-déposer."
      },
      {
        title: "Aperçu Avant Enregistrement",
        description: "Prévisualisez vos modifications avant de finaliser le nouvel ordre des pages."
      },
      {
        title: "Sécurisé et Privé",
        description: "Assurez la confidentialité et la sécurité de votre document lors de la réorganisation des pages."
      }
    ]
  },
};


export const tools: _tools = {
  select: "Sélectionner",
  or_drop: "ou déposer des fichiers ici",
  files: "fichiers",
  drop_files: "Déposez les fichiers ici",
};

export const downloadFile: _downloadFile = {
  titles: {
    "organize-pdf": ["Vos pages ont été organisées avec succès!"],
  },
  btnText: {
    "organize-pdf": [
      "Télécharger le PDF modifié",
      "Télécharger les fichiers modifiés",
    ],
  },
  backto: {
    "organize-pdf": "Retour à Organiser le PDF",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    organize_pdf: "Options pour organiser les PDF",
  },
  loader_text: "Veuillez patienter...",
  add_more_button: "Ajouter plus de fichiers",
  action_buttons: {
    organize_pdf: "Organiser le PDF",
  },
  pages: "pages",
  page: "page",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "conditions",
  conditions: "conditions d'utilisation",
  privacy_policy: "politique de confidentialité",
};


export const errors: _errors = {
  EMPTY_FILE: {
    message: "Le fichier est vide. Veuillez choisir un fichier valide.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "Le fichier est trop volumineux. Veuillez choisir un fichier plus petit ou utiliser notre outil de compression PDF pour réduire la taille du fichier.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "Le fichier n'est pas d'un type pris en charge.",
    types: {
      PDF: "Veuillez choisir un fichier PDF valide.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Vous avez dépassé le nombre maximal de fichiers autorisés. Veuillez supprimer certains fichiers et réessayer.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message:
      "Aucun fichier sélectionné. Veuillez sélectionner au moins un fichier.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Une erreur inconnue s'est produite. Veuillez réessayer plus tard ou contacter le support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Une erreur de réseau s'est produite. Veuillez vérifier votre connexion Internet et réessayer.",
    code: "ERR_NETWORK",
  },
};
