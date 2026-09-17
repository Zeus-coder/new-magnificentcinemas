interface PageHeaderProps {
  eyebrow: string
  title: string
  lead?: string
}

/**
 * Shared inner-page masthead: left-aligned, oversized, with the ambient
 * warm bloom behind it so no page opens on a flat black band.
 */
export default function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <header className="bloom pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="shell">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1
          className="mt-5 max-w-[16ch] font-display font-black leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-ink-muted">{lead}</p>
        )}
      </div>
    </header>
  )
}
