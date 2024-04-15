import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import theme from '@common/styles/theme'

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})

export const Text_Primary_25_bold = styled(Typography)({
    color: theme.COLORS.font_primary,
    fontSize: theme.FONT_SIZE.font_25,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Primary_20_bold = styled(Typography)({
    color: theme.COLORS.font_primary,
    fontSize: theme.FONT_SIZE.font_20,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Primary_16_bold = styled(Typography)({
    color: theme.COLORS.font_primary,
    fontSize: theme.FONT_SIZE.font_16,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Primary_16_medium = styled(Typography)({
    color: theme.COLORS.font_primary,
    fontSize: theme.FONT_SIZE.font_16,
    fontWeight: theme.FONT_FAMILY.medium,
})

export const Text_Secondary_25_bold = styled(Typography)({
    color: theme.COLORS.font_secondary,
    fontSize: theme.FONT_SIZE.font_25,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Secondary_20_bold = styled(Typography)({
    color: theme.COLORS.font_secondary,
    fontSize: theme.FONT_SIZE.font_20,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Secondary_16_bold = styled(Typography)({
    color: theme.COLORS.font_secondary,
    fontSize: theme.FONT_SIZE.font_16,
    fontWeight: theme.FONT_FAMILY.bold,
})

export const Text_Secondary_16_medium = styled(Typography)({
    color: theme.COLORS.font_secondary,
    fontSize: theme.FONT_SIZE.font_16,
    fontWeight: theme.FONT_FAMILY.medium,
})
