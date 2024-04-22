import '@common/styles/global.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { AppProps } from 'next/app'
import BaseLayout from '@common/layouts/BaseLayout'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
    )
}
