import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from 'vite-plugin-imagemin';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
	root,
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: './index.html',
				about: resolve(root, 'pages', 'about', 'index.html'),
				contact: resolve(root, 'pages', 'contact', 'index.html'),
			},
		},
	},
	publicDir: 'public',
	server: {
		open: true,
		port: 8080,
		hmr: { overlay: false },
	},
	preview: {
		host: true,
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src', 'partials'),
			reloadOnPartialChange: true,
			context: {
				title: 'Home',
				about: 'About Us',
				contact: 'Contact',
			},
		}),
		viteImagemin({
			//do ustawienia
			verbose: true,
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 90,
			},
			webp: {
				quality: 75,
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
					},
					{
						name: 'removeEmptyAttrs',
						active: false,
					},
				],
			},
		}),
	],
});
