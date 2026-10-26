import type { FaqContent } from "./faq";

export const faq: FaqContent = {
  title: "Preguntas frecuentes",
  items: {
    "/organize-pdf": [
      {
        question: "¿Cómo cambiar el orden de las páginas de un PDF?",
        answer: "Arrastra tu PDF a la zona de arriba: verás sus páginas en miniatura. Arrástralas hasta el orden que quieras y pulsa «Organizar PDF» para descargar el nuevo documento.",
      },
      {
        question: "¿Necesito instalar un programa para ordenar un PDF?",
        answer: "No. Todo se hace en línea, en tu navegador, gratis y sin registro, desde computadora, tableta o móvil.",
      },
      {
        question: "¿Mis archivos están seguros?",
        answer: "Sí. Tus archivos se transfieren mediante una conexión cifrada (TLS) y se eliminan automáticamente de nuestros servidores después del procesamiento.",
      },
    ],
  },
};
