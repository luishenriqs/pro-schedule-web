import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from './styles'
import { LoadingProps } from '@common/models'

export const LoadingComponent = ({ size = 'large' }: LoadingProps) => {
    return (
        <Container size={size}>
            <CircularProgress />
        </Container>
    )
}
