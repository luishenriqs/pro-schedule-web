import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Box, IconButton } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '70vw',
    height: '100vh',
    background: 'linear-gradient(to bottom, #F5F5F5, #F6EDCA)',

    '@media (min-width:425px)': {
        width: '60vw',
    },
    '@media (min-width:760px)': {
        width: '30vw',
    },
    '@media (min-width:1024px)': {
        width: '25vw',
    },
    '@media (min-width:1440px)': {
        width: '20vw',
    },
})

export const Imagem = styled(Image)({
    width: '80%',
    height: 'auto',
})

export const MenuContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
})

export const ButtonIcon = styled(IconButton)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
    paddingLeft: '20px',
    borderRadius: '50px',
})

export const IconHome = styled(HomeOutlinedIcon)({
    width: '30px',
    height: '30px',
    marginRight: '8px',
    color: COLORS.black,
})

export const IconCalendar = styled(CalendarMonthOutlinedIcon)({
    width: '30px',
    height: '30px',
    marginRight: '8px',
    color: COLORS.black,
})
