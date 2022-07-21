import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: [
            {
                find: /^@fortawesome\/fontawesome-svg-core$/,
                replacement: resolve(__dirname, './src/fontawesome-svg-core.js'),
            }
        ],
    },
    esbuild: {
        legalComments: 'eof',
    },
    build: {
        target: 'modules',
        rollupOptions: {
            treeshake: {
                preset: 'smallest',
                moduleSideEffects: true,
            },
            output: {
                compact: true,
                generatedCode: 'es2015',
            }
        },
    }
})
