/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import Sitemap from 'vite-plugin-sitemap'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const routes = [
    'home',
    'account',
    'account/sign-in',
    'account/register',
    'account/forgot',
    'projects',
    'contact',
    'privacy-policy',
    'terms-of-service',
    'about'
]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy(),
        Sitemap({
            hostname: 'https://maseshi.web.app',
            dynamicRoutes: routes.map(name => `/${name}`),
            readable: true
        })
    ],
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
            '@': resolve(__dirname, 'source')
        }
    }
})
