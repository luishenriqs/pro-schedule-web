import styled from 'styled-components'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: COLORS.background,
})

export const HeaderWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    borderBottom: 'solid 0.5px',
    borderColor: COLORS.primary,
})

export const HeaderContent = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 15px 0',
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

export const Line = styled(Box)({
    border: 'solid 0.5px',
    borderColor: COLORS.primary,
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
