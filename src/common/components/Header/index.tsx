import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../../../../firebaseConfig'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { useUser } from '@common/hooks/contexts/UserContext'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { NavigatorDrawer } from '../NavigatorDrawer'
import { NavigatorInLine } from '../NavigatorInLine'
import { ModalConfirmation } from '../ModalConfirmation'
import { HeaderProps, UserProps } from '@common/models'
import { GetUserEmail } from '@common/api'
import { Genos_White_14_500 } from '../Typography'
import {
    Container,
    DrawerHeaderContainer,
    HeaderContent,
    ButtonIcon,
    Imagem,
    IconMenu,
    CalendarMenu,
    Empty,
    RedCircle,
    InLineHeaderContainer,
} from './styles'

function Header({ handleCancelAppoitments }: HeaderProps) {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const router = useRouter()
    const pathname = usePathname()
    const { payloads } = usePayload()
    const { saveUser } = useUser()

    const [userLoggedIn, setUserLoggedIn] = useState<UserProps>({} as UserProps)
    const [open, setOpen] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

    const showMenu = true

    // LOGGED IN USER
    const getData = useCallback(
        async (email: string | null | undefined) => {
            const docRef = email && doc(db, 'users', email)
            const docSnap = docRef && (await getDoc(docRef))

            if (docSnap && docSnap.exists()) {
                const user = docSnap.data()
                setUserLoggedIn(user)
                saveUser(user)
            } else {
                console.log('No logged in user!')
            }
        },
        [db, saveUser]
    )

    useEffect(() => {
        const userLogged = GetUserEmail()
        if (userLogged) getData(userLogged)
    }, [getData])

    const handleOpenConfirmModal = useCallback(() => {
        setOpenConfirmationModal(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpenConfirmationModal(false)
        router.push('/')
    }, [router])

    return (
        <Container>
            <DrawerHeaderContainer>
                <HeaderContent>
                    {showMenu && (
                        <ButtonIcon onClick={() => setOpen(!open)}>
                            <IconMenu />
                        </ButtonIcon>
                    )}
                    <Imagem src={mainLogoRemovebg} alt="Main Logo" />
                    {pathname === '/' && payloads.length > 0 ? (
                        <ButtonIcon onClick={() => handleOpenConfirmModal()}>
                            <CalendarMenu />
                            <RedCircle>
                                <Genos_White_14_500 text={payloads.length} />
                            </RedCircle>
                        </ButtonIcon>
                    ) : (
                        <Empty />
                    )}
                </HeaderContent>
                <NavigatorDrawer isOpen={open} user={userLoggedIn} />
            </DrawerHeaderContainer>
            <InLineHeaderContainer>
                <NavigatorInLine
                    showMenu={showMenu}
                    user={userLoggedIn}
                    payloads={payloads}
                    handleOpenConfirmModal={handleOpenConfirmModal}
                />
            </InLineHeaderContainer>
            <ModalConfirmation
                open={openConfirmationModal}
                handleCancelAppoitments={() =>
                    handleCancelAppoitments && (handleCancelAppoitments(), setOpenConfirmationModal(false))
                }
                handleClose={handleClose}
            />
        </Container>
    )
}

export default React.memo(Header)
