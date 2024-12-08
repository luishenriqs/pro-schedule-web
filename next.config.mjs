/** @type {import('next').NextConfig} */

import withFonts from 'next-fonts'

const nextConfig = withFonts({
    // Configurações do next-fonts
    webpack(config) {
        return config
    },
    staticPageGenerationTimeout: 300, // Aumentando o tempo limite para 300 segundos
})

export default nextConfig
