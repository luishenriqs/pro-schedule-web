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
    justifyContent: 'center',
    height: 'auto',
    width: '50vw',

    '@media (min-width:600px)': {
        width: '30vw',
    },
    '@media (min-width:900px)': {
        width: '20vw',
    },
    '@media (min-width:1500px)': {
        width: '10vw',
    },
})

export const Imagem = styled(Image)({
    width: '200px',
    height: '200px',

    '@media (min-width:600px)': {
        width: '180px',
        height: '180px',
    },
    '@media (min-width:900px)': {
        width: '160px',
        height: '160px',
    },
    '@media (min-width:1500px)': {
        width: '150px',
        height: '150px',
    },
})

export const MenuContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    width: '100%',

    '@media (min-width:600px)': {
        width: '180px',
    },
    '@media (min-width:900px)': {
        width: '160px',
    },
    '@media (min-width:1500px)': {
        width: '150px',
    },
})

export const ButtonIcon = styled(IconButton)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '60px',
    borderRadius: '50px',
})

export const IconHome = styled(HomeOutlinedIcon)({
    width: '30px',
    height: '30px',
    marginRight: '8px',
    color: COLORS.font_primary,
})

export const IconCalendar = styled(CalendarMonthOutlinedIcon)({
    width: '30px',
    height: '30px',
    marginRight: '8px',
    color: COLORS.font_primary,
})
