import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const resolvePath = (str: string) => path.resolve(__dirname, str);

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolvePath('src/index.ts'),
      name: 'v-youtube',
      fileName: (format) => `v-youtube.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'get-youtube-id', 'youtube-player'],
      output: {
        globals: {
          vue: 'Vue',
          'youtube-player': 'YoutubePlayer',
          'get-youtube-id': 'GetYouTubeId'
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
  ]
})