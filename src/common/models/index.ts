export type GetWeekDaysParams = {
    short?: boolean
}

export type Hours = {
    hour: number
    custumerId: string
}

export type DateProps = {
    year: number
    month: number
    day: number
    hour: number
    custumerId: string
}

export type ScheduleProps = {
    schedule: DateProps[]
}

export type AvailableDaysProps = {
    allDays: number[]
    allScheduleDays: DateProps
}

export type CalendarProps = {
    data: DateProps[]
    handleDayClick: (day: number, month: number, year: number) => void
    handleChangeMonth: () => void
}

export type GetDateProps = {
    date: Date
    month: number
    year: number
}

export type dataSelectedProps = {
    data: DateProps[]
    day: number
    month: number
    year: number
}

export type SelectedDataProps = {
    appontmentsData: dataSelectedProps
    handleSetAppointments: (value: DateProps) => void
}

export type DrawerProps = {
    isOpen: boolean
    isAdmin: boolean
}

export type MenuItem = {
    order: number
    route: string
    title: string
    icon: string
    onClickHandler: () => void
}

export type FormValues = {
    isOwner: boolean
    isManager: boolean
    isAdmin: boolean
    id: string
    fullName: string
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
