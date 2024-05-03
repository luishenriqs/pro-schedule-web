import React, { useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { UserStateChanged } from '@common/api'
import { TextPrimary20_700, TextPrimary16_500, TextSecondary24_700 } from '@common/components/Typography'
import { Banner } from '@common/components/banner'
import { Container, DashboardContent, PresentationContainer } from './styles'

export const DashboardComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    useEffect(() => {
        const user = UserStateChanged()
        // console.log('Usuário logado ------> ', JSON.stringify(user))
        user && setUser(user)
    }, [])

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <Container>
                    <Header title="Início" />
                    <DashboardContent>
                        <Banner />
                        <PresentationContainer />
                    </DashboardContent>
                </Container>
            )}
        </>
    )
}
