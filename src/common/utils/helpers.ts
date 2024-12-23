import { v4 as uuidv4 } from 'uuid'
import { CreateAuth, WriteData } from '@common/api'
import { SxProps, Theme } from '@mui/material/styles'
import { utcToZonedTime } from 'date-fns-tz'
import { MONTH_NAMES } from '@common/models/enuns'
import {
    ScheduleObjectProps,
    GetDateProps,
    GetWeekDaysParams,
    dataSelectedProps,
    SelectedDateProps,
    PeriodProps,
    selectNewDayProps,
    formattedDateProps,
    MonthsScheduledProps,
    DeadlineObject,
    UserProps,
} from '@common/models'

export const initialScript = async () => {
    const payload = {
        isManager: true,
        isAdmin: true,
        id: uuidv4(),
        firstName: 'Luís Henrique',
        lastName: 'Pereira',
        phone: '16981011280',
        email: 'lh.p@hotmail.com',
        password: '123456',
        cpf: 29125240838,
        credits: 0,
        termsOfUse: false,
        isBlocked: false,
    }

    try {
        const resp = await CreateAuth(payload) //==> Cria o usuário OWNER no firebase/auth

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...payloadWithoutPassword } = payload

        if (resp.status === 201) {
            const respData = await WriteData(payloadWithoutPassword, 'users') //==> Cria o usuário OWNER no firestore
            return respData
        } else {
            return resp
        }
    } catch (error) {
        return { success: false, status: 500, message: `${error}` }
    }
}

