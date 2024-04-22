import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: '50vw',

    '@media (min-width:600px)': {
        width: '30vw',
    },
    '@media (min-width:900px)': {
        width: '20vw',
    },
    '@media (min-width:1500px)': {
        width: '10vw',
    },
})

export const Imagem = styled(Image)({
    width: '200px',
    height: '200px',

    '@media (min-width:600px)': {
        width: '180px',
        height: '180px',
    },
    '@media (min-width:900px)': {
        width: '160px',
        height: '160px',
    },
    '@media (min-width:1500px)': {
        width: '150px',
        height: '150px',
    },
})

export const ButtonIcon = styled(IconButton)({
    width: '60px',
    height: '60px',
    borderRadius: '50px',
})

export const IconMenu = styled(MenuIcon)({
    color: COLORS.font_primary,
    width: '30px',
    height: '30px',
})
