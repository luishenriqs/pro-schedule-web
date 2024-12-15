import React, { useEffect, useState } from 'react'
import { NewScheduleProps, ScheduleObjectProps } from '@common/models'
import { TimeSelection } from '../TimeSelection'
import { FilledPrimaryButton } from '../Button'
import { createNewDayPayload, formatDate } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { ButtonsContainer, Container, DateContent, TitleContainer } from './styles'

export const CreateNewAppointments = ({ selectNewDay, legend, handleSetNewDay }: NewScheduleProps) => {
    const [date, setDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [newDayPayload, setNewDayPayload] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])

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
        setNewDayPayload(payload)
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
                <FilledPrimaryButton title="Adicionar Agenda" onClick={() => handleSetNewDay(newDayPayload)} />
            </ButtonsContainer>
        </Container>
    )
}