export const getSxProps = (sxProps?: SxProps<Theme>) => {
    if (sxProps) {
        return Array.isArray(sxProps) ? sxProps : [sxProps]
    } else {
        return []
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

// Permite navegação até 1 mês anterior a data atual
export const getPreviousMonthDate = (selectedDate: Date): GetDateProps => {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
        throw new Error('Invalid date')
    }

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonthIndex = today.getMonth()
    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()

    const currentDate = new Date(currentYear, currentMonthIndex, 1)

    if (selectedDate < currentDate) {
        // Se a data selecionada for anterior ao mês atual, retorna mês atual
        const date = new Date(currentYear, currentMonthIndex - 1, 1)
        const month = currentMonthIndex - 1
        const year = currentYear
        return { date, month, year }
    } else {
        // Se a data selecionada NÃO for anterior ao mês atual, retorna mês anterior
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
    const currentMonth = today.getMonth() // Mês atual (0 a 11)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth() // Mês do selectedDate (0 a 11)

    // Verifica se o mês selecionado é o mês imediatamente anterior ao mês atual
    const isPreviousMonth =
        (selectedYear === currentYear && selectedMonth === currentMonth - 1) ||
        (currentMonth === 0 && selectedYear === currentYear - 1 && selectedMonth === 11)

    return isPreviousMonth
}

export const hasEmptyCustomerId = (
    data: Array<{
        year: number
        month: number
        day: number
        hour: number
        userId?: string
        userEmail?: string
        firstName?: string
        lastName?: string
        enable?: boolean
    }>,
    selectedDay: number
): boolean => {
    return data.some((item) => item.day === selectedDay && item.userId === '' && item.enable === true)
}

// Função para determinar o tipo de botão a ser renderizado
export const getDayButtonType = (
    data: Array<{
        year: number
        month: number
        day: number
        hour: number
        userId?: string
        userEmail?: string
        firstName?: string
        lastName?: string
        enable?: boolean
    }>,
    selectedDay: number,
    isExpired: boolean
): 'Available' | 'Unavailable' | 'Canceled' | 'Disabled' => {
    const relevantDays = data.filter((item) => item.day === selectedDay)

    // Caso 1: Existem dias com `userId` vazio e `enable` igual a true
    if (relevantDays.some((item) => !item.userId && item.enable === true)) {
        return 'Available'
    }

    // Caso 3: Todos os dias estão com `enable` igual a false e day não expirado
    if (relevantDays.every((item) => item.enable === false) && !isExpired) {
        return 'Canceled'
    }

    // Caso 4: Dia expirado
    if (isExpired) {
        return 'Disabled'
    }

    // Caso 2: Não existem dias com `userId` vazio, mas dias estão presentes
    return 'Unavailable'
}

export function getHourButtonType(data: ScheduleObjectProps): string {
    const timeZone = 'America/Sao_Paulo'

    const scheduleTime = new Date(data.year, data.month, data.day, Math.floor(data.hour / 60), data.hour % 60)
    const scheduleTimeTimestamp = utcToZonedTime(scheduleTime, timeZone).getTime()

    const utcTime = utcToZonedTime(new Date(), timeZone)
    const brasiliaTimeTimestamp = utcToZonedTime(utcTime, timeZone).getTime()

    // Regras de validação
    if (scheduleTimeTimestamp > brasiliaTimeTimestamp) {
        if (data.enable) {
            if (!data.userId) return 'Available'
            return 'Unavailable'
        } else {
            return 'Disabled'
        }
    }

    if (scheduleTimeTimestamp <= brasiliaTimeTimestamp) {
        return 'Expired'
    }

    return 'Unknown' // Valor de fallback
}

export const formatDate = (day: number, month: number, year: number): string => {
    if (month < 0 || month > 11) {
        throw new Error('O mês deve estar entre 0 e 11.')
    }

    return `${day} de ${MONTH_NAMES[month]} de ${year}`
}

export const formatDateShortVersion = (day: number, month: number, year: number): formattedDateProps => {
    const daysOfWeek = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ]

    // Validação do mês (0-11)
    if (month < 0 || month > 11) {
        throw new Error('O mês deve estar entre 0 e 11.')
    }

    // Criação de um objeto Date para determinar o dia da semana
    const date = new Date(year, month, day)

    if (isNaN(date.getTime())) {
        throw new Error('Data inválida.')
    }

    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`
    const dayOfWeek = daysOfWeek[date.getDay()]

    const formatted = {
        formattedDate,
        dayOfWeek,
    }

    return formatted
}

export const filterDaysByDateAndMonth = (
    data: ScheduleObjectProps[],
    selectedYear: number,
    selectedMonth: number
): number[] => {
    const currentDate = new Date()

    data.map((obj) => {
        return { ...obj, month: obj.month + 1 }
    })

    const filteredByCurrentDate = data.filter((item) => {
        const itemDate = new Date(item.year, item.month, item.day)
        itemDate.setHours(23, 59, 59, 999)
        return itemDate >= currentDate
    })

    const filteredByMonth = filteredByCurrentDate.filter(
        (item) => item.year === selectedYear && item.month === selectedMonth
    )

    const days = filteredByMonth.map((item) => item.day)

    return days
}

export const sortPayloadsByDate = (payloads: ScheduleObjectProps[]): ScheduleObjectProps[] => {
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

export const removeAppointment = (
    selectedDay: dataSelectedProps,
    newPayload: ScheduleObjectProps
): dataSelectedProps => {
    return {
        ...selectedDay,
        data: selectedDay.data.filter(
            (appointment) =>
                !(
                    appointment.year === newPayload.year &&
                    appointment.month === newPayload.month &&
                    appointment.day === newPayload.day &&
                    appointment.hour === newPayload.hour &&
                    appointment.userId === newPayload.userId
                )
        ),
    }
}

export const generateSchedule = (
    selectedMonth: SelectedDateProps,
    selectedWeekDays: string[],
    selectedTime: string[],
    absencePeriod: PeriodProps[] | null
): ScheduleObjectProps[] => {
    // Helper to map weekdays to their respective numeric values
    const weekDaysMap: { [key: string]: number } = {
        domingo: 0,
        'segunda-feira': 1,
        'terça-feira': 2,
        'quarta-feira': 3,
        'quinta-feira': 4,
        'sexta-feira': 5,
        sábado: 6,
    }

    // Convert selected weekdays to their numeric equivalents
    const selectedWeekDaysNumeric = selectedWeekDays.map((day) => weekDaysMap[day.toLowerCase()])

    // Get the total days in the selected month
    const daysInMonth = new Date(selectedMonth.year, selectedMonth.month + 1, 0).getDate()

    // Convert absencePeriod into a range of dates for exclusion
    const absenceRange: Set<string> = new Set()
    if (absencePeriod && absencePeriod.length === 2) {
        const start = new Date(absencePeriod[0].year, absencePeriod[0].month, absencePeriod[0].day)
        const end = new Date(absencePeriod[1].year, absencePeriod[1].month, absencePeriod[1].day)

        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            absenceRange.add(formattedDate)
        }
    }

    // Helper to convert time string to total minutes
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
    }

    // Build the result array
    const result: ScheduleObjectProps[] = []

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(selectedMonth.year, selectedMonth.month, day)
        const dayOfWeek = currentDate.getDay()

        // Check if the current day matches the selected weekdays
        if (selectedWeekDaysNumeric.includes(dayOfWeek)) {
            for (const time of selectedTime) {
                const totalMinutes = timeToMinutes(time)

                // Skip if the day is within the absence range
                const formattedDate = `${selectedMonth.year}-${selectedMonth.month}-${day}`
                if (absenceRange.has(formattedDate)) {
                    continue
                }

                // Add the object to the result array
                result.push({
                    year: selectedMonth.year,
                    month: selectedMonth.month,
                    day: day,
                    hour: totalMinutes,
                    userId: '',
                    userEmail: '',
                    firstName: '',
                    lastName: '',
                    enable: true,
                })
            }
        }
    }
    return result
}

export const createNewDayPayload = (selectNewDay: selectNewDayProps, selectedTime: string[]): ScheduleObjectProps[] => {
    return selectedTime.map((time) => ({
        year: selectNewDay.year,
        month: selectNewDay.month,
        day: selectNewDay.day,
        hour: timeToInteger(time),
        userId: '',
        userEmail: '',
        firstName: '',
        lastName: '',
        enable: true,
    }))
}

export const sortAppointmentsByHour = (appointmentsData: { data: any[]; day: number; month: number; year: number }) => {
    if (!appointmentsData || !appointmentsData.data) {
        throw new Error('Invalid input: appointmentsData is not properly structured.')
    }

    return {
        ...appointmentsData,
        data: appointmentsData.data.sort((a, b) => a.hour - b.hour),
    }
}

export const sortSchedule = (schedule: ScheduleObjectProps[]): ScheduleObjectProps[] => {
    return schedule.sort((a, b) => {
        if (a.day === b.day) {
            return a.hour - b.hour
        }
        return a.day - b.day
    })
}

export const isExpiredDay = (day: number, month: number, year: number): boolean => {
    const inputDate = new Date(year, month, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return inputDate < today
}

export const CheckPayloadAvailability = (
    previusAgenda: ScheduleObjectProps[],
    newPayload: ScheduleObjectProps[]
): boolean => {
    const existingHours = new Set(previusAgenda.map((item) => item.hour))

    if (previusAgenda.length > 0 && newPayload.length > 0) {
        for (const newItem of newPayload) {
            if (existingHours.has(newItem.hour)) {
                return false
            }
        }
        return true
    }

    return false
}

export const isMonthNotInSchedule = (
    fullSchedule: MonthsScheduledProps[],
    selectedMonth: MonthsScheduledProps
): boolean => {
    return !fullSchedule.some(
        (schedule) =>
            schedule.year === selectedMonth.year &&
            schedule.month === selectedMonth.month &&
            schedule.name === selectedMonth.name
    )
}

export const getBrasiliaOfficialTime = () => {
    const timeZone = 'America/Sao_Paulo'
    const utcTime = utcToZonedTime(new Date(), timeZone)
    const brasiliaOfficialTime = getMinutesOfDayFromTimestamp(utcToZonedTime(utcTime, timeZone).getTime())

    return brasiliaOfficialTime
}

export const getTodayDate = () => {
    const timeZone = 'America/Sao_Paulo'
    const today = utcToZonedTime(new Date(), timeZone)
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    return { currentYear, currentMonth, currentDay }
}

export const getMinutesOfDayFromTimestamp = (timestamp: number): number => {
    const timeZone = 'America/Sao_Paulo'

    const zonedTime = utcToZonedTime(timestamp, timeZone)

    const hours = zonedTime.getHours()
    const minutes = zonedTime.getMinutes()

    return hours * 60 + minutes
}

// Retorna apenas agendamentos futuros
export const filterExpiredAppointments = (schedules: ScheduleObjectProps[]) => {
    const { currentYear, currentMonth, currentDay } = getTodayDate()
    const brasiliaOfficialTime = getBrasiliaOfficialTime()

    const schedulesFiltered = schedules.filter((schedule: ScheduleObjectProps) => {
        if (schedule.year < currentYear) return false // Ano já passou
        if (schedule.year === currentYear && schedule.month < currentMonth) return false // Mês já passou
        if (schedule.year === currentYear && schedule.month === currentMonth && schedule.day < currentDay) return false // Dia já passou
        if (
            schedule.year === currentYear &&
            schedule.month === currentMonth &&
            schedule.day === currentDay &&
            schedule.hour <= brasiliaOfficialTime
        )
            return false // Horário já passou

        return true // Agendamento válido
    })

    return schedulesFiltered
}

// Retorna apenas agendamentos expirados
export const filterFutureAppointments = (schedules: ScheduleObjectProps[]) => {
    const { currentYear, currentMonth, currentDay } = getTodayDate()
    const brasiliaOfficialTime = getBrasiliaOfficialTime()

    const schedulesFiltered = schedules.filter((schedule: ScheduleObjectProps) => {
        if (schedule.year < currentYear) return true // Ano já passou
        if (schedule.year === currentYear && schedule.month < currentMonth) return true // Mês já passou
        if (schedule.year === currentYear && schedule.month === currentMonth && schedule.day < currentDay) return true // Dia já passou
        if (
            schedule.year === currentYear &&
            schedule.month === currentMonth &&
            schedule.day === currentDay &&
            schedule.hour <= brasiliaOfficialTime
        )
            return true // Horário já passou

        return false // Agendamento futuro
    })

    return schedulesFiltered
}

export const availableCancellationTime = (payload: ScheduleObjectProps, deadLine: DeadlineObject): boolean => {
    const createDateFromPayload = (schedule: { year: number; month: number; day: number; hour: number }): Date => {
        const date = new Date(schedule.year, schedule.month - 1, schedule.day)
        date.setMinutes(schedule.hour)
        return date
    }

    const appointmentDate = createDateFromPayload(payload)
    const deadlineDate = createDateFromPayload(deadLine)

    const timeDifference = appointmentDate.getTime() - deadlineDate.getTime()

    const fortyEightHoursInMs = 48 * 60 * 60 * 1000

    // Retorna true se o tempo entre as datas for maior que 48 horas
    return timeDifference > fortyEightHoursInMs
}

export const orderUsers = (users: UserProps[]): UserProps[] => {
    return users.sort((a, b) => {
        if (a.isManager && !b.isManager) return -1
        if (!a.isManager && b.isManager) return 1

        if (a.isAdmin && !b.isAdmin) return -1
        if (!a.isAdmin && b.isAdmin) return 1

        if (!a.isBlocked && b.isBlocked) return -1
        if (a.isBlocked && !b.isBlocked) return 1

        return 0
    })
}

/*
    Em um projeto React utilizando TypeScript e Styled-components,
    para uma aplicação Next.js com Material UI e integração com o Firebase,
    crie uma função 'orderUsers'.

    A função receberá um parâmetro 'users' é um array como esse:
    [
        {
            "isManager":false,
            "id":"diego@email.com",
            "isAdmin":false,
            "phone":"169888877777",
            "credits":2,
            "firstName":"Diego",
            "email":"diego@email.com",
            "cpf":"218.259.308-06",
            "termsOfUse":false,
            "isBlocked":false,
            "lastName":"Souza"
        },
        {
            "phone":"16911110000",
            "cpf":"218.259.308-05",
            "firstName":"Leila",
            "termsOfUse":false,
            "isManager":false,
            "id":"leila@email.com",
            "isBlocked":false,
            "credits":11,
            "isAdmin":true,
            "lastName":"Massaro",
            "email":"leila@email.com"
        },
        {
            "isAdmin":true,
            "cpf":"668.390.880-06",
            "email":"flavio@email.com",
            "isBlocked":false,
            "isManager":true,
            "firstName":"Flávio",
            "id":"flavio@email.com",
            "credits":0,
            "termsOfUse":false,
            "phone":"16900001111",
            "lastName":"Massaro"
        },
        {
            "isAdmin":false,
            "isBlocked":true,
            "isManager":false,
            "email":"du@email.com",
            "cpf":"218.459.308-05",
            "firstName":"Eduardo",
            "id":"du@email.com",
            "credits":0,
            "phone":"16956465465",
            "termsOfUse":false,
            "lastName":"Pereira"
        },
    ]

    A função deve:
    
        Ordenar os objejetos, trazendo primeiro todos os que tiverem a propriedade
        'isManager' igual a true
        Na sequencia, todos os que tiverem a propriedade 'isAdmin' igual a true, se
        for um objeto que tenha tambem 'isManager' true não precisa repetí-lo
        Na sequencia os objetos com as propriedades 'isManager', 'isAdmin' e 'isBlocked'
        igual a false.
        Por último os objetos com 'isBlocked' igual a true
*/
