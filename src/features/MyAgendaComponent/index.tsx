import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { Container, Content, EmptyLegend, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'
import { CalendarNewSchedule } from '@common/components/CalendarNewSchedule'
import { UseAvailableScheduleByMonth } from '@common/api'
import { dataSelectedProps, ScheduleObjectProps } from '@common/models'
import { filterAppointmentsByDay } from '@common/utils/helpers'
import { Appointments } from '@common/components/Appointments'

export const MyAgendaComponent = () => {
    const { user } = useUser()

    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    // GET SCHEDULE BY MONTH - ENABLE AND AVAILABLE
    const getScheduleByMonth = useCallback(async () => {
        const schedule = await UseAvailableScheduleByMonth(selectedYear, selectedMonth)

        if (schedule) {
            setSchedule(schedule)
            setIsLoading(false)
        } else {
            console.log('No schedule! ')
            setIsLoading(false)
        }
    }, [selectedMonth, selectedYear])

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
                                        <Questrial_Secondary_20_500 text=" - Horários indisponíveis" />
                                    </LegendContainer>
                                </>
                            )}
                        </SchedulingContent>
                    </Content>
                </Container>
            )}
        </>
    )
}
