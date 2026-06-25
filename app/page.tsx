import { SiteHeader } from "@/components/site-header"
import { LoginForm } from "@/components/login-form"
import { TLifeCard } from "@/components/tlife-card"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-10 md:py-14">
        <div className="flex w-full max-w-4xl flex-col gap-8">
          <LoginForm />
          <TLifeCard />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
