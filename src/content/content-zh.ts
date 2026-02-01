import type { edit_page as _edit_page, tool as _tool, tools as _tools, downloadFile as _downloadFile, errors as _ } from "../content";
import type { adBlockerContentType } from "./content";

export const tool: _tool = {
    Rotate_PDF: {
        title: "旋转 PDF",
        seoTitle: "在线旋转 PDF 页 - 简单的 PDF 页旋转",
        description: "轻松旋转 PDF 文档中的页面，以达到最佳方向。",
        keywords: "旋转 PDF, PDF 页面旋转, 在线旋转 PDF, 调整 PDF 方向, 旋转 PDF 页",
        color: "#10ac84",
        type: ".pdf",
        to: "/rotate-pdf",
        features: [
            {
                title: "简单的页面旋转",
                description: "只需几次点击即可轻松将 PDF 页面旋转到所需方向。"
            },
            {
                title: "批量旋转",
                description: "一次旋转多个页面，实现高效的文档调整。"
            },
            {
                title: "安全且私密",
                description: "您的文件会被安全处理，并在处理后不久被删除。"
            }
        ]
    }
};

export const edit_page: _edit_page = {
    edit_page_titles: {
        rotate_pdf: "旋转PDF选项"
    },
    loader_text: "请稍候...",
    add_more_button: "添加更多文件",
    action_buttons: {
        rotate_pdf: "旋转PDF"
    },
    pages: "页",
    page: "页",
    rotate_pdf_options: {
        info1: "将鼠标悬停在 PDF 文件上以显示",
        info2: "图标。单击任何图标以旋转您的 PDFs。",
        left: "左",
        right: "右",
        rotation: "旋转",
        reset_all: "重置所有"
    },
    filenameOptions: {
        label: "输出文件名（可选）",
        placeholder: "输入文件名",
        helperText: "这将是下载时压缩 PDF 的名称。",
        cta: "查看方案",
        upgradeNotice: {
            msg: "2.0 到 10.0 的级别可在高级版中使用。",
            cta: "立即升级",
        },
    },
    actionContent: {
        current: "当前",
        info: "正 = 顺时针，负 = 逆时针",
    }
};

export const downloadFile: _downloadFile = {
    titles: {
        "rotate-pdf": [
            "PDF文件已旋转！",
            "PDF文件已旋转！"
        ]
    },
    btnText: {
        "rotate-pdf": [
            "下载旋转后的PDF文件",
            "下载旋转后的PDF文件"
        ]
    },
    backto: {
        "rotate-pdf": "返回旋转PDF"
    }
};



export const tools: _tools = {
    select: "选择",
    or_drop: "或将文件拖放到此处",
    files: "文件",
    drop_files: "将文件拖到这里",
};


