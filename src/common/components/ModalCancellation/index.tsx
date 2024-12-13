import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import { CancelAppointment, updateUserCredits } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'
import { FilledPrimaryButton } from '../Button'
import { GenosSecondaryButtonText } from '../ButtonText'
import { ModalProps } from './model'
import { formatDate, integerToTime } from '@common/utils/helpers'
import { Genos_Secondary_24_500, Questrial_Secondary_16_500 } from '../Typography'
import { Container, ContentContainer } from './styles'

export const ModalCancellation = ({ open, payload, handleClose, ...props }: ModalProps) => {
    const router = useRouter()
    const { emmitSuccess, emmitError } = useNotification()

    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const formattedDate = formatDate(payload.day, payload.month, payload.year)
        setDate(formattedDate)
    }, [payload.day, payload.month, payload.year])

    const handleCancelAppointment = useCallback(async () => {
        if (!payload) return

        try {
            const cancelResponse = await CancelAppointment(payload)

            // Se cancelamento for bem-sucedido, atualiza os créditos
            if (cancelResponse?.success) {
                if (payload.userEmail) {
                    await updateUserCredits(payload.userEmail, 'plus', 1)
                    emmitSuccess('Agendamento cancelado com sucesso!')
                } else {
                    console.error('Email do usuário não encontrado')
                    emmitError('Erro: email do usuário não encontrado.')
                }
            } else {
                console.error('Erro ao cancelar o agendamento.')
                emmitError('Erro ao cancelar o agendamento.')
            }
        } catch (error) {
            console.error('Erro na requisição.', error)
            emmitError('Não foi possível completar a requisição!')
        } finally {
            router.refresh()
        }
    }, [emmitError, emmitSuccess, payload, router])

    return (
        <Modal
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="dialog-description"
            {...props}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Container>
                <Genos_Secondary_24_500 text="Cancelar Atendimento" />
                <ContentContainer>
                    <Questrial_Secondary_16_500
                        text={`Você deseja cancelar o atendimento para ${payload.firstName} , no dia ${date}, as ${integerToTime(payload.hour)} horas?`}
                    />
                    <Questrial_Secondary_16_500
                        text={`Este horário ficará desabilitado e ${payload.firstName} receberá um crédito para agendamento de uma nova data.`}
                    />
                </ContentContainer>
                <FilledPrimaryButton title="Confirmar" onClick={handleCancelAppointment} />
                <ContentContainer>
                    <GenosSecondaryButtonText title="Fechar" size="medium" onClick={handleClose} />
                </ContentContainer>
            </Container>
        </Modal>
    )
}
