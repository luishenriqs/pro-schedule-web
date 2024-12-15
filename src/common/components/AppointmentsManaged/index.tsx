import React, { useEffect, useMemo, useState } from 'react'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { AppointmentsManagedProps } from '@common/models'
import {
    formatDate,
    getHourButtonType,
    integerToTime,
    isExpiredDay,
    sortAppointmentsByHour,
} from '@common/utils/helpers'
import { Genos_Disabled_24_500, Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_24_500 } from '../Typography'
import {
    AvailableHourButton,
    ButtonContainer,
    Container,
    DisabledHourButton,
    ExpiredHourButton,
    TitleContainer,
    UnavailableHourButton,
} from './styles'

export const AppointmentsManaged = ({
    appointmentsData,
    legend,
    handleToggleAvailability,
    handleOpenCancelModal,
    handleCreateNewSchedule,
}: AppointmentsManagedProps) => {
    const { year, month, day } = appointmentsData
    const expiredDay = isExpiredDay(day, month, year)

    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const formattedDate = formatDate(day, month, year)
        setDate(formattedDate)
    }, [day, month, year])

    const hoursList = useMemo(() => {
        if (!appointmentsData || !appointmentsData.data) return null

        return sortAppointmentsByHour(appointmentsData).data.map((data, index) => {
            const buttonType = getHourButtonType(data)

            switch (buttonType) {
                // Caso 1: Horário disponível
                case 'Available':
                    return (
                        <AvailableHourButton
                            key={index}
                            onClick={() => handleToggleAvailability(data)}
                            aria-label={`Horário disponível: ${integerToTime(data.hour)}`}
                        >
                            <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                        </AvailableHourButton>
                    )
                // Caso 2: Horário indisponível (userEmail e userId preenchidos)
                case 'Unavailable':
                    return (
                        <UnavailableHourButton
                            key={index}
                            onClick={() => handleOpenCancelModal(data)}
                            aria-label={`Horário indisponível: ${integerToTime(data.hour)}`}
                        >
                            <Genos_White_24_500
                                text={integerToTime(data.hour) + ' - ' + data.firstName + ' ' + data.lastName}
                            />
                        </UnavailableHourButton>
                    )
                // Caso 3: Horário desabilitado (enable = false)
                case 'Disabled':
                    return (
                        <DisabledHourButton
                            key={index}
                            onClick={() => handleToggleAvailability(data)}
                            aria-label={`Horário desabilitado: ${integerToTime(data.hour)}`}
                        >
                            <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                        </DisabledHourButton>
                    )
                // Caso 4: Horário vencido
                case 'Expired':
                    return (
                        <ExpiredHourButton
                            key={index}
                            onClick={() => {}}
                            aria-label={`Horário expirado: ${integerToTime(data.hour)}`}
                        >
                            <Genos_Disabled_24_500
                                text={
                                    data.userId
                                        ? integerToTime(data.hour) + ' - ' + data.firstName + ' ' + data.lastName
                                        : integerToTime(data.hour)
                                }
                            />
                        </ExpiredHourButton>
                    )
                default:
                    return (
                        <DisabledHourButton
                            key={index}
                            onClick={() => handleToggleAvailability(data)}
                            aria-label={`Horário desabilitado: ${integerToTime(data.hour)}`}
                        >
                            <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                        </DisabledHourButton>
                    )
            }
        })
    }, [appointmentsData, handleToggleAvailability, handleOpenCancelModal])

    return (
        <Container>
            <TitleContainer>
                {expiredDay ? (
                    <>
                        <Genos_Disabled_24_500 text={legend} />
                        <Genos_Disabled_24_500 text={date} />
                    </>
                ) : (
                    <>
                        <Genos_Secondary_24_500 text={legend} />
                        <Genos_Primary_24_500 text={date} />
                    </>
                )}
            </TitleContainer>
            {hoursList}
            {!expiredDay && (
                <ButtonContainer>
                    <GenosPrimaryButtonText
                        title="Adicionar novo horário"
                        size="medium"
                        onClick={() => handleCreateNewSchedule(day, month, year)}
                    />
                </ButtonContainer>
            )}
        </Container>
    )
}
