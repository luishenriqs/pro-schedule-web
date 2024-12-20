import { ScheduleObjectProps } from '@common/models'
import { CheckPayloadAvailability, isExpiredDay } from './helpers'

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
