export const manifest = {
	appDir: '_app',
	appPath: '_app',
	assets: new Set([
		'android-chrome-192x192.png',
		'android-chrome-512x512.png',
		'apple-touch-icon.png',
		'favicon-16x16.png',
		'favicon-32x32.png',
		'favicon.ico',
		'robots.txt',
		'site.webmanifest',
		'sitemap.xml'
	]),
	mimeTypes: {
		'.png': 'image/png',
		'.ico': 'image/vnd.microsoft.icon',
		'.txt': 'text/plain',
		'.webmanifest': 'application/manifest+json',
		'.xml': 'application/xml'
	},
	_: {
		entry: {
			file: '_app/immutable/start-b7a97248.js',
			imports: [
				'_app/immutable/start-b7a97248.js',
				'_app/immutable/chunks/index-912d2e7a.js',
				'_app/immutable/chunks/singletons-c1ecf7be.js'
			],
			stylesheets: []
		},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: '/',
				pattern: /^\/$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			return {};
		}
	}
};
