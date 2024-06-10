import React, { useEffect, useState } from 'react'
import { Container, SchedulingContent } from './styles'
import { Calendar } from '@common/components/Calendar'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { timeToInteger, integerToTime } from '@common/utils/helpers'
import { ScheduleProps } from '@common/models'

export const SchedulingComponent = () => {
    const [isLoading, setIsLoading] = useState(true)

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
    ]

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <SchedulingContent>
                        <Calendar schedule={dataMock} />
                    </SchedulingContent>
                </>
            )}
        </Container>
    )
}
