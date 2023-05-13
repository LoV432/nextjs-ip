/** @type {import('next').NextConfig} */
const nextConfig = {
	generateEtags: false,
	async headers() {
		return [
			{
				source: '/geo',
				headers: [
					{
						key: 'cache-control',
						value: 'no-store'
					}
				]
			},
			{
				source: '/',
				headers: [
					{
						key: 'Refresh',
						value: '0; url=/home'
					},
					{
						key: 'cache-control',
						value: 'no-store'
					}
				]
			}
		];
	}
};

module.exports = nextConfig;
