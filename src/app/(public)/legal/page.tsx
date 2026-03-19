import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | Team Vegavath",
};

export const revalidate = 120;

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Page Heading */}
        <h1 className="mb-12 text-4xl font-bold sm:text-5xl">Legal</h1>

        {/* Terms of Use Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Terms of Use</h2>
          <p className="leading-relaxed text-gray-300">
            This website is provided for informational purposes only. All content,
            including text, images, designs, and data, belongs to Team Vegavath.
            Unauthorized reproduction or distribution of any content is prohibited
            without prior written permission.
          </p>
        </section>

        {/* Privacy Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Privacy</h2>
          <p className="leading-relaxed text-gray-300">
            We collect only essential information from form submissions, including
            your name, email, and domain of interest. This data is used solely for
            recruitment and team communication purposes. We do not share your
            information with third parties.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
          <p className="leading-relaxed text-gray-300">
            For any concerns, please contact us at{" "}
            <a
              href="mailto:vegavath@pes.edu"
              className="text-blue-400 hover:text-blue-300"
            >
              vegavath@pes.edu
            </a>
          </p>
        </section>

        {/* Copyright Section */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Copyright</h2>
          <p className="leading-relaxed text-gray-300">
            © 2026 Team Vegavath. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
}
