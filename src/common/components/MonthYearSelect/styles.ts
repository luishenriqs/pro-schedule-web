import styled from 'styled-components'
import { Box } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 10px',

    '@media (min-width:1224px)': {
        flexDirection: 'row',
    },
})

export const SelectContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px',
    height: 'auto',
    borderRadius: '8px',
    margin: '10px 0',

    '@media (min-width:1224px)': {
        margin: '0 10px',
    },
})
