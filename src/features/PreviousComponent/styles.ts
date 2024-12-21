import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    marginBottom: '30px',
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    maxHeight: '600px',
    overflowY: 'scroll',
    gap: '10px',
    marginBottom: '30px',
    padding: '10px',
})

export const AppointmentRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '10px 15px',
    borderRadius: '5px',
    background: COLORS.background,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
})

export const DateContentRow = styled(Box)({
    display: 'none',
    flexDirection: 'row',
    marginRight: '50px',

    '@media (min-width:495px)': {
        display: 'flex',
    },
})

export const DateContentColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginRight: '50px',

    '@media (min-width:495px)': {
        display: 'none',
    },
})

export const InfoContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
})
