import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PayGuestPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-10 md:py-14">
        <div className="flex w-full max-w-md flex-col">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              This option is not available right now
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We&apos;re sorry, but guest payments are temporarily unavailable. Please log in to your T-Mobile ID to
              manage your account and make a payment.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block w-full rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to log in
            </Link>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 self-start text-sm font-bold text-foreground hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
