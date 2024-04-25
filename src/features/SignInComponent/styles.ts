import Image from 'next/image'
import { Box, styled } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
})

export const Imagem = styled(Image)({
    marginTop: '50px',
    marginBottom: '20px',
    width: '320px',
    height: '320px',
    '@media (min-width:1500px)': {
        width: '400px',
        height: '400px',
    },
})

export const SignUpContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
})
