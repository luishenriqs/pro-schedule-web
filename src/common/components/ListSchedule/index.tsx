import React, { useCallback, useEffect, useRef } from 'react'
import { ListScheduleProps, ScheduleObjectProps } from '@common/models'
import { Genos_Primary_24_500, Genos_Secondary_20_500, Genos_White_20_500 } from '../Typography'
import { formatDateShortVersion, integerToTime } from '@common/utils/helpers'
import { Container, Content, DateSeparator, HourContainer, NameContainer, Row } from './styles'

export const ListSchedule = ({ schedule }: ListScheduleProps) => {
    // Ordena o schedule por dia e hora
    const sortedSchedule = [...schedule].sort((a, b) => {
        if (a.day === b.day) {
            return a.hour - b.hour
        }
        return a.day - b.day
    })

    // Agrupa os itens por dia
    const groupedSchedule = sortedSchedule.reduce<Record<number, ScheduleObjectProps[]>>((acc, item) => {
        acc[item.day] = acc[item.day] || []
        acc[item.day].push(item)
        return acc
    }, {})

    // Cria referência para a rolagem
    const currentDayRef = useRef<HTMLDivElement | null>(null)

    // Calcula o dia atual
    const today = new Date()
    const currentDay = today.getDate()

    // Encontra o primeiro dia útil (hoje ou próximo)
    const nextAvailableDay =
        Object.keys(groupedSchedule).find((day) => parseInt(day, 10) >= currentDay) || Object.keys(groupedSchedule)[0]

    // useEffect para rolar até o dia atual ou próximo dia
    useEffect(() => {
        if (currentDayRef.current) {
            currentDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])

    const hoursList = useCallback((appointmentsData: ScheduleObjectProps[]) => {
        if (!appointmentsData) return null

        return appointmentsData.map((item) => {
            if (item.enable && !item.userEmail && !item.userId) {
                // Caso 1: Horário disponível
                return (
                    <Row key={`${item.day}-${item.hour}-${item.userId}`}>
                        <HourContainer color={'primary'}>
                            <Genos_Secondary_20_500 text={integerToTime(item.hour)} />
                        </HourContainer>
                        <NameContainer>
                            <Genos_Secondary_20_500 text={item.firstName} />
                            <Genos_Secondary_20_500 text={item.lastName} />
                        </NameContainer>
                    </Row>
                )
            } else if (!item.enable) {
                // Caso 2: Horário indisponível (enable = false)
                return (
                    <Row key={`${item.day}-${item.hour}-${item.userId}`}>
                        <HourContainer color={'background'}>
                            <Genos_Secondary_20_500 text={integerToTime(item.hour)} />
                        </HourContainer>
                        <NameContainer>
                            <Genos_Secondary_20_500 text={item.firstName} />
                            <Genos_Secondary_20_500 text={item.lastName} />
                        </NameContainer>
                    </Row>
                )
            } else if (item.userEmail && item.userId) {
                // Caso 3: Horário indisponível (userEmail e userId preenchidos)
                return (
                    <Row key={`${item.day}-${item.hour}-${item.userId}`}>
                        <HourContainer color={'tertiary'}>
                            <Genos_White_20_500 text={integerToTime(item.hour)} />
                        </HourContainer>
                        <NameContainer>
                            <Genos_Secondary_20_500 text={item.firstName} />
                            <Genos_Secondary_20_500 text={item.lastName} />
                        </NameContainer>
                    </Row>
                )
            }
            return null
        })
    }, [])

    return (
        <Container>
            <Content>
                {Object.entries(groupedSchedule).map(([day, items]) => {
                    const isCurrentDay = parseInt(day, 10) === currentDay
                    const isNextAvailableDay = day === nextAvailableDay
                    return (
                        <React.Fragment key={day}>
                            <DateSeparator ref={isCurrentDay || isNextAvailableDay ? currentDayRef : null}>
                                <Genos_Primary_24_500
                                    text={formatDateShortVersion(items[0].day, items[0].month, items[0].year)}
                                />
                            </DateSeparator>
                            {hoursList(items)}
                        </React.Fragment>
                    )
                })}
            </Content>
        </Container>
    )
}
