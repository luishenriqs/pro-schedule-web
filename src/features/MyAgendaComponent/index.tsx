import React, { useCallback, useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { Calendar } from '@common/components/Calendar'
import { LoadingComponent } from '@common/components/Loading'
import { Appointments } from '@common/components/Appointments'
import { Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { ScheduleObjectProps, dataSelectedProps } from '@common/models'
import { Container, Content, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const MyAgendaComponent = () => {
    const [data, setData] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedData, setSelectedData] = useState<dataSelectedProps>({} as dataSelectedProps)

    const userName = 'Flávio'

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataMock = [
        // JULHO //==> 6, 7, 17, 26, 31
        {
            year: 2024,
            month: 6,
            day: 2,
            hour: 480,
            custumerId: '',
            enable: true,
        },
        {
            year: 2024,
            month: 6,
            day: 3,
            hour: 705,
            custumerId: '',
            enable: true,
        },
    ]

    useEffect(() => {
        setData(dataMock)
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDayClick = useCallback((day: number, month: number, year: number) => {
        const dataSelected = {
            data: dataMock,
            day,
            month,
            year,
        }
        setSelectedData(dataSelected)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeMonth = useCallback(() => {
        setSelectedData({} as dataSelectedProps)
    }, [])

    const handleSetAppointments = useCallback((value: ScheduleObjectProps) => {
        console.log('appointment ---->  ', value)
    }, [])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Secondary_24_500 text={'Olá ' + userName} />
                        <Genos_Secondary_24_500 text="Defina a sua agenda" />
                    </TitleContainer>
                    <Content>
                        <SchedulingContent>
                            <Calendar
                                schedule={data}
                                legend="Legenda"
                                handleDayClick={handleDayClick}
                                handleChangeMonth={handleChangeMonth}
                            />
                            <LegendContainer>
                                <Legend />
                                <Questrial_Secondary_20_500 text=" - Dias de atendimento" />
                            </LegendContainer>
                            {selectedData?.data?.length > 0 && (
                                <>
                                    <Appointments
                                        appointmentsData={selectedData}
                                        legend="Legenda"
                                        handleSetAppointments={(value) => handleSetAppointments(value)}
                                    />

                                    <LegendContainer>
                                        <Legend />
                                        <Questrial_Secondary_20_500 text=" - Horários disponíveis" />
                                    </LegendContainer>
                                </>
                            )}
                        </SchedulingContent>
                    </Content>
                </>
            )}
        </Container>
    )
}
