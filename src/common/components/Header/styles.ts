import styled, { css } from 'styled-components'
import { Box, IconButton } from '@mui/material'
import theme from '@common/styles/theme'

export const Container = styled(Box)({
    width: '100%',
    background: theme.COLORS.background,
})

export const HeaderWrapper = styled(Box)({
    width: '100%',
    height: '100px',
    alignItems: 'center',
    flexDirection: 'column',
    background: theme.COLORS.background,
})

export const HeaderContent = styled(Box)({
    display: 'flex',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 15px 0',
})

export const IconContainer = styled(Box)({
    display: 'flex',
    width: '80px',
    height: '80px',
    borderRadius: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
})

export const Line = styled(Box)({
    border: 'solid 0.5px',
    borderColor: theme.COLORS.primary,
})

export const ButtonIcon = styled(IconButton)({
    width: '60px',
    height: '60px',
    borderRadius: '50px',
})
