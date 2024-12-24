import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const OutlinePrimaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.background,
    marginTop: '16px',
    width: '260px',
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
    width: '260px',
    height: '40px',
    border: '1px solid',
    borderColor: COLORS.secondary,
})

export const OutlineErrorContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.background,
    marginTop: '16px',
    width: '260px',
    height: '40px',
    border: '1px solid',
    borderColor: COLORS.error,
})

export const FilledPrimaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.primary,
    marginTop: '16px',
    width: '260px',
    height: '40px',
})

export const FilledSecondaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.secondary,
    marginTop: '16px',
    width: '260px',
    height: '40px',
})

export const FilledTertiaryContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.tertiary,
    marginTop: '16px',
    width: '260px',
    height: '40px',
})

export const FilledErrorContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.error,
    marginTop: '16px',
    width: '260px',
    height: '40px',
})
