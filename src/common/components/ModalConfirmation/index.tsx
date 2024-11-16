import React from 'react'
import { Modal } from '@mui/material'
import { ModalProps } from './model'
import { FilledPrimaryButton } from '../Button'
import { GenosSecondaryButtonText } from '../ButtonText'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { Questrial_Secondary_16_500, Questrial_Secondary_20_700 } from '../Typography'
import { formatDate, integerToTime, sortPayloadsByDate } from '@common/utils/helpers'
import { Container, AppointmentsContainer, ContentContainer } from './styles'

export const ModalConfirmation = ({ open, handleClose, ...props }: ModalProps) => {
    const { payloads, clearPayloads } = usePayload()
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
                {payloads && payloads.length > 1 ? (
                    <Questrial_Secondary_20_700 text="Suas reservas:" />
                ) : (
                    <Questrial_Secondary_20_700 text="Sua reserva:" />
                )}
                <AppointmentsContainer>
                    {payloads &&
                        sortPayloadsByDate(payloads).map((item, index) => (
                            <Questrial_Secondary_16_500
                                key={index}
                                text={`${formatDate(item.day, item.month, item.year)} as ${integerToTime(item.hour)}`}
                            />
                        ))}
                </AppointmentsContainer>
                <Questrial_Secondary_16_500 text="Ir para pagamento?" />
                <FilledPrimaryButton title="Pagamento" onClick={() => {}} />
                <ContentContainer>
                    <Questrial_Secondary_16_500 text="Reservar mais horários?" />
                    <GenosSecondaryButtonText title="Novo Agendamento" size="medium" onClick={() => handleClose()} />
                </ContentContainer>
                <ContentContainer>
                    <Questrial_Secondary_16_500 text="Cancelar reservas?" />
                    <GenosSecondaryButtonText
                        title="Cancelar"
                        size="medium"
                        onClick={() => {
                            handleClose()
                            clearPayloads()
                        }}
                    />
                </ContentContainer>
            </Container>
        </Modal>
    )
}
