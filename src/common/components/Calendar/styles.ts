import { Box, Button } from '@mui/material'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { COLORS } from '@common/styles/theme'
import styled from 'styled-components'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid',
    borderColor: COLORS.secondary,
    borderRadius: '6px',
    padding: '15px',
    background: COLORS.tertiary,
})

export const CalendarContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
})

export const Header = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

export const DaysWeekContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    background: COLORS.secondary,
})

export const HeaderLabel = styled(Box)({
    margin: '15px 10px',
})

export const EnabledButton = styled(Button)({
    background: COLORS.primary,
})

export const DisabledButton = styled(Button)({
    background: COLORS.tertiary,
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
