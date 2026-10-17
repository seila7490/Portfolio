<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [projeto](https://ambiente do projeto). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on projeto's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to projeto and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the portfolio at `/` as a browser-only interactive book loaded dynamically behind ClientOnly; the page-flip engine requires DOM access.
- Keep book content in reusable forwarded-ref pages and navigation in the book container; the engine needs direct page element references.
- Keep physical binding and page-edge decoration in an inert layer beneath the page-flip engine, with shared dimensions and cover-state classes; this preserves engine page references and pointer interactions.
- Store chronological project metadata, contacts and navigation bounds in the browser-safe portfolio data module; this allows independent requirements tests.
- Use the existing Button variants and global semantic design tokens for controls and visual roles; this keeps the editorial identity consistent.
- Save project screenshots as projeto asset pointers and import generated desk artwork directly; this avoids bundling uploaded screenshot binaries.
