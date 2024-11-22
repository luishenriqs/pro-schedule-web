import React, { useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { PeriodProps, SelectedDate } from '@common/models'
import { FilledPrimaryButton } from '@common/components/Button'
import { MonthYearSelect } from '@common/components/MonthYearSelect'
import { DaysOfWeekSelect } from '@common/components/DaysOfWeekSelect'
import { TimeSelection } from '@common/components/TimeSelection'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, DateContent, TitleContainer } from './styles'
import { AbsencePeriodSelector } from '@common/components/AbsencePeriodSelector'

export const AvailabilityComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState<SelectedDate>({} as SelectedDate)
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([] as string[])
    const [selectedTime, setSelectedTime] = useState<string[]>([] as string[])
    const [absencePeriod, setAbsencePeriod] = useState<PeriodProps[] | null>(null)

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

    useEffect(() => {
        console.log('Data selecionada:', JSON.stringify(selectedMonth))
        console.log('Dias selecionados:', JSON.stringify(selectedWeekDays))
        console.log('Horários Selecionados:', JSON.stringify(selectedTime))
        console.log('Ausência selecionada:', absencePeriod)
    }, [absencePeriod, selectedMonth, selectedTime, selectedWeekDays])

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
                <FilledPrimaryButton title="Gerar agenda" />
            </Content>
        </Container>
    )
}

/*
Em um projeto react typescript com next, uso a lib MUI.
Quero que crie uma função que receba os seguintes parâmetros:

O primeiro é 'selectedMonth' e é um objeto como esse:
{"month":0,"name":"janeiro","year":2025}.

O segundo é 'selectedWeekDays' e é um array como esse:
["segunda-feira","terça-feira","quinta-feira","sexta-feira"].

O terceiro é 'selectedHours' que é um array como esse: ["08:30","09:30","11:00"]


A função deve retornar um array de objetos como esse:
{
    year: 2024,
    month: 10,
    day: 26,
    hour: 480,
    custumerId: '',
    enable: true,
},
Cada objeto do retorno deverá ter suas propriedades preenchidas da seguinte forma:
    a propriedade 'year' receberá o valor de 'year' do parâmetro 'selectedMonth',
    a propriedade 'month' receberá o valor de 'month' do parâmetro 'selectedMonth',
    a propriedade 'day' será preenchida com o valor numérico de um dos dias do mês
    correspondentes aos dias da semana selecionados no parâmetro 'selectedWeekDays',
    a propriedade 'hour' será preenchida com o valor de um dos horários selecionados
    na propriedade 'selectedHours',
    a propriedade 'custumerId' terá seu valor inicial vazio,
    a propriedade 'enable' terá seu valor inicial true

Cada objeto do retorno deve combinar valores únicos a partir da data indicada nas
propriedades year, month e day com os horários definidos em 'selectedHours'

Então, se na propriedade 'selectedHours' houver 4 horarios selecionados, haverá 4
objetos para cada dia ao longo do mês, sempre respeitando o filtro dos dias da
semana indicados na propriedade 'selectedWeekDays'
*/
