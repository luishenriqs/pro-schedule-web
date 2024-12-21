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
    maxHeight: '650px',
    padding: '24px 50px',
    borderRadius: '8px',
    border: 'none',
    background: COLORS.white,

    '@media (min-width:500px)': {
        width: '400px',
    },
})

export const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    marginBottom: '24px',
})

export const MessageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24px',
})
