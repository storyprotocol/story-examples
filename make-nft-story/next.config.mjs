/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false, net: false, tls: false };
		return config;
	},
	images: {
		// remotePatterns: [
		//   {
		//     protocol: 'https',
		//     hostname: 'cloudflare-ipfs.com',
		//     port: '',
		//     pathname: '/ipfs/*',
		//   },
		// ],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
