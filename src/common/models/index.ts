export type GetWeekDaysParams = {
    short?: boolean
}

export type Hours = {
    hour: number
    custumerId: string
}

export type PayloadProps = {
    year: number
    month: number
    day: number
    hour: number
    custumerId?: string
    userEmail?: string
}

export type PayloadContextType = {
    payloads: PayloadProps[]
    addPayload: (newPayload: PayloadProps) => void
    clearPayloads: () => void
}

export type ScheduleProps = {
    schedule: PayloadProps[]
}

export type AvailableDaysProps = {
    allDays: number[]
    allScheduleDays: PayloadProps
}

export type CalendarProps = {
    data: PayloadProps[]
    handleDayClick: (day: number, month: number, year: number) => void
    handleChangeMonth: () => void
}

export type GetDateProps = {
    date: Date
    month: number
    year: number
}

export type dataSelectedProps = {
    data: PayloadProps[]
    day: number
    month: number
    year: number
}

export type SelectedDataProps = {
    appontmentsData: dataSelectedProps
    handleSetAppointments: (value: PayloadProps) => void
}

export type NavigatorDrawerProps = {
    isOpen: boolean
    isAdmin: boolean
}

export type NavigatorInLineProps = {
    showMenu?: boolean
    isAdmin: boolean
    payloads: PayloadProps[]
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

export type TimePickerProps = {
    label: string
    value: string
    onChange: (newTime: string) => void
}

export type MonthYearSelectProps = {
    onChange: (value: SelectedDate) => void
}

export type SelectedDate = {
    month: number
    name: string
    year: number
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
