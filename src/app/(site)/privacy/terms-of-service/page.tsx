"use client"
// pages/terms-of-service.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service | Elsexperiences</title>
        <meta
          name="description"
          content="Terms of Service for Restaurant Name WhatsApp booking service"
        />
      </Head>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Terms of Service
            </h1>
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:text-blue-800"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white p-6 shadow">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed text-gray-600">
                By using our WhatsApp Business messaging service, you agree to
                these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                2. Service Description
              </h2>
              <p className="mb-3 leading-relaxed text-gray-600">
                We provide table reservation services through WhatsApp Business
                API, allowing you to:
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Make restaurant reservations</li>
                <li>Receive confirmation messages</li>
                <li>Modify or cancel bookings</li>
                <li>Communicate with our staff</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                3. Reservation Policies
              </h2>

              <h3 className="mb-3 text-xl font-medium">
                3.1 Booking Confirmation
              </h3>
              <ul className="mb-4 list-disc pl-5 text-gray-600">
                <li>Reservations are confirmed via WhatsApp message</li>
                <li>A booking reference number will be provided</li>
                <li>Changes require minimum 4 hours notice</li>
              </ul>

              <h3 className="mb-3 text-xl font-medium">
                3.2 Cancellation Policy
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Free cancellation up to [X] hours before reservation</li>
                <li>Late cancellations may incur a fee of [amount]</li>
                <li>No-shows may affect future booking privileges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                4. WhatsApp Usage Terms
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  Messages must comply with WhatsApp&apos;s Business Policy
                </li>
                <li>
                  Service availability depends on WhatsApp platform
                  functionality
                </li>
                <li>
                  Message history is retained according to WhatsApp&apos;s data
                  retention policies
                </li>
              </ul>
            </section>

            {/* Add more sections following the same pattern */}

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">
                9. Contact Information
              </h2>
              <p className="leading-relaxed text-gray-600">
                For service-related inquiries:
                <br />
                WhatsApp: [+39 375 913 2750]
                <br />
                Email: [elsexperiences@gmail.com]
                <br />
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