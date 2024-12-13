import React, { useEffect, useMemo, useState } from 'react'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { AppointmentsManagedProps } from '@common/models'
import { COLORS } from '@common/styles/theme'
import { formatDate, integerToTime, sortAppointmentsByHour } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_24_500 } from '../Typography'
import { ButtonContainer, Container, DisabledContainer, EnabledContainer, TitleContainer } from './styles'

export const AppointmentsManaged = ({
    appointmentsData,
    legend,
    handleToggleAvailability,
    handleOpenCancelModal,
    handleCreateNewSchedule,
}: AppointmentsManagedProps) => {
    const { year, month, day } = appointmentsData
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const formattedDate = formatDate(day, month, year)
        setDate(formattedDate)
    }, [day, month, year])

    const hoursList = useMemo(() => {
        if (!appointmentsData || !appointmentsData.data) return null

        return sortAppointmentsByHour(appointmentsData).data.map((data, index) => {
            if (data.enable && !data.userEmail && !data.userId) {
                // Caso 1: Horário disponível
                return (
                    <EnabledContainer
                        key={index}
                        onClick={() => handleToggleAvailability(data)}
                        aria-label={`Horário disponível: ${integerToTime(data.hour)}`}
                    >
                        <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                    </EnabledContainer>
                )
            } else if (!data.enable) {
                // Caso 2: Horário indisponível (enable = false)
                return (
                    <DisabledContainer
                        key={index}
                        onClick={() => handleToggleAvailability(data)}
                        aria-label={`Horário indisponível: ${integerToTime(data.hour)}`}
                    >
                        <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                    </DisabledContainer>
                )
            } else if (data.userEmail && data.userId) {
                // Caso 3: Horário indisponível (userEmail e userId preenchidos)
                return (
                    <DisabledContainer
                        key={index}
                        onClick={() => handleOpenCancelModal(data)}
                        aria-label={`Horário indisponível: ${integerToTime(data.hour)}`}
                        style={{ background: COLORS.tertiary }}
                    >
                        <Genos_White_24_500
                            text={integerToTime(data.hour) + ' - ' + data.firstName + ' ' + data.lastName}
                        />
                    </DisabledContainer>
                )
            }
            return null
        })
    }, [appointmentsData, handleToggleAvailability, handleOpenCancelModal])

    return (
        <Container>
            <TitleContainer>
                <Genos_Secondary_24_500 text={legend} />
                <Genos_Primary_24_500 text={'Dia ' + date} />
            </TitleContainer>
            {hoursList}
            <ButtonContainer>
                <GenosPrimaryButtonText
                    title="Adicionar novo horário"
                    size="medium"
                    onClick={() => handleCreateNewSchedule(day, month, year)}
                />
            </ButtonContainer>
        </Container>
    )
}
