import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_28_500, Genos_White_24_500 } from '../Typography'
import { ScheduleProps } from '@common/models'
import {
    generateDaysArray,
    getAvailableDays,
    getMinMonth,
    getNextMonthDate,
    getPreviousMonthDate,
    getWeekDays,
} from '@common/utils/helpers'
import {
    Container,
    CalendarContainer,
    EnabledButton,
    DisabledButton,
    Header,
    HeaderLabel,
    DaysWeekContainer,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowLeftIconDisabled,
} from './styles'

export const Calendar = (data: ScheduleProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const minMonth = getMinMonth(selectedDate)

    const handleDayClick = useCallback((day: number) => {
        console.log(`Você clicou no dia ${day}`)
    }, [])

    const goToPreviousMonth = useCallback((selectedDate: Date) => {
        const previousMonth = getPreviousMonthDate(selectedDate)
        setSelectedDate(previousMonth)
    }, [])

    const goToNextMonth = useCallback((selectedDate: Date) => {
        const nextMonth = getNextMonthDate(selectedDate)
        setSelectedDate(nextMonth)
    }, [])

    const weekDays = getWeekDays({ short: true })

    // useEffect(() => {
    //     console.log('============>  ', JSON.stringify())
    // }, [])

    const getCalendar = useCallback(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
        const daysQtd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
        const daysInMonth = generateDaysArray(daysQtd)
        const { days, availableDays, allDays} = getAvailableDays(daysInMonth, data, selectedDate)

        // console.log('allDays ', JSON.stringify(allDays)) // Todos os dias da agenda, com e sem horários
        // console.log('availableDays ', JSON.stringify(availableDays)) // Apenas dias diponíveis e horários

        const buttons = []

        // Alinha dias do mês aos dias da semana
        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let i = 1; i <= daysQtd; i++) {
            const isAvailable = days.includes(i)
            buttons.push(
                <React.Fragment key={i}>
                    {isAvailable ? (
                        <EnabledButton onClick={() => handleDayClick(i)}>
                            <Genos_White_24_500 text={i} />
                        </EnabledButton>
                    ) : (
                        <DisabledButton>
                            <Genos_White_24_500 text={i} />
                        </DisabledButton>
                    )}
                </React.Fragment>
            )
        }
        return buttons
    }, [selectedDate])

    return (
        <Container>
            <Header>
                {!minMonth ? (
                    <Button onClick={() => goToPreviousMonth(selectedDate)}>
                        <ArrowLeftIcon />
                    </Button>
                ) : (
                    <ArrowLeftIconDisabled />
                )}
                <HeaderLabel>
                    <Genos_Primary_28_500
                        text={selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    />
                </HeaderLabel>
                <Button onClick={() => goToNextMonth(selectedDate)}>
                    <ArrowRightIcon />
                </Button>
            </Header>

            <CalendarContainer>
                {weekDays.map((day) => {
                    return (
                        <DaysWeekContainer>
                            <Genos_White_24_500 text={day} />
                        </DaysWeekContainer>
                    )
                })}
                {getCalendar()}
            </CalendarContainer>
        </Container>
    )
}
