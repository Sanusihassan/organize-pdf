import type { HowTo, WithContext } from "schema-dts";

export const OrganizePDFHOWTO: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Organize PDF Pages",
  description: "Step-by-step guide to organize pages in a PDF file.",
  step: [
    {
      "@type": "HowToStep",
      name: "Step 1: Upload PDF File",
      text: "Upload the PDF file you want to organize.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Click on 'Select PDF files' button.",
        },
        {
          "@type": "HowToDirection",
          text: "Select the PDF file from your device.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Step 2: View and Arrange Pages",
      text: "View and arrange pages as desired.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Drag pages to rearrange their order.",
        },
        {
          "@type": "HowToDirection",
          text: "Drop them in the desired sequence.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Step 3: Finalize Organization",
      text: "Finalize the organization of PDF pages.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Review the page sequence.",
        },
        {
          "@type": "HowToDirection",
          text: "Make any further adjustments if needed.",
        },
        {
          "@type": "HowToDirection",
          text: "Ensure the desired order is set.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Step 4: Save Organized PDF",
      text: "Download the organized PDF file.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Click 'Organized PDF'.",
        },
        {
          "@type": "HowToDirection",
          text: "Wait for the process to finish.",
        },
        {
          "@type": "HowToDirection",
          text: "Click 'Download' to get the modified PDF.",
        },
      ],
    },
  ],
};
// Arabic (ar)
export const OrganizePDFHOWTO_ar: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "كيفية تنظيم صفحات PDF",
  description: "دليل خطوة بخطوة لتنظيم الصفحات في ملف PDF.",
  step: [
    {
      "@type": "HowToStep",
      name: "الخطوة 1: رفع ملف PDF",
      text: "رفع ملف PDF الذي تريد تنظيمه.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "انقر على زر 'اختر ملفات PDF'.",
        },
        {
          "@type": "HowToDirection",
          text: "اختر ملف PDF من جهازك.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "الخطوة 2: عرض وترتيب الصفحات",
      text: "عرض وترتيب الصفحات كما تريد.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "اسحب الصفحات لإعادة ترتيب ترتيبها.",
        },
        {
          "@type": "HowToDirection",
          text: "أسقطها في التسلسل المرغوب.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "الخطوة 3: إنهاء التنظيم",
      text: "إنهاء تنظيم صفحات PDF.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "مراجعة تسلسل الصفحات.",
        },
        {
          "@type": "HowToDirection",
          text: "قم بأي تعديلات إضافية إذا لزم الأمر.",
        },
        {
          "@type": "HowToDirection",
          text: "تأكد من تعيين الترتيب المرغوب.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "الخطوة 4: حفظ PDF المنظم",
      text: "تنزيل ملف PDF المنظم.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "انقر على 'PDF المنظم'.",
        },
        {
          "@type": "HowToDirection",
          text: "انتظر حتى ينتهي العملية.",
        },
        {
          "@type": "HowToDirection",
          text: "انقر على 'تنزيل' للحصول على PDF المعدل.",
        },
      ],
    },
  ],
};

// Spanish (es)
export const OrganizePDFHOWTO_es: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo organizar páginas PDF",
  description: "Guía paso a paso para organizar páginas en un archivo PDF.",
  step: [
    {
      "@type": "HowToStep",
      name: "Paso 1: Subir archivo PDF",
      text: "Sube el archivo PDF que quieres organizar.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Haz clic en el botón 'Seleccionar archivos PDF'.",
        },
        {
          "@type": "HowToDirection",
          text: "Selecciona el archivo PDF de tu dispositivo.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Paso 2: Ver y arreglar páginas",
      text: "Ver y arreglar páginas como desees.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Arrastra las páginas para reorganizar su orden.",
        },
        {
          "@type": "HowToDirection",
          text: "Suéltalas en la secuencia deseada.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Paso 3: Finalizar organización",
      text: "Finalizar la organización de páginas PDF.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Revisa la secuencia de páginas.",
        },
        {
          "@type": "HowToDirection",
          text: "Haz cualquier ajuste adicional si es necesario.",
        },
        {
          "@type": "HowToDirection",
          text: "Asegúrate de que el orden deseado esté establecido.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Paso 4: Guardar PDF organizado",
      text: "Descarga el archivo PDF organizado.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Haz clic en 'PDF organizado'.",
        },
        {
          "@type": "HowToDirection",
          text: "Espera a que termine el proceso.",
        },
        {
          "@type": "HowToDirection",
          text: "Haz clic en 'Descargar' para obtener el PDF modificado.",
        },
      ],
    },
  ],
};

