import { styled } from '@mui/material/styles'
import { rgba } from 'polished'
import Image from 'next/image'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'flex-start',
})

export const DashContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    overflowY: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})

export const PresentationContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS.background,
    paddingBottom: '30px',

    '@media (min-width:1024px)': {
        flexDirection: 'row',
        paddingBottom: '0px',
    },
})

export const Imagem = styled(Image)({
    width: '100%',
    height: 'auto',

    '@media (min-width:1024px)': {
        width: '40%',
    },
})

export const MessageMobileContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 20px',

    '@media (min-width:1024px)': {
        display: 'none',
        padding: '0px 30px',
    },
})

export const MessageContainer = styled(Box)({
    display: 'none',
    flexDirection: 'column',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 30px',

    '@media (min-width:1024px)': {
        display: 'flex',
    },
})

export const MessageTitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const MessageContent = styled(Box)({})

export const TextContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20px 30px',

    '@media (min-width:1024px)': {
        padding: '15px 30px',
    },
})

export const ServicesContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS.background,
    paddingBottom: '30px',

    '@media (min-width:1024px)': {
        flexDirection: 'row',
        paddingBottom: '0px',
    },
})

export const Card = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
})

export const ServiceImagem = styled(Image)({
    width: '100vw',
    height: '100vw',

    // '@media (min-width:1024px)': {
    //     width: '33%',
    // },
})
