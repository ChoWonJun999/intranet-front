import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('command:', command);
  console.log('mode:', mode);
  console.log('isSsrBuild:', isSsrBuild);
  console.log('isPreview:', isPreview);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  if (command === 'serve') {
    return {
      // 개발 서버 설정
      plugins: [react()],
      server: {
        port: 5173,
        strictPort: true,
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
          },
        },
      },
      hmr: {
        overlay: false,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          // '@': '/src', // src 경로 단축
        },
      },
    };
  } else {
    // command === 'build'
    return {
      plugins: [react()],
      server: {
        port: 5173,
        strictPort: true,
      },
      hmr: {
        overlay: false,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          // '@': '/src', // src 경로 단축
        },
      },
      build: {
        outDir: 'dist', // 빌드 결과물 위치
        sourcemap: true, // 배포 후 디버깅 필요하면 true
      },
    };
  }
});
