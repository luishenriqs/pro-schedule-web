import { styled } from '@mui/system'
import { Box } from '@mui/material'
import Image from 'next/image'

export const BannerContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '280px',
    height: '584',
    alignItems: 'center',
})

export const Image1 = styled(Image)({
    width: '100%',
    height: 'auto',
    transition: 'transform 10s ease',
    display: 'none',
    '@media (min-width:1024px)': {
        display: 'block',
    },
})

export const Image2 = styled(Image)({
    width: '100%',
    height: 'auto',
    transition: 'transform 10s ease',
    display: 'block',
    '@media (min-width:1024px)': {
        display: 'none',
    },
})
