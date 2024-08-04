import React, { useCallback, useEffect, useState } from 'react'
import Header from '@common/components/Header'
import { Calendar } from '@common/components/Calendar'
import { LoadingComponent } from '@common/components/Loading'
import { Appointments } from '@common/components/Appointments'
import { Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { DateProps, dataSelectedProps } from '@common/models'
import { Container, Content, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const MyAgendaComponent = () => {
    const [data, setData] = useState<DateProps[]>([] as DateProps[])
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
        },
        {
            year: 2024,
            month: 6,
            day: 3,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 4,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 8,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 10,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 12,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 15,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 20,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 22,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 6,
            day: 25,
            hour: 555,
            custumerId: '',
        },

        // AGOSTO //==> 5, 6, 12, 13, 14, 19, 22, 23, 28, 30
        {
            year: 2024,
            month: 7,
            day: 5,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 6,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 12,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 13,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 14,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 19,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 22,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 23,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 28,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 7,
            day: 30,
            hour: 555,
            custumerId: '',
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

    const handleSetAppointments = useCallback((value: DateProps) => {
        console.log('appointment ---->  ', value)
    }, [])

    /*

            1 - CONFIGURAR BOTÕES DOS DIAS:
                - TODOS CLICLÁVEIS
                    - DIAS DE ATENDIMENTO
                    - DIAS DE LIVRES

            2 - CONFIGURAR SELETOR DE HORÁRIOS DE TRABALHO

            3 - CRIAR MODAL DE CONFIRMAÇÃO DE AGENDA

                PREENCHER NOVO OBJETO APPOINTMENT

                const appointment = {
                    year: 2024,
                    month: 6,
                    day: 22,
                    hour: 705,
                    custumerId: '' <== VAZIO
                }

        */

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
                                data={data}
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
                                        appontmentsData={selectedData}
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
