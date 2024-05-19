/** @type {import('next').NextConfig} */

import withFonts from 'next-fonts'

const nextConfig = withFonts({
    // Configurações do next-fonts
    webpack(config, options) {
        return config
    },
})

export default nextConfig
