import { AvailableDaysProps, GetWeekDaysParams, ScheduleProps } from '@common/models'

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

export const getPreviousMonthDate = (selectedDate: Date): Date => {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
        throw new Error('Invalid date')
    }

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()

    const minMonth = selectedYear === currentYear && selectedMonth === currentMonth

    if (minMonth) {
        return new Date(currentYear, currentMonth, 1)
    } else {
        const previousMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
        const previousYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear
        return new Date(previousYear, previousMonth, 1)
    }
}

export const getNextMonthDate = (currentDate: Date): Date => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year

    return new Date(nextYear, nextMonth, 1)
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

export const generateDaysArray = (daysInMonth: number): number[] => {
    if (daysInMonth < 1) {
        throw new Error('daysInMonth deve ser um número positivo maior que zero.')
    }
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
}

export const getAvailableDays = (
    daysInMonth: number[],
    data: ScheduleProps,
    selectedDate: Date
): AvailableDaysProps => {
    const currentMonth = selectedDate.getMonth()

    // Retorna os dias setados na agenda, com ou sem horário disponível
    const allDays = data.schedule.filter((item) => item.month === currentMonth)

    // Retorna apenas dias com horários disponíveis
    const availableDays = allDays[0].daysAndHours?.filter((item) => item.hours.length > 0)

    // Retorna array de números inteiros -  Dias disponíveis
    const days: number[] = []
    for (const day of daysInMonth) {
        if (availableDays && availableDays.some((item) => item.day === day)) {
            days.push(day)
        }
    }

    return { days, availableDays, allDays }
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
