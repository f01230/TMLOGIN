export function SiteHeader() {
  return (
    <header className="w-full bg-black">
      <div className="flex h-12 w-full items-center justify-between px-4 md:px-6">
        <button
          type="button"
          className="text-xs font-semibold uppercase tracking-wide text-white hover:underline"
        >
          Español
        </button>
        <button
          type="button"
          className="rounded bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Switch to T-Mobile
        </button>
      </div>
    </header>
  )
}
