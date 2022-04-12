import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const d = typeof dts == 'object' ? dts.default : dts;

const resolvePath = (str: string) => path.resolve(__dirname, str);
console.log(typeof dts, dts);
export default defineConfig({
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    d({
      compilerOptions: {
        rootDir: resolvePath('src'),
        exclude: resolvePath('node_modules/**'),
      },
      include: ['./src'],
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
