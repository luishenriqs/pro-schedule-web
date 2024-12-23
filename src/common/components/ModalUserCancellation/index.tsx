import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useNotification } from '@common/hooks/useNotification'
import { CancelAppointment, updateUserCredits } from '@common/api'
import { FilledPrimaryButton } from '../Button'
import { GenosSecondaryButtonText } from '../ButtonText'
import { ModalProps } from './model'
import { DeadlineObject } from '@common/models'
import { ModalCancelInfo } from '../ModalCancelInfo'
import {
    availableCancellationTime,
    formatDate,
    getBrasiliaOfficialTime,
    getTodayDate,
    integerToTime,
} from '@common/utils/helpers'
import {
    Genos_Secondary_24_500,
    Questrial_Error_16_500,
    Questrial_Secondary_16_500,
    Questrial_Secondary_16_700,
} from '../Typography'
import { Container, ContentContainer, MessageContainer } from './styles'

export const ModalUserCancellation = ({ open, payload, handleClose, ...props }: ModalProps) => {
    const { emmitError } = useNotification()

    const [date, setDate] = useState<string>('')
    const [openCancelInfoModal, setOpenCancelInfoModal] = useState(false)
    const [cancelInfoMessage, setCancelInfoMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')

    useEffect(() => {
        const formattedDate = formatDate(payload.day, payload.month, payload.year)
        setDate(formattedDate)
    }, [payload.day, payload.month, payload.year])

    const { currentYear, currentMonth, currentDay } = getTodayDate()
    const brasiliaOfficialTime = getBrasiliaOfficialTime()

    const deadLine: DeadlineObject = {
        year: currentYear,
        month: currentMonth,
        day: currentDay,
        hour: brasiliaOfficialTime,
    }

    const receivesCredit = availableCancellationTime(payload, deadLine)

    const handleCancelAppointment = useCallback(async () => {
        if (!payload) return

        try {
            const cancelResponse = await CancelAppointment(payload)

            // Se cancelamento for bem-sucedido e apto a crédito, atualiza os créditos
            if (cancelResponse?.success) {
                if (payload.userEmail && receivesCredit) {
                    const resp = await updateUserCredits(payload.userEmail, 'plus', 1)
                    if (resp?.success) {
                        setCancelInfoMessage('Consulta cancelada com sucesso!')
                        setInfoMessage('Você recebeu um crédito para reagendamento!')
                        setOpenCancelInfoModal(true)
                    }
                } else {
                    setCancelInfoMessage('Consulta cancelada com sucesso!')
                    setInfoMessage('')
                    setOpenCancelInfoModal(true)
                }
            } else {
                console.error('Erro ao cancelar o agendamento.')
                emmitError('Erro ao cancelar o agendamento.')
            }
        } catch (error) {
            console.error('Erro na requisição.', error)
            emmitError('Não foi possível completar a requisição!')
        }
    }, [emmitError, payload, receivesCredit])

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
                    <MessageContainer>
                        <Questrial_Secondary_16_500
                            text={`Você deseja cancelar a consulta com o Dr. Flávio , no dia ${date}, as ${integerToTime(payload.hour)} horas?`}
                        />
                        {receivesCredit ? (
                            <Questrial_Secondary_16_700
                                text={`Em caso afirmativo você receberá um crédito para agendamento de uma nova data.`}
                            />
                        ) : (
                            <Questrial_Secondary_16_700
                                text={`Este cancelamento não gerará crédito para reagendamento!`}
                            />
                        )}
                    </MessageContainer>
                    <Questrial_Error_16_500
                        text={`Obs: Cancelamentos realizados com menos de 48 horas de antecedência não geram crédito para remarcação!`}
                    />
                </ContentContainer>
                <FilledPrimaryButton title="Confirmar" onClick={handleCancelAppointment} />
                <ContentContainer>
                    <GenosSecondaryButtonText title="Voltar" size="medium" onClick={handleClose} />
                </ContentContainer>
                <ModalCancelInfo
                    open={openCancelInfoModal}
                    message={cancelInfoMessage}
                    info={infoMessage}
                    handleClose={() => setOpenCancelInfoModal(false)}
                />
            </Container>
        </Modal>
    )
}
