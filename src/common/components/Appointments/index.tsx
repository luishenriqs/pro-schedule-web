import React, { useCallback, useEffect, useState } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import { DateProps, SelectedDataProps } from '@common/models'
import { formatDate, integerToTime } from '@common/utils/helpers'
import {
    Container,
    HoursContainer,
    TitleContainer,
} from './styles'

export const Appointments = ({ appontmentsData, handleSetAppointments }: SelectedDataProps) => {
    const [selectedData, setSelectedData] = useState<DateProps[]>([] as DateProps[])
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        const result = appontmentsData?.data?.filter((obj) => {
            const year = appontmentsData?.year
            const month = appontmentsData?.month
            const day = appontmentsData?.day
            const date = formatDate(day, month, year)
            setDate(date)

            if (obj.year === year && obj.month === month && obj.day === day && obj.custumerId === '') return obj
        })
        setSelectedData(result)

    }, [appontmentsData])

    const getHours = useCallback(() => {
        return selectedData?.map((data, index) => {
            return (
                <HoursContainer key={index} onClick={() => handleSetAppointments(data)}>
                    <Genos_Secondary_24_500 text={integerToTime(data.hour)} />
                </HoursContainer>
            )
        })
    }, [selectedData])

    return (
        <Container>
            <TitleContainer>                
                <Genos_Secondary_24_500 text='Escolha o seu horário' />
                <Genos_Primary_24_500 text={'Dia ' + date} />
            </TitleContainer>
            {getHours()}
        </Container>
    )
}
