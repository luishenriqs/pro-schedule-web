import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { NavigatorDrawer } from '../NavigatorDrawer'
import { NavigatorInLine } from '../NavigatorInLine'
import { ModalConfirmation } from '../ModalConfirmation'
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

function Header() {
    const router = useRouter()
    const { payloads, clearPayloads } = usePayload()

    const [open, setOpen] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

    const isUser = true
    const isAdmin = true
    const showMenu = !!isUser || !!isAdmin

    const handleOpenConfirmModal = useCallback(() => {
        setOpenConfirmationModal(true)
    }, [])

    const handleCancelAppoitments = useCallback(() => {
        setOpenConfirmationModal(false)
        clearPayloads()
    }, [clearPayloads])

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
                    {payloads.length > 0 ? (
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
                <NavigatorDrawer isOpen={open} isAdmin={isAdmin} />
            </DrawerHeaderContainer>
            <InLineHeaderContainer>
                <NavigatorInLine
                    showMenu={showMenu}
                    isAdmin={isAdmin}
                    payloads={payloads}
                    handleOpenConfirmModal={handleOpenConfirmModal}
                />
            </InLineHeaderContainer>
            <ModalConfirmation
                open={openConfirmationModal}
                handleCancelAppoitments={handleCancelAppoitments}
                handleClose={handleClose}
            />
        </Container>
    )
}

export default React.memo(Header)
