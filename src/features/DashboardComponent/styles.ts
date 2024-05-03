import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'flex-start',
})

export const DashboardContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    overflowY: 'scroll',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})

export const PresentationContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '400px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})
