"use client"
import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | Elsexperiences</title>
        <meta
          name="description"
          content="Privacy Policy for Restaurant Name WhatsApp booking service"
        />
      </Head>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <Link
              href="/terms-of-service"
              className="text-blue-600 hover:text-blue-800"
            >
              View Terms of Service
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white p-6 shadow">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
              <p className="leading-relaxed text-gray-600">
                Welcome to Elsexperiences. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our WhatsApp Business messaging service for table
                reservations and related communications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                2. Information We Collect
              </h2>

              <h3 className="mb-3 text-xl font-medium">
                2.1 Information You Provide
              </h3>
              <ul className="mb-4 list-disc pl-5 text-gray-600">
                <li>Name and contact information</li>
                <li>Reservation details (date, time, party size)</li>
                <li>Dining preferences and special requests</li>
                <li>WhatsApp account information</li>
                <li>Communication history</li>
                <li>Feedback and reviews</li>
              </ul>

              <h3 className="mb-3 text-xl font-medium">
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Device information</li>
                <li>Usage patterns</li>
                <li>Location data (if enabled)</li>
                <li>Technical information related to WhatsApp usage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                3. How We Use Your Information
              </h2>
              <p className="mb-3 leading-relaxed text-gray-600">
                We use your information to:
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Process and manage your restaurant reservations</li>
                <li>Send confirmation messages and updates</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>
            </section>

            {/* Add more sections following the same pattern */}

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Contact Us</h2>
              <p className="leading-relaxed text-gray-600">
                For privacy-related inquiries, contact us at:
                <br />
                Email: [elsexperiences@gmail.com]
                <br />
                Address: [Your Address]
              </p>
            </section>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                Last updated: November 16, 2024
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
