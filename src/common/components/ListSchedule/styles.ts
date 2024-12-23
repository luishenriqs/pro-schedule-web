import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

type ButtonHourProps = {
    color: 'primary' | 'background' | 'tertiary'
}

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '300px',
    maxHeight: 'auto',
    border: '1px solid',
    borderColor: COLORS.secondary,
    borderRadius: '6px',
    padding: '16px',
    marginBottom: '5px',

    '@media (min-width:420px)': {
        width: '400px',
    },

    '@media (min-width:520px)': {
        width: '500px',
    },
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '100%',
    maxHeight: '400px',
})

export const DateSeparator = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px',
    margin: '8px',
    borderRadius: '6px',
})

export const DateContentRow = styled(Box)({
    display: 'none',
    flexDirection: 'row',

    '@media (min-width:420px)': {
        display: 'flex',
    },
})

export const DateContentColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width:420px)': {
        display: 'none',
    },
})

export const Row = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    borderBottom: '1px solid #e0e0e0',
})

export const HourContainer = styled(Box)<ButtonHourProps>(({ color }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '30px',
    border: '1px solid',
    borderColor: COLORS.primary,
    borderRadius: '6px',
    background: COLORS[color as keyof typeof COLORS] || color,
}))

export const NameContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '280px',
    height: '30px',
    gap: '8px',
    borderRadius: '6px',
})
