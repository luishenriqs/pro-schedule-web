import { styled } from '@mui/system'
import { Box, IconButton, Typography } from '@mui/material'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const PrimaryContainer = styled(IconButton)({
    border: 'none',
})

export const SecondaryContainer = styled(IconButton)({
    border: 'none',
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

export const MediumPrimaryTitle = styled(Typography)({
    color: COLORS.font_primary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
})

export const SmallPrimaryTitle = styled(Typography)({
    color: COLORS.font_primary,
    fontWeight: FONT_WEIGHT[500],
    fontSize: FONT_SIZE[14],
})

export const MediumSecondaryTitle = styled(Typography)({
    color: COLORS.font_secondary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
})

export const SmallSecondaryTitle = styled(Typography)({
    color: COLORS.font_secondary,
    fontWeight: FONT_WEIGHT[500],
    fontSize: FONT_SIZE[14],
})
