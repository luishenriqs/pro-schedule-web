import { CalendarButtonsProps } from '@common/models'
import { filterDaysByDateAndMonth, isExpiredDay, getDayButtonType } from '@common/utils/helpers'
import { Genos_Secondary_24_500, Genos_White_24_500 } from '../Typography'
import {
    CalendarControlContainer,
    AvailableDayButton,
    UnavailableDayButton,
    CanceledDayButton,
    DisabledDayButton,
} from './styles'

export const calendarButtons = ({
    schedule,
    handleDayClick,
    handleCreateNewSchedule,
    selectedMonth,
    selectedYear,
    selectedDate,
}: CalendarButtonsProps) => {
    const firstWeekdayOfMonthIndex = new Date(selectedDate.getFullYear(), selectedMonth, 1).getDay()
    const daysQtd = new Date(selectedDate.getFullYear(), selectedMonth + 1, 0).getDate()

    const allDays = filterDaysByDateAndMonth(schedule, selectedYear, selectedMonth)

    const buttons = []

    for (let i = 0; i < firstWeekdayOfMonthIndex; i++) {
        buttons.push(<div key={`empty-${i}`} />)
    }

    for (let i = 1; i <= daysQtd; i++) {
        const isScheduleDays = allDays.includes(i)
        const day = i

        const isExpired = isExpiredDay(day, selectedMonth, selectedYear)

        buttons.push(
            <CalendarControlContainer key={i}>
                {isScheduleDays ? (
                    (() => {
                        const scheduleOfTheDay = schedule.filter((item) => item.day === day)
                        const buttonType = getDayButtonType(scheduleOfTheDay, day, isExpired)

                        switch (buttonType) {
                            case 'Available':
                                return (
                                    <AvailableDayButton
                                        key={`available-${i}`}
                                        onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        aria-label={`Dia ${day} disponível`}
                                        role="button"
                                    >
                                        <Genos_Secondary_24_500 text={day} />
                                    </AvailableDayButton>
                                )
                            case 'Unavailable':
                                return (
                                    <UnavailableDayButton
                                        key={`unavailable-${i}`}
                                        onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        aria-label={`Dia ${day} indisponível`}
                                        role="button"
                                    >
                                        <Genos_White_24_500 text={day} />
                                    </UnavailableDayButton>
                                )
                            case 'Canceled':
                                return (
                                    <CanceledDayButton
                                        key={`canceled-${i}`}
                                        onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        aria-label={`Dia ${day} cancelado`}
                                        role="button"
                                    >
                                        <Genos_Secondary_24_500 text={day} />
                                    </CanceledDayButton>
                                )
                            case 'Disabled':
                                return (
                                    <DisabledDayButton
                                        key={`disabled-${i}`}
                                        onClick={() => handleDayClick(day, selectedMonth, selectedYear)}
                                        aria-label={`Dia ${day} desabilitado`}
                                        role="button"
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
                        aria-label={
                            !isExpired ? `Dia ${day} disponível para agendamento` : `Dia ${day} indisponível no passado`
                        }
                        role="button"
                    >
                        <Genos_Secondary_24_500 text={day} />
                    </DisabledDayButton>
                )}
            </CalendarControlContainer>
        )
    }

    return buttons
}
