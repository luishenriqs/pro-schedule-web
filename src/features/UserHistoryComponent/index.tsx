import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetAppointments } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { ScheduleObjectProps } from '@common/models'
import {
    filterExpiredAppointments,
    filterFutureAppointments,
    formatDateShortVersion,
    integerToTime,
} from '@common/utils/helpers'
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
import { GenosPrimaryButtonText } from '@common/components/ButtonText'

export const UserHistoryComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { email, firstName } = router.query

    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [previusSchedule, setPreviusSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [nextSchedule, setNextSchedule] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])

    const getUserHistory = useCallback(async () => {
        try {
            const fullSchedule = typeof email === 'string' && (await GetAppointments(email))
            if (fullSchedule) {
                setPreviusSchedule(filterFutureAppointments(fullSchedule))
                setNextSchedule(filterExpiredAppointments(fullSchedule))
                setIsLoading(false)
                setIsRefreshing(false)
            } else {
                setIsLoading(false)
                setIsRefreshing(false)
            }
        } catch (error) {
            console.error('Erro ao processar a requisição!', error)
        }
    }, [email])

    useEffect(() => {
        getUserHistory()
        setIsRefreshing(true)
    }, [getUserHistory])

    const renderPrevius = useCallback(() => {
        return previusSchedule.map((schedule, index) => {
            const formatted = formatDateShortVersion(schedule.day, schedule.month, schedule.year)
            return (
                <AppointmentRow key={index}>
                    <DateContentRow>
                        <Genos_Disabled_24_500 text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`} />
                    </DateContentRow>
                    <DateContentColumn>
                        <Genos_Disabled_24_500 text={formatted.formattedDate} />
                        <Genos_Disabled_24_500 text={formatted.dayOfWeek} />
                    </DateContentColumn>
                    <HourContentRow>
                        <Genos_Disabled_24_500 text={integerToTime(schedule.hour) + ' ' + 'horas'} />
                    </HourContentRow>
                    <HourContentColumn>
                        <Genos_Disabled_24_500 text={integerToTime(schedule.hour)} />
                        <Genos_Disabled_24_500 text="horas" />
                    </HourContentColumn>
                </AppointmentRow>
            )
        })
    }, [previusSchedule])

    const renderNext = useCallback(() => {
        return nextSchedule.map((schedule, index) => {
            const formatted = formatDateShortVersion(schedule.day, schedule.month, schedule.year)
            return (
                <AppointmentRow key={index}>
                    <DateContentRow>
                        <Genos_Secondary_24_500 text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`} />
                    </DateContentRow>
                    <DateContentColumn>
                        <Genos_Secondary_24_500 text={formatted.formattedDate} />
                        <Genos_Secondary_24_500 text={formatted.dayOfWeek} />
                    </DateContentColumn>
                    <HourContentRow>
                        <Genos_Secondary_24_500 text={integerToTime(schedule.hour) + ' ' + 'horas'} />
                    </HourContentRow>
                    <HourContentColumn>
                        <Genos_Secondary_24_500 text={integerToTime(schedule.hour)} />
                        <Genos_Secondary_24_500 text="horas" />
                    </HourContentColumn>
                </AppointmentRow>
            )
        })
    }, [nextSchedule])

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
                        {(previusSchedule.length > 0 || nextSchedule.length > 0) && (
                            <Genos_Secondary_24_500 text={`Este é o histórico de consultas de ${firstName}:`} />
                        )}
                    </TitleContainer>
                    <Content>
                        {isRefreshing ? (
                            <LoadingComponent />
                        ) : previusSchedule.length > 0 || nextSchedule.length > 0 ? (
                            <>
                                {renderPrevius()}
                                {renderNext()}
                            </>
                        ) : (
                            <InfoContent>
                                <Genos_Secondary_24_500 text="Não há histórico de consultas!" />
                            </InfoContent>
                        )}
                    </Content>
                    <GenosPrimaryButtonText title="Voltar" size="medium" onClick={() => router.back()} />
                </Container>
            )}
        </>
    )
}
