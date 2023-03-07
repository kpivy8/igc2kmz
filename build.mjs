import * as esbuild from 'esbuild'

//const path = require('path')

import extraconfig from './esbuild.config.mjs';

await esbuild.build({
  platform: 'node',
  entryPoints: ["igc2kmz/igc2kmz.ts"],
  bundle: true,
  absWorkingDir: process.cwd(),
  //outdir: path.join(process.cwd(), "dist"),
  outfile: 'dist/igc2kmz.js',
  //watch: process.argv.includes("--watch"),
  //minify: true
  ...extraconfig,
}).catch(() => process.exit(1))