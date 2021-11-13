import { VitePWA } from "vite-plugin-pwa"

export default new VitePWA({
	mode: "development",
	base: "/",
	srcDir: "src",
	filename: "sw.ts",
	includeAssets: ["/assets/favicon.png"],
	strategies: "injectManifest",
	manifest: {
		name: "Image Watermark",
		short_name: "ImgWatermark",
		theme_color: "#ffffff",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		icons: [
			{
				src: "/assets/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/assets/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/assets/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any maskable",
			},
		],
	},
});