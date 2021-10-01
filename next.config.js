module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["avatars.dicebear.com", "lh3.googleusercontent.com"],
	},
	async rewrites() {
		return [
			{
				source: "/api/proxy/remote/:url*",
				destination: "/api/proxy/remote",
			},
		];
	},
};
