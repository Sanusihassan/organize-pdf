import type {
  tool as _tool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../../content";

export const tool: _tool = {
  Organize_PDF: {
    title: "تنظيم PDF",
    seoTitle: "إعادة ترتيب الصفحات عبر الإنترنت - أداة تنظيم PDF",
    description: "إعادة ترتيب صفحات مستند PDF بسهولة لتناسب ترتيبك أو تسلسلك المفضل.",
    color: "#6c5ce7",
    type: ".pdf",
    to: "/organize-pdf",
    keywords: "إعادة ترتيب صفحات PDF, منظم PDF, تنظيم PDF عبر الإنترنت, إعادة ترتيب صفحات PDF, مُرتب صفحات PDF عبر الإنترنت",
    features: [
      {
        title: "سحب وإفلات بسيط",
        description: "إعادة ترتيب الصفحات بسهولة باستخدام واجهة سحب وإفلات بسيطة."
      },
      {
        title: "معاينة قبل الحفظ",
        description: "معاينة تغييراتك قبل إتمام الترتيب الجديد للصفحات."
      },
      {
        title: "آمن وخاص",
        description: "ضمان خصوصية وأمان المستند أثناء إعادة ترتيب الصفحات."
      }
    ]
  },
};


export const tools: _tools = {
  select: "اختر",
  or_drop: "أو قم بإسقاط الملفات هنا",
  files: "ملفات",
  drop_files: "قم بوضع الملفات هنا",
};

export const downloadFile: _downloadFile = {
  titles: {
    "organize-pdf": ["تم تنظيم صفحاتك بنجاح!"],
  },
  btnText: {
    "organize-pdf": ["تحميل ملف PDF المعدّل", "تحميل الملفات المعدّلة"],
  },
  backto: {
    "organize-pdf": "العودة إلى تنظيم PDF",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    organize_pdf: "خيارات تنظيم ملفات PDF",
  },
  loader_text: "يرجى الانتظار...",
  add_more_button: "إضافة المزيد من الملفات",
  action_buttons: {
    organize_pdf: "تنظيم ملف PDF",
  },
  pages: "صفحات",
  page: "صفحة",
};


export const footer: _footer = {
  brand: "PDFEquips",
  terms: "الشروط",
  conditions: "والأحكام",
  privacy_policy: "سياسة الخصوصية",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "الملف فارغ. يرجى اختيار ملف صالح.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "حجم الملف كبير جدًا. يرجى اختيار ملف أصغر، أو استخدام أداة ضغط PDF الخاصة بنا لتقليل حجم الملف.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "الملف غير مدعوم.",
    types: {
      PDF: "يرجى اختيار ملف PDF صالح.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "لقد تجاوزت الحد الأقصى لعدد الملفات المسموح به. يرجى حذف بعض الملفات والمحاولة مرة أخرى.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "لم يتم اختيار أي ملفات. يرجى اختيار ملف واحد على الأقل.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "حدث خطأ غير معروف. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    code: "ERR_NETWORK",
  },
};
