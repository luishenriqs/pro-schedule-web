import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

export const Text_Primary_24_700 = styled(Typography)({
    color: COLORS.font_primary,
    fontSize: FONT_SIZE[24],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Primary_20_700 = styled(Typography)({
    color: COLORS.font_primary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Primary_16_700 = styled(Typography)({
    color: COLORS.font_primary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Primary_16_500 = styled(Typography)({
    color: COLORS.font_primary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})

export const Text_Secondary_24_700 = styled(Typography)({
    color: COLORS.font_secondary,
    fontSize: FONT_SIZE[24],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Secondary_20_700 = styled(Typography)({
    color: COLORS.font_secondary,
    fontSize: FONT_SIZE[20],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Secondary_16_700 = styled(Typography)({
    color: COLORS.font_secondary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[700],
})

export const Text_Secondary_16_500 = styled(Typography)({
    color: COLORS.font_secondary,
    fontSize: FONT_SIZE[16],
    fontWeight: FONT_WEIGHT[500],
})
