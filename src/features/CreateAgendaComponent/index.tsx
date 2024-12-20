import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@common/hooks/contexts/UserContext'
import { GetMonthsScheduled, WriteMultipleDataWithRetry } from '@common/api'
import Header from '@common/components/Header'
import { CalendarCreateAgenda } from '@common/components/CalendarCreateAgenda'
import { EditableAppointments } from '@common/components/EditableAppointments'
import { FilledPrimaryButton } from '@common/components/Button'
import { MonthYearSelect } from '@common/components/MonthYearSelect'
import { DaysOfWeekSelect } from '@common/components/DaysOfWeekSelect'
import { TimeSelection } from '@common/components/TimeSelection'
import { LoadingComponent } from '@common/components/Loading'
import { AbsencePeriodSelector } from '@common/components/AbsencePeriodSelector'
import { useNotification } from '@common/hooks/useNotification'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import {
    dataSelectedProps,
    MonthsScheduledProps,
    PeriodProps,
    ScheduleObjectProps,
    SelectedDateProps,
} from '@common/models'
import { filterAppointmentsByDay, generateSchedule, isMonthNotInSchedule } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import {
    ButtonsContainer,
    Container,
    Content,
    DateContent,
    EditCalendarContainer,
    EmptyLegend,
    LeftSide,
    Legend,
    LegendContainer,
    RightSide,
    TitleContainer,
} from './styles'

