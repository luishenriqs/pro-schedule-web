import { v4 as uuidv4 } from 'uuid'
import { CreateAuth, UseWriteData } from '@common/api'
import { PayloadProps, GetDateProps, GetWeekDaysParams, dataSelectedProps } from '@common/models'

export const initialScript = async () => {
    const payload = {
        firstName: 'Luís Henrique',
        lastName: 'Pereira',
        phone: '16981011280',
        email: 'lh.p@hotmail.com',
        password: '123456',
        isOwner: true,
        isManager: true,
        isAdmin: true,
        id: uuidv4(),
        birthday: '',
        cpf: '',
        cep: '',
        address: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
    }

    try {
        const resp = await CreateAuth(payload) //==> Cria o usuário OWNER no firebase/auth
        if (resp.status === 201) {
            const respData = await UseWriteData(payload, 'users') //==> Cria o usuário OWNER no firestore
            return respData
        } else {
            return resp
        }
    } catch (error) {
        return { success: false, status: 500, message: `${error}` }
    }
}

export const getWeekDays = ({ short = false }: GetWeekDaysParams = {}) => {
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

export const convertTimeStringToMinutes = (timeString: string) => {
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

export const getMinMonth = (selectedDate: Date): boolean => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()
    const minMonth = selectedYear === currentYear && selectedMonth === currentMonth
    return minMonth
}

export const hasEmptyCustomerId = (
    data: Array<{ year: number; month: number; day: number; hour: number; custumerId: string }>,
    selectedDay: number
): boolean => {
    return data.some((item) => item.day === selectedDay && item.custumerId === '')
}

export const formatDate = (day: number, month: number, year: number): string => {
    const months = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
    ]

    if (month < 0 || month > 11) {
        throw new Error('O mês deve estar entre 0 e 11.')
    }

    return `${day} de ${months[month]} de ${year}`
}

export const filterDaysByDateAndMonth = (
    data: PayloadProps[],
    selectedYear: number,
    selectedMonth: number
): number[] => {
    const currentDate = new Date()

    data.map((obj) => {
        return { ...obj, month: obj.month + 1 }
    })

    const filteredByCurrentDate = data.filter((item) => {
        const itemDate = new Date(item.year, item.month, item.day)
        return itemDate >= currentDate
    })

    const filteredByMonth = filteredByCurrentDate.filter(
        (item) => item.year === selectedYear && item.month === selectedMonth
    )

    const days = filteredByMonth.map((item) => item.day)

    return days
}

export const sortPayloadsByDate = (payloads: PayloadProps[]): PayloadProps[] => {
    return payloads.sort((a, b) => {
        const dateA = new Date(a.year, a.month, a.day, Math.floor(a.hour / 60), a.hour % 60)
        const dateB = new Date(b.year, b.month, b.day, Math.floor(b.hour / 60), b.hour % 60)

        return dateA.getTime() - dateB.getTime()
    })
}

export const filterAppointmentsByDay = (selectedDay: dataSelectedProps): dataSelectedProps => {
    const { data, day, month, year } = selectedDay

    return {
        data: data.filter(
            (appointment) => appointment.day === day && appointment.month === month && appointment.year === year
        ),
        day,
        month,
        year,
    }
}

export const removeAppointment = (selectedDay: dataSelectedProps, newPayload: PayloadProps): dataSelectedProps => {
    return {
        ...selectedDay,
        data: selectedDay.data.filter(
            (appointment) =>
                !(
                    appointment.year === newPayload.year &&
                    appointment.month === newPayload.month &&
                    appointment.day === newPayload.day &&
                    appointment.hour === newPayload.hour &&
                    appointment.custumerId === newPayload.custumerId
                )
        ),
    }
}
