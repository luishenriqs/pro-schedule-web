import React, { useCallback, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { GetAvailableScheduleByMonth } from '@common/api'
import { firebaseConfig } from '../../../firebaseConfig'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { CalendarNewSchedule } from '@common/components/CalendarNewSchedule'
import { LoadingComponent } from '@common/components/Loading'
import { AppointmentsSchedule } from '@common/components/AppointmentsSchedule'
import { ScheduleObjectProps, dataSelectedProps } from '@common/models'
import { ModalSighUp } from '@common/components/ModalSighUp'
import { ModalConfirmation } from '@common/components/ModalConfirmation'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Questrial_Secondary_16_500 } from '@common/components/Typography'
import { filterAppointmentsByDay, initialScript } from '@common/utils/helpers'
import { Container, Content, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const NewScheduleComponent = () => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const { addPayload, clearPayloads } = usePayload()
    const { user } = useUser()

    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)
    const [openSighUpModal, setOpenSighUpModal] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    // INICIAL SCRIPT
    const createManager = useCallback(async () => {
        const resp = await initialScript()
        if (resp?.success) {
            console.log('First user created successfully!')
        } else {
            console.log('Error creating owner user')
        }
    }, [])

    const firstScript = useCallback(async () => {
        const docRef = doc(db, 'users', 'lh.p@hotmail.com')
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            createManager()
        }
    }, [db, createManager])

    useEffect(() => {
        firstScript()
    }, [firstScript])

    // GET SCHEDULE BY MONTH - ENABLE AND AVAILABLE
    const getScheduleByMonth = useCallback(async () => {
        const schedule = await GetAvailableScheduleByMonth(selectedYear, selectedMonth)

        if (schedule) {
            setSchedule(schedule)
            setIsLoading(false)
        } else {
            console.log('No schedule! ')
            setIsLoading(false)
        }
    }, [selectedMonth, selectedYear])

    useEffect(() => {
        getScheduleByMonth()
    }, [getScheduleByMonth])

    const handleDayClick = useCallback(
        (day: number, month: number, year: number) => {
            const dataSelected = {
                data: schedule,
                day,
                month,
                year,
            }
            setSelectedDay(filterAppointmentsByDay(dataSelected))
        },
        [schedule]
    )

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

    // Funções de callback para receber as mudanças de mês e ano
    const handleMonthChange = (month: number) => {
        setSelectedMonth(month)
    }

    const handleYearChange = (year: number) => {
        setSelectedYear(year)
    }

    // SET APPOINTMENTS
    const handleSetAppointments = useCallback(
        (appointment: ScheduleObjectProps) => {
            // Atualiza a visualização do calendário de agendamento
            const updatedSchedule = schedule.map((item) =>
                item.year === appointment.year &&
                item.month === appointment.month &&
                item.day === appointment.day &&
                item.hour === appointment.hour &&
                item.enable === true
                    ? {
                          ...item,
                          userId: (user && user.id) ?? '',
                          userEmail: (user && user.email) ?? '',
                          firstName: (user && user.firstName) ?? '',
                          lastName: (user && user.lastName) ?? '',
                      } // Cria um novo objeto
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

            // Adiciona o appointment no payload
            if (user && user.id) {
                appointment.userId = user.id
                appointment.userEmail = user.email
                appointment.firstName = user.firstName
                appointment.lastName = user.lastName

                addPayload(appointment)
                setOpenConfirmationModal(true)
            } else {
                setOpenSighUpModal(true)
            }
        },
        [addPayload, schedule, user]
    )

    // CANCEL APPOINTMENTS
    const handleCancelAppoitments = useCallback(() => {
        // Fecha o modal de confirmação
        setOpenConfirmationModal(false)

        // Limpa os payloads pendentes
        clearPayloads()

        // Atualiza o schedule removendo o 'userId' dos appointments marcados
        const updatedSchedule = schedule.map(
            (item) =>
                item.userId // Verifica se 'userId' está preenchido
                    ? { ...item, userId: '' } // Define como vazio
                    : item // Mantém o objeto inalterado
        )

        // Atualiza o estado de schedule
        setSchedule(updatedSchedule)

        // Recalcula e atualiza o estado de selectedDay
        setSelectedDay(
            filterAppointmentsByDay({
                data: updatedSchedule,
                day: selectedDay.day,
                month: selectedDay.month,
                year: selectedDay.year,
            })
        )
    }, [clearPayloads, schedule, selectedDay])

    return (
        <>
            {isLoading ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header handleCancelAppoitments={handleCancelAppoitments} />
                    <TitleContainer>
                        {user && <Genos_Primary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Faça o seu agendamento" />
                    </TitleContainer>
                    <Content>
                        <SchedulingContent>
                            <CalendarNewSchedule
                                schedule={schedule}
                                legend="Escolha o seu dia"
                                handleDayClick={handleDayClick}
                                handleChangeMonth={handleChangeMonth}
                                onMonthChange={handleMonthChange}
                                onYearChange={handleYearChange}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                            />
                            <LegendContainer>
                                <Legend />
                                <Questrial_Secondary_16_500 text=" - Dias disponíveis" />
                            </LegendContainer>

                            {selectedDay?.data?.length > 0 && (
                                <>
                                    <AppointmentsSchedule
                                        key={JSON.stringify(schedule)}
                                        appointmentsData={selectedDay}
                                        legend="Escolha o seu horário"
                                        handleSetAppointments={(value) => handleSetAppointments(value)}
                                    />
                                    <LegendContainer>
                                        <Legend />
                                        <Questrial_Secondary_16_500 text=" - Horários disponíveis" />
                                    </LegendContainer>
                                </>
                            )}
                        </SchedulingContent>
                    </Content>
                </Container>
            )}
            <ModalSighUp
                open={openSighUpModal}
                handleClose={() => {
                    setOpenSighUpModal(false)
                }}
            />
            <ModalConfirmation
                open={openConfirmationModal}
                handleCancelAppoitments={handleCancelAppoitments}
                handleClose={() => setOpenConfirmationModal(false)}
            />
        </>
    )
}
