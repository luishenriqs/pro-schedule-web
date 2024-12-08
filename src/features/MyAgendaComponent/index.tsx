import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetScheduleByMonth, WriteMultipleDataWithRetry } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { CalendarMyAgenda } from '@common/components/CalendarMyAgenda'
import { Appointments } from '@common/components/Appointments'
import { CreateNewAppointments } from '@common/components/CreateNewAppointments'
import { filterAppointmentsByDay } from '@common/utils/helpers'
import { dataSelectedProps, ScheduleObjectProps, selectNewDayProps } from '@common/models'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { Container, Content, EmptyLegend, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const MyAgendaComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()

    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [isUpLoading, setIsUpLoading] = useState(false)
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)
    const [selectNewDay, setSelectNewDay] = useState<selectNewDayProps>({} as selectNewDayProps)
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    // Funções de callback para receber as mudanças de mês e ano
    const handleMonthChange = (month: number) => {
        setSelectedMonth(month)
    }

    const handleYearChange = (year: number) => {
        setSelectedYear(year)
    }

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

    // GET SCHEDULE BY MONTH
    const getScheduleByMonth = useCallback(async () => {
        const schedule = await GetScheduleByMonth(selectedYear, selectedMonth)

        if (schedule) {
            setSchedule(schedule)
            setIsLoading(false)
        } else {
            emmitAlert('Nenhuma reserva encontrada!')
            setIsLoading(false)
        }
    }, [emmitAlert, selectedMonth, selectedYear])

    useEffect(() => {
        if (user?.isAdmin) getScheduleByMonth()
    }, [getScheduleByMonth, user?.isAdmin])

    const handleDayClick = useCallback(
        (day: number, month: number, year: number) => {
            const dataSelected = {
                data: schedule,
                day,
                month,
                year,
            }
            setSelectedDay(filterAppointmentsByDay(dataSelected))
            setSelectNewDay({} as selectNewDayProps)
        },
        [schedule]
    )

    const handleCriateNewSchedule = useCallback((day: number, month: number, year: number) => {
        const dataSelected = {
            day,
            month,
            year,
        }
        setSelectNewDay(dataSelected)
        setSelectedDay({} as dataSelectedProps)
    }, [])

    const handleSave = useCallback(
        async (newDayPayload: ScheduleObjectProps[]) => {
            try {
                setIsUpLoading(true)
                const response = await WriteMultipleDataWithRetry(newDayPayload, 'schedule')
                if (response.status === 201) {
                    setIsUpLoading(false)
                    emmitSuccess(response.message)
                    router.refresh()
                } else {
                    setIsUpLoading(false)
                    emmitAlert(response.message)
                }
            } catch (error) {
                setIsUpLoading(false)
                console.error('Erro ao processar bloco:', error)
                emmitError('Erro ao processar bloco!')
            }
        },
        [emmitAlert, emmitError, emmitSuccess, router]
    )

    return (
        <>
            {!user?.isAdmin || isLoading ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header />
                    <TitleContainer>
                        <Genos_Primary_24_500 text={'Olá ' + user?.firstName} />
                        <Genos_Secondary_24_500 text="Gerencie a sua agenda" />
                    </TitleContainer>
                    <Content>
                        {isUpLoading ? (
                            <LoadingComponent />
                        ) : (
                            <SchedulingContent>
                                <CalendarMyAgenda
                                    schedule={schedule}
                                    legend="Escolha o dia"
                                    handleDayClick={handleDayClick}
                                    handleCriateNewSchedule={handleCriateNewSchedule}
                                    handleChangeMonth={handleChangeMonth}
                                    onMonthChange={handleMonthChange}
                                    onYearChange={handleYearChange}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                />
                                <LegendContainer>
                                    <Legend />
                                    <Questrial_Secondary_20_500 text=" - Dias disponíveis" />
                                </LegendContainer>

                                {selectedDay?.data?.length > 0 && (
                                    <>
                                        <Appointments
                                            key={JSON.stringify(schedule)}
                                            appointmentsData={selectedDay}
                                            legend="Escolha o seu horário"
                                            handleSetAppointments={() => {}}
                                        />
                                        <LegendContainer>
                                            <Legend />
                                            <Questrial_Secondary_20_500 text=" - Horários disponíveis" />
                                        </LegendContainer>
                                        <LegendContainer>
                                            <EmptyLegend />
                                            <Questrial_Secondary_20_500 text=" - Reservados / Desabilitados" />
                                        </LegendContainer>
                                    </>
                                )}
                                {!!selectNewDay?.day && (
                                    <>
                                        <CreateNewAppointments
                                            key={JSON.stringify(schedule)}
                                            selectNewDay={selectNewDay}
                                            legend="Adicione novos horários"
                                            handleSetNewDay={(newDayPayload) => handleSave(newDayPayload)}
                                        />
                                    </>
                                )}
                            </SchedulingContent>
                        )}
                    </Content>
                </Container>
            )}
        </>
    )
}
