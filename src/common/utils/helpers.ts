import { AvailableDaysProps, DateProps, GetDateProps, GetWeekDaysParams, ScheduleProps } from '@common/models'

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
    const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

    return Array.from(Array(7).keys())
        .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
        .map((weekDay) => {
            if (short) {
                return weekDay.substring(0, 3).toUpperCase()
            }
            return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
        })
}

export const getPreviousMonthDate = (selectedDate: Date): GetDateProps => {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
        throw new Error('Invalid date')
    }

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonthIndex = today.getMonth()

    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()

    const minMonth = selectedYear === currentYear && selectedMonth === currentMonthIndex

    if (minMonth) {
        const date = new Date(currentYear, currentMonthIndex, 1)
        const month = currentMonthIndex
        const year = currentYear
        return { date, month, year }
    } else {
        const previousMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
        const previousYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear
        const date = new Date(previousYear, previousMonth, 1)
        const month = previousMonth
        const year = previousYear
        return { date, month, year }
    }
}

export const getNextMonthDate = (currentDate: Date): GetDateProps => {
    const currentYear = currentDate.getFullYear()
    const currentMonthIndex = currentDate.getMonth()
    const nextMonth = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1
    const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear
    const date = new Date(nextYear, nextMonth, 1)
    const month = nextMonth
    const year = nextYear
    return { date, month, year }
}

export function convertTimeStringToMinutes(timeString: string) {
    const [hours, minutes] = timeString.split(':').map(Number)

    return hours * 60 + minutes
}

export const timeToInteger = (value: string): number => {
    const [hours, minutes] = value.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes

    return totalMinutes
}

export const integerToTime = (value: number): string => {
    const hours = Math.floor(value / 60)
    const minutes = value % 60
    const formattedHours = String(hours).padStart(2, '0')
    const formattedMinutes = String(minutes).padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}`
}

export const getAvailableDays = (data: DateProps[], selectedDate: Date): AvailableDaysProps => {
    const currentMonthIndex = selectedDate.getMonth()

    // Retorna os dias setados na agenda, com ou sem horário disponível
    const allScheduleDays = data.filter((item) => item.month === currentMonthIndex)[0]

    // Retorna array de números inteiros -  Todos os dias da agenda
    const allDays: number[] = []
    if (allScheduleDays) allScheduleDays.daysAndHours.map((item) => allDays.push(item.day))

    return { allScheduleDays, allDays }
}

export const getMinMonth = (selectedDate: Date): Boolean => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()
    const minMonth = selectedYear === currentYear && selectedMonth === currentMonth
    return minMonth
}

export const hasEmptyCustomerId = (data: DateProps, day: number): boolean => {
    const dayData = data?.daysAndHours?.find((d) => d.day === day)
    if (dayData) {
        return dayData?.hours.some((hour) => hour.custumerId === '')
    }
    return false
}
