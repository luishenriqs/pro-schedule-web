import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { CalendarProps } from '@common/models'
import { getMinMonth, getNextMonthDate, getPreviousMonthDate, getWeekDays } from '@common/utils/helpers'
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

export const EditableCalendar = ({ data, handleDayClick, legend, handleChangeMonth }: CalendarProps) => {
    const todayDate = new Date()
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate)
    const [selectedMonth, setSelectedMonth] = useState<number>(todayDate.getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(todayDate.getFullYear())
    const minMonth = getMinMonth(selectedDate)

    const goToPreviousMonth = useCallback(() => {
        const { date, month, year } = getPreviousMonthDate(selectedDate)
        setSelectedDate(date)
        setSelectedMonth(month)
        setSelectedYear(year)
        handleChangeMonth?.()
    }, [handleChangeMonth, selectedDate])

    const goToNextMonth = useCallback(() => {
        const { date, month, year } = getNextMonthDate(selectedDate)
        setSelectedDate(date)
        setSelectedMonth(month)
        setSelectedYear(year)
        handleChangeMonth?.()
    }, [handleChangeMonth, selectedDate])

    const weekDays = useMemo(() => getWeekDays({ short: true }), [])

    const calendarDays = useMemo(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedYear, selectedMonth, 1).getDay()
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

        const buttons = []

        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayObjects = data.filter(
                (item) => item.year === selectedYear && item.month === selectedMonth && item.day === day
            )

            if (dayObjects.length === 0) {
                buttons.push(
                    <CalendarControlContainer key={day}>
                        <DisabledDayButton>
                            <Genos_Secondary_24_500 text={day} />
                        </DisabledDayButton>
                    </CalendarControlContainer>
                )
            } else {
                const allDisabled = dayObjects.every((item) => !item.enable)

                buttons.push(
                    <CalendarControlContainer key={day}>
                        {allDisabled ? (
                            <UnavailableDayButton onClick={() => handleDayClick(day, selectedMonth, selectedYear)}>
                                <Genos_Secondary_24_500 text={day} />
                            </UnavailableDayButton>
                        ) : (
                            <AvailableDayButton onClick={() => handleDayClick(day, selectedMonth, selectedYear)}>
                                <Genos_Secondary_24_500 text={day} />
                            </AvailableDayButton>
                        )}
                    </CalendarControlContainer>
                )
            }
        }
        return buttons
    }, [data, handleDayClick, selectedMonth, selectedYear])

    return (
        <Container>
            {legend && <Genos_Secondary_24_500 text={legend} />}

            <Header>
                <Button
                    onClick={goToPreviousMonth}
                    disabled={minMonth}
                    style={{ marginRight: '-20px' }}
                    aria-label="Previous month"
                >
                    {minMonth ? <ArrowLeftIconDisabled /> : <ArrowLeftIcon />}
                </Button>

                <HeaderLabel>
                    <Genos_Primary_24_500
                        text={selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    />
                </HeaderLabel>

                <Button onClick={goToNextMonth} style={{ marginLeft: '-20px' }} aria-label="Next month">
                    <ArrowRightIcon />
                </Button>
            </Header>

            <CalendarContainer>
                {weekDays.map((day, index) => (
                    <DaysWeekContainer key={index}>
                        <Genos_White_14_500 text={day} />
                    </DaysWeekContainer>
                ))}
                {calendarDays}
            </CalendarContainer>
        </Container>
    )
}
