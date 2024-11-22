import styled from 'styled-components'
import { Box, Button } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 10px',
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const DataContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',

    '@media (min-width:1024px)': {
        flexDirection: 'row',
    },
})

export const DateContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    borderRadius: '8px',
    margin: '10px',
})

export const PlusButtonContainer = styled(Button)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: COLORS.background,
    width: '260px',
    height: '55px',
    border: '1px solid',
    borderColor: COLORS.primary,
})

export const CalendarMenu = styled(CalendarMonthOutlinedIcon)({
    color: COLORS.secondary,
    width: '25px',
    height: '25px',
    '@media (min-width:760px)': {
        width: '35px',
        height: '35px',
    },
})
