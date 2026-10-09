export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="14" fill="#16213a" />
      <circle cx="22" cy="22" r="7" fill="#e39b2d" />
      <circle cx="42" cy="42" r="7" fill="#38c4a2" />
      <path d="M27 27l10 10" stroke="#f4f6f9" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
