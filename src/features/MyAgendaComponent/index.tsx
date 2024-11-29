import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, TitleContainer } from './styles'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'

export const MyAgendaComponent = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)

    const userName = 'Flávio'

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Secondary_24_500 text={'Olá ' + userName} />
                        <Genos_Secondary_24_500 text="Gerencie a sua agenda" />
                    </TitleContainer>
                    <Content>
                        <GenosPrimaryButtonText
                            title="Voltar para agenda"
                            size="small"
                            onClick={() => router.push('/')}
                        />
                    </Content>
                </>
            )}
        </Container>
    )
}
