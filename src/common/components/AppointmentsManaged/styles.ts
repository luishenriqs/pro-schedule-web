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
    padding: '15px 15px 30px',
    background: COLORS.background,
    marginBottom: '5px',

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

export const ButtonContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
})

export const AvailableHourButton = styled(Box)({
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

export const UnavailableHourButton = styled(Box)({
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
    background: COLORS.tertiary,
})

export const DisabledHourButton = styled(Box)({
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

export const ExpiredHourButton = styled(Box)({
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
    borderColor: COLORS.disabled_200,
    background: COLORS.background,
})
