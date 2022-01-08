import esbuild from 'esbuild';
import minimist from 'minimist';
import pkg from './package.json' assert {type: "json"};

const args = minimist(process.argv.slice(2));
const commonOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  sourcemap: true,
  outfile: pkg.module,
  watch: args.watch && {
    onRebuild(error, result) {
      if (error) {
        console.error(`esbuild: watch failed:`, error);
      } else {
        console.log('esbuild: watch succeeded:', result);
      }
    },
  },
  minify: args.production,
};

esbuild.build(commonOptions).catch(() => process.exit(1));
esbuild
  .build({
    ...commonOptions,
    format: 'cjs',
    outfile: pkg.main,
  })
  .catch(() => process.exit(1));
