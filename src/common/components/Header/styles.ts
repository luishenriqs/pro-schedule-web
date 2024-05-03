import styled from 'styled-components'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    width: '100vw',
    maxHeight: '120px',
    zIndex: 999,
    padding: '15px 30px 0',
})

export const HeaderContent = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const IconContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    overflow: 'auto',
    width: '60px',
    height: '60px',

    '@media (min-width:600px)': {
        width: '70px',
        height: '70px',
    },
    '@media (min-width:900px)': {
        width: '80px',
        height: '80px',
    },
    '@media (min-width:1500px)': {
        width: '100px',
        height: '100px',
    },
})

export const Imagem = styled(Image)({
    width: '60px',
    height: '60px',

    '@media (min-width:600px)': {
        width: '70px',
        height: '70px',
    },
    '@media (min-width:900px)': {
        width: '80px',
        height: '80px',
    },
    '@media (min-width:1500px)': {
        width: '100px',
        height: '100px',
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

export const Empty = styled(Box)({
    width: '30px',
    height: '30px',
})