export const CreateAgendaComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()

    const [selectedMonth, setSelectedMonth] = useState<SelectedDateProps>({} as SelectedDateProps)
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([] as string[])
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [absencePeriod, setAbsencePeriod] = useState<PeriodProps[] | null>(null)
    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)

    const [isLoading, setIsLoading] = useState(true)
    const [isUpLoading, setIsUpLoading] = useState(false)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    const handleDateChange = useCallback(
        async (value: MonthsScheduledProps) => {
            try {
                const fullSchedule = await GetMonthsScheduled()
                if (fullSchedule) {
                    const monthAvailable = isMonthNotInSchedule(fullSchedule, value)
                    if (monthAvailable) {
                        setSelectedMonth(value)
                    } else {
                        emmitAlert('Este mês já possúi agendamentos!')
                        setSelectedMonth({} as SelectedDateProps)
                    }
                }
            } catch (error) {
                console.error('Erro na requisição', error)
                emmitError('Erro na requisição')
            }
        },
        [emmitAlert, emmitError]
    )

    const handleDaysChange = (selectedDays: string[]) => {
        setSelectedWeekDays(selectedDays)
    }

    const handleTimeChange = (times: string[]) => {
        setSelectedTime(times)
    }

    const handlePeriodChange = (period: PeriodProps[] | null) => {
        setAbsencePeriod(period)
    }

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

    const handleDayClick = useCallback(
        (day: number, month: number, year: number) => {
            const dataSelected = {
                data: schedule,
                day,
                month,
                year,
            }
            setSelectedDay(filterAppointmentsByDay(dataSelected))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [schedule]
    )

    const handleEditSchedule = useCallback(
        (appointment: ScheduleObjectProps) => {
            const updatedSchedule = schedule.map((item) =>
                item.year === appointment.year &&
                item.month === appointment.month &&
                item.day === appointment.day &&
                item.hour === appointment.hour
                    ? { ...item, enable: !item.enable } // Cria um novo objeto com a propriedade 'enable' alterada
                    : item
            )

            setSchedule(updatedSchedule)

            // Recalcula selectedDay para refletir mudanças no schedule
            setSelectedDay((prevSelectedDay) =>
                filterAppointmentsByDay({
                    data: updatedSchedule,
                    day: prevSelectedDay.day,
                    month: prevSelectedDay.month,
                    year: prevSelectedDay.year,
                })
            )
        },
        [schedule]
    )

    const generateNewSchedule = useCallback(() => {
        const newSchedule = generateSchedule(selectedMonth, selectedWeekDays, selectedTime, absencePeriod)
        if (newSchedule.length > 0) {
            setSchedule(newSchedule)
        } else {
            emmitAlert('Preencha todos os dados!')
        }
    }, [absencePeriod, emmitAlert, selectedMonth, selectedTime, selectedWeekDays])

    const handleSave = useCallback(async () => {
        try {
            setIsUpLoading(true)
            const response = await WriteMultipleDataWithRetry(schedule, 'schedule')
            if (response.status === 201) {
                setIsUpLoading(false)
                emmitSuccess(response.message)
                router.push('/')
            } else {
                setIsUpLoading(false)
                emmitAlert(response.message)
            }
        } catch (error) {
            setIsUpLoading(false)
            console.error('Erro ao processar bloco:', error)
            emmitError('Erro ao processar bloco!')
        }
    }, [emmitAlert, emmitError, emmitSuccess, router, schedule])

    const handleGoBack = useCallback(() => {
        setSchedule([])
        setSelectedDay({} as dataSelectedProps)
        setSelectedMonth({} as SelectedDateProps)
        setSelectedWeekDays([] as string[])
        setSelectedTime([] as string[])
        setAbsencePeriod(null)
    }, [])

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
                        {schedule.length === 0 ? (
                            <>
                                <Genos_Primary_24_500 text={'Olá ' + user?.firstName} />
                                <Genos_Secondary_24_500 text="Crie uma nova agenda" />
                                <DateContent style={{ padding: '30px 10px 0' }}>
                                    <Genos_Secondary_24_500 text="Escolha o ano e o mês:" />
                                    <MonthYearSelect onChange={handleDateChange} />
                                </DateContent>
                            </>
                        ) : (
                            <Genos_Secondary_24_500 text="Edite sua agenda" />
                        )}
                    </TitleContainer>
                    {schedule.length === 0 ? (
                        <Content>
                            {!!selectedMonth.name && (
                                <>
                                    <LeftSide>
                                        <DateContent>
                                            <Genos_Secondary_24_500 text="Escolha os dias da semana:" />
                                            <DaysOfWeekSelect onChange={handleDaysChange} />
                                        </DateContent>
                                    </LeftSide>
                                    <RightSide>
                                        <DateContent>
                                            <Genos_Secondary_24_500 text="Escolha os horários de ínicio de cada atendimento:" />
                                            <TimeSelection onChange={handleTimeChange} />
                                        </DateContent>
                                        <DateContent>
                                            <AbsencePeriodSelector
                                                selectedMonth={selectedMonth}
                                                onChange={handlePeriodChange}
                                            />
                                        </DateContent>
                                        <FilledPrimaryButton title="Gerar agenda" onClick={generateNewSchedule} />
                                    </RightSide>
                                </>
                            )}
                        </Content>
                    ) : (
                        <Content>
                            {isUpLoading ? (
                                <LoadingComponent />
                            ) : (
                                <EditCalendarContainer>
                                    <LeftSide>
                                        <CalendarCreateAgenda
                                            schedule={schedule}
                                            legend="Escolha o dia"
                                            handleDayClick={handleDayClick}
                                            handleChangeMonth={handleChangeMonth}
                                        />
                                        <LegendContainer>
                                            <Legend />
                                            <Questrial_Secondary_20_500 text=" - Dias disponíveis" />
                                        </LegendContainer>
                                    </LeftSide>

                                    <RightSide>
                                        {selectedDay?.data?.length > 0 && (
                                            <>
                                                <EditableAppointments
                                                    key={JSON.stringify(schedule)}
                                                    appointmentsData={selectedDay}
                                                    legend="Edite o horário"
                                                    handleSetAppointments={(value) => handleEditSchedule(value)}
                                                />
                                                <LegendContainer>
                                                    <Legend />
                                                    <Questrial_Secondary_20_500 text=" - Horários disponíveis" />
                                                </LegendContainer>
                                                <LegendContainer>
                                                    <EmptyLegend />
                                                    <Questrial_Secondary_20_500 text=" - Horários desabilitados" />
                                                </LegendContainer>
                                            </>
                                        )}
                                        <ButtonsContainer>
                                            <FilledPrimaryButton title="Salvar" onClick={handleSave} />
                                            <GenosPrimaryButtonText
                                                title="Voltar"
                                                size="medium"
                                                onClick={() => handleGoBack()}
                                            />
                                        </ButtonsContainer>
                                    </RightSide>
                                </EditCalendarContainer>
                            )}
                        </Content>
                    )}
                </Container>
            )}
        </>
    )
}
