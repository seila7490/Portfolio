import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { ArrowLeft, ArrowRight, BookOpen, X, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBookPages } from "./paginas-livro";
import { boundedPage, chapters, contactEmail, emailLink, pageLabels } from "@/lib/dados-portfolio";
import desk from "@/assets/mesa-editorial.jpg";

type FlipAPI = {
  flip: (page: number) => void;
  turnToPage: (page: number) => void;
  flipNext: () => void;
  flipPrev: () => void;
  getCurrentPageIndex: () => number;
};
type FlipRef = { pageFlip: () => FlipAPI };
export default function InteractiveBook() {
  const book = useRef<FlipRef | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [size, setSize] = useState({ width: 450, height: 570, mobile: false });
  const reduced = useRef(false);
  const mobileMode = useRef(false);
  const wheelTime = useRef(0);
  const goTo = useCallback((target: number) => {
    const next = boundedPage(target);
    const api = book.current?.pageFlip();
    if (!api) return;
    if (reduced.current || mobileMode.current) api.turnToPage(next);
    else api.flip(next);
    setShowIndex(false);
  }, []);
  const next = useCallback(() => {
    const api = book.current?.pageFlip();
    if (!api) return;
    if (api.getCurrentPageIndex() >= pageLabels.length - 1) return;
    if (reduced.current)
      api.turnToPage(boundedPage(api.getCurrentPageIndex() + (mobileMode.current ? 1 : 2)));
    else api.flipNext();
  }, []);
  const previous = useCallback(() => {
    const api = book.current?.pageFlip();
    if (!api) return;
    if (reduced.current)
      api.turnToPage(boundedPage(api.getCurrentPageIndex() - (mobileMode.current ? 1 : 2)));
    else api.flipPrev();
  }, []);
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const mobile = entry.contentRect.width < 720;
      mobileMode.current = mobile;
      const width = mobile
        ? Math.min(430, entry.contentRect.width - 12)
        : Math.min(475, (entry.contentRect.width - 24) / 2);
      const height = Math.min(entry.contentRect.height - 14, Math.max(490, width * 1.26));
      setSize({ width: Math.round(width), height: Math.round(height), mobile });
    });
    observer.observe(element);
    const scroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12 || showIndex) return;
      e.preventDefault();
      if (Date.now() - wheelTime.current < 950) return;
      wheelTime.current = Date.now();
      if (e.deltaY > 0) next();
      else previous();
    };
    const pointer = (e: PointerEvent) => {
      if (mobileMode.current || reduced.current) return;
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      element.style.setProperty("--pointer-x", `${(x * 1.1).toFixed(2)}deg`);
      element.style.setProperty("--pointer-y", `${(y * -0.8).toFixed(2)}deg`);
    };
    const pointerLeave = () => {
      element.style.setProperty("--pointer-x", "0deg");
      element.style.setProperty("--pointer-y", "0deg");
    };
    element.addEventListener("wheel", scroll, { passive: false });
    element.addEventListener("pointermove", pointer);
    element.addEventListener("pointerleave", pointerLeave);
    return () => {
      observer.disconnect();
      element.removeEventListener("wheel", scroll);
      element.removeEventListener("pointermove", pointer);
      element.removeEventListener("pointerleave", pointerLeave);
    };
  }, [next, previous, showIndex]);
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("pagina");
    if (target !== null) setPage(boundedPage(Number(target)));
  }, []);
  useEffect(() => {
    const keyboard = (e: KeyboardEvent) => {
      if (showIndex) return;
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        previous();
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [next, previous, goTo, showIndex]);
  useEffect(() => {
    if (!showIndex) return;
    modal.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowIndex(false);
        indexButton.current?.focus();
      }
      if (e.key !== "Tab") return;
      const controls = modal.current?.querySelectorAll<HTMLButtonElement>("button");
      const first = controls?.[0];
      const last = controls?.[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [showIndex]);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = window.setTimeout(() => setIntroLeaving(true), reducedMotion ? 80 : 1700);
    const remove = window.setTimeout(() => setIntroVisible(false), reducedMotion ? 120 : 2350);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(remove);
    };
  }, []);
  const flip = (event: { data: number }) => {
    setPage(event.data);
    if (mobileMode.current && !reduced.current) {
      stage.current?.animate(
        [
          { transform: "perspective(1200px) rotateY(-5deg)" },
          { transform: "perspective(1200px) rotateY(0deg)" },
        ],
        { duration: 300, easing: "ease-out" },
      );
    }
    const url = new URL(window.location.href);
    url.searchParams.set("pagina", String(event.data));
    window.history.replaceState(null, "", url);
    document.title = `${pageLabels[event.data]} — Entre páginas | Portfólio web`;
  };
  const pages = useMemo(() => createBookPages(goTo), [goTo]);
  return (
    <div className="portfolio-shell">
      {introVisible && (
        <div className={`intro-curtain${introLeaving ? " is-leaving" : ""}`} aria-hidden="true">
          <div className="intro-curtain-light" />
          <div className="intro-curtain-copy">
            <div className="intro-book-mark">
              <span />
              <span />
            </div>
            <span className="intro-overline">Portfólio · Desenvolvimento web</span>
            <strong>
              Entre páginas<span>.</span>
            </strong>
            <em>uma experiência para explorar com calma</em>
          </div>
          <div className="intro-curtain-progress">
            <i />
            <small>abrindo o livro</small>
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">
            <BookOpen size={17} strokeWidth={1.4} />
          </span>
          <div>
            <div className="brand-name">
              Entre páginas<span className="text-primary">.</span>
            </div>
            <div className="brand-subtitle">Portfólio de desenvolvimento web</div>
          </div>
        </div>
        <nav className="header-nav" aria-label="Navegação principal">
          <Button variant="chapter" size="sm" className="desktop-nav" onClick={() => goTo(0)}>
            Capa
          </Button>
          <Button variant="chapter" size="sm" className="desktop-nav" onClick={() => goTo(5)}>
            Projetos
          </Button>
          <Button variant="chapter" size="sm" className="desktop-nav" onClick={() => goTo(9)}>
            Serviços
          </Button>
          <Button
            ref={indexButton}
            variant="chapter"
            size="icon"
            aria-label="Abrir índice de capítulos"
            title="Índice de capítulos"
            onClick={() => setShowIndex(true)}
          >
            <BookOpen />
          </Button>
          <Button variant="editorial" className="header-contact" size="sm" asChild>
            <a href={emailLink}>
              Vamos conversar <ArrowUpRight />
            </a>
          </Button>
        </nav>
      </header>
      <main className="desk-section">
        <img
          className="desk-photo"
          src={desk}
          width={1600}
          height={1008}
          alt=""
          aria-hidden="true"
        />
        <div className="desk-heading">
          <span>Minha história. Meu trabalho. Minha visão.</span>
          <span className="edition">Edição 01 · 2025 — 2026</span>
        </div>
        <div
          ref={stage}
          className="book-stage"
          role="region"
          aria-label="Livro interativo do portfólio"
        >
          <div
            className={`book-object ${page === 0 ? "is-front-cover" : page === pageLabels.length - 1 ? "is-back-cover" : "is-open"}${size.mobile ? " is-portrait" : ""}`}
            style={{ width: size.width * (size.mobile ? 1 : 2), height: size.height }}
          >
            <div className="book-foundation" aria-hidden="true">
              <div className="book-board" />
              <div className="book-paper-block paper-block-left" />
              <div className="book-paper-block paper-block-right" />
              <div className="book-spine" />
            </div>
            <HTMLFlipBook
              key={`${size.width}-${size.height}-${size.mobile}`}
              ref={book}
              className="flip-book"
              style={{}}
              width={size.width}
              height={size.height}
              size="fixed"
              minWidth={280}
              maxWidth={500}
              minHeight={440}
              maxHeight={650}
              startPage={page}
              drawShadow
              flippingTime={reduced.current ? 1 : 700}
              usePortrait={size.mobile}
              startZIndex={1}
              autoSize
              maxShadowOpacity={0.22}
              showCover
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick
              onFlip={flip}
            >
              {pages}
            </HTMLFlipBook>
          </div>
        </div>
        <div className="book-controls">
          <Button
            variant="ghost"
            size="icon"
            className="control-arrow"
            aria-label="Página anterior"
            title="Página anterior"
            onClick={previous}
            disabled={page === 0}
          >
            <ArrowLeft />
          </Button>
          <div className="page-counter" aria-live="polite">
            <span>
              {page === 0 ? (
                "Capa"
              ) : page === pageLabels.length - 1 ? (
                "Contracapa"
              ) : (
                <>
                  {String(page).padStart(2, "0")} / {pageLabels.length - 2}
                  &nbsp; · &nbsp;
                  {pageLabels[page]}
                </>
              )}
            </span>
            <div className="page-progress" aria-hidden="true">
              {chapters.map((c) => (
                <i
                  key={c.page}
                  className={
                    page >= c.page &&
                    page < (chapters[chapters.indexOf(c) + 1]?.page ?? pageLabels.length)
                      ? "current"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="control-arrow"
            aria-label="Próxima página"
            title="Próxima página"
            onClick={next}
            disabled={page >= pageLabels.length - 1}
          >
            <ArrowRight />
          </Button>
        </div>
      </main>
      <footer className="site-footer">
        <span className="footer-location">
          <MapPin size={12} /> José Bonifácio, São Paulo
        </span>
        <span className="footer-edition">Feito com intenção. Em constante evolução.</span>
        <a className="footer-email" href={emailLink}>
          <Mail size={13} />
          {contactEmail}
          <ArrowUpRight size={12} />
        </a>
      </footer>
      {showIndex && (
        <div className="chapter-dialog" onClick={() => setShowIndex(false)}>
          <div
            ref={modal}
            className="chapter-dialog-inner"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chapter-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chapter-dialog-heading">
              <h2 id="chapter-title">Entre capítulos</h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar índice"
                onClick={() => {
                  setShowIndex(false);
                  indexButton.current?.focus();
                }}
              >
                <X />
              </Button>
            </div>
            <Button variant="chapter" className="chapter-row" onClick={() => goTo(0)}>
              <span>Capa</span>
              <ArrowRight />
            </Button>
            {chapters.map((c) => (
              <Button
                key={c.page}
                variant="chapter"
                className="chapter-row"
                aria-current={
                  page >= c.page &&
                  page < (chapters[chapters.indexOf(c) + 1]?.page ?? pageLabels.length)
                    ? "page"
                    : undefined
                }
                onClick={() => goTo(c.page)}
              >
                <span className="chapter-label">
                  <span className="chapter-number">{c.number}</span>
                  {c.title}
                </span>
                <ArrowRight />
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
