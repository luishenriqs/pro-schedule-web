import React, { useCallback, useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { EditableCalendar } from '@common/components/EditableCalendar'
import { EditableAppointments } from '@common/components/EditableAppointments'
import { dataSelectedProps, PeriodProps, ScheduleObjectProps, SelectedDateProps } from '@common/models'
import { FilledPrimaryButton } from '@common/components/Button'
import { MonthYearSelect } from '@common/components/MonthYearSelect'
import { DaysOfWeekSelect } from '@common/components/DaysOfWeekSelect'
import { TimeSelection } from '@common/components/TimeSelection'
import { LoadingComponent } from '@common/components/Loading'
import { AbsencePeriodSelector } from '@common/components/AbsencePeriodSelector'
import { filterAppointmentsByDay, generateSchedule } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import {
    Container,
    Content,
    DateContent,
    EmptyLegend,
    LeftSide,
    Legend,
    LegendContainer,
    RightSide,
    SchedulingContent,
    TitleContainer,
} from './styles'
import { UseWriteMultipleDataWithRetry } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'

export const AvailabilityComponent = () => {
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()

    const [selectedMonth, setSelectedMonth] = useState<SelectedDateProps>({} as SelectedDateProps)
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([] as string[])
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [absencePeriod, setAbsencePeriod] = useState<PeriodProps[] | null>(null)
    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)

    const userName = 'Flávio'

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    const handleDateChange = (value: { month: number; name: string; year: number }) => {
        setSelectedMonth(value)
    }

    const handleDaysChange = (selectedDays: string[]) => {
        setSelectedWeekDays(selectedDays)
    }

    const handleTimeChange = (times: string[]) => {
        setSelectedTime(times)
    }

    const handlePeriodChange = (period: PeriodProps[] | null) => {
        setAbsencePeriod(period)
    }

    const generateNewSchedule = useCallback(() => {
        const newSchedule = generateSchedule(selectedMonth, selectedWeekDays, selectedTime, absencePeriod)
        setSchedule(newSchedule)
    }, [absencePeriod, selectedMonth, selectedTime, selectedWeekDays])

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

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

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

    const handleSave = useCallback(async () => {
        try {
            const response = await UseWriteMultipleDataWithRetry(schedule, 'schedule')
            if (response.status === 201) {
                console.log('Message: ', response.status, response.message)
                emmitSuccess(response.message)
            } else {
                console.log('Message: ', response.status, response.message)
                emmitAlert(response.message)
            }
        } catch (error) {
            console.error('Erro ao processar bloco:', error)
            emmitError('Erro ao processar bloco!')
        }
    }, [emmitAlert, emmitError, emmitSuccess, schedule])

    useEffect(() => {
        console.log('schedule:', JSON.stringify(schedule))
    }, [schedule])

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <Container>
                    <Header />
                    <TitleContainer>
                        {schedule.length === 0 ? (
                            <>
                                <Genos_Primary_24_500 text={'Olá ' + userName} />
                                <Genos_Secondary_24_500 text="Defina a sua disponibilidade" />
                            </>
                        ) : (
                            <Genos_Secondary_24_500 text="Edite sua agenda" />
                        )}
                    </TitleContainer>
                    {schedule.length === 0 ? (
                        <Content>
                            <LeftSide>
                                <DateContent>
                                    <Genos_Secondary_24_500 text="Escolha o ano e o mês:" />
                                    <MonthYearSelect onChange={handleDateChange} />
                                </DateContent>
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
                        </Content>
                    ) : (
                        <Content>
                            <SchedulingContent>
                                <EditableCalendar
                                    data={schedule}
                                    legend="Escolha o dia"
                                    handleDayClick={handleDayClick}
                                    handleChangeMonth={handleChangeMonth}
                                />
                                <LegendContainer>
                                    <Legend />
                                    <Questrial_Secondary_20_500 text=" - Dias disponíveis" />
                                </LegendContainer>

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
                            </SchedulingContent>
                            <FilledPrimaryButton title="Salvar" onClick={handleSave} />
                        </Content>
                    )}
                </Container>
            )}
        </>
    )
}
