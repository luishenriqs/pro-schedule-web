import React, { useMemo } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500 } from '../Typography'
import { CalendarCreateAgendaProps } from '@common/models'
import { getWeekDays } from '@common/utils/helpers'
import {
    Container,
    CalendarContainer,
    AvailableDayButton,
    DisabledDayButton,
    Header,
    HeaderLabel,
    DaysWeekContainer,
    CalendarControlContainer,
} from './styles'

export const CalendarCreateAgenda = ({ schedule, handleDayClick, legend }: CalendarCreateAgendaProps) => {
    let firstValidSchedule = schedule.length > 0 ? schedule[0] : null
    if (!firstValidSchedule) {
        const today = new Date()
        firstValidSchedule = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            hour: 0,
            userId: '',
            enable: true,
        }
    }

    const { month: selectedMonth, year: selectedYear } = firstValidSchedule

    const weekDays = useMemo(() => getWeekDays({ short: true }), [])

    const calendarDays = useMemo(() => {
        const firstWeekdayOfMonthIndex = new Date(selectedYear, selectedMonth, 1).getDay()
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

        const buttons = []

        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayObjects = schedule.filter(
                (item) => item.year === selectedYear && item.month === selectedMonth && item.day === day
            )

            const isDisabled = dayObjects.length === 0

            buttons.push(
                <CalendarControlContainer key={day}>
                    {isDisabled ? (
                        <DisabledDayButton>
                            <Genos_Secondary_24_500 text={day} />
                        </DisabledDayButton>
                    ) : (
                        <AvailableDayButton onClick={() => handleDayClick(day, selectedMonth, selectedYear)}>
                            <Genos_Secondary_24_500 text={day} />
                        </AvailableDayButton>
                    )}
                </CalendarControlContainer>
            )
        }

        return buttons
    }, [schedule, selectedMonth, selectedYear, handleDayClick])

    return (
        <Container>
            {legend && <Genos_Secondary_24_500 text={legend} />}

            <Header>
                <HeaderLabel>
                    <Genos_Primary_24_500
                        text={new Date(selectedYear, selectedMonth).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    />
                </HeaderLabel>
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
