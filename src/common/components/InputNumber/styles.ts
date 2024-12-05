import styled from 'styled-components'
import { Box } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
})

export const UpArrowIcon = styled(KeyboardArrowUpIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
})

export const DownArrowIcon = styled(KeyboardArrowDownIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
})
