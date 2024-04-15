import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'

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
                <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0 }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}
