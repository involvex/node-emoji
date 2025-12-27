import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/**/index.ts', 'bin/emoji-cli-improved.ts'],
  format: ['cjs', 'esm'],
  outDir: 'lib',
  sourcemap: true,
})
