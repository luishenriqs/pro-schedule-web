import React, { useCallback, useEffect, useState } from 'react'
import { GetAppointments } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { ScheduleObjectProps } from '@common/models'
import { filterFutureAppointments, formatDateShortVersion, integerToTime } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500, Genos_Disabled_24_500 } from '@common/components/Typography'
import {
    AppointmentRow,
    Container,
    Content,
    DateContentColumn,
    DateContentRow,
    HourContentColumn,
    HourContentRow,
    InfoContent,
    TitleContainer,
} from './styles'

export const PreviousComponent = () => {
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [previusSchedule, setPreviusSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])

    const getPrevius = useCallback(async () => {
        try {
            const previusSchedule = user?.email && (await GetAppointments(user?.email))
            if (previusSchedule) {
                setPreviusSchedule(filterFutureAppointments(previusSchedule))
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Erro ao processar a requisição!', error)
        }
    }, [user?.email])

    useEffect(() => {
        getPrevius()
    }, [getPrevius])

    return (
        <>
            {isLoading ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header />
                    <TitleContainer>
                        {user && <Genos_Primary_24_500 text={`Olá ${user.firstName}`} />}
                        {previusSchedule.length > 0 && (
                            <Genos_Secondary_24_500 text="Este é seu histórico de consultas:" />
                        )}
                    </TitleContainer>
                    <Content>
                        {previusSchedule.length > 0 ? (
                            previusSchedule.map((schedule, index) => {
                                const formatted = formatDateShortVersion(schedule.day, schedule.month, schedule.year)
                                return (
                                    <AppointmentRow key={index}>
                                        <DateContentRow>
                                            <Genos_Disabled_24_500
                                                text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`}
                                            />
                                        </DateContentRow>
                                        <DateContentColumn>
                                            <Genos_Disabled_24_500 text={formatted.formattedDate} />
                                            <Genos_Disabled_24_500 text={formatted.dayOfWeek} />
                                        </DateContentColumn>
                                        <HourContentRow>
                                            <Genos_Disabled_24_500
                                                text={integerToTime(schedule.hour) + ' ' + 'horas'}
                                            />
                                        </HourContentRow>
                                        <HourContentColumn>
                                            <Genos_Disabled_24_500 text={integerToTime(schedule.hour)} />
                                            <Genos_Disabled_24_500 text="horas" />
                                        </HourContentColumn>
                                    </AppointmentRow>
                                )
                            })
                        ) : (
                            <InfoContent>
                                <Genos_Secondary_24_500 text="Não há histórico de consultas!" />
                            </InfoContent>
                        )}
                    </Content>
                </Container>
            )}
        </>
    )
}
