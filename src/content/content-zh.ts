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
    title: "整理 PDF",
    description: "轻松重新排列 PDF 文档中的页面，以符合您的首选顺序或顺序。",
    color: "#6c5ce7",
    type: ".pdf",
    to: "/organize-pdf",
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "organize-pdf": ["您的页面已成功组织！"],
  },
  btnText: {
    "organize-pdf": ["下载修改后的PDF", "下载修改后的文件"],
  },
  backto: {
    "organize-pdf": "返回组织PDF",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    organize_pdf: "整理 PDF 选项",
  },
  loader_text: "请稍候...",
  add_more_button: "添加更多文件",
  action_buttons: {
    organize_pdf: "整理 PDF",
  },
  pages: "页",
  page: "页",
};

export const tools: _tools = {
  select: "选择",
  or_drop: "或将文件拖放到此处",
  files: "文件",
  drop_files: "在此处拖放文件",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "文件为空，请选择一个有效的文件。",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "文件太大。请选择一个更小的文件，或使用我们的压缩PDF工具来减小文件大小。",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "文件不是受支持的类型。",
    types: {
      PDF: "请选择一个有效的PDF文件。",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  MAX_FILES_EXCEEDED: {
    message: "您已超出允许的最大文件数。请删除一些文件并重试。",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "未选择任何文件。请选择至少一个文件。",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "发生未知错误。请稍后重试或联系支持人员。",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "网络错误，请检查您的互联网连接并重试。",
    code: "ERR_NETWORK",
  },
};
