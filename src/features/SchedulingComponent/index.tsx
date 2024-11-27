import React, { useCallback, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { UseUser } from '@common/api'
import { firebaseConfig } from '../../../firebaseConfig'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import Header from '@common/components/Header'
import { Calendar } from '@common/components/Calendar'
import { LoadingComponent } from '@common/components/Loading'
import { Appointments } from '@common/components/Appointments'
import { ScheduleObjectProps, UserData, dataSelectedProps } from '@common/models'
import { ModalSighUp } from '@common/components/ModalSighUp'
import { ModalConfirmation } from '@common/components/ModalConfirmation'
import { Genos_Secondary_24_500, Questrial_Secondary_20_500 } from '@common/components/Typography'
import { filterAppointmentsByDay, initialScript, removeAppointment } from '@common/utils/helpers'
import { Container, Content, Legend, LegendContainer, SchedulingContent, TitleContainer } from './styles'

export const SchedulingComponent = () => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const { addPayload, clearPayloads } = usePayload()

    const [user, setUser] = useState<UserData>({} as UserData)
    const [data, setData] = useState<ScheduleObjectProps[]>([] as ScheduleObjectProps[])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState<dataSelectedProps>({} as dataSelectedProps)
    const [openSighUpModal, setOpenSighUpModal] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

    // INICIAL SCRIPT
    const createOwner = useCallback(async () => {
        const resp = await initialScript()
        if (resp?.success) {
            console.log('Owner user created successfully!')
        } else {
            console.log('Error creating owner user')
        }
    }, [])

    const firstScript = useCallback(async () => {
        const docRef = doc(db, 'users', 'lh.p@hotmail.com')
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            createOwner()
        }
    }, [db, createOwner])

    useEffect(() => {
        firstScript()
    }, [firstScript])

    // LOGGED IN USER
    const getData = useCallback(
        async (email: string | null | undefined) => {
            const docRef = email && doc(db, 'users', email)
            const docSnap = docRef && (await getDoc(docRef))

            if (docSnap && docSnap.exists()) {
                const user = docSnap.data()
                setUser(user)
                console.log('Logged in user! ', JSON.stringify(user))
            } else {
                console.log('No logged in user!')
            }
        },
        [db]
    )

    useEffect(() => {
        const userLogged = UseUser()
        if (userLogged) getData(userLogged)
    }, [getData])

    // ESSA REQUEST DEVE TRAZER APENAS OS HORÁRIOS DISPONÍVEIS (custumerId: '')
    // ESSA REQUEST DEVE TRAZER APENAS OS HORÁRIOS DISPONÍVEIS (custumerId: '')
    // ESSA REQUEST DEVE TRAZER APENAS OS HORÁRIOS DISPONÍVEIS (custumerId: '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataMock = [
        // NOVEMBER
        {
            year: 2024,
            month: 10,
            day: 26,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 26,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 26,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 26,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 27,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 27,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 27,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 27,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 28,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 28,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 10,
            day: 28,
            hour: 630,
            custumerId: '',
        },

        // DECEMBER
        {
            year: 2024,
            month: 11,
            day: 5,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 6,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 12,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 13,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 14,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 19,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 22,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 23,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 28,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 28,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2024,
            month: 11,
            day: 28,
            hour: 630,
            custumerId: '',
        },

        // JANUARY
        {
            year: 2025,
            month: 0,
            day: 2,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 3,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 4,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 8,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 10,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 12,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 15,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 20,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 22,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 0,
            day: 25,
            hour: 555,
            custumerId: '',
        },

        // FEBRUARY
        {
            year: 2025,
            month: 1,
            day: 5,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 6,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 12,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 13,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 14,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 19,
            hour: 555,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 22,
            hour: 630,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 23,
            hour: 705,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
            day: 28,
            hour: 480,
            custumerId: '',
        },
        {
            year: 2025,
            month: 1,
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
        setSelectedDay(filterAppointmentsByDay(dataSelected))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeMonth = useCallback(() => {
        setSelectedDay({} as dataSelectedProps)
    }, [])

    const handleSetAppointments = useCallback(
        (newPayload: ScheduleObjectProps) => {
            const daySelected = removeAppointment(selectedDay, newPayload)
            setSelectedDay(daySelected)

            if (user.id) {
                newPayload.custumerId = user.id
                newPayload.userEmail = user.email

                addPayload(newPayload)
                setOpenConfirmationModal(true)
            } else {
                setOpenSighUpModal(true)
            }
        },
        [addPayload, selectedDay, user.email, user.id]
    )

    const handleCancelAppoitments = useCallback(() => {
        setOpenConfirmationModal(false)
        clearPayloads()
        selectedDay.data = dataMock
        setSelectedDay(filterAppointmentsByDay(selectedDay))
    }, [clearPayloads, dataMock, selectedDay])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        {!!user.firstName && <Genos_Secondary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Faça o seu agendamento" />
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
                                <Questrial_Secondary_20_500 text=" - Dias disponíveis" />
                            </LegendContainer>

                            {selectedDay?.data?.length > 0 && (
                                <>
                                    <Appointments
                                        appointmentsData={selectedDay}
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
            <ModalSighUp
                open={openSighUpModal}
                handleClose={() => {
                    setOpenSighUpModal(false)
                }}
            />
            <ModalConfirmation
                open={openConfirmationModal}
                handleCancelAppoitments={handleCancelAppoitments}
                handleClose={() => setOpenConfirmationModal(false)}
            />
        </Container>
    )
}
