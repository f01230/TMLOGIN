import { HelpCircle, Store, Radio, type LucideIcon } from "lucide-react"

const links: { label: string; icon: LucideIcon }[] = [
  { label: "SUPPORT", icon: HelpCircle },
  { label: "STORE LOCATOR", icon: Store },
  { label: "COVERAGE", icon: Radio },
]

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#262626]">
      <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-7">
        {links.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white hover:underline"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
        <a
          href="#"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white hover:underline"
        >
          <span className="inline-flex items-center rounded bg-primary px-1 text-[0.65rem] font-extrabold leading-tight text-primary-foreground">
            T
          </span>
          T-MOBILE.COM
        </a>
      </nav>
    </footer>
  )
}
