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

    const currentDayRef = useRef<HTMLDivElement | null>(null)

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

                // ##############################################################################

                // if (data.enable && !data.userEmail && !data.userId) {
                //     // Caso 1: Horário disponível
                //     return (
                //         <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                //             <HourContainer color={'primary'}>
                //                 <Genos_Secondary_20_500 text={integerToTime(data.hour)} />
                //             </HourContainer>
                //             <NameContainer>
                //                 <Genos_Secondary_20_500 text={data.firstName} />
                //                 <Genos_Secondary_20_500 text={data.lastName} />
                //             </NameContainer>
                //         </Row>
                //     )
                // } else if (!data.enable) {
                //     // Caso 2: Horário indisponível (enable = false)
                //     return (
                //         <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                //             <HourContainer color={'background'}>
                //                 <Genos_Secondary_20_500 text={integerToTime(data.hour)} />
                //             </HourContainer>
                //             <NameContainer>
                //                 <Genos_Secondary_20_500 text={data.firstName} />
                //                 <Genos_Secondary_20_500 text={data.lastName} />
                //             </NameContainer>
                //         </Row>
                //     )
                // } else if (data.userEmail && data.userId) {
                //     // Caso 3: Horário indisponível (userEmail e userId preenchidos)
                //     return (
                //         <Row key={`${data.day}-${data.hour}-${data.userId}`}>
                //             <HourContainer color={'tertiary'}>
                //                 <Genos_White_20_500 text={integerToTime(data.hour)} />
                //             </HourContainer>
                //             <NameContainer>
                //                 <Genos_Secondary_20_500 text={data.firstName} />
                //                 <Genos_Secondary_20_500 text={data.lastName} />
                //             </NameContainer>
                //         </Row>
                //     )
                // }
                // return null
            })
        },
        [handleOpenCancelModal, handleToggleAvailability]
    )

    return (
        <Container>
            <Content>
                {Object.entries(groupedSchedule).map(([day, items]) => {
                    const expiredDay = isExpiredDay(items[0].day, items[0].month, items[0].year)
                    const isCurrentDay = parseInt(day, 10) === currentDay
                    const isNextAvailableDay = day === nextAvailableDay
                    const formatted = formatDateShortVersion(items[0].day, items[0].month, items[0].year)
                    return (
                        <React.Fragment key={day}>
                            <DateSeparator ref={isCurrentDay || isNextAvailableDay ? currentDayRef : null}>
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
