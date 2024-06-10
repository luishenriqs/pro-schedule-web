export type GetWeekDaysParams = {
    short?: boolean
}

export type Hours = {
    hour: number
    custumerId: string
}

export type DayAndHours = {
    day: number
    hours: Hours[]
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
    allDays: number[]
    allScheduleDays: DateProps
}
