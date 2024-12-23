import styled from 'styled-components'
import { Box, Button } from '@mui/material'
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

type ContentProps = {
    verticalVersion: boolean
}

export const Content = styled(Box)<ContentProps>(({ verticalVersion }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (min-width:1224px)': {
        flexDirection: verticalVersion ? 'column' : 'row',
    },
}))

export const TimeContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 30px 0 30px',
})

export const SelectContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    borderRadius: '8px',
    margin: '10px',
})

export const PickerContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: 'auto',
    borderRadius: '8px',
    margin: '0 10px',
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

export const TimesContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '240px',
})
