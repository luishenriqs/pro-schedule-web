import styled from 'styled-components'
import { Box } from '@mui/material'

type ContainerProps = {
    size: 'small' | 'large'
}

export const Container = styled(Box)<ContainerProps>(({ size }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: size === 'large' ? '400px' : '150px',
    height: size === 'large' ? '400px' : '150px',
}))
