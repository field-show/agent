import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'Agent',
      fileName: format => `agent.${format}.js`
    }
  }
})
