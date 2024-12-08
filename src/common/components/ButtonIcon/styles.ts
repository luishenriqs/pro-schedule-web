import { styled } from '@mui/system'
import { Box, IconButton } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    width: '60px',
    height: '60px',
})

export const ButtonContainer = styled(IconButton)({
    border: 'none',
    width: '25px',
    height: '25px',

    '@media (min-width:1024px)': {
        width: '40px',
        height: '40px',
    },
})

export const IconContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
})
