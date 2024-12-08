import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@common/hooks/contexts/UserContext'
import { updateScheduleBatch } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { LoadingComponent } from '@common/components/Loading'
import { FilledPrimaryButton } from '@common/components/Button'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, TitleContainer } from './styles'

export const PaymentComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { payloads, clearPayloads } = usePayload()
    const { emmitSuccess, emmitError } = useNotification()

    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    const saveBookings = useCallback(async () => {
        setIsSaving(true)
        try {
            if (payloads) {
                await updateScheduleBatch(payloads)
                emmitSuccess('Reserva finalizada com sucesso!')
                clearPayloads()
                router.back()
            }
        } catch (error) {
            console.error('Erro ao finalizar operação.', error)
            emmitError('Erro ao finalizar operação.')
        } finally {
            setIsSaving(false)
        }
    }, [clearPayloads, emmitError, emmitSuccess, payloads, router])

    return (
        <>
            {isLoading || isSaving ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <TitleContainer>
                        {user && <Genos_Primary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Finalize seu agendamento" />
                    </TitleContainer>
                    <Content>
                        <FilledPrimaryButton title="Finalizar Agendamento" onClick={() => saveBookings()} />
                        <GenosPrimaryButtonText title="Voltar" size="small" onClick={() => router.back()} />
                    </Content>
                </Container>
            )}
        </>
    )
}
