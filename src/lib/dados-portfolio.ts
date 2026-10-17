export const contactEmail = "seila74900@gmail.com";
export const emailLink = `mailto:${contactEmail}?subject=${encodeURIComponent("Vamos conversar sobre meu projeto?")}`;
export const projects = [
  {
    name: "Time’s Book",
    period: "1º semestre · 2025",
    url: "https://time-s-book.vercel.app/inicial",
    semester: 1,
    year: 2025,
    case: {
      context: "Comunidade para leitores",
      challenge: "Tornar a descoberta de livros mais convidativa.",
      role: "UX, UI e desenvolvimento",
      scope: "Catálogo, perfis e navegação de descoberta",
    },
  },
  {
    name: "Hair Plus",
    period: "2º semestre · 2025",
    url: "https://hair-plus-main.vercel.app",
    semester: 2,
    year: 2025,
    case: {
      context: "Catálogo de beleza",
      challenge: "Organizar produtos sem transformar a experiência em vitrine genérica.",
      role: "Direção visual e desenvolvimento",
      scope: "Categorias, busca e apresentação de produtos",
    },
  },
  {
    name: "Scarin",
    period: "1º semestre · 2026",
    url: "https://scarin-sage.vercel.app",
    semester: 1,
    year: 2026,
    case: {
      context: "Experiência para veículos",
      challenge: "Ajudar o visitante a encontrar o próximo carro com confiança.",
      role: "UX, UI e desenvolvimento",
      scope: "Catálogo, filtros e contato comercial",
    },
  },
] as const;
export const chapters = [
  { title: "Minha visão", page: 1, number: "01" },
  { title: "Como trabalho", page: 4, number: "02" },
  { title: "Projetos & evolução", page: 5, number: "03" },
  { title: "Serviços & investimento", page: 9, number: "04" },
  { title: "Planos & condições", page: 10, number: "05" },
  { title: "Vamos conversar", page: 12, number: "06" },
];
export const pageLabels = [
  "Capa",
  "Minha visão",
  "Índice",
  "Além da aparência",
  "Como trabalho",
  "Time’s Book",
  "Hair Plus",
  "Scarin",
  "Minha trajetória",
  "Serviços",
  "Planos & condições",
  "Condições",
  "Vamos conversar",
  "Contracapa",
];
export function boundedPage(page: number) {
  return Math.max(0, Math.min(pageLabels.length - 1, Math.floor(Number.isFinite(page) ? page : 0)));
}
export const suggestedPrices = {
  developmentMin: 800,
  developmentMax: 900,
  maintenanceMin: 149,
  maintenanceMax: 399,
};
