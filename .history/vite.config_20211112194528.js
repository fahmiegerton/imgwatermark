import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vitepwa from "./plugins/vitepwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitepwa
  ]
})
