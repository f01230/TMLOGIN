import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountTypeForm } from "@/components/account-type-form"

export default async function AccountTypePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-10 md:py-14">
        <AccountTypeForm accountId={id || "your account"} />
      </main>

      <SiteFooter />
    </div>
  )
}
