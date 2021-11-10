import { defineConfig } from "vite"
import polyfillNode from "rollup-plugin-polyfill-node"

export default defineConfig({
  plugins: [polyfillNode()],
  optimizeDeps: {
    exclude: ["web3"], // <= The libraries that need shimming should be excluded from dependency optimization.
  },
})
