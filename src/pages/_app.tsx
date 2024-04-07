import '../styles/global.css';
import { AppProps } from "next/app"
import BaseLayout from "@common/layouts/BaseLayout"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
    )
}