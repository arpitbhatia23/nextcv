import React from "react";

export const metadata = {
  title: "Privacy Policy - NextCV",
  description:
    "Read NextCV's privacy policy to understand how we collect, use, and protect your personal data",
  robots: "index, follow",
};

const page = () => {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://nextcv.in/privacy-policy",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://nextcv.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <main className="max-w-5xl mx-auto px-6 py-24 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <section className="space-y-6">
          <p>
            This Privacy Policy describes how <strong>NEXTCV</strong> and its
            affiliates ("NEXTCV", "we", "our", "us") collect, use, share, and
            protect your personal data through our website{" "}
          </p>

          <p>
            By visiting this Platform, providing your information, or availing
            services, you agree to be bound by this Privacy Policy, Terms of
            Use, and applicable laws of India.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            1. Collection of Information
          </h2>
          <p>
            We collect personal data during registration or use of our Platform
            including your name, DOB, address, phone number, email, and other
            identity proof. Sensitive data like card info or biometrics may be
            collected with your consent.
          </p>
          <p>
            Behavioral data such as preferences and transaction records may also
            be collected. If you interact with third-party partners, their
            privacy policies will apply. We are not responsible for them.
          </p>
          <p>
            Beware of fraud: GHOSTNOTES will never ask for your card PIN or
            banking passwords. Report such cases to law enforcement immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-8">2. Use of Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and fulfill services</li>
            <li>To enhance customer experience and resolve disputes</li>
            <li>To conduct marketing, research, and surveys</li>
            <li>To detect fraud and enforce our policies</li>
          </ul>
          <p>You may opt-out of marketing communication at any time.</p>

          <h2 className="text-2xl font-semibold mt-8">
            3. Sharing of Information
          </h2>
          <p>
            We may share your data internally and with third-party sellers,
            logistics providers, payment gateways, and legal authorities as
            required.
          </p>
          <p>
            We may also disclose information to government or law enforcement
            agencies under legal obligations or to protect our users and
            platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8">4. Security Measures</h2>
          <p>
            We follow reasonable practices to secure your data using encrypted
            servers and limited access. However, transmission over the internet
            carries inherent risks.
          </p>
          <p>Users must keep their login credentials safe and secure.</p>

          <h2 className="text-2xl font-semibold mt-8">
            5. Data Deletion & Retention
          </h2>
          <p>
            You can delete your account through your profile settings. We may
            delay deletion if services, claims, or disputes are pending. After
            deletion, data may be kept in anonymized form for research and fraud
            prevention.
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. Your Rights</h2>
          <p>
            You may access, update, or rectify your personal data via the
            Platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8">7. Consent</h2>
          <p>
            By using our Platform, you consent to our use of your data. If you
            provide data of others, you confirm you have the authority to do so.
            You can withdraw your consent by writing to our Grievance Officer
            (details below).
          </p>
          <p>
            Subject line:{" "}
            <strong>
              “Withdrawal of consent for processing personal data”
            </strong>
          </p>

          <h2 className="text-2xl font-semibold mt-8">8. Policy Updates</h2>
          <p>
            We may update this policy. Please review periodically. Significant
            changes may be notified as per legal requirements.
          </p>
        </section>
      </main>
    </>
  );
};

export default page;
