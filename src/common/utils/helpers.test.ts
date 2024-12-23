import { utcToZonedTime } from 'date-fns-tz'
import { DeadlineObject, MonthsScheduledProps, ScheduleObjectProps, UserProps } from '@common/models'
import {
    availableCancellationTime,
    CheckPayloadAvailability,
    filterExpiredAppointments,
    filterFutureAppointments,
    getBrasiliaOfficialTime,
    getMinutesOfDayFromTimestamp,
    isExpiredDay,
    isMonthNotInSchedule,
    orderUsers,
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

describe('getMinutesOfDayFromTimestamp', () => {
    it('should return the correct time in minutes', () => {
        const result = getMinutesOfDayFromTimestamp(1734796578779)
        expect(result).toEqual(776)
    })
})

describe('filterExpiredAppointments', () => {
    const timeZone = 'America/Sao_Paulo'
    const today = utcToZonedTime(new Date(), timeZone)
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()
    const brasiliaTime = getBrasiliaOfficialTime()

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

describe('filterFutureAppointments', () => {
    const timeZone = 'America/Sao_Paulo'
    const today = utcToZonedTime(new Date(), timeZone)
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()
    const brasiliaTime = getBrasiliaOfficialTime()

    it('should maintain appointments from previous years', () => {
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
        const result = filterFutureAppointments(schedulesPastYear)
        expect(result).toEqual([
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
        ])
    })

    it('should maintain appointments from previous months', () => {
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
        const result = filterFutureAppointments(schedulesPastMonth)
        expect(result).toEqual([
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
        ])
    })

    it('should maintain appointments from previous days', () => {
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
        const result = filterFutureAppointments(schedulesPastDay)
        expect(result).toEqual([
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
        ])
    })

    it('should maintain previous appointments', () => {
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
        const result = filterFutureAppointments(schedulesPastHour)
        expect(result).toEqual([
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
        ])
    })

    it('should maintain appointments from the current time slot', () => {
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
        const result = filterFutureAppointments(schedulesCurrentHour)
        expect(result).toEqual([
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
        ])
    })
})

describe('availableCancellationTime', () => {
    const payload: ScheduleObjectProps = {
        year: 2024,
        month: 11,
        day: 20,
        hour: 600,
        userId: 'af4c2eb6-e9c7-4f53-bb43-b2434d046b8f',
        userEmail: 'du@email.com',
        firstName: 'Eduardo',
        lastName: 'Pereira',
        enable: true,
    }
    it('Should return true if more than 48 hours in advance', () => {
        const deadLine: DeadlineObject = {
            year: 2024,
            month: 11,
            day: 18,
            hour: 540,
        }
        const result = availableCancellationTime(payload, deadLine)
        expect(result).toBe(true)
    })

    it('Should return false if at the same time', () => {
        const deadLine: DeadlineObject = {
            year: 2024,
            month: 11,
            day: 20,
            hour: 600,
        }
        const result = availableCancellationTime(payload, deadLine)
        expect(result).toBe(false)
    })

    it('Should return false if less than 48 hours in advance', () => {
        const deadLine: DeadlineObject = {
            year: 2024,
            month: 11,
            day: 20,
            hour: 660,
        }
        const result = availableCancellationTime(payload, deadLine)
        expect(result).toBe(false)
    })
})

describe('orderUsers', () => {
    const users: UserProps[] = [
        {
            isAdmin: false,
            isBlocked: true,
            isManager: false,
            email: 'du@email.com',
            cpf: 21845930805,
            firstName: 'Eduardo',
            id: 'du@email.com',
            credits: 0,
            phone: '16956465465',
            termsOfUse: false,
            lastName: 'Pereira',
        },
        {
            phone: '16911110000',
            cpf: 21825930805,
            firstName: 'Leila',
            termsOfUse: false,
            isManager: false,
            id: 'leila@email.com',
            isBlocked: false,
            credits: 11,
            isAdmin: true,
            lastName: 'Massaro',
            email: 'leila@email.com',
        },
        {
            isManager: false,
            id: 'diego@email.com',
            isAdmin: false,
            phone: '169888877777',
            credits: 2,
            firstName: 'Diego',
            email: 'diego@email.com',
            cpf: 21825930806,
            termsOfUse: false,
            isBlocked: false,
            lastName: 'Souza',
        },
        {
            isAdmin: true,
            cpf: 66839088006,
            email: 'flavio@email.com',
            isBlocked: false,
            isManager: true,
            firstName: 'Flávio',
            id: 'flavio@email.com',
            credits: 0,
            termsOfUse: false,
            phone: '16900001111',
            lastName: 'Massaro',
        },
    ]
    it('Should return users ordered', () => {
        const result = orderUsers(users)
        expect(result).toEqual([
            {
                isAdmin: true,
                cpf: 66839088006,
                email: 'flavio@email.com',
                isBlocked: false,
                isManager: true,
                firstName: 'Flávio',
                id: 'flavio@email.com',
                credits: 0,
                termsOfUse: false,
                phone: '16900001111',
                lastName: 'Massaro',
            },
            {
                phone: '16911110000',
                cpf: 21825930805,
                firstName: 'Leila',
                termsOfUse: false,
                isManager: false,
                id: 'leila@email.com',
                isBlocked: false,
                credits: 11,
                isAdmin: true,
                lastName: 'Massaro',
                email: 'leila@email.com',
            },
            {
                isManager: false,
                id: 'diego@email.com',
                isAdmin: false,
                phone: '169888877777',
                credits: 2,
                firstName: 'Diego',
                email: 'diego@email.com',
                cpf: 21825930806,
                termsOfUse: false,
                isBlocked: false,
                lastName: 'Souza',
            },
            {
                isAdmin: false,
                isBlocked: true,
                isManager: false,
                email: 'du@email.com',
                cpf: 21845930805,
                firstName: 'Eduardo',
                id: 'du@email.com',
                credits: 0,
                phone: '16956465465',
                termsOfUse: false,
                lastName: 'Pereira',
            },
        ])
    })
})
