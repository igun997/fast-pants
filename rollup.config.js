import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import css from "rollup-plugin-css-only";
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({

			// 2 level deep object should be stringify
			ps: JSON.stringify({
				env: {
					endpoint: "https://fastpants.pridenjoyco.id/backend/",
					wp: "https://pridenjoyco.id/api/",
					default_user:"igun997:igun97",
					jwt:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE1ZWY0ZWQ4YWVmYzA1MTRjYmRiMzRlMDk4OGQ3NWNmZThiOTM1YzQxODYxYjIzOWQxNGNhN2Q2NDEwNTRjYWFlNTZjNWI2M2JiMTk5NDQyIn0.eyJhdWQiOiIxIiwianRpIjoiYTVlZjRlZDhhZWZjMDUxNGNiZGIzNGUwOTg4ZDc1Y2ZlOGI5MzVjNDE4NjFiMjM5ZDE0Y2E3ZDY0MTA1NGNhYWU1NmM1YjYzYmIxOTk0NDIiLCJpYXQiOjE2MDE2MzY3MjEsIm5iZiI6MTYwMTYzNjcyMSwiZXhwIjoxOTE3MTY5NTIxLCJzdWIiOiIxNTA2Iiwic2NvcGVzIjpbXX0.Sje2fv33-9GyLXnBGpxHbki9WELOSVX5PDQqYhOS4KP2DHb3DNv4HUBeDuOEmKH1PHDkvJVYv-RRTz9wuuKwp16gxCLJjTDiS20-DjJpZhmXIRX-HhU1NLmZVUSJzDORo_fiIDhC29ACxlETSFys8s5AuJ7hRolgCNL4eLvSDPaJx-Q3CY_Tt1j4NQMOHKhanQdGSn0qPQEdX6mVRQnawECDTYVKH9iv4ime8nfuthCIjzOWlkwjPvXNasLTFhD4LWAkcnxjQeVWAX8yDpxouwhBUFIlErKJKmoUOG3BDekynT_tyQglV6RC-V9tHrv2EhIKi88bGIIQcDkBQx6J9Mfd2PVo4-iNCKPDcUp3J-TWpyk3_SpmokrKmclyGgS_8CfRP3vzJzT1FAtuNuRc0H-gkUMO369Dxea4aatGBXgL1fOuJPkNThQur5iQipfkfDErORB7y83sNJjT_nxK5XNU7O22LQCfFZJv31vwagruQ30WAOTyMzFXKjfrzqHQTJC45hoDdTJXK7-cLj1bA-L-yEWQdSY6aAK97fsjFlH29bsnpIr5l9JAQFFaJXZmoNVIv5iHJkgQNJDyXAfBJgESk1YIVh_QPq3es274uCJCkvWM07Aqcl_50Sp6BWLEYO0f5GmDEaFsllFVajaQx_y7-Dgith_nVvJYZeEPKrI",
					expivi_jwt:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlZTA4Mjk1MTkxMTI4ODA0YzYzOGQ1MjdmNTY5NmMwZWU3YzQ4OThkYmY5YmUzMWZkZDkzY2IwZGMzMWFjNGI0MzM1MTM4YmI1YzZjNGI3In0.eyJhdWQiOiIxIiwianRpIjoiNWVlMDgyOTUxOTExMjg4MDRjNjM4ZDUyN2Y1Njk2YzBlZTdjNDg5OGRiZjliZTMxZmRkOTNjYjBkYzMxYWM0YjQzMzUxMzhiYjVjNmM0YjciLCJpYXQiOjE2MDE4OTE2ODksIm5iZiI6MTYwMTg5MTY4OSwiZXhwIjoxOTE3NDI0NDg5LCJzdWIiOiIxNTA2Iiwic2NvcGVzIjpbXX0.jq5piM2198cU8muZJfV1RCdaLcYZsSYxjmf70sHhPjJ_S9SEnLrsRNa3m-XjRK8aGbWjZ7jkUuTazHuDSokH4A3nFblmooVdmJWRotWt3yVtvBwboK1HLB7mT3DoiUM9kAw5ZHM0RFSHSrarp_y9r6W1NbiZzMzc2Qe2lrUc-DWooWo6oUxdoZcOtScUWZ5a_nfULVgb4B58xsjecgpgPlcwA78b3ecWI0967au68acE0lMbzNvlJMoAmV9zdlzu8KcX9Wn7dZsLy5D5h52OP5Foqerd-e05SH-zpQS0pOV1pBno_k1LPDY5meiwfdJ8isqHC7dhmqb4l5r243TtSYGEJUKJyFtzGtHQQge43hIKcRxhGnhoYnx27svpZ4NVyVGPdw4g0_4BGDvoBqoQqGEu2o_8tjLIb5YuECrCyNo0Po-iK2JInavXahA2QDnDc7zlzq-3eoRY2JLSl-jUBDv5fFpzq71sDaxlxe12VbPiFBfT1L-ZXgUEztMvKMOSdjSMAx5ozjVLBcUN9AbbPxo_1dOZUtU08YcXC8SGNMhybxkHXS5d45RcbPNBFgni4cOMnnr9CHIF3uzuaPbl7U0NXriL--3am_HyhUcfMcX4VCJzdxXLLLsNE9KC2bI1zflcM5_GOf4Go3uNUZKiPWdaZVGAD236tAOf4Ife0Pw"
				}
			}),
		}),
		css({ output: "bootstrap/dist/css/bootstrap.min.css" }),
		css({ output: "@fortawesome/fontawesome-free" }),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
