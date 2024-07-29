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

export const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '350px',
    overflowY: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '-60px 0 30px 0px',
    paddingTop: '15px',

    '@media (min-height:680px)': {
        height: '400px',
    },
    '@media (min-height:780px)': {
        height: '500px',
    },
    '@media (min-height:880px)': {
        height: '600px',
    },
})

export const ButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
})
