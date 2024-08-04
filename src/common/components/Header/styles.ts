import styled from 'styled-components'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100vw',
    height: '50px',
    zIndex: 2,
    borderBottom: '1px solid',
    borderColor: COLORS.primary,
    background: COLORS.background,

    '@media (min-width:760px)': {
        height: '70px',
    },
    '@media (min-width:1024px)': {
        height: '60px',
    },
})

export const DrawerHeaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    padding: '0px 15px 0',

    '@media (min-width:760px)': {
        height: '70px',
        paddingRight: '30px',
    },
    '@media (min-width:1024px)': {
        display: 'none',
    },
})

export const HeaderContent = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const ButtonIcon = styled(IconButton)({
    width: '40px',
    height: '40px',
    borderRadius: '50px',
})

export const IconMenu = styled(MenuIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
    '@media (min-width:760px)': {
        width: '35px',
        height: '35px',
    },
})

export const InlineHeaderContainer = styled(Box)({
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',

    '@media (min-width:760px)': {
        height: '60px',
    },
    '@media (min-width:1024px)': {
        display: 'flex',
    },
})
export const ImageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    height: '60px',
    paddingLeft: '40px',
})

export const MenuOptionsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    height: '60px',

    '@media (min-width:1024px)': {
        padding: '0 25px',
    },

    '@media (min-width:1440px)': {
        padding: '0 50px',
    },
})

export const Imagem = styled(Image)({
    width: '70px',
    height: 'auto',

    '@media (min-width:760px)': {
        width: '90px',
        height: 'auto',
    },
})
