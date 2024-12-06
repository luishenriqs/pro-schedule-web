import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, TitleContainer } from './styles'

export const PaymentComponent = () => {
    const router = useRouter()
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        {user && <Genos_Secondary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Faça o pagamento" />
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
