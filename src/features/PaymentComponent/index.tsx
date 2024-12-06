import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@common/hooks/contexts/UserContext'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { LoadingComponent } from '@common/components/Loading'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, TitleContainer } from './styles'

export const PaymentComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { payloads } = usePayload()

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    useEffect(() => {
        console.log('payloads ', JSON.stringify(payloads))
    }, [payloads])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <TitleContainer>
                        {user && <Genos_Primary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Finalize seu agendamento" />
                    </TitleContainer>
                    <Content>
                        <GenosPrimaryButtonText title="Voltar" size="small" onClick={() => router.back()} />
                    </Content>
                </>
            )}
        </Container>
    )
}
