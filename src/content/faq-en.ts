import type { FaqContent } from "./faq";

export const faq: FaqContent = {
  title: "Frequently Asked Questions",
  items: {
    "/organize-pdf": [
      {
        question: "How do I change the order of pages in a PDF?",
        answer: "Drag your PDF into the area above to see its pages as thumbnails. Drag them into the order you want, then click «Organize PDF» to download the new document.",
      },
      {
        question: "Do I need software to rearrange PDF pages?",
        answer: "No. Everything happens online in your browser, for free and without sign-up, on desktop, tablet or phone.",
      },
      {
        question: "Are my files safe?",
        answer: "Yes. Your files are transferred over an encrypted (TLS) connection and automatically deleted from our servers after processing.",
      },
    ],
  },
};
