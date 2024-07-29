import Image from 'next/image'
import { Box, styled } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '260px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    background: COLORS.white,
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
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
})
