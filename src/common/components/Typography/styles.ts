import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

// PRIMARY
export const GenosPrimary20_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.genos,
    color: COLORS.primary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[500],
})

export const QuestrialPrimary20_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.questrial,
    color: COLORS.primary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[500],
})

export const GenosPrimary16_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.genos,
    color: COLORS.primary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})

export const QuestrialPrimary16_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.questrial,
    color: COLORS.primary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})

// SECONDARY
export const GenosSecondary20_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.genos,
    color: COLORS.secondary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[500],
})

export const QuestrialSecondary20_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.questrial,
    color: COLORS.secondary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[500],
})

export const GenosSecondary16_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.genos,
    color: COLORS.secondary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})

export const QuestrialSecondary16_500 = styled(Typography)({
    fontFamily: FONT_FAMILY.questrial,
    color: COLORS.secondary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})
