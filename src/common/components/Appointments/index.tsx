import React, { useCallback, useEffect, useState } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { SelectedDataProps } from '@common/models'
import { formatDate, integerToTime } from '@common/utils/helpers'
import { Container, HoursContainer, TitleContainer } from './styles'

export const Appointments = ({ appontmentsData, handleSetAppointments }: SelectedDataProps) => {
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const { year, month, day } = appontmentsData
        const date = formatDate(day, month, year)
        setDate(date)
    }, [appontmentsData])

    const getHours = useCallback(() => {
        return appontmentsData.data?.map((data, index) => {
            return (
                <HoursContainer key={index} onClick={() => handleSetAppointments(data)}>
                    <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                </HoursContainer>
            )
        })
    }, [appontmentsData.data, handleSetAppointments])

    return (
        <Container>
            <TitleContainer>
                <Genos_Secondary_24_500 text="Escolha o seu horário" />
                <Genos_Primary_24_500 text={'Dia ' + date} />
            </TitleContainer>
            {getHours()}
        </Container>
    )
}
