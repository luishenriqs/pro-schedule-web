import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '80px',
    alignItems: 'center',
    justifyContent: 'center',
})

export const SchedulingContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '15px 0 25px',
})

export const LegendContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    marginTop: '3px',
    alignItems: 'center',
    justifyContent: 'center',
})

export const Legend = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '30px',
    height: '15px',
    borderRadius: '6px',
    marginRight: '10px',
    background: COLORS.primary,
})
