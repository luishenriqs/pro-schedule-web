import React, { useState } from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { NavigatorDrawer } from '../NavigatorDrawer'
import { Container, DrawerHeaderContainer, HeaderContent, ButtonIcon, Imagem, IconMenu } from './styles'
import { NavigatorInLine } from '../NavigatorInLine'

function Header() {
    const [open, setOpen] = useState(false)

    const isUser = true
    const isAdmin = false
    const showMenu = !!isUser || !!isAdmin

    return (
        <Container>
            <DrawerHeaderContainer>
                <HeaderContent>
                    <Imagem src={mainLogoRemovebg} alt="Main Logo" />
                    {showMenu && (
                        <ButtonIcon onClick={() => setOpen(!open)}>
                            <IconMenu />
                        </ButtonIcon>
                    )}
                </HeaderContent>
                <NavigatorDrawer isOpen={open} isAdmin={isAdmin} />
            </DrawerHeaderContainer>
            <NavigatorInLine showMenu={showMenu} isAdmin={isAdmin} />
        </Container>
    )
}

export default React.memo(Header)
