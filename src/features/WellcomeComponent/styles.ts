import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})

export const Imagem = styled(Image)({
    marginTop: '50px',
    marginBottom: '50px',
    width: '320px',
    height: '320px',

    '@media (min-width:1500px)': {
        width: '400px',
        height: '400px',
    },
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

export const Title = styled(Typography)({
    color: COLORS.font_primary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
})
