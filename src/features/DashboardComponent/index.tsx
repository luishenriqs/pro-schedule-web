import React from 'react'
import { Header } from '@common/components/Header'
import { Container, DashboardContent } from './styles'
import { TextPrimary20bold } from '@common/components/Typography'

export const DashboardComponent = () => {
    return (
        <Container>
            <Header title="Início" />
            <DashboardContent>
                <TextPrimary20bold text='DASHBOARD COMPONENT' />
            </DashboardContent>
        </Container>
    )
}
