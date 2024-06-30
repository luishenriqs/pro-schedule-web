import React, { useCallback, useEffect, useState } from 'react'
import { Calendar } from '@common/components/Calendar'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { timeToInteger, integerToTime } from '@common/utils/helpers'
import { Appointments } from '@common/components/Appointments'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, SchedulingContent, TitleContainer } from './styles'

export const SchedulingComponent = () => {
    const [isLoading, setIsLoading] = useState(true)

    const handleDayClick = useCallback((day: number, month: number, year: number) => {
        console.log(`Você clicou no dia ${day}`)
        console.log(`Você clicou no month ${month}`)
        console.log(`Você clicou no year ${year}`)
    }, [])
    

    setTimeout(() => {
        setIsLoading(false)
    }, 100)


    useEffect(() => {
        // const teste1 = timeToInteger('17:45')
        const teste1 = integerToTime(480)
        const teste2 = integerToTime(555)
        const teste3 = integerToTime(630)
        const teste4 = integerToTime(705)

        // console.log('teste1', teste1)
        // console.log('teste2', teste2)
        // console.log('teste3', teste3)
        // console.log('teste4', teste4)
    }, [])

    
    const dataMock = [
        {
            year: 2024,
            month: 5,
            daysAndHours: [
                {
                    day: 1,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '1'
                        },
                        {
                            hour: 555,
                            custumerId: ''
                        },
                        {
                            hour: 630,
                            custumerId: '2'
                        },
                        {
                            hour: 705,
                            custumerId: '4'
                        },
                    ]
                },
                {
                    day: 3,
                    hours: [
                        {
                            hour: 480,
                            custumerId: ''
                        },
                        {
                            hour: 555,
                            custumerId: ''
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: '6'
                        },
                    ]
                },
                {
                    day: 5,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '2'
                        },
                        {
                            hour: 555,
                            custumerId: '5'
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: '6'
                        },
                    ]
                },
                {
                    day: 10,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '2'
                        },
                        {
                            hour: 555,
                            custumerId: '1'
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: ''
                        },
                    ]
                },
                {
                    day: 12,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '3'
                        },
                        {
                            hour: 555,
                            custumerId: '4'
                        },
                        {
                            hour: 630,
                            custumerId: '8'
                        },
                        {
                            hour: 705,
                            custumerId: '1'
                        },
                    ]
                },
            ]
        },
        {
            year: 2024,
            month: 6,
            daysAndHours: [
                {
                    day: 2,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '1'
                        },
                        {
                            hour: 555,
                            custumerId: ''
                        },
                        {
                            hour: 630,
                            custumerId: '2'
                        },
                        {
                            hour: 705,
                            custumerId: '4'
                        },
                    ]
                },
                {
                    day: 4,
                    hours: [
                        {
                            hour: 480,
                            custumerId: ''
                        },
                        {
                            hour: 555,
                            custumerId: ''
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: '6'
                        },
                    ]
                },
                {
                    day: 24,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '2'
                        },
                        {
                            hour: 555,
                            custumerId: '5'
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: '6'
                        },
                    ]
                },
                {
                    day: 25,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '2'
                        },
                        {
                            hour: 555,
                            custumerId: '1'
                        },
                        {
                            hour: 630,
                            custumerId: '4'
                        },
                        {
                            hour: 705,
                            custumerId: ''
                        },
                    ]
                },
                {
                    day: 12,
                    hours: [
                        {
                            hour: 480,
                            custumerId: '3'
                        },
                        {
                            hour: 555,
                            custumerId: '4'
                        },
                        {
                            hour: 630,
                            custumerId: '8'
                        },
                        {
                            hour: 705,
                            custumerId: '1'
                        },
                    ]
                },
            ]
        },
    ]

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Secondary_24_500 text='Faça o seu agendamento' />
                    </TitleContainer>
                    <Content>
                        <SchedulingContent>
                            <Calendar data={dataMock} handleDayClick={handleDayClick} />
                            <Appointments />
                        </SchedulingContent>
                    </Content>
                </>
            )}
        </Container>
    )
}
