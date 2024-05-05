import React, { useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { UserStateChanged } from '@common/api'
import { Banner } from '@common/components/banner'
import { Container, DashContent, PresentationContainer } from './styles'

export const DashComponent = () => {
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
                    <Header />
                    <DashContent>
                        <Banner />
                        <PresentationContainer />
                    </DashContent>
                </Container>
            )}
        </>
    )
}
