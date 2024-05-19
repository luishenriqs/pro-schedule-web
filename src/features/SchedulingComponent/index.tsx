import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import { Calendar } from '@common/components/Calendar'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { AboutContent } from '@features/AboutComponent/styles'
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
            month: 4,
            daysAndHours: [
                {
                    day: 20,
                    hours: []
                },
                {
                    day: 22,
                    hours: []
                },
                {
                    day: 24,
                    hours: []
                },
                {
                    day: 27,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 29,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 31,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
            ]
        },
        {
            year: 2024,
            month: 5,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 7,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 10,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 12,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 14,
                    hours: [
                        480,
                        555,
                        705,
                    ]
                },
                {
                    day: 17,
                    hours: [
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 19,
                    hours: [
                        480,
                        630,
                        705,
                    ]
                },
                {
                    day: 21,
                    hours: [
                        480,
                        555,
                    ]
                },
            ]
        },
        {
            year: 2024,
            month: 6,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
            ]
        },
        {
            year: 2024,
            month: 7,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 4,
                    hours: []
                },
                {
                    day: 5,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
              
            ]
        },
        {
            year: 2024,
            month: 8,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 7,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 10,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 12,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 14,
                    hours: [
                        480,
                        555,
                        705,
                    ]
                },
                {
                    day: 17,
                    hours: [
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 19,
                    hours: [
                        480,
                        630,
                        705,
                    ]
                },
                {
                    day: 21,
                    hours: [
                        480,
                        555,
                    ]
                },
            ]
        },
        {
            year: 2024,
            month: 9,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 9,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 10,
                    hours: [
                        480,
                        555,
                        705,
                    ]
                },
                {
                    day: 11,
                    hours: [
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 23,
                    hours: [
                        480,
                        630,
                        705,
                    ]
                },
                {
                    day: 25,
                    hours: [
                        480,
                        555,
                    ]
                },
            ]
        },
        {
            year: 2024,
            month: 10,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 4,
                    hours: []
                },
                {
                    day: 5,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
              
            ]
        },
        {
            year: 2024,
            month: 11,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 9,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 10,
                    hours: [
                        480,
                        555,
                        705,
                    ]
                },
                {
                    day: 11,
                    hours: [
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 23,
                    hours: [
                        480,
                        630,
                        705,
                    ]
                },
                {
                    day: 25,
                    hours: [
                        480,
                        555,
                    ]
                },
            ]
        },
        {
            year: 2025,
            month: 0,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 4,
                    hours: []
                },
                {
                    day: 5,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
              
            ]
        },
        {
            year: 2025,
            month: 1,
            daysAndHours: [
                {
                    day: 1,
                    hours: []
                },
                {
                    day: 2,
                    hours: []
                },
                {
                    day: 3,
                    hours: []
                },
                {
                    day: 7,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 10,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 12,
                    hours: [
                        480,
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 14,
                    hours: [
                        480,
                        555,
                        705,
                    ]
                },
                {
                    day: 17,
                    hours: [
                        555,
                        630,
                        705,
                    ]
                },
                {
                    day: 19,
                    hours: [
                        480,
                        630,
                        705,
                    ]
                },
                {
                    day: 21,
                    hours: [
                        480,
                        555,
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
                    <AboutContent>
                        <Calendar schedule={dataMock} />
                    </AboutContent>
                </>
            )}
        </Container>
    )
}
