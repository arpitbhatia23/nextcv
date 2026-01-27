import React from "react";

export const metadata = {
  title: "Terms & Conditions - NextCV",
  description:
    "Review NextCV's terms and conditions of use for our resume builder platform",
  robots: "index, follow",
};

const page = () => {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions",
    url: "https://nextcv.in/terms",
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
      <main className="max-w-5xl mx-auto px-6 py-24 text-gray-800 ">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>

        <section className="space-y-6">
          <p>
            This document is an electronic record in terms of the Information
            Technology Act, 2000 and is published in accordance with Rule 3(1)
            of the IT (Intermediaries Guidelines) Rules, 2011. It governs the
            use of the Ghost Option platform.
          </p>

          <p>
            The Platform is owned by <strong>NEXTCV</strong>, a company
            incorporated under the Companies Act, 1956, with its registered
            office at:
            <br />
            <strong>
              Village Arth, Post Office Jalag, Tehsil Jaisinghpur, District
              Kangra, Himachal Pradesh, 176094, India
            </strong>
            .
          </p>

          <p>
            By using the platform , including the mobile site or app
            (hereinafter referred to as the "Platform"), you agree to the
            following terms and conditions (“Terms of Use”).
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. Agreement</h2>
          <p>
            Accessing, browsing, or otherwise using the Platform indicates your
            agreement to all the Terms of Use. These terms may be updated at any
            time without notice. Users are responsible for reviewing the terms
            periodically.
          </p>

          <h2 className="text-2xl font-semibold mt-8">2. Use of Services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide accurate and complete information during and after
              registration.
            </li>
            <li>Use the Platform and services entirely at your own risk.</li>
            <li>
              No warranty or guarantee is provided regarding the accuracy,
              timeliness, performance, or completeness of information on the
              Platform.
            </li>
            <li>Unauthorized use may lead to legal action.</li>
            <li>
              The content of the Platform is proprietary and licensed to us.
            </li>
            <li>
              You must not use the Platform for unlawful or forbidden purposes.
            </li>
            <li>
              The Platform may contain links to third-party websites, governed
              by their own terms and privacy policies.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">3. Transactions</h2>
          <p>
            Initiating a transaction on the Platform constitutes a legally
            binding contract with the Platform Owner. You agree to pay all
            applicable charges.
          </p>

          <h2 className="text-2xl font-semibold mt-8">4. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless the Platform Owner and its
            affiliates against any claims arising from your breach of these
            terms, policies, laws, or infringement of third-party rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8">5. Force Majeure</h2>
          <p>
            We shall not be held liable for any failure or delay in performance
            due to causes beyond our reasonable control.
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. Legal Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of India. All disputes shall be
            subject to the exclusive jurisdiction of the courts in Jaisinghpur,
            Himachal Pradesh.
          </p>

          <h2 className="text-2xl font-semibold mt-8">7. Contact</h2>
          <p>
            All concerns or communications regarding these Terms must be sent
            using the contact information provided on our website.
          </p>
          <p>
            We don't have any cancellation and refund policy.
            <br /> This website is operated by ARPIT SO SH RAJESH KUMAR
          </p>
        </section>
      </main>
    </>
  );
};

export default page;
