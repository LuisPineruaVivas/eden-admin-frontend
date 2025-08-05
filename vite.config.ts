import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

import type { ConfigEnv } from 'vite'

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, path.resolve(__dirname, 'env'), 'VITE_')
  const defineEnv = Object.fromEntries(
    Object.entries(env).map(([k, v]) => [k, JSON.stringify(v)])
  )

  return defineConfig({
    define: {
      'process.env': defineEnv
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@core": path.resolve(__dirname, "./src/core"),
        "@store": path.resolve(__dirname, "./src/config/store"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@interfaces": path.resolve(__dirname, "./src/interface"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
  })
}
