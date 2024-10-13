import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig({
  plugins: [react(),
    visualizer({
      open: true, // لفتح التقرير تلقائياً في المتصفح بعد البناء
      filename: 'stats.html', // اسم ملف التقرير
      gzipSize: true, // عرض الحجم بعد الضغط
      brotliSize: true // عرض الحجم باستخدام Brotli
    })
    ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
