import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Team Vegavath",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.isAdmin) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/40">
        <div className="mb-8 text-center">
          <div className="mb-3 text-3xl" aria-hidden="true">
            ⚠️
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-zinc-100">
            RESTRICTED ACCESS
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
            Authorized Personnel Only
          </p>
        </div>

        <form
          action={async (formData: FormData) => {
            "use server";
            formData.set("redirectTo", "/admin/dashboard");
            await signIn("credentials", formData);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 text-sm font-bold tracking-wide text-white transition hover:from-red-500 hover:to-orange-400 focus:outline-none"
          >
            ACCESS SYSTEM
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>🔒 ENCRYPTED CONNECTION</p>
          <p className="mt-1">All activities are monitored and logged</p>
        </div>
      </section>
    </main>
  );
}
