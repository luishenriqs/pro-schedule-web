import Image from 'next/image'
import { Box, styled } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
})

export const Imagem = styled(Image)({
    marginTop: '10px',
    marginBottom: '50px',
    width: '320px',
    height: '320px',

    '@media (min-width:400px)': {
        width: '400px',
        height: '400px',
    },
})

export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '450px',
    maxHeight: '450px',
    overflowY: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '-80px auto 30px',
    paddingTop: '15px',
})
