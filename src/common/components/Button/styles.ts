import { styled } from '@mui/system'
import { Box, Button, Typography } from '@mui/material'
import { COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from '@common/styles/theme'

export const OutlinePrimaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.background,
    marginTop: '16px',
    width: '250px',
    height: '40px',
    border: '1px solid',
    borderColor: COLORS.primary,
})

export const OutlineSecondaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.background,
    marginTop: '16px',
    width: '250px',
    height: '40px',
    border: '1px solid',
    borderColor: COLORS.secondary,
})

export const FilledPrimaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.primary,
    marginTop: '16px',
    width: '250px',
    height: '40px',
})

export const FilledSecondaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.secondary,
    marginTop: '16px',
    width: '250px',
    height: '40px',
})

export const WhiteText = styled(Typography)({
    color: COLORS.white,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
    fontFamily: FONT_FAMILY.questrial,
})

export const PrimaryText = styled(Typography)({
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
    fontFamily: FONT_FAMILY.questrial,
})

export const SecondaryText = styled(Typography)({
    color: COLORS.secondary,
    fontWeight: FONT_WEIGHT[700],
    fontSize: FONT_SIZE[20],
    fontFamily: FONT_FAMILY.questrial,
})
