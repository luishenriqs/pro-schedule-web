import React, { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_White_14_500, Genos_White_24_500 } from '../Typography'
import { CalendarNewScheduleProps } from '@common/models'
import {
    filterDaysByDateAndMonth,
    getDayButtonType,
    getMinMonth,
    getNextMonthDate,
    getPreviousMonthDate,
    getWeekDays,
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
    CanceledDayButton,
} from './styles'

export const CalendarMyAgenda = ({
    schedule,
    handleDayClick,
    handleCreateNewSchedule,
    handleChangeMonth,
    // handleCloseAppointments,
    onMonthChange,
    onYearChange,
    selectedMonth,
    selectedYear,
    legend,
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

        // Filtra todos os dias relevantes para o mês selecionado
        const allDays = filterDaysByDateAndMonth(schedule, selectedYear, selectedMonth)

        const buttons = []
        const todayDate = new Date()

        // Alinha dias do mês aos dias da semana
        for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
            buttons.push(<div key={`empty-${i}`} />)
        }

        for (let i = 1; i <= daysQtd; i++) {
            const isScheduleDays = allDays.includes(i)
            // console.log('isScheduleDays ', i, isScheduleDays)
            const day = i

            // Cria uma data para o dia atual do loop
            const currentDate = new Date(selectedYear, selectedMonth, day)

            // Verifica se o dia está no passado
            const isExpired = currentDate < todayDate && currentDate.toDateString() !== todayDate.toDateString()

            buttons.push(
                <CalendarControlContainer key={i}>
                    {isScheduleDays ? (
                        (() => {
                            // Determina o tipo de botão baseado no dia selecionado
                            const scheduleOfTheDay = schedule.filter((item) => item.day === day)
                            const buttonType = getDayButtonType(scheduleOfTheDay, day, isExpired)
                            switch (buttonType) {
                                case 'Available':
                                    return (
                                        <AvailableDayButton
                                            key={`available-${i}`}
                                            onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        >
                                            <Genos_Secondary_24_500 text={day} />
                                        </AvailableDayButton>
                                    )
                                case 'Unavailable':
                                    return (
                                        <UnavailableDayButton
                                            key={`unavailable-${i}`}
                                            onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        >
                                            <Genos_White_24_500 text={day} />
                                        </UnavailableDayButton>
                                    )
                                case 'Canceled':
                                    return (
                                        <CanceledDayButton
                                            key={`canceled-${i}`}
                                            onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        >
                                            <Genos_Secondary_24_500 text={day} />
                                        </CanceledDayButton>
                                    )
                                case 'Disabled':
                                    return (
                                        <DisabledDayButton
                                            key={`disabled-${i}`}
                                            onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        >
                                            <Genos_Secondary_24_500 text={day} />
                                        </DisabledDayButton>
                                    )
                            }
                        })()
                    ) : (
                        <DisabledDayButton
                            key={`disabled-${i}`}
                            onClick={
                                !isExpired
                                    ? () =>
                                          handleCreateNewSchedule &&
                                          handleCreateNewSchedule(day, selectedMonth, selectedYear)
                                    : () => handleDayClick(day, selectedMonth, selectedYear)
                            }
                        >
                            <Genos_Secondary_24_500 text={day} />
                        </DisabledDayButton>
                    )}
                </CalendarControlContainer>
            )
        }

        return buttons
    }, [handleCreateNewSchedule, handleDayClick, schedule, selectedDate, selectedMonth, selectedYear])

    return (
        <Container>
            <Genos_Secondary_24_500 text={legend} />
            <Header>
                {!minMonth ? (
                    <Button onClick={() => goToPreviousMonth(selectedDate)} style={{ marginRight: '-20px' }}>
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
