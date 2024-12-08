import React, { useEffect, useMemo, useState } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { SelectedDataProps } from '@common/models'
import { formatDate, integerToTime } from '@common/utils/helpers'
import { Container, DisabledContainer, EnabledContainer, TitleContainer } from './styles'

export const Appointments = ({ appointmentsData, handleSetAppointments }: SelectedDataProps) => {
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const { year, month, day } = appointmentsData
        const date = formatDate(day, month, year)
        setDate(date)
    }, [appointmentsData])

    const hoursList = useMemo(() => {
        if (!appointmentsData || !appointmentsData.data) return null

        return appointmentsData.data.map((data, index) =>
            data.userEmail?.length === 0 ? (
                <EnabledContainer
                    key={index}
                    onClick={() => handleSetAppointments(data)}
                    aria-label={`Horário disponível: ${integerToTime(data.hour)}`}
                >
                    <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                </EnabledContainer>
            ) : (
                <DisabledContainer
                    key={index}
                    onClick={() => {}}
                    aria-label={`Horário indisponível: ${integerToTime(data.hour)}`}
                >
                    <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                </DisabledContainer>
            )
        )
    }, [appointmentsData, handleSetAppointments])

    return (
        <Container>
            <TitleContainer>
                <Genos_Secondary_24_500 text="Escolha o seu horário" />
                <Genos_Primary_24_500 text={'Dia ' + date} />
            </TitleContainer>
            {hoursList}
        </Container>
    )
}
