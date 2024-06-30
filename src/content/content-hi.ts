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
    title: "पीडीएफ़ व्यवस्थित करें",
    seoTitle: "ऑनलाइन पृष्ठ पुनः व्यवस्थित करें - पीडीएफ़ आयोजक उपकरण",
    description: "अपने पीडीएफ़ दस्तावेज़ के पृष्ठों को आसानी से अपने पसंदीदा क्रम या अनुक्रम में पुनः व्यवस्थित करें।",
    color: "#6c5ce7",
    type: ".pdf",
    to: "/organize-pdf",
    keywords: "पीडीएफ़ पृष्ठ पुनः व्यवस्थित करें, पीडीएफ़ आयोजक, ऑनलाइन पीडीएफ़ व्यवस्थित करें, पीडीएफ़ पृष्ठों को पुनः व्यवस्थित करें, ऑनलाइन पीडीएफ़ पृष्ठ आयोजक",
    features: [
      {
        title: "सरल खींचें और छोड़ें",
        description: "सरल खींचें और छोड़ें इंटरफ़ेस का उपयोग करके पृष्ठों को आसानी से पुनः व्यवस्थित करें।"
      },
      {
        title: "सहेजने से पहले पूर्वावलोकन",
        description: "नए पृष्ठ क्रम को अंतिम रूप देने से पहले अपने परिवर्तनों का पूर्वावलोकन करें।"
      },
      {
        title: "सुरक्षित और निजी",
        description: "पृष्ठों को पुनः व्यवस्थित करते समय अपने दस्तावेज़ की गोपनीयता और सुरक्षा सुनिश्चित करें।"
      }
    ]
  },
};


export const downloadFile: _downloadFile = {
  titles: {
    "organize-pdf": ["आपके पेज सफलतापूर्वक संगठित किए गए हैं!"],
  },
  btnText: {
    "organize-pdf": [
      "संशोधित PDF डाउनलोड करें",
      "संशोधित फ़ाइलें डाउनलोड करें",
    ],
  },
  backto: {
    "organize-pdf": "PDF संगठन पर वापस जाएं",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    organize_pdf: "पीडीएफ संगठन विकल्प",
  },
  loader_text: "कृपया प्रतीक्षा करें...",
  add_more_button: "और फ़ाइलें जोड़ें",
  action_buttons: {
    organize_pdf: "पीडीएफ संगठित करें",
  },
  pages: "पृष्ठ",
  page: "पृष्ठ",
};
export const tools: _tools = {
  select: "चुनें",
  or_drop: "या फ़ाइलें यहां छोड़ें",
  files: "फाइलें",
  drop_files: "फ़ाइलें यहाँ खींचें",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "शर्तें",
  conditions: "उपयोग की शर्तें",
  privacy_policy: "गोपनीयता नीति",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "फ़ाइल खाली है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "फ़ाइल बहुत बड़ी है। कृपया एक छोटी फ़ाइल चुनें या हमारा कंप्रेस-पीडीएफ़ उपकरण उपयोग करके फ़ाइल का आकार कम करें।",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "फ़ाइल एक समर्थित प्रकार नहीं है।",
    types: {
      PDF: "कृपया एक मान्य पीडीएफ़फ़ाइल चुनें।",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "आपने अनुमति दी हुई अधिकतम फ़ाइलों की संख्या पार कर दी है। कृपया कुछ फ़ाइलें हटाएं और पुनः प्रयास करें।",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "कोई फ़ाइल चयनित नहीं की गई है। कृपया कम से कम एक फ़ाइल चुनें।",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "एक अज्ञात त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें या सहायता से संपर्क करें।",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "नेटवर्क में त्रुटि हो गई है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    code: "ERR_NETWORK",
  },
};
