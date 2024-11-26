import React, { useCallback, useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { PeriodProps, ScheduleObjectProps, SelectedDateProps } from '@common/models'
import { FilledPrimaryButton } from '@common/components/Button'
import { MonthYearSelect } from '@common/components/MonthYearSelect'
import { DaysOfWeekSelect } from '@common/components/DaysOfWeekSelect'
import { TimeSelection } from '@common/components/TimeSelection'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, DateContent, TitleContainer } from './styles'
import { AbsencePeriodSelector } from '@common/components/AbsencePeriodSelector'
import { generateSchedule } from '@common/utils/helpers'

export const AvailabilityComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState<SelectedDateProps>({} as SelectedDateProps)
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([] as string[])
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [absencePeriod, setAbsencePeriod] = useState<PeriodProps[] | null>(null)
    const [schedule, setSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])

    const userName = 'Flávio'

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

    useEffect(() => {
        console.log('schedule:', JSON.stringify(schedule))
    }, [schedule])

    return (
        <Container>
            <Header />
            <TitleContainer>
                <Genos_Secondary_24_500 text={'Olá ' + userName} />
                <Genos_Secondary_24_500 text="Defina a sua disponibilidade" />
            </TitleContainer>
            <Content>
                <DateContent>
                    <Genos_Secondary_24_500 text="Escolha o ano e o mês:" />
                    <MonthYearSelect onChange={handleDateChange} />
                </DateContent>
                <DateContent>
                    <Genos_Secondary_24_500 text="Escolha os dias da semana:" />
                    <DaysOfWeekSelect onChange={handleDaysChange} />
                </DateContent>
                <DateContent>
                    <Genos_Secondary_24_500 text="Escolha os horários de ínicio de cada atendimento:" />
                    <TimeSelection onChange={handleTimeChange} />
                </DateContent>
                <DateContent>
                    <AbsencePeriodSelector selectedMonth={selectedMonth} onChange={handlePeriodChange} />
                </DateContent>
                <FilledPrimaryButton title="Gerar agenda" onClick={generateNewSchedule} />
            </Content>
        </Container>
    )
}
