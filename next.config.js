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
                ]
            },
        ];
    },
};

module.exports = nextConfig;
