import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { COLORS } from '@common/styles/theme'

type LegendProps = {
    color: 'primary' | 'background' | 'tertiary'
}

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: COLORS.background,
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100vw',
    height: 'auto',
    overflowY: 'auto',
})

export const ButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '140px',
    height: 'auto',
    marginTop: '15px',
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    marginBottom: '10px',
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

export const Legend = styled(Box)<LegendProps>(({ color }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '30px',
    height: '15px',
    borderRadius: '6px',
    marginRight: '10px',
    border: '1px solid',
    borderColor: COLORS.primary,
    background: COLORS[color as keyof typeof COLORS] || color,
}))

export const RotateIcon = styled(AutorenewIcon)({
    color: COLORS.primary,
    width: '15px',
    height: '15px',
    marginLeft: '5px',
})
