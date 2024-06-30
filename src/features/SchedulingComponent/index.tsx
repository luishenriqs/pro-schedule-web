import React, { useCallback, useEffect, useState } from 'react'
import { Calendar } from '@common/components/Calendar'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { Appointments } from '@common/components/Appointments'
import { Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { DateProps, dataSelectedProps } from '@common/models'
import { timeToInteger, integerToTime } from '@common/utils/helpers'
import { Container, Content, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const SchedulingComponent = () => {
    const [data, setData] = useState<DateProps[]>([] as DateProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedData, setSelectedData] = useState<dataSelectedProps>({} as dataSelectedProps)
    
    const dataMock = [
        {
            year: 2024,
            month: 5,
            day: 1,
            hour: 480,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 5,
            day: 1,
            hour: 555,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 1,
            hour: 630,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 5,
            day: 1,
            hour: 705,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 5,
            day: 3,
            hour: 480,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 3,
            hour: 555,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 3,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 5,
            day: 3,
            hour: 705,
            custumerId: '6'
        },
        {
            year: 2024,
            month: 5,
            day: 5,
            hour: 480,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 5,
            day: 5,
            hour: 555,
            custumerId: '5'
        },
        {
            year: 2024,
            month: 5,
            day: 5,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 5,
            day: 5,
            hour: 705,
            custumerId: '6'
        },
        {
            year: 2024,
            month: 5,
            day: 10,
            hour: 480,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 5,
            day: 10,
            hour: 555,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 5,
            day: 10,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 5,
            day: 10,
            hour: 705,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 12,
            hour: 480,
            custumerId: '3'
        },
        {
            year: 2024,
            month: 5,
            day: 12,
            hour: 555,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 5,
            day: 12,
            hour: 630,
            custumerId: '8'
        },
        {
            year: 2024,
            month: 5,
            day: 12,
            hour: 705,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 480,
            custumerId: '3'
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 555,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 630,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 705,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 840,
            custumerId: ''
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 915,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 990,
            custumerId: '5'
        },
        {
            year: 2024,
            month: 5,
            day: 18,
            hour: 1065,
            custumerId: ''
        },
        // JULHO
        {
            year: 2024,
            month: 6,
            day: 3,
            hour: 480,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 6,
            day: 3,
            hour: 555,
            custumerId: ''
        },
        {
            year: 2024,
            month: 6,
            day: 3,
            hour: 630,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 3,
            day: 5,
            hour: 705,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 6,
            day: 7,
            hour: 480,
            custumerId: ''
        },
        {
            year: 2024,
            month: 6,
            day: 7,
            hour: 555,
            custumerId: ''
        },
        {
            year: 2024,
            month: 6,
            day: 7,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 6,
            day: 7,
            hour: 705,
            custumerId: '6'
        },
        {
            year: 2024,
            month: 6,
            day: 8,
            hour: 480,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 6,
            day: 8,
            hour: 555,
            custumerId: '5'
        },
        {
            year: 2024,
            month: 6,
            day: 8,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 6,
            day: 8,
            hour: 705,
            custumerId: '6'
        },
        {
            year: 2024,
            month: 6,
            day: 11,
            hour: 480,
            custumerId: '2'
        },
        {
            year: 2024,
            month: 6,
            day: 11,
            hour: 555,
            custumerId: '1'
        },
        {
            year: 2024,
            month: 6,
            day: 11,
            hour: 630,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 6,
            day: 11,
            hour: 705,
            custumerId: ''
        },
        {
            year: 2024,
            month: 6,
            day: 15,
            hour: 480,
            custumerId: '3'
        },
        {
            year: 2024,
            month: 6,
            day: 15,
            hour: 555,
            custumerId: '4'
        },
        {
            year: 2024,
            month: 6,
            day: 15,
            hour: 630,
            custumerId: '8'
        },
        {
            year: 2024,
            month: 6,
            day: 15,
            hour: 705,
            custumerId: '1'
        },
    ]

    useEffect(() => {
        setData(dataMock)
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])

    const handleDayClick = useCallback((day: number, month: number, year: number) => {
        const dataSelected = {
            data: dataMock,
            day,
            month,
            year,
        }
        setSelectedData(dataSelected)
    }, [])

    const handleChangeMonth = useCallback(() => {
        setSelectedData({} as dataSelectedProps)
    }, [])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Secondary_24_500 text='Faça o seu agendamento' />
                    </TitleContainer >
                    <Content>
                        <SchedulingContent>
                            <Calendar data={data} handleDayClick={handleDayClick} handleChangeMonth={handleChangeMonth} />
                            <LegendContainer>
                                <Legend />
                                <Questrial_Secondary_20_500 text=' - Dias disponíveis' />
                            </LegendContainer>
                            {selectedData.data?.length > 0 &&
                                <>
                                    <Appointments appontmentsData={selectedData} />
                                
                                    <LegendContainer>
                                        <Legend />
                                        <Questrial_Secondary_20_500 text=' - Horários disponíveis' />
                                    </LegendContainer>
                                </>
                            }
                        </SchedulingContent>
                    </Content>
                </>
            )}
        </Container>
    )
}
