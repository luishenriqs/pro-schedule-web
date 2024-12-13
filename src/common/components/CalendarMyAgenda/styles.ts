import { Box } from '@mui/material'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { COLORS } from '@common/styles/theme'
import styled from 'styled-components'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    border: '1px solid',
    borderColor: COLORS.secondary,
    borderRadius: '6px',
    padding: '15px',
    background: COLORS.background,

    '@media (min-width:750px)': {
        width: '400px',
    },
})

export const CalendarControlContainer = styled(Box)({})

export const CalendarContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',

    '@media (min-width:750px)': {
        width: '100%',
    },
})

export const Header = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const DaysWeekContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    background: COLORS.tertiary,
})

export const HeaderLabel = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    margin: '15px 10px',
})

export const AvailableDayButton = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    background: COLORS.primary,

    '@media (min-width:750px)': {
        width: '45px',
        height: '45px',
    },
})

export const UnavailableDayButton = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    border: '1px solid',
    borderColor: COLORS.primary,
    borderRadius: '6px',
    background: COLORS.tertiary,

    '@media (min-width:750px)': {
        width: '45px',
        height: '45px',
    },
})

export const DisabledDayButton = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    background: COLORS.background,

    '@media (min-width:750px)': {
        width: '45px',
        height: '45px',
    },
})

export const CanceledDayButton = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: COLORS.primary,
    background: COLORS.background,

    '@media (min-width:750px)': {
        width: '45px',
        height: '45px',
    },
})

export const ArrowLeftIcon = styled(KeyboardArrowLeftOutlinedIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
})

export const ArrowLeftIconDisabled = styled(KeyboardArrowLeftOutlinedIcon)({
    color: COLORS.disabled_200,
    width: '25px',
    height: '25px',
})

export const ArrowRightIcon = styled(KeyboardArrowRightOutlinedIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
})
