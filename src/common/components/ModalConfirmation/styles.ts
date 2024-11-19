import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: 'auto',
    padding: '24px',
    borderRadius: '8px',
    border: 'none',
    background: COLORS.white,

    '@media (min-width:760px)': {
        width: '500px',
    },
})

export const AppointmentsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    overflowY: 'scroll',
    marginTop: '6px',
    borderRadius: '8px',
})

export const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    marginBottom: '30px',
})
