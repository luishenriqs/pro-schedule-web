import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { CalendarProps } from '@common/models'
import {
    filterDaysByMonthAndYear,
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
    CalendarControlContainer,
} from './styles'

export const Calendar = ({ data, handleDayClick }: CalendarProps) => {
    const todayDate = new Date()
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate)
    const [selecteMonth, setSelectedMonth] = useState<number>(todayDate.getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState<number>(todayDate.getFullYear())
    const minMonth = getMinMonth(selectedDate)

    const goToPreviousMonth = useCallback((selectedDate: Date) => {
        const { date, month, year } = getPreviousMonthDate(selectedDate)
        setSelectedDate(date)
        setSelectedMonth(month)
        setSelectedYear(year)
    }, [])

    const goToNextMonth = useCallback((selectedDate: Date) => {
        const { date, month, year } = getNextMonthDate(selectedDate)
        setSelectedDate(date)
        setSelectedMonth(month)
        setSelectedYear(year)
    }, [])

    const weekDays = getWeekDays({ short: true })

    const getCalendar = useCallback(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
        const daysQtd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()

        const allDays = filterDaysByMonthAndYear(data, selectedYear, selecteMonth)

        // console.log('allScheduleDays ', JSON.stringify(allScheduleDays)) // Todos os dias da agenda, com e sem horários
        // console.log('allDays ', JSON.stringify(allDays)) // Números inteiros dos dias da agenda

        const buttons = []

        // Alinha dias do mês aos dias da semana
        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let i = 1; i <= daysQtd; i++) {
            
            const isScheduleDays = allDays.includes(i)
            const isAvailable = hasEmptyCustomerId(data, i)



            const day = i
            buttons.push(
                <CalendarControlContainer key={i}>
                    {isScheduleDays ? 
                        isAvailable
                            ?                               
                                <AvailableDayButton onClick={() => handleDayClick(day, selecteMonth, selectedYear)}>
                                    <Genos_Secondary_24_500 text={day} />
                                </AvailableDayButton>
                            :
                                <UnavailableDayButton>
                                    <Genos_Secondary_24_500 text={day} />
                                </UnavailableDayButton>
                    : (
                        <DisabledDayButton>
                            <Genos_Secondary_24_500 text={day} />
                        </DisabledDayButton>
                    )}
                </CalendarControlContainer>
            )
        }
        return buttons
    }, [selectedDate])

    return (
        <Container>
            <Genos_Secondary_24_500 text='Escolha o seu dia' />
            <Header>
                {!minMonth ? (
                    <Button onClick={() => goToPreviousMonth(selectedDate)}  style={{ marginRight: '-20px' }}>
                        <ArrowLeftIcon />
                    </Button>
                ) : (
                    <Button style={{ marginRight: '-20px' }}>
                        <ArrowLeftIconDisabled />
                    </Button>
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
