import { styled } from '@mui/material/styles'
import { Box, IconButton } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '50px',

    '@media (min-width:760px)': {
        height: '60px',
    },
    '@media (min-width:1024px)': {
        display: 'flex',
    },
})

export const ImageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    height: '60px',
    paddingLeft: '40px',
})

export const MenuOptionsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    height: '60px',

    '@media (min-width:1024px)': {
        padding: '0 25px',
    },

    '@media (min-width:1440px)': {
        padding: '0 50px',
    },
})

export const ButtonIcon = styled(IconButton)({
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    paddingRight: '40px',
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

export const Empty = styled(Box)({
    width: '25px',
    height: '25px',
})

export const RedCircle = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15px',
    height: '15px',
    padding: '5px',
    borderRadius: '50%',
    marginTop: '-15px',
    marginLeft: '-10px',
    background: COLORS.error,
})
