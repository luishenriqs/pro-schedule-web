import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

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