export const errors: _ = {
    EMPTY_FILE: {
        message: "文件为空。请选择有效文件。",
        code: "ERR_EMPTY_FILE",
    },
    FILE_TOO_LARGE: {
        message:
            "文件太大。请选更小的文件，或使用我们的 compress-pdf 工具减小文件大小。",
        code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
    },
    NOT_SUPPORTED_TYPE: {
        message: "不支持的文件类型。",
        types: {
            PDF: "请选择有效的 PDF 文件。",
            DOC: "请选择有效的 Word 文档。",
            DOCX: "请选择有效的 Word 文档。",
            XLS: "请选择有效的 Excel 表格。",
            XLSX: "请选择有效的 Excel 表格。",
            PPT: "请选择有效的 PowerPoint 演示文稿。",
            PPTX: "请选择有效的 PowerPoint 演示文稿。",
        },
        code: "ERR_INVALID_FILE_TYPE",
    },
    FILE_CORRUPT: {
        message:
            "文件已损坏，无法处理。请选有效文件。",
        code: "ERR_FILE_CORRUPT",
    },
    MAX_FILES_EXCEEDED: {
        message:
            "已超过允许的最大文件数量。请删除部分文件后再试。",
        code: "ERR_MAX_FILES_EXCEEDED",
    },
    NO_FILES_SELECTED: {
        message: "未选择任何文件。请至少选择一个文件。",
        code: "ERR_NO_FILES_SELECTED",
    },
    UNKNOWN_ERROR: {
        message:
            "发生未知错误。请稍后再试或联系客服。",
        code: "ERR_UNKNOWN",
    },
    ERR_NETWORK: {
        message:
            "发生网络错误。请检查网络连接后再试。",
        code: "ERR_NETWORK",
    },
    ERR_UPLOAD_COUNT: {
        message: "请至少上传两个文件进行合并。",
        code: "ERR_UPLOAD_COUNT",
    },
    PASSWORD_REQUIRED: {
        message: "PDF 需要密码。",
        code: "PASSWORD_REQUIRED",
    },
    INCORRECT_PASSWORD: {
        message: "您输入的密码不正确。",
        code: "INCORRECT_PASSWORD",
    },
    MAX_DAILY_USAGE: {
        message:
            "您已达到每日使用上限。请升级套餐，继续无中断使用此功能。",
        code: "MAX_DAILY_USAGE",
    },
    MAX_PAGES_EXCEEDED: {
        message: "PDF 超过最大页数限制 50 页。",
        code: "ERR_MAX_PAGES_EXCEEDED",
    },
    alerts: {
        // Frontend validation
        maxFiles: "最多 15 个文件。订阅以获取更多！",
        singleFileSize: "文件大小必须小于 100 MB。升级以上传更大的文件！",
        perFilePages: "每个文件 500 页。现在解锁更多！",
        fileSize: "每个文件 50MB。升级以获取更多！",
        serverError: "服务器错误。请稍后重试。",
        tooManyFiles: "上传的文件太多",
        // Backend file validation
        fileNotUploaded: "未上传文件。请选择一个文件。",
        fileEmpty: "上传的文件为空。请选择一个有效文件。",
        fileTooLarge: "文件超过 200MB 限制。升级以处理更大的文件！",
        invalidFileType: "无效的文件类型。请上传支持的格式。",
        fileCorrupt: "文件似乎已损坏。请尝试另一个文件。",
        insufficientUnits: "转换单位不足。升级或充值！",
        // Auth errors
        authRequired: "请登录以使用高级功能。",
        sessionExpired: "您的会话已过期。请重新登录。",
        invalidToken: "认证失败。请重新登录。",
        userNotFound: "未找到账户。请重新登录。",
        authError: "认证错误。请重试。",
        notPasswordProtected: "一个或多个文件未受密码保护",

        // PDF-specific errors
        invalidPdf: "无效或损坏的 PDF 文件。",
        pdfNotEncrypted: "此 PDF 未受密码保护，不需要解锁。",

        // Lock-PDF errors
        noLockPassword: "请提供密码以锁定 PDF。",
        lockingFailed: "锁定 PDF 失败。请重试。",

        // Unlock-PDF errors
        noPasswordsProvided: "请为锁定的 PDF 提供密码。",
        unlockingFailed: "解锁 PDF 失败。请检查您的密码并重试。",
        incorrectPassword: "密码不正确。请重试。",
        passwordRequired: "此 PDF 受密码保护。请输入密码。",

        // Settings errors
        invalidSettings: "提供的设置无效。请刷新并重试。",
        conversionFailed: "转换失败。请重试。",
        noRotationsProvided: "请为至少一个文件指定旋转",
        rotationFailed: "旋转 PDF 失败。请重试。",
        invalidRotationAngle: "无效的旋转角度。使用 90、180 或 270 度。"
    },
};

export const adBlockerContent: adBlockerContentType = {
    title: "检测到广告拦截器",
    description: "我们注意到您正在使用广告拦截器。请考虑关闭它，或升级到高级版享受无广告体验！",
    reloadPage: "重新加载页面",
    upgradeToPremium: "升级到高级版"
};