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
    title: "Organizar PDF",
    seoTitle: "Reorganizar Páginas en Línea - Herramienta de Organizador de PDF",
    description: "Reorganiza fácilmente las páginas de tu documento PDF para adaptarlas a tu orden o secuencia preferida.",
    color: "#6c5ce7",
    type: ".pdf",
    to: "/organize-pdf",
    keywords: "reorganizar páginas PDF, organizador de PDF, organizar PDF en línea, reordenar páginas PDF, organizador de páginas PDF en línea",
    features: [
      {
        title: "Arrastrar y Soltar Simple",
        description: "Reorganiza fácilmente las páginas utilizando una interfaz simple de arrastrar y soltar."
      },
      {
        title: "Previsualizar Antes de Guardar",
        description: "Previsualiza tus cambios antes de finalizar el nuevo orden de las páginas."
      },
      {
        title: "Seguro y Privado",
        description: "Asegura la privacidad y seguridad de tu documento mientras reorganizas las páginas."
      }
    ]
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    organize_pdf: "Opciones para organizar PDF",
  },
  loader_text: "Por favor, espera...",
  add_more_button: "Agregar más archivos",
  action_buttons: {
    organize_pdf: "Organizar PDF",
  },
  pages: "páginas",
  page: "página",
};

export const tools: _tools = {
  select: "Seleccionar",
  or_drop: "o soltar archivos aquí",
  files: "archivos",
  drop_files: "Arrastra los archivos aquí",
};

export const downloadFile: _downloadFile = {
  titles: {
    "organize-pdf": ["Tus páginas se han organizado correctamente!"],
  },
  btnText: {
    "organize-pdf": [
      "Descargar PDF modificado",
      "Descargar archivos modificados",
    ],
  },
  backto: {
    "organize-pdf": "Volver a Organizar PDF",
  },
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "términos",
  conditions: "condiciones",
  privacy_policy: "política de privacidad",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "El archivo está vacío. Por favor, elija un archivo válido.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "El archivo es demasiado grande. Por favor, elija un archivo más pequeño o use nuestra herramienta de compresión de PDF para reducir el tamaño del archivo.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "El archivo no es un tipo compatible.",
    types: {
      PDF: "Por favor, elija un archivo PDF válido.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Ha excedido el número máximo de archivos permitidos. Por favor, elimine algunos archivos e intente nuevamente.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message:
      "No se han seleccionado archivos. Por favor, seleccione al menos un archivo.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Ha ocurrido un error desconocido. Por favor, inténtelo de nuevo más tarde o contacte al soporte.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Ha ocurrido un error en la red. Por favor, comprueba tu conexión a internet e inténtalo de nuevo.",
    code: "ERR_NETWORK",
  },
};
