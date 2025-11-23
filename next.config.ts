/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hkddkxgelkhgseiskulz.supabase.co',
        pathname: '/storage/v1/object/public/**', // أي مسار داخل public
      },
    ],
  },
};

module.exports = nextConfig;
