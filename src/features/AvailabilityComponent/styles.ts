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
    height: '100vh',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: '50px',
    background: COLORS.background,

    '@media (min-width:1024px)': {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
})

export const LeftSide = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRight: '1px solid',
    borderColor: COLORS.disabled_200,

    '@media (min-width:1024px)': {
        width: '50vw',
    },
})

export const RightSide = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderLeft: '1px solid',
    borderColor: COLORS.disabled_200,

    '@media (min-width:1024px)': {
        width: '50vw',
    },
})

export const DateContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '30px 10px',
    background: COLORS.background,
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

export const EmptyLegend = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '30px',
    height: '15px',
    borderRadius: '6px',
    marginRight: '10px',
    border: '1px solid',
    borderColor: COLORS.primary,
    background: COLORS.background,
})
