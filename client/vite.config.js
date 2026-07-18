import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
 resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@services": path.resolve(__dirname, "./src/services"),
    "@context": path.resolve(__dirname, "./src/context"),
    // "@notification": path.resolve(__dirname, "./src/components/notification"),
    // "@api": path.resolve(__dirname, "./src/api")
  }
},
});