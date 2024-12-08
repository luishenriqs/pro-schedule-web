import React, { useMemo } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { SelectedDataProps } from '@common/models'
import { formatDate, integerToTime } from '@common/utils/helpers'
import { Container, DisabledContainer, EnabledContainer, TitleContainer } from './styles'

export const EditableAppointments = ({ appointmentsData, legend, handleSetAppointments }: SelectedDataProps) => {
    // Garantir que dados básicos estejam disponíveis
    const date = appointmentsData ? formatDate(appointmentsData.day, appointmentsData.month, appointmentsData.year) : ''

    // Gerar lista de horários com ou sem dados
    const hoursList = useMemo(() => {
        if (!appointmentsData || !appointmentsData.data) return null

        return appointmentsData.data.map((data, index) =>
            data.enable ? (
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
                    onClick={() => handleSetAppointments(data)}
                    aria-label={`Horário indisponível: ${integerToTime(data.hour)}`}
                >
                    <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                </DisabledContainer>
            )
        )
    }, [appointmentsData, handleSetAppointments])

    // Renderizar somente se houver data
    if (!appointmentsData) {
        return (
            <Container>
                <TitleContainer>
                    <Genos_Secondary_24_500 text="Nenhuma data selecionada" />
                </TitleContainer>
            </Container>
        )
    }

    return (
        <Container>
            <TitleContainer>
                <Genos_Secondary_24_500 text={legend ?? ''} />
                <Genos_Primary_24_500 text={`Dia ${date}`} />
            </TitleContainer>
            {hoursList}
        </Container>
    )
}
