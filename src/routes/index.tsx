import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const InteractiveBook = lazy(() => import("@/components/portfolio/livro-interativo"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entre páginas — Sites com propósito | Portfólio web" },
      {
        name: "description",
        content:
          "Conheça minha trajetória, Time’s Book, Hair Plus e Scarin em um livro interativo.",
      },
      { property: "og:title", content: "Entre páginas — Sites com propósito" },
      {
        property: "og:description",
        content: "Um portfólio de desenvolvimento web apresentado como um livro interativo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function LoadingScene() {
  return <div className="loading-quiet" aria-hidden="true" />;
}

function Index() {
  return (
    <ClientOnly fallback={<LoadingScene />}>
      <Suspense fallback={<LoadingScene />}>
        <InteractiveBook />
      </Suspense>
    </ClientOnly>
  );
}
