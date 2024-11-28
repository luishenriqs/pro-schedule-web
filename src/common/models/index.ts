export type GetWeekDaysParams = {
    short?: boolean
}

export type Hours = {
    hour: number
    custumerId: string
}

export type ScheduleObjectProps = {
    year: number
    month: number
    day: number
    hour: number
    custumerId: string
    enable: boolean
    userEmail?: string
}

export type PayloadContextType = {
    payloads: ScheduleObjectProps[]
    addPayload: (newPayload: ScheduleObjectProps) => void
    clearPayloads: () => void
}

export type ScheduleProps = {
    schedule: ScheduleObjectProps[]
}

export type AvailableDaysProps = {
    allDays: number[]
    allScheduleDays: ScheduleObjectProps
}

export type CalendarProps = {
    schedule: ScheduleObjectProps[]
    legend: string
    selectedMonth: number
    selectedYear: number
    handleDayClick: (day: number, month: number, year: number) => void
    handleChangeMonth: () => void
    onMonthChange: (month: number) => void
    onYearChange: (year: number) => void
}

export type EditableCalendarProps = {
    schedule: ScheduleObjectProps[]
    legend: string
    handleDayClick: (day: number, month: number, year: number) => void
    handleChangeMonth: () => void
}

export type CalendarCreateAgendaProps = {
    schedule: ScheduleObjectProps[]
    legend: string
    handleDayClick: (day: number, month: number, year: number) => void
    handleChangeMonth: () => void
}

export type GetDateProps = {
    date: Date
    month: number
    year: number
}

export type dataSelectedProps = {
    data: ScheduleObjectProps[]
    day: number
    month: number
    year: number
}

export type SelectedDataProps = {
    appointmentsData: dataSelectedProps
    legend: string
    handleSetAppointments: (value: ScheduleObjectProps) => void
}

export type HeaderProps = {
    handleCancelAppoitments?: () => void
}

export type NavigatorDrawerProps = {
    isOpen: boolean
    isAdmin: boolean
}

export type NavigatorInLineProps = {
    showMenu?: boolean
    isAdmin: boolean
    payloads: ScheduleObjectProps[]
    handleOpenConfirmModal: () => void
}

export type MenuItem = {
    order: number
    route: string
    title: string
    icon: string
    selected: boolean
    onClickHandler: () => void
}

export type FormValues = {
    isOwner: boolean
    isManager: boolean
    isAdmin: boolean
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    birthday: string
    cpf: string
    cep: string
    address: string
    complement: string
    neighborhood: string
    city: string
    state: string
}

export type UserData = {
    state?: string
    phone?: string
    cpf?: string
    cep?: string
    firstName?: string
    lastName?: string
    isAdmin?: boolean
    password?: string
    neighborhood?: string
    id?: string
    isManager?: boolean
    isOwner?: boolean
    city?: string
    complement?: string
    address?: string
    email?: string
    birthday?: string
}

export type SelectedDateProps = {
    month: number
    name: string
    year: number
}

export type MonthYearSelectProps = {
    onChange: (value: SelectedDateProps) => void
}

export type DaysOfWeekSelectProps = {
    onChange: (selectedDays: string[]) => void
}

export type TimeSelectionProps = {
    onChange: (times: string[]) => void
}

export type AbsencePeriod = {
    year: number
    month: number
    day: number
}

export type AbsencePeriodSelectorProps = {
    selectedMonth: { year: number; month: number }
    onChange: (period: AbsencePeriod[] | null) => void
}

export type PeriodProps = {
    year: number
    month: number
    day: number
}
