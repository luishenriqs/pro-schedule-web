import React, { useCallback, useEffect, useState } from 'react'
import { GetAppointments } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { ScheduleObjectProps } from '@common/models'
import { filterExpiredAppointments, formatDateShortVersion, integerToTime } from '@common/utils/helpers'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '@common/components/Typography'
import {
    AppointmentRow,
    ButtonsIconsContainer,
    Container,
    Content,
    DateContentColumn,
    DateContentRow,
    DeleteIcon,
    HourContentColumn,
    HourContentRow,
    InfoContent,
    TitleContainer,
} from './styles'
import { ModalUserCancellation } from '@common/components/ModalUserCancellation'

export const ScheduledComponent = () => {
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [scheduled, setScheduled] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [openCancellationModal, setOpenCancellationModal] = useState(false)
    const [payload, setPayload] = useState<ScheduleObjectProps>({} as ScheduleObjectProps)

    const getScheduled = useCallback(async () => {
        try {
            const scheduled = user?.email && (await GetAppointments(user?.email))
            if (scheduled) {
                setScheduled(filterExpiredAppointments(scheduled))
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Erro ao processar a requisição!', error)
        }
    }, [user?.email])

    useEffect(() => {
        getScheduled()
    }, [getScheduled])

    const handleOpenCancelModal = useCallback((payload: ScheduleObjectProps) => {
        setPayload(payload)
        setOpenCancellationModal(true)
    }, [])

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
                        {scheduled.length > 0 && <Genos_Secondary_24_500 text="Suas próximas consultas:" />}
                    </TitleContainer>
                    <Content>
                        {scheduled.length > 0 ? (
                            scheduled.map((schedule, index) => {
                                const formatted = formatDateShortVersion(schedule.day, schedule.month, schedule.year)
                                return (
                                    <AppointmentRow key={index}>
                                        <DateContentRow>
                                            <Genos_Secondary_24_500
                                                text={`${formatted.formattedDate} - ${formatted.dayOfWeek}`}
                                            />
                                        </DateContentRow>
                                        <DateContentColumn>
                                            <Genos_Secondary_24_500 text={formatted.formattedDate} />
                                            <Genos_Secondary_24_500 text={formatted.dayOfWeek} />
                                        </DateContentColumn>
                                        <HourContentRow>
                                            <Genos_Secondary_24_500
                                                text={integerToTime(schedule.hour) + ' ' + 'horas'}
                                            />
                                        </HourContentRow>
                                        <HourContentColumn>
                                            <Genos_Secondary_24_500 text={integerToTime(schedule.hour)} />
                                            <Genos_Secondary_24_500 text="horas" />
                                        </HourContentColumn>
                                        <ButtonsIconsContainer>
                                            <DeleteIcon onClick={() => handleOpenCancelModal(schedule)} />
                                        </ButtonsIconsContainer>
                                    </AppointmentRow>
                                )
                            })
                        ) : (
                            <InfoContent>
                                <Genos_Secondary_24_500 text="Nenhum agendamento encontrado!" />
                            </InfoContent>
                        )}
                    </Content>
                    <ModalUserCancellation
                        open={openCancellationModal}
                        payload={payload}
                        handleClose={() => setOpenCancellationModal(false)}
                    />
                </Container>
            )}
        </>
    )
}
