import React, { useCallback, useEffect, useRef } from 'react'
import { ListScheduleProps, ScheduleObjectProps } from '@common/models'
import { COLORS } from '@common/styles/theme'
import {
    Genos_Disabled_20_500,
    Genos_Disabled_24_500,
    Genos_Primary_24_500,
    Genos_Secondary_20_500,
    Genos_White_20_500,
} from '../Typography'
import { formatDateShortVersion, getHourButtonType, integerToTime, isExpiredDay } from '@common/utils/helpers'
import {
    Container,
    Content,
    DateContentColumn,
    DateContentRow,
    DateSeparator,
    HourContainer,
    NameContainer,
    Row,
} from './styles'

export const ListSchedule = ({ schedule, handleToggleAvailability, handleOpenCancelModal }: ListScheduleProps) => {
    const sortedSchedule = [...schedule].sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year
        }
        if (a.month !== b.month) {
            return a.month - b.month
        }
        if (a.day !== b.day) {
            return a.day - b.day
        }
        return a.hour - b.hour
    })

    // Agrupa os itens por dia
    const groupedSchedule = sortedSchedule.reduce<Record<string, ScheduleObjectProps[]>>((acc, item) => {
        const key = `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`
        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
    }, {})

    const currentDayRef = useRef<HTMLDivElement | null>(null)

    const today = new Date()

    const todayKey = `${today.getFullYear()}-${String(today.getMonth()).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    const nextAvailableDay =
        Object.keys(groupedSchedule).find((key) => key >= todayKey) || Object.keys(groupedSchedule)[0]

    // useEffect para rolar até o dia atual ou próximo dia
    useEffect(() => {
        if (currentDayRef.current) {
            currentDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])

    const hoursList = useCallback(
        (appointmentsData: ScheduleObjectProps[]) => {
            if (!appointmentsData) return null

            return appointmentsData.map((data) => {
                const buttonType = getHourButtonType(data)

                switch (buttonType) {
                    // Caso 1: Horário disponível
                    case 'Available':
                        return (
                            <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                                <HourContainer color={'primary'} onClick={() => handleToggleAvailability(data)}>
                                    <Genos_Secondary_20_500 text={integerToTime(data.hour)} />
                                </HourContainer>
                                <NameContainer>
                                    <Genos_Secondary_20_500 text={data.firstName} />
                                    <Genos_Secondary_20_500 text={data.lastName} />
                                </NameContainer>
                            </Row>
                        )
                    // Caso 2: Horário indisponível (userEmail e userId preenchidos)
                    case 'Unavailable':
                        return (
                            <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                                <HourContainer color={'tertiary'} onClick={() => handleOpenCancelModal(data)}>
                                    <Genos_White_20_500 text={integerToTime(data.hour)} />
                                </HourContainer>
                                <NameContainer>
                                    <Genos_Secondary_20_500 text={data.firstName} />
                                    <Genos_Secondary_20_500 text={data.lastName} />
                                </NameContainer>
                            </Row>
                        )
                    // Caso 3: Horário desabilitado (enable = false)
                    case 'Disabled':
                        return (
                            <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                                <HourContainer color={'background'} onClick={() => handleToggleAvailability(data)}>
                                    <Genos_Secondary_20_500 text={integerToTime(data.hour)} />
                                </HourContainer>
                                <NameContainer>
                                    <Genos_Secondary_20_500 text={data.firstName} />
                                    <Genos_Secondary_20_500 text={data.lastName} />
                                </NameContainer>
                            </Row>
                        )
                    // Caso 4: Horário vencido
                    case 'Expired':
                        return (
                            <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                                <HourContainer color={'background'} style={{ borderColor: COLORS.disabled_200 }}>
                                    <Genos_Disabled_20_500 text={integerToTime(data.hour)} />
                                </HourContainer>
                                <NameContainer>
                                    <Genos_Disabled_20_500 text={data.firstName} />
                                    <Genos_Disabled_20_500 text={data.lastName} />
                                </NameContainer>
                            </Row>
                        )
                    default:
                        return (
                            <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                                <HourContainer color={'background'} onClick={() => handleToggleAvailability(data)}>
                                    <Genos_Secondary_20_500 text={integerToTime(data.hour)} />
                                </HourContainer>
                                <NameContainer>
                                    <Genos_Secondary_20_500 text={data.firstName} />
                                    <Genos_Secondary_20_500 text={data.lastName} />
                                </NameContainer>
                            </Row>
                        )
                }
            })
        },
        [handleOpenCancelModal, handleToggleAvailability]
    )

    return (
        <Container>
            <Content>
                {Object.entries(groupedSchedule).map(([dateKey, items]) => {
                    const [year, month, day] = dateKey.split('-').map(Number)
                    const expiredDay = isExpiredDay(day, month, year)
                    const formatted = formatDateShortVersion(day, month, year)
                    return (
                        <React.Fragment key={day}>
                            <DateSeparator ref={dateKey === nextAvailableDay ? currentDayRef : null}>
                                {expiredDay ? (
                                    <>
                                        <DateContentRow>
                                            <Genos_Disabled_24_500
                                                text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`}
                                            />
                                        </DateContentRow>
                                        <DateContentColumn>
                                            <Genos_Disabled_24_500 text={formatted.formattedDate} />
                                            <Genos_Disabled_24_500 text={formatted.dayOfWeek} />
                                        </DateContentColumn>
                                    </>
                                ) : (
                                    <>
                                        <DateContentRow>
                                            <Genos_Primary_24_500
                                                text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`}
                                            />
                                        </DateContentRow>
                                        <DateContentColumn>
                                            <Genos_Primary_24_500 text={formatted.formattedDate} />
                                            <Genos_Primary_24_500 text={formatted.dayOfWeek} />
                                        </DateContentColumn>
                                    </>
                                )}
                            </DateSeparator>
                            {hoursList(items)}
                        </React.Fragment>
                    )
                })}
            </Content>
        </Container>
    )
}
