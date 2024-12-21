import { utcToZonedTime } from 'date-fns-tz'
import { MonthsScheduledProps, ScheduleObjectProps } from '@common/models'
import {
    CheckPayloadAvailability,
    filterExpiredAppointments,
    getMinutesOfDayFromTimestamp,
    isExpiredDay,
    isMonthNotInSchedule,
} from './helpers'

describe('isExpiredDay', () => {
    it('should return true if the input date is before today', () => {
        const result = isExpiredDay(15, 11, 2023)
        expect(result).toBe(true)
    })

    it('should return false if the input date is today', () => {
        const today = new Date()
        const result = isExpiredDay(today.getDate(), today.getMonth(), today.getFullYear())
        expect(result).toBe(false)
    })

    it('should return false if the input date is in the future', () => {
        const result = isExpiredDay(31, 11, 2025)
        expect(result).toBe(false)
    })
})

describe('CheckPayloadAvailability', () => {
    const previusAgendaEmpty: ScheduleObjectProps[] = []
    const newPayloadEmpty: ScheduleObjectProps[] = []
    const previusAgendaWithoutConflicts: ScheduleObjectProps[] = [
        {
            year: 2026,
            month: 11,
            day: 20,
            hour: 480,
            userId: '',
            userEmail: '',
            firstName: '',
            lastName: '',
            enable: true,
        },
        {
            year: 2026,
            month: 11,
            day: 20,
            hour: 540,
            userId: '',
            userEmail: '',
            firstName: '',
            lastName: '',
            enable: false,
        },
    ]
    const previusAgendaWithConflicts: ScheduleObjectProps[] = [
        {
            year: 2026,
            month: 11,
            day: 20,
            hour: 480,
            userId: '',
            userEmail: '',
            firstName: '',
            lastName: '',
            enable: true,
        },
        {
            year: 2026,
            month: 11,
            day: 20,
            hour: 1080, // Same time of 'newPayload'
            userId: '',
            userEmail: '',
            firstName: '',
            lastName: '',
            enable: false,
        },
    ]
    const newPayload: ScheduleObjectProps[] = [
        {
            year: 2026,
            month: 11,
            day: 20,
            hour: 1080,
            userId: '',
            userEmail: '',
            firstName: '',
            lastName: '',
            enable: true,
        },
    ]

    it('should returns false if previusAgenda is empty', () => {
        const result = CheckPayloadAvailability(previusAgendaEmpty, newPayload)
        expect(result).toBe(false)
    })

    it('should returns false if newPayload is empty', () => {
        const result = CheckPayloadAvailability(previusAgendaWithoutConflicts, newPayloadEmpty)
        expect(result).toBe(false)
    })

    it('should returns false if times conflict', () => {
        const result = CheckPayloadAvailability(previusAgendaWithConflicts, newPayload)
        expect(result).toBe(false)
    })

    it('should returns true if there are no conflicting times', () => {
        const result = CheckPayloadAvailability(previusAgendaWithoutConflicts, newPayload)
        expect(result).toBe(true)
    })
})

describe('isMonthNotInSchedule', () => {
    const fullSchedule: MonthsScheduledProps[] = [
        {
            month: 11,
            name: 'dezembro',
            year: 2024,
        },
        {
            month: 0,
            name: 'janeiro',
            year: 2025,
        },
        {
            month: 1,
            name: 'fevereiro',
            year: 2025,
        },
        {
            month: 2,
            name: 'março',
            year: 2025,
        },
    ]

    const unavailableSelectedMonth = {
        month: 1,
        name: 'fevereiro',
        year: 2025,
    }

    const availableSelectedMonth = {
        month: 4,
        name: 'maio',
        year: 2025,
    }

    it('should return false if month already has appointments', () => {
        const result = isMonthNotInSchedule(fullSchedule, unavailableSelectedMonth)
        expect(result).toBe(false)
    })

    it('should return true if month has no appointments', () => {
        const result = isMonthNotInSchedule(fullSchedule, availableSelectedMonth)
        expect(result).toBe(true)
    })
})

describe('filterExpiredAppointments', () => {
    const timeZone = 'America/Sao_Paulo'
    const today = utcToZonedTime(new Date(), timeZone)
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()
    const utcTime = utcToZonedTime(new Date(), timeZone)
    const brasiliaTime = getMinutesOfDayFromTimestamp(utcToZonedTime(utcTime, timeZone).getTime())

    it('should remove appointments from previous years', () => {
        const schedulesPastYear: ScheduleObjectProps[] = [
            {
                year: 2023,
                month: currentMonth,
                day: currentDay,
                hour: 600,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ]
        const result = filterExpiredAppointments(schedulesPastYear)
        expect(result).toEqual([
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ])
    })

    it('should remove appointments from previous months', () => {
        const schedulesPastMonth: ScheduleObjectProps[] = [
            {
                year: currentYear,
                month: currentMonth > 0 ? currentMonth - 1 : 0,
                day: 1,
                hour: 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ]
        const result = filterExpiredAppointments(schedulesPastMonth)
        expect(result).toEqual([
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ])
    })

    it('should remove appointments from previous days', () => {
        const schedulesPastDay: ScheduleObjectProps[] = [
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay > 1 ? currentDay - 1 : 1,
                hour: 1320,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ]
        const result = filterExpiredAppointments(schedulesPastDay)
        expect(result).toEqual([
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ])
    })

    it('should remove previous appointments', () => {
        const schedulesPastHour: ScheduleObjectProps[] = [
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: 1,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ]
        const result = filterExpiredAppointments(schedulesPastHour)
        expect(result).toEqual([
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ])
    })

    it('should remove appointments from the current time slot', () => {
        const schedulesCurrentHour: ScheduleObjectProps[] = [
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ]
        const result = filterExpiredAppointments(schedulesCurrentHour)
        expect(result).toEqual([
            {
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                hour: brasiliaTime + 60,
                userId: '',
                userEmail: '',
                firstName: '',
                lastName: '',
                enable: true,
            },
        ])
    })
})
