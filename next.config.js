const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/firebase-messaging-sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig);
