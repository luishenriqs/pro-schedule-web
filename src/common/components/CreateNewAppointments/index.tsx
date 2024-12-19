import React, { useCallback, useEffect, useState } from 'react'
import { NewScheduleProps, ScheduleObjectProps } from '@common/models'
import { GetScheduleByDay } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'
import { TimeSelection } from '../TimeSelection'
import { FilledPrimaryButton } from '../Button'
import { CheckNewDayPayloadAvailability, createNewDayPayload, formatDate } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { ButtonsContainer, Container, DateContent, TitleContainer } from './styles'

export const CreateNewAppointments = ({ selectNewDay, legend, handleSetAppointment }: NewScheduleProps) => {
    const { emmitAlert } = useNotification()

    const [date, setDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [newPayload, setNewPayload] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [payloadAvailability, setPayloadAvailability] = useState<boolean>(false)

    const getPreviusAgenda = useCallback(async () => {
        try {
            const previusAgenda = await GetScheduleByDay(selectNewDay.year, selectNewDay.month, selectNewDay.day)
            if (previusAgenda) {
                const payloadAvailable = CheckNewDayPayloadAvailability(previusAgenda, newPayload)
                setPayloadAvailability(payloadAvailable)
            }
        } catch (error) {
            console.error('Erro ao processar a requisição GetScheduleByDay!', error)
        }
    }, [newPayload, selectNewDay.day, selectNewDay.month, selectNewDay.year])

    useEffect(() => {
        getPreviusAgenda()
    }, [getPreviusAgenda])

    const handleNewAppointment = useCallback(() => {
        if (selectedTime.length === 0) {
            emmitAlert('Selecione um horário!')
        } else {
            if (payloadAvailability) {
                handleSetAppointment(newPayload)
            } else {
                emmitAlert('Horário não disponível!')
            }
        }
    }, [emmitAlert, handleSetAppointment, newPayload, payloadAvailability, selectedTime.length])

    useEffect(() => {
        const { year, month, day } = selectNewDay
        const date = formatDate(day, month, year)
        setDate(date)
    }, [selectNewDay])

    const handleTimeChange = (times: string[]) => {
        setSelectedTime(times)
    }

    useEffect(() => {
        const payload = createNewDayPayload(selectNewDay, selectedTime)
        setNewPayload(payload)
    }, [selectNewDay, selectedTime])

    return (
        <Container>
            <TitleContainer>
                <Genos_Secondary_24_500 text={legend} />
                <Genos_Primary_24_500 text={'Dia ' + date} />
            </TitleContainer>
            <DateContent>
                <Genos_Secondary_24_500 text="Escolha os horários de ínicio de cada atendimento:" />
                <TimeSelection onChange={handleTimeChange} verticalVersion={true} />
            </DateContent>
            <ButtonsContainer>
                <FilledPrimaryButton title="Adicionar Agenda" onClick={handleNewAppointment} />
            </ButtonsContainer>
        </Container>
    )
}
