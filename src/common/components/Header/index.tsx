import React, { useState } from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useRouter } from 'next/router'
import { DrawerNavigator } from '../DrawerNavigator'
import { GenosPrimaryButtonText } from '../ButtonText'
import {
    Container,
    DrawerHeaderContainer,
    HeaderContent,
    ButtonIcon,
    Imagem,
    IconMenu,
    InlineHeaderContainer,
    MenuOptionsContainer,
    ImageContainer,
} from './styles'

function Header() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const isUser = true
    const isAdmin = true
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
                <DrawerNavigator isOpen={open} isAdmin={isAdmin} />
            </DrawerHeaderContainer>
            <InlineHeaderContainer>
                <ImageContainer>
                    <Imagem src={mainLogoRemovebg} alt="Main Logo" />
                </ImageContainer>
                {showMenu && (
                    <MenuOptionsContainer>
                        {!isAdmin && (
                            <>
                                <GenosPrimaryButtonText
                                    title="Novo Agendamento"
                                    onClick={() => router.push('/')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Agendados"
                                    onClick={() => router.push('/Scheduled')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Histórico"
                                    onClick={() => router.push('/Previous')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Login"
                                    onClick={() => router.push('/SignIn')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Cadastro"
                                    onClick={() => router.push('/SignUp')}
                                    size="medium"
                                />
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <GenosPrimaryButtonText
                                    title="Novo Agendamento"
                                    onClick={() => router.push('/')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Minha Agenda"
                                    onClick={() => router.push('/MyAgenda')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Login"
                                    onClick={() => router.push('/SignIn')}
                                    size="medium"
                                />
                                <GenosPrimaryButtonText
                                    title="Cadastro"
                                    onClick={() => router.push('/SignUp')}
                                    size="medium"
                                />
                            </>
                        )}
                    </MenuOptionsContainer>
                )}
            </InlineHeaderContainer>
        </Container>
    )
}

export default React.memo(Header)
