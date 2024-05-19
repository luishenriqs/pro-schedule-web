export type GetWeekDaysParams = {
    short?: boolean
}

export type DayAndHours = {
    day: number
    hours: number[]
}

export type DateProps = {
    year: number
    month: number
    daysAndHours: DayAndHours[]
}

export type ScheduleProps = {
    schedule: DateProps[]
}

export type AvailableDaysProps = {
    days: number[]
    availableDays: DayAndHours[]
    allDays: DateProps[]
}
