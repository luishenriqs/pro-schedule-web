import Image from 'next/image'
import { Box, styled } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '270px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '-20px auto',
})

export const Imagem = styled(Image)({
    marginTop: '10px',
    marginBottom: '20px',
    width: '320px',
    height: '320px',

    '@media (min-width:1500px)': {
        width: '400px',
        height: '400px',
    },
})

export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '270px',
    height: '350px',
    maxHeight: '350px',
    overflowY: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '-60px 0 30px 20px',
    paddingTop: '15px',
})
