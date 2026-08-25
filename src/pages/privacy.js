import Head from "next/head";
import MainLayout from "./layouts/MainLayout";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy | Sandeep</title>
        <meta
          name="description"
          content="Privacy policy and cookie usage guidelines for sandeepmadavu.com."
        />
      </Head>
      <main className="max-w-3xl mx-auto px-6 py-12 text-slate-300">
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: August 2026</p>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to sandeepmadavu.com. Your privacy is important to me. This
            policy outlines how information is collected, used, and protected
            when you visit this website.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              1. Analytics & Tracking
            </h2>
            <p>
              This site uses <strong>Google Analytics (GA4)</strong> to collect
              anonymized usage data, such as page views, traffic sources, and
              browser types. This information helps improve content and site
              performance. Google Analytics uses cookies to gather this standard
              log data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              2. Advertising & Third-Party Cookies
            </h2>
            <p>
              This site serves advertisements via{" "}
              <strong>Google AdSense</strong>. Third-party vendors, including
              Google, use cookies to serve ads based on prior visits to this
              website or other websites across the internet.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>
                Google’s use of advertising cookies enables it and its partners
                to serve targeted ads.
              </li>
              <li>
                Users in the EEA, UK, and Switzerland will be presented with a
                Consent Management banner to grant or reject tracking cookies.
              </li>
              <li>
                You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline"
                >
                  Google Ad Settings
                </a>
                .
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              3. Personal Data
            </h2>
            <p>
              This site does not collect personal identification details (like
              names or email addresses) unless you explicitly send them via
              direct email or contact forms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              4. Contact Information
            </h2>
            <p>
              If you have any questions regarding this privacy policy, feel free
              to reach out via email or GitHub.
            </p>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