// French (fr)
export const OrganizePDFHOWTO_fr: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment organiser les pages PDF",
  description: "Guide étape par étape pour organiser les pages dans un fichier PDF.",
  step: [
    {
      "@type": "HowToStep",
      name: "Étape 1 : Télécharger le fichier PDF",
      text: "Téléchargez le fichier PDF que vous souhaitez organiser.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Cliquez sur le bouton 'Sélectionner des fichiers PDF'.",
        },
        {
          "@type": "HowToDirection",
          text: "Sélectionnez le fichier PDF depuis votre appareil.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Étape 2 : Afficher et arranger les pages",
      text: "Affichez et arrangez les pages comme désiré.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Faites glisser les pages pour réorganiser leur ordre.",
        },
        {
          "@type": "HowToDirection",
          text: "Déposez-les dans la séquence souhaitée.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Étape 3 : Finaliser l'organisation",
      text: "Finalisez l'organisation des pages PDF.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Vérifiez la séquence des pages.",
        },
        {
          "@type": "HowToDirection",
          text: "Effectuez tout ajustement supplémentaire si nécessaire.",
        },
        {
          "@type": "HowToDirection",
          text: "Assurez-vous que l'ordre souhaité est défini.",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "Étape 4 : Enregistrer le PDF organisé",
      text: "Téléchargez le fichier PDF organisé.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Cliquez sur 'PDF organisé'.",
        },
        {
          "@type": "HowToDirection",
          text: "Attendez que le processus se termine.",
        },
        {
          "@type": "HowToDirection",
          text: "Cliquez sur 'Télécharger' pour obtenir le PDF modifié.",
        },
      ],
    },
  ],
};

// Hindi (hi)
export const OrganizePDFHOWTO_hi: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "PDF पेजों को कैसे व्यवस्थित करें",
  description: "PDF फ़ाइल में पेजों को व्यवस्थित करने के लिए चरण-दर-चरण गाइड।",
  step: [
    {
      "@type": "HowToStep",
      name: "चरण 1: PDF फ़ाइल अपलोड करें",
      text: "उस PDF फ़ाइल को अपलोड करें जिसे आप व्यवस्थित करना चाहते हैं।",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "'PDF फाइलें चुनें' बटन पर क्लिक करें।",
        },
        {
          "@type": "HowToDirection",
          text: "अपने डिवाइस से PDF फ़ाइल चुनें।",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "चरण 2: पेजों को देखें और व्यवस्थित करें",
      text: "पेजों को देखें और इच्छानुसार व्यवस्थित करें।",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "पेजों को ड्रैग करके उनके क्रम को पुनर्व्यवस्थित करें।",
        },
        {
          "@type": "HowToDirection",
          text: "उन्हें वांछित अनुक्रम में छोड़ें।",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "चरण 3: व्यवस्था को अंतिम रूप दें",
      text: "PDF पेजों की व्यवस्था को अंतिम रूप दें।",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "पेज अनुक्रम की समीक्षा करें।",
        },
        {
          "@type": "HowToDirection",
          text: "यदि आवश्यक हो तो कोई और समायोजन करें।",
        },
        {
          "@type": "HowToDirection",
          text: "सुनिश्चित करें कि वांछित क्रम सेट है।",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "चरण 4: व्यवस्थित PDF सहेजें",
      text: "व्यवस्थित PDF फ़ाइल डाउनलोड करें।",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "'व्यवस्थित PDF' पर क्लिक करें।",
        },
        {
          "@type": "HowToDirection",
          text: "प्रक्रिया समाप्त होने का इंतजार करें।",
        },
        {
          "@type": "HowToDirection",
          text: "संशोधित PDF प्राप्त करने के लिए 'डाउनलोड' पर क्लिक करें।",
        },
      ],
    },
  ],
};

// Chinese (zh)
export const OrganizePDFHOWTO_zh: WithContext<HowTo> = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "如何组织 PDF 页面",
  description: "组织 PDF 文件中页面的逐步指南。",
  step: [
    {
      "@type": "HowToStep",
      name: "步骤 1: 上传 PDF 文件",
      text: "上传您想要组织的 PDF 文件。",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "点击 '选择 PDF 文件' 按钮。",
        },
        {
          "@type": "HowToDirection",
          text: "从您的设备选择 PDF 文件。",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "步骤 2: 查看并排列页面",
      text: "查看并按需排列页面。",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "拖动页面以重新排列顺序。",
        },
        {
          "@type": "HowToDirection",
          text: "将它们放置在所需的序列中。",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "步骤 3: 最终确定组织",
      text: "最终确定 PDF 页面的组织。",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "审查页面序列。",
        },
        {
          "@type": "HowToDirection",
          text: "如果需要，进行任何进一步调整。",
        },
        {
          "@type": "HowToDirection",
          text: "确保所需的顺序已设置。",
        },
      ],
    },
    {
      "@type": "HowToStep",
      name: "步骤 4: 保存组织的 PDF",
      text: "下载组织的 PDF 文件。",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "点击 '组织的 PDF'。",
        },
        {
          "@type": "HowToDirection",
          text: "等待过程完成。",
        },
        {
          "@type": "HowToDirection",
          text: "点击 '下载' 获取修改后的 PDF。",
        },
      ],
    },
  ],
};