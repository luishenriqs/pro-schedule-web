import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'
import { Header } from '@common/components/Header'

interface BaseLayoutProps {
    children: ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {

    return (
        <>
            <Head>
                <title>Pro Schedule</title>
            </Head>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CssBaseline />
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0, background: '#be5555' }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}
