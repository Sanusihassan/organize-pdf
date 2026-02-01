import type { edit_page as _edit_page, tool as _tool, tools as _tools, downloadFile as _downloadFile, errors as _errors } from "../content";
import type { adBlockerContentType } from "./content";

export const tool: _tool = {
  Rotate_PDF: {
    title: "Rotar PDF",
    seoTitle: "Rotar Páginas PDF en Línea - Fácil Rotación de PDF",
    description: "Gira fácilmente las páginas de tus documentos PDF para lograr la orientación óptima.",
    keywords: "rotar PDF, rotación de páginas PDF, rotar PDF en línea, ajustar orientación de PDF, rotar páginas en PDF",
    color: "#10ac84",
    type: ".pdf",
    to: "/rotate-pdf",
    features: [
      {
        title: "Rotación de Páginas Simple",
        description: "Gira fácilmente las páginas de PDF a la orientación deseada con solo unos pocos clics."
      },
      {
        title: "Rotación en Lote",
        description: "Gira múltiples páginas a la vez para ajustes eficientes de documentos."
      },
      {
        title: "Seguro y Privado",
        description: "Tus archivos se procesan de manera segura y se eliminan poco después de la procesamiento."
      }
    ]
  }
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    rotate_pdf: "Opciones para Rotar PDF"
  },
  loader_text: "Por favor, espera...",
  add_more_button: "Agregar más archivos",
  action_buttons: {
    rotate_pdf: "Rotar PDF"
  },
  pages: "páginas",
  page: "página",
  rotate_pdf_options: {
    info1: "Pase el cursor sobre el archivo PDF para revelar un",
    info2: "ícono. Haga clic en el ícono para rotar sus PDF. Alternativamente, puede usar los botones a continuación para rotar el archivo PDF hacia la izquierda o hacia la derecha",
    left: "Izquierda",
    right: "Derecha",
    rotation: "Rotación",
    reset_all: "Restablecer Todo"
  },
  filenameOptions: {
    label: "Nombre del archivo de salida (opcional)",
    placeholder: "Ingrese el nombre del archivo",
    helperText: "Este será el nombre del PDF comprimido al descargarlo.",
    cta: "Ver planes",
    upgradeNotice: {
      msg: "Los niveles del 2.0 al 10.0 están disponibles con la versión premium.",
      cta: "Actualizar ahora",
    },
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "rotate-pdf": [
      "¡Los archivos PDF han sido rotados!",
      "¡El archivo PDF ha sido rotado!"
    ]
  },
  btnText: {
    "rotate-pdf": [
      "Descargar archivos PDF rotados",
      "Descargar archivo PDF rotado"
    ]
  },
  backto: {
    "rotate-pdf": "Volver a Rotar PDF"
  }
};

export const tools: _tools = {
  select: "Seleccionar",
  or_drop: "o suelta archivos aquí",
  files: "archivos",
  drop_files: "Arrastra archivos aquí",
};



// Spanish (es) – copy into errors.es.ts
export const errors: _errors = {
  EMPTY_FILE: {
    message: "El archivo está vacío. Por favor elige un archivo válido.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "El archivo es demasiado grande. Elige un archivo más pequeño o usa nuestra herramienta compress-pdf para reducir el tamaño.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "El tipo de archivo no es compatible.",
    types: {
      PDF: "Por favor elige un archivo PDF válido.",
      DOC: "Por favor elige un documento Word válido.",
      DOCX: "Por favor elige un documento Word válido.",
      XLS: "Por favor elige una hoja de cálculo Excel válida.",
      XLSX: "Por favor elige una hoja de cálculo Excel válida.",
      PPT: "Por favor elige una presentación PowerPoint válida.",
      PPTX: "Por favor elige una presentación PowerPoint válida.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "El archivo está corrupto y no se puede procesar. Elige un archivo válido.",
    code: "ERR_FILE_CORRUPT",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Has excedido el número máximo de archivos permitidos. Elimina algunos archivos e inténtalo de nuevo.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No se seleccionaron archivos. Selecciona al menos uno.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Ocurrió un error desconocido. Inténtalo de nuevo más tarde o contacta con soporte.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Ocurrió un error de red. Verifica tu conexión a internet e inténtalo de nuevo.",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "Por favor sube al menos dos archivos para combinarlos.",
    code: "ERR_UPLOAD_COUNT",
  },
  PASSWORD_REQUIRED: {
    message: "El PDF requiere contraseña.",
    code: "PASSWORD_REQUIRED",
  },
  INCORRECT_PASSWORD: {
    message: "La contraseña ingresada es incorrecta.",
    code: "INCORRECT_PASSWORD",
  },
  MAX_DAILY_USAGE: {
    message:
      "Has alcanzado tu límite diario de uso. Actualiza tu plan para continuar sin interrupciones.",
    code: "MAX_DAILY_USAGE",
  },
  MAX_PAGES_EXCEEDED: {
    message: "El PDF supera el límite máximo de 50 páginas.",
    code: "ERR_MAX_PAGES_EXCEEDED",
  },
  alerts: {
    // Frontend validation
    maxFiles: "Máximo 15 archivos. ¡Suscríbete para más!",
    singleFileSize: "El tamaño del archivo debe ser inferior a 100 MB. ¡Actualiza para subir archivos más grandes!",
    perFilePages: "500 páginas por archivo. ¡Desbloquea más ahora!",
    fileSize: "50 MB por archivo. ¡Actualiza para más!",
    serverError: "Error del servidor. Por favor, inténtalo de nuevo más tarde.",
    // Backend file validation
    fileNotUploaded: "No se subió ningún archivo. Por favor, selecciona un archivo.",
    fileEmpty: "El archivo subido está vacío. Por favor, selecciona un archivo válido.",
    fileTooLarge: "El archivo excede el límite de 200 MB. ¡Actualiza para archivos más grandes!",
    invalidFileType: "Tipo de archivo inválido. Por favor, sube un formato compatible.",
    fileCorrupt: "El archivo parece estar corrupto. Por favor, intenta con otro archivo.",
    insufficientUnits: "Unidades de conversión insuficientes. ¡Actualiza o recarga!",
    // Auth errors
    authRequired: "Por favor, inicia sesión para usar funciones premium.",
    sessionExpired: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
    invalidToken: "Autenticación fallida. Por favor, inicia sesión de nuevo.",
    userNotFound: "Cuenta no encontrada. Por favor, inicia sesión de nuevo.",
    authError: "Error de autenticación. Por favor, inténtalo de nuevo.",
    notPasswordProtected: "Uno o más archivos no están protegidos con contraseña",
    // Spanish (es)
    tooManyFiles: "Demasiados archivos subidos",

    // PDF-specific errors
    invalidPdf: "Archivo PDF inválido o corrupto.",
    pdfNotEncrypted: "Este PDF no está protegido con contraseña y no necesita ser desbloqueado.",

    // Lock-PDF errors
    noLockPassword: "Por favor, proporciona una contraseña para bloquear el PDF.",
    lockingFailed: "Fallo al bloquear PDF. Por favor, inténtalo de nuevo.",

    // Unlock-PDF errors
    noPasswordsProvided: "Por favor, proporciona contraseñas para los PDFs bloqueados.",
    unlockingFailed: "Fallo al desbloquear PDF. Por favor, verifica tu contraseña e inténtalo de nuevo.",
    incorrectPassword: "Contraseña incorrecta. Por favor, inténtalo de nuevo.",
    passwordRequired: "Este PDF está protegido con contraseña. Por favor, ingresa la contraseña.",

    // Settings errors
    invalidSettings: "Configuraciones inválidas proporcionadas. Por favor, actualiza e inténtalo de nuevo.",
    conversionFailed: "Conversión fallida. Por favor, inténtalo de nuevo.",
  },
};

export const adBlockerContent: adBlockerContentType = {
  title: "Bloqueador de anuncios detectado",
  description: "Notamos que usas un bloqueador de anuncios. Desactívalo o actualiza a premium para una experiencia sin anuncios.",
  reloadPage: "Recargar página",
  upgradeToPremium: "Actualizar a Premium"
};