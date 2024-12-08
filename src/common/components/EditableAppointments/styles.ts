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
    '@media (min-width:1024px)': {
        marginTop: '0px',
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

export const EnabledContainer = styled(Box)({
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

export const DisabledContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    height: '40px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: COLORS.primary,
    background: COLORS.background,
})
