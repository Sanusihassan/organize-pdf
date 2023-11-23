export const tool = {
  Remove_Page: {
    title: "Remove Page",
    description:
      "Delete unwanted pages from your PDF document and save the modified file as a new PDF.",
    color: "#d63031",
    type: ".pdf",
    to: "/remove-pages",
  },
};

/**
 * please give me another 5 versions of this tool object please don't change the schema of the object, i.e don't change the object name nor it's property keys just translate the string values to ar, es, fr, hi, zh respectivly
 * the previous time when you translated the tool object you created 5 different objects with suffexes like _ar, however i don't want that.
 * just create 5 new objects with the same name edit_page and the same keys but with different string values for each language.
 * also each object created should be of type _edit_page.
 * i.e it should be somthing like this for all of the objects:
 * export const edit_page: _edit_page = {...}
 */
export const edit_page = {
  edit_page_titles: {
    remove_pages: "Remove Pages options",
  },
  loader_text: "please wait...",
  add_more_button: "Add more files",
  action_buttons: {
    remove_pages: "Remove Pages",
  },
  pages: "pages",
  page: "page",
  // give me 5 verieties of this object with the same name i.e remove_pages_options but translate the string values to ar, es, fr, hi, zh respectively
  remove_pages_options: {
    info: "To delete pages from the document, click on them. You can also use the “shift” key to select multiple pages at once.",
    total_pages: "Total pages",
    pages_to_remove: "Pages to remove: ",
    placeholder: "example: 2,8-32"
  },
};

export const tools = {
  select: "Select",
  or_drop: "or drop files here",
  files: "files",
  drop_files: "Drag files here",
};

/**
 * now give me 5 new objects of the same type as the downloadFile with the keys but translated in ar, es, fr, hi and zh respectively
 * and don't add prefexes like downloadFile_ar or somthing just create them all with the same name downloadFile and the same keys only translate the string values for each language.
 * just create 5 new objects with the same name downloadFile and the same keys but with different string values for each language.
 * also each object created should be of type _downloadFile.
 * i.e it should be somthing like this for all of the objects:
 * export const downloadFile: _downloadFile = {...}
 * please add the : _downloadFile for all of the objects you create okay?
 */

export const downloadFile = {
  titles: {
    "remove-pages": ["Your pages have been successfully removed!"],
  },

  btnText: {
    "remove-pages": ["Download Modified PDF", "Download Modified files"],
  },

  backto: {
    "remove-pages": "Back To Remove Pages",
  },
};

export const errors = {
  EMPTY_FILE: {
    message: "The file is empty. Please choose a valid file.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "The file is too large. Please choose a smaller file, or use our compress-pdf tool to reduce the file size.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "The file is not a supported type.",
    types: {
      PDF: "Please choose a valid PDF file.",
      JPG: "Please choose a valid JPEG image file.",
      DOC: "Please choose a valid Word document file.",
      DOCX: "Please choose a valid Word document file.",
      XLS: "Please choose a valid Excel spreadsheet file.",
      XLSX: "Please choose a valid Excel spreadsheet file.",
      PPT: "Please choose a valid PowerPoint presentation file.",
      PPTX: "Please choose a valid PowerPoint presentation file.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "The file is corrupt and cannot be processed. Please choose a valid file.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "The file contains missing fontsand cannot be processed. Please ensure all fonts are embedded in the PDF file.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "The file contains invalid image data. Please ensure all images are properly formatted.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "The file contains a security risk and cannot be processed. Please choose a valid file.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "You have exceeded the maximum number of files allowed. Please delete some files and try again.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No files selected. Please select at least one file.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "An unknown error occurred. Please try again later or contact support.",
    code: "ERR_UNKNOWN",
  },
  // i want another error like this but when only one file is uploaded
  ERR_NETWORK: {
    message:
      "A network error occurred. Please check your internet connection and try again.",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "Please upload at least two files to merge.",
    code: "ERR_UPLOAD_COUNT",
  },
};
