import Image from 'next/image'
import { Box, styled } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
})

export const Imagem = styled(Image)({
    marginTop: '50px',
    marginBottom: '50px',
    width: '320px',
    height: '320px',

    '@media (min-width:400px)': {
        width: '400px',
        height: '400px',
    },
})
