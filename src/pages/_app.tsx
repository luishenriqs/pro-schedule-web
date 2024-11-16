import '@common/styles/global.css'

import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import BaseLayout from '@common/layouts/BaseLayout'
import { PayloadProvider } from '@common/hooks/contexts/PayloadContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider>
            <PayloadProvider>
                <BaseLayout>
                    <Component {...pageProps} />
                </BaseLayout>
            </PayloadProvider>
        </SnackbarProvider>
    )
}
