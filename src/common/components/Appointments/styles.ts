import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'
import styled from 'styled-components'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10px',
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

export const HoursContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    height: '40px',
    borderRadius: '6px',
    background: COLORS.primary,
})
