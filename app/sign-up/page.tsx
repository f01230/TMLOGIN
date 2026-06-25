import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-10 md:py-14">
        <SignUpForm />
      </main>

      <SiteFooter />
    </div>
  )
}
