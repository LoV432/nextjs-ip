/** @type {import('next').NextConfig} */
const nextConfig = {
    generateEtags: false,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'cache-control',
                        value: 'no-store',
                    }
                ],
                source: '/',
                headers: [
                    {
                        key: 'Refresh',
                        value: '0; url=/home'
                    }
                ],
            },
        ];
    },
};

module.exports = nextConfig;
