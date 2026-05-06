/* ─── Higgsfield Placeholder + shared diagram primitives ─── */

/**
 * HiggsfieldPlaceholder
 * Drop-in slot for imagery the user will generate via Higgsfield AI.
 * Renders an editorial-grade placeholder with:
 *   • Mono uppercase tag ("HIGGSFIELD · IMAGE", "HIGGSFIELD · ANIMATION", etc.)
 *   • Short brief describing what should go there
 *   • Aspect ratio kept on the box so the page layout is correct now
 *
 * Replace by swapping in <img> or <video> with the same className when assets land.
 */
export function HiggsfieldPlaceholder({
  kind = "image",
  aspect = "16/9",
  brief,
  caption,
  className = "",
}) {
  const tag = `HIGGSFIELD · ${kind.toUpperCase()}`;
  return (
    <figure className={`relative ${className}`}>
      <div
        className="relative overflow-hidden bg-paper border border-ink/15"
        style={{ aspectRatio: aspect }}
      >
        {/* Editorial cross-hatch — subtle, brand-aligned */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hgf-hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="#0E1116" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hgf-hatch)" />
        </svg>

        {/* Coral accent corner */}
        <span className="absolute top-0 left-0 w-14 h-px bg-coral" />
        <span className="absolute top-0 left-0 w-px h-14 bg-coral" />
        <span className="absolute bottom-0 right-0 w-14 h-px bg-coral" />
        <span className="absolute bottom-0 right-0 w-px h-14 bg-coral" />

        {/* Centred label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-coral mb-3">{tag}</div>
          {brief && (
            <div className="font-display italic text-ink text-[clamp(15px,1.6vw,22px)] leading-snug max-w-[40ch]">
              {brief}
            </div>
          )}
        </div>

        {/* Aspect tag bottom-left */}
        <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted">
          {aspect.replace("/", " : ")}
        </div>
      </div>
      {caption && (
        <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * EditorialFigure
 * Wrapper for full-bleed or contained imagery with editorial caption.
 * Use for already-generated Higgsfield assets later — same caption pattern.
 */
export function EditorialFigure({ children, caption, className = "" }) {
  return (
    <figure className={className}>
      <div className="relative overflow-hidden">{children}</div>
      {caption && (
        <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
