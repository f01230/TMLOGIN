import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WelcomeForm } from "@/components/welcome-form"

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-10 md:py-14">
        <WelcomeForm accountId={id || "your account"} />
      </main>

      <SiteFooter />
    </div>
  )
}
