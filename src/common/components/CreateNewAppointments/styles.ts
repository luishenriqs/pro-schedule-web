import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'
import styled from 'styled-components'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20px',
    width: '300px',
    height: 'auto',
    border: '1px solid',
    borderColor: COLORS.secondary,
    borderRadius: '6px',
    padding: '15px',
    background: COLORS.background,

    '@media (min-width:750px)': {
        width: '400px',
    },
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    height: 'auto',
    borderRadius: '6px',

    '@media (min-width:750px)': {
        width: '400px',
    },
})

export const DateContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '30px 10px',
    background: COLORS.background,
})

export const ButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    marginTop: '20px',
})
