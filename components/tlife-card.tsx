import Image from "next/image"

export function TLifeCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Download the T-Life app</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Scan the QR code to manage your account and devices, tap into exclusive benefits, and more.
          </p>
        </div>
        <Image
          src="/images/tlife-qr.png"
          alt="QR code to download the T-Life app"
          width={160}
          height={160}
          className="h-40 w-40 shrink-0"
        />
      </div>
    </div>
  )
}
