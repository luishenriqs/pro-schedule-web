import React, { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { ScheduleProps } from '@common/models'
import {
    getAvailableDays,
    getMinMonth,
    getNextMonthDate,
    getPreviousMonthDate,
    getWeekDays,
    hasEmptyCustomerId,
} from '@common/utils/helpers'
import {
    Container,
    CalendarContainer,
    AvailableDayButton,
    UnavailableDayButton,
    DisabledDayButton,
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

    const getCalendar = useCallback(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
        const daysQtd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
        const { allScheduleDays, allDays } = getAvailableDays(data, selectedDate)

        // console.log('allScheduleDays ', JSON.stringify(allScheduleDays)) // Todos os dias da agenda, com e sem horários
        // console.log('allDays ', JSON.stringify(allDays)) // Números inteiros dos dias da agenda

        const buttons = []

        // Alinha dias do mês aos dias da semana
        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let i = 1; i <= daysQtd; i++) {
            const isScheduleDays = allDays.includes(i)
            const isAvailable = hasEmptyCustomerId(allScheduleDays, i)
            buttons.push(
                <React.Fragment key={i}>
                    {isScheduleDays ? 
                        isAvailable
                            ?                               
                                <AvailableDayButton onClick={() => handleDayClick(i)}>
                                    <Genos_Secondary_24_500 text={i} />
                                </AvailableDayButton>
                            :
                                <UnavailableDayButton>
                                    <Genos_Secondary_24_500 text={i} />
                                </UnavailableDayButton>
                    : (
                        <DisabledDayButton>
                            <Genos_Secondary_24_500 text={i} />
                        </DisabledDayButton>
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
                    <Button onClick={() => goToPreviousMonth(selectedDate)}  style={{ marginRight: '-20px' }}>
                        <ArrowLeftIcon />
                    </Button>
                ) : (
                    <ArrowLeftIconDisabled />
                )}
                <HeaderLabel>
                    <Genos_Primary_24_500
                        text={selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    />
                </HeaderLabel>
                <Button onClick={() => goToNextMonth(selectedDate)} style={{ marginLeft: '-20px' }}>
                    <ArrowRightIcon />
                </Button>
            </Header>

            <CalendarContainer>
                {weekDays.map((day) => {
                    return (
                        <DaysWeekContainer>
                            <Genos_White_14_500 text={day} />
                        </DaysWeekContainer>
                    )
                })}
                {getCalendar()}
            </CalendarContainer>
        </Container>
    )
}
