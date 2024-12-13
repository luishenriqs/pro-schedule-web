import React, { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { CalendarNewScheduleProps } from '@common/models'
import {
    filterDaysByDateAndMonth,
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

export const CalendarNewSchedule = ({
    schedule,
    handleDayClick,
    handleChangeMonth,
    onMonthChange,
    onYearChange,
    selectedMonth,
    selectedYear,
}: CalendarNewScheduleProps) => {
    const todayDate = new Date()
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate)
    const minMonth = getMinMonth(selectedDate)

    const goToPreviousMonth = useCallback(
        (selectedDate: Date) => {
            const { date, month, year } = getPreviousMonthDate(selectedDate)
            setSelectedDate(date)
            onMonthChange(month)
            onYearChange(year)
            handleChangeMonth()
        },
        [handleChangeMonth, onMonthChange, onYearChange]
    )

    const goToNextMonth = useCallback(
        (selectedDate: Date) => {
            const { date, month, year } = getNextMonthDate(selectedDate)
            setSelectedDate(date)
            onMonthChange(month)
            onYearChange(year)
            handleChangeMonth()
        },
        [handleChangeMonth, onMonthChange, onYearChange]
    )

    const weekDays = getWeekDays({ short: true })

    const getCalendar = useCallback(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedDate.getFullYear(), selectedMonth, 1).getDay()
        const daysQtd = new Date(selectedDate.getFullYear(), selectedMonth + 1, 0).getDate()

        const allDays = filterDaysByDateAndMonth(schedule, selectedYear, selectedMonth)

        const buttons = []

        // Alinha dias do mês aos dias da semana
        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let i = 1; i <= daysQtd; i++) {
            const isScheduleDays = allDays.includes(i)
            const isAvailable = hasEmptyCustomerId(schedule, i)

            const day = i
            buttons.push(
                <CalendarControlContainer key={i}>
                    {isScheduleDays ? (
                        isAvailable ? (
                            <AvailableDayButton
                                key={i}
                                onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                            >
                                <Genos_Secondary_24_500 text={day} />
                            </AvailableDayButton>
                        ) : (
                            <UnavailableDayButton
                                key={i}
                                onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                            >
                                <Genos_Secondary_24_500 text={day} />
                            </UnavailableDayButton>
                        )
                    ) : (
                        <DisabledDayButton key={i}>
                            <Genos_Secondary_24_500 text={day} />
                        </DisabledDayButton>
                    )}
                </CalendarControlContainer>
            )
        }
        return buttons
    }, [schedule, handleDayClick, selectedMonth, selectedDate, selectedYear])

    return (
        <Container>
            <Genos_Secondary_24_500 text="Escolha o seu dia" />
            <Header>
                {!minMonth ? (
                    <Button onClick={() => goToPreviousMonth(selectedDate)} style={{ marginRight: '-15px' }}>
                        <ArrowLeftIcon />
                    </Button>
                ) : (
                    <Button style={{ marginRight: '-15px' }}>
                        <ArrowLeftIconDisabled />
                    </Button>
                )}
                <HeaderLabel>
                    <Genos_Primary_24_500
                        text={selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    />
                </HeaderLabel>
                <Button onClick={() => goToNextMonth(selectedDate)} style={{ marginLeft: '-15px' }}>
                    <ArrowRightIcon />
                </Button>
            </Header>

            <CalendarContainer>
                {weekDays.map((day, index) => {
                    return (
                        <DaysWeekContainer key={index}>
                            <Genos_White_14_500 text={day} />
                        </DaysWeekContainer>
                    )
                })}
                {schedule && getCalendar()}
            </CalendarContainer>
        </Container>
    )
}
