import path from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { pluginExposeRenderer } from './vite.base.config'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      // alias
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    clearScreen: false,
    server: {
      proxy: {
        '/api': {
          target: 'https://api.bilibili.com',
          changeOrigin: true,
          // !!! 这个是关键 !!!
          headers: {
            host: 'https://api.bilibili.com',
            referer: '',
          },
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  } as UserConfig
})
