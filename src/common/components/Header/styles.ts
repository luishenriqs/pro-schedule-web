import styled from 'styled-components'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton } from '@mui/material'
import { COLORS } from '@common/styles/theme'
import { rgba } from 'polished'

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
        paddingRight: '30px',
    },
    '@media (min-width:1024px)': {
        height: '60px',
        paddingRight: '0px',
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

export const Empty = styled(Box)({
    width: '25px',
    height: '25px',
})

export const InlineHeaderContainer = styled(Box)({
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',
    padding: '0 200px',

    background: rgba(0, 0, 0, 0.6),

    '@media (min-width:760px)': {
        height: '60px',
    },
    '@media (min-width:1024px)': {
        display: 'flex',
        padding: '0 50px',
    },
    '@media (min-width:1440px)': {
        display: 'flex',
        padding: '0 150px',
    },
    '@media (min-width:1840px)': {
        display: 'flex',
        padding: '0 250px',
    },
    '@media (min-width:2040px)': {
        display: 'flex',
        padding: '0 350px',
    },
})

export const MenuOptionsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '650px',
    height: '60px',
})

export const Imagem = styled(Image)({
    width: '200px',
    height: 'auto',
})
