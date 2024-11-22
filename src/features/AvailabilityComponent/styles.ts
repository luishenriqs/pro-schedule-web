import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
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
    width: '100vw',
    height: 'auto',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '50px',
})

export const DateContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '30px',
})
