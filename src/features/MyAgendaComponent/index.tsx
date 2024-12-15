import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetScheduleByMonth, UpdateScheduleAvailability, WriteMultipleDataWithRetry } from '@common/api'
import { useNotification } from '@common/hooks/useNotification'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { CalendarMyAgenda } from '@common/components/CalendarMyAgenda'
import { AppointmentsManaged } from '@common/components/AppointmentsManaged'
import { CreateNewAppointments } from '@common/components/CreateNewAppointments'
import { ListSchedule } from '@common/components/ListSchedule'
import { ModalCancellation } from '@common/components/ModalCancellation'
import { filterAppointmentsByDay, isExpiredDay, sortSchedule } from '@common/utils/helpers'
import { dataSelectedProps, ScheduleObjectProps, selectNewDayProps } from '@common/models'
import { COLORS } from '@common/styles/theme'
import {
    Genos_Primary_24_500,
    Genos_Secondary_16_500,
    Genos_Secondary_24_500,
    Questrial_Secondary_16_500,
} from '@common/components/Typography'
import {
    ButtonContainer,
    Container,
    Content,
    Legend,
    LegendContainer,
    RotateIcon,
    SchedulingContent,
    TitleContainer,
} from './styles'

export const MyAgendaComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()

    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [seeCalendar, setSeeCalendar] = useState(true)
    const [openCancellationModal, setOpenCancellationModal] = useState(false)
    const [payload, setPayload] = useState<ScheduleObjectProps>({} as ScheduleObjectProps)
    const [isUpLoading, setIsUpLoading] = useState(false)
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)
    const [selectNewDay, setSelectNewDay] = useState<selectNewDayProps>({} as selectNewDayProps)
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month)
    }

    const handleYearChange = (year: number) => {
        setSelectedYear(year)
    }

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

    const getScheduleByMonth = useCallback(async () => {
        const fetchedSchedule = await GetScheduleByMonth(selectedYear, selectedMonth)

        if (fetchedSchedule) {
            setSchedule(sortSchedule(fetchedSchedule))
        } else {
            emmitAlert('Nenhuma reserva encontrada!')
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

    const handleCreateNewSchedule = useCallback((day: number, month: number, year: number) => {
        setSelectNewDay({ day, month, year })
        setSelectedDay({} as dataSelectedProps)
    }, [])

    const handleSave = useCallback(
        async (newDayPayload: ScheduleObjectProps[]) => {
            try {
                setIsUpLoading(true)
                const response = await WriteMultipleDataWithRetry(newDayPayload, 'schedule')
                if (response.status === 201) {
                    emmitSuccess(response.message)
                    router.refresh()
                } else {
                    emmitAlert(response.message)
                }
            } catch (error) {
                console.error('Erro ao processar bloco:', error)
                emmitError('Erro ao processar bloco!')
            } finally {
                setIsUpLoading(false)
            }
        },
        [emmitAlert, emmitError, emmitSuccess, router]
    )

    const handleToggleAvailability = useCallback(
        async (payload: ScheduleObjectProps) => {
            if (payload) {
                setIsSaving(true)
                try {
                    const resp = await UpdateScheduleAvailability(payload)

                    if (resp.success) {
                        // Atualizar localmente o estado do agendamento
                        setSchedule((prevSchedule) =>
                            prevSchedule.map((item) =>
                                item.userId === payload.userId && item.day === payload.day && item.hour === payload.hour
                                    ? { ...item, enable: !item.enable }
                                    : item
                            )
                        )

                        // Atualizar o dia selecionado, se aplicável
                        setSelectedDay((prevSelectedDay) => ({
                            ...prevSelectedDay,
                            data: prevSelectedDay?.data?.map((item) =>
                                item.userId === payload.userId && item.day === payload.day && item.hour === payload.hour
                                    ? { ...item, enable: !item.enable }
                                    : item
                            ),
                        }))

                        emmitSuccess('Atualizado com sucesso!')
                    } else {
                        emmitAlert('Não foi possível atualizar os dados!')
                    }
                } catch (error) {
                    console.error('Erro ao atualizar os dados.', error)
                    emmitError('Erro ao atualizar os dados.')
                } finally {
                    setIsSaving(false)
                }
            }
        },
        [emmitAlert, emmitError, emmitSuccess]
    )

    const handleOpenCancelModal = useCallback((payload: ScheduleObjectProps) => {
        setPayload(payload)
        setOpenCancellationModal(true)
    }, [])

    return (
        <>
            {!user?.isAdmin ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header />
                    <TitleContainer>
                        <Genos_Primary_24_500 text={`Olá ${user?.firstName}`} />
                        <Genos_Secondary_24_500 text="Gerencie a sua agenda" />
                        <ButtonContainer onClick={() => setSeeCalendar(!seeCalendar)}>
                            <Genos_Secondary_16_500 text={seeCalendar ? 'Lista' : 'Calendário'} />
                            <RotateIcon />
                        </ButtonContainer>
                    </TitleContainer>
                    {seeCalendar ? (
                        <Content>
                            {isUpLoading ? (
                                <LoadingComponent size="small" />
                            ) : (
                                <SchedulingContent>
                                    <CalendarMyAgenda
                                        schedule={schedule}
                                        legend="Escolha o dia"
                                        handleDayClick={handleDayClick}
                                        handleCreateNewSchedule={handleCreateNewSchedule}
                                        handleChangeMonth={handleChangeMonth}
                                        onMonthChange={handleMonthChange}
                                        onYearChange={handleYearChange}
                                        selectedMonth={selectedMonth}
                                        selectedYear={selectedYear}
                                    />
                                    <LegendContainer>
                                        <Legend color={'primary'} />
                                        <Questrial_Secondary_16_500 text=" - Agenda Aberta" />
                                    </LegendContainer>
                                    <LegendContainer>
                                        <Legend color={'background'} />
                                        <Questrial_Secondary_16_500 text=" - Agenda Indisponível" />
                                    </LegendContainer>
                                    <LegendContainer>
                                        <Legend color={'tertiary'} />
                                        <Questrial_Secondary_16_500 text=" - Agenda Fechada" />
                                    </LegendContainer>

                                    {selectedDay?.data?.length > 0 && (
                                        <>
                                            {isSaving ? (
                                                <LoadingComponent size="small" />
                                            ) : (
                                                <AppointmentsManaged
                                                    appointmentsData={selectedDay}
                                                    legend="Agenda do dia"
                                                    handleToggleAvailability={handleToggleAvailability}
                                                    handleOpenCancelModal={handleOpenCancelModal}
                                                    handleCreateNewSchedule={handleCreateNewSchedule}
                                                />
                                            )}
                                            {isExpiredDay(selectedDay.day, selectedDay.month, selectedDay.year) ? (
                                                <>
                                                    <LegendContainer>
                                                        <Legend
                                                            color={'background'}
                                                            style={{ borderColor: COLORS.disabled_200 }}
                                                        />
                                                        <Questrial_Secondary_16_500 text=" - Horários Expirados" />
                                                    </LegendContainer>
                                                </>
                                            ) : (
                                                <>
                                                    <LegendContainer>
                                                        <Legend color={'primary'} />
                                                        <Questrial_Secondary_16_500 text=" - Horário Disponível" />
                                                    </LegendContainer>
                                                    <LegendContainer>
                                                        <Legend color={'background'} />
                                                        <Questrial_Secondary_16_500 text=" - Horário Desabilitado" />
                                                    </LegendContainer>
                                                    <LegendContainer>
                                                        <Legend color={'tertiary'} />
                                                        <Questrial_Secondary_16_500 text=" - Horário Reservado" />
                                                    </LegendContainer>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {!!selectNewDay?.day && (
                                        <CreateNewAppointments
                                            selectNewDay={selectNewDay}
                                            legend="Adicione novos horários"
                                            handleSetNewDay={handleSave}
                                        />
                                    )}
                                </SchedulingContent>
                            )}
                        </Content>
                    ) : (
                        <Content>
                            {isUpLoading ? (
                                <LoadingComponent size="small" />
                            ) : (
                                <SchedulingContent>
                                    <ListSchedule
                                        schedule={schedule}
                                        handleToggleAvailability={handleToggleAvailability}
                                        handleOpenCancelModal={handleOpenCancelModal}
                                        handleCreateNewSchedule={handleCreateNewSchedule}
                                    />
                                    <LegendContainer>
                                        <Legend color={'primary'} />
                                        <Questrial_Secondary_16_500 text=" - Horário disponível" />
                                    </LegendContainer>
                                    <LegendContainer>
                                        <Legend color={'background'} />
                                        <Questrial_Secondary_16_500 text=" - Horário Desabilitado" />
                                    </LegendContainer>
                                    <LegendContainer>
                                        <Legend color={'tertiary'} />
                                        <Questrial_Secondary_16_500 text=" - Horário Reservado" />
                                    </LegendContainer>
                                    <LegendContainer>
                                        <Legend color={'background'} style={{ borderColor: COLORS.disabled_200 }} />
                                        <Questrial_Secondary_16_500 text=" - Horário Expirado" />
                                    </LegendContainer>
                                </SchedulingContent>
                            )}
                        </Content>
                    )}
                    <ModalCancellation
                        open={openCancellationModal}
                        payload={payload}
                        handleClose={() => setOpenCancellationModal(false)}
                    />
                </Container>
            )}
        </>
    )
}
