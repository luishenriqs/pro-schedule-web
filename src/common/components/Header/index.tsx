import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        console.log('location.pathname ', location.pathname)
    }, [])

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
                                    size="medium"
                                    selected={location.pathname === '/'}
                                    onClick={() => router.push('/')}
                                />
                                <GenosPrimaryButtonText
                                    title="Agendados"
                                    size="medium"
                                    selected={location.pathname === '/Scheduled'}
                                    onClick={() => router.push('/Scheduled')}
                                />
                                <GenosPrimaryButtonText
                                    title="Histórico"
                                    size="medium"
                                    selected={location.pathname === '/Previous'}
                                    onClick={() => router.push('/Previous')}
                                />
                                <GenosPrimaryButtonText
                                    title="Login"
                                    size="medium"
                                    onClick={() => router.push('/SignIn')}
                                />
                                <GenosPrimaryButtonText
                                    title="Cadastro"
                                    size="medium"
                                    onClick={() => router.push('/SignUp')}
                                />
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <GenosPrimaryButtonText
                                    title="Novo Agendamento"
                                    size="medium"
                                    selected={location.pathname === '/'}
                                    onClick={() => router.push('/')}
                                />
                                <GenosPrimaryButtonText
                                    title="Minha Agenda"
                                    size="medium"
                                    selected={location.pathname === '/MyAgenda'}
                                    onClick={() => router.push('/MyAgenda')}
                                />
                                <GenosPrimaryButtonText
                                    title="Login"
                                    size="medium"
                                    onClick={() => router.push('/SignIn')}
                                />
                                <GenosPrimaryButtonText
                                    title="Cadastro"
                                    size="medium"
                                    onClick={() => router.push('/SignUp')}
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
