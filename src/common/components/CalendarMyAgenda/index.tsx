import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { CalendarNewScheduleProps } from '@common/models'
import { getMinMonth, getNextMonthDate, getPreviousMonthDate, getWeekDays } from '@common/utils/helpers'
import {
    Container,
    CalendarContainer,
    Header,
    HeaderLabel,
    DaysWeekContainer,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowLeftIconDisabled,
} from './styles'
import { calendarButtons } from './calendarButtons'

export const CalendarMyAgenda = ({
    schedule,
    handleDayClick,
    handleCreateNewSchedule,
    handleChangeMonth,
    onMonthChange,
    onYearChange,
    selectedMonth,
    selectedYear,
    legend,
}: CalendarNewScheduleProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const minMonth = getMinMonth(selectedDate)

    useEffect(() => {
        setSelectedDate(new Date(selectedYear, selectedMonth, 1))
    }, [selectedMonth, selectedYear])

    const goToPreviousMonth = useCallback(
        (selectedDate: Date) => {
            const { month, year } = getPreviousMonthDate(selectedDate)
            onMonthChange(month)
            onYearChange(year)
            handleChangeMonth()
        },
        [handleChangeMonth, onMonthChange, onYearChange]
    )

    const goToNextMonth = useCallback(
        (selectedDate: Date) => {
            const { month, year } = getNextMonthDate(selectedDate)
            onMonthChange(month)
            onYearChange(year)
            handleChangeMonth()
        },
        [handleChangeMonth, onMonthChange, onYearChange]
    )

    const weekDays = getWeekDays({ short: true })

    return (
        <Container>
            <Genos_Secondary_24_500 text={legend} />
            <Header>
                {!minMonth ? (
                    <Button onClick={() => goToPreviousMonth(selectedDate)} style={{ marginRight: '-20px' }}>
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
                <Button onClick={() => goToNextMonth(selectedDate)} style={{ marginLeft: '-20px' }}>
                    <ArrowRightIcon />
                </Button>
            </Header>

            <CalendarContainer>
                {weekDays.map((day, index) => (
                    <DaysWeekContainer key={index}>
                        <Genos_White_14_500 text={day} />
                    </DaysWeekContainer>
                ))}
                {calendarButtons({
                    schedule,
                    handleDayClick,
                    handleCreateNewSchedule,
                    selectedMonth,
                    selectedYear,
                    selectedDate,
                })}
            </CalendarContainer>
        </Container>
    )
}
