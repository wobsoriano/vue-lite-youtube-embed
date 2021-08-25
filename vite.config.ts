import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const resolvePath = (str: string) => path.resolve(__dirname, str);

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
  plugins: [
    dts({
        compilerOptions: {
          rootDir: resolvePath('src'),
          exclude: resolvePath('node_modules/**'),
        },
        include: ['./src']
    })
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})