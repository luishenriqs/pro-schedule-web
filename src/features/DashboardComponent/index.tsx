import React, { useState } from 'react'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { TextPrimary20_700, TextPrimary16_500, TextSecondary24_700 } from '@common/components/Typography'
import { Container, DashboardContent } from './styles'

export const DashboardComponent = () => {
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    return (
        <Container>
            {isLoading
                ?   <LoadingComponent />
                :   <>
                        <Header title="Início" />
                        <DashboardContent>
                            <TextPrimary20_700 text='DASHBOARD COMPONENT' />
                            <TextPrimary16_500 text='DASHBOARD COMPONENT' />
                            <TextSecondary24_700 text='DASHBOARD COMPONENT' />
                        </DashboardContent>
                    </>
            }
        </Container>
    )
}
