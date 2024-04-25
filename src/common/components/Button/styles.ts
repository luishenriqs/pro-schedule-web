import { styled } from '@mui/system'
import { Box, Button, Typography } from '@mui/material'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const PrimaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.primary,
    marginTop: '16px',
    width: '250px',
    height: '40px',
})

export const SecondaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.secondary,
    marginTop: '16px',
    width: '250px',
    height: '40px',
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

export const PrimaryTitle = styled(Typography)({
    color: COLORS.font_primary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
})

export const SecondaryTitle = styled(Typography)({
    color: COLORS.font_secondary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
})
