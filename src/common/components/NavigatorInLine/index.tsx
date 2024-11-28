import React from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useRouter, usePathname } from 'next/navigation'
import { NavigatorInLineProps } from '@common/models'
import { GenosPrimaryButtonText } from '../ButtonText'
import { Genos_White_14_500 } from '../Typography'
import { Imagem } from '../Header/styles'
import {
    ButtonIcon,
    CalendarMenu,
    Container,
    Empty,
    ImageContainer,
    MenuContainer,
    MenuOptionsContainer,
    RedCircle,
} from './styles'

export const NavigatorInLine = ({ showMenu, isAdmin, payloads, handleOpenConfirmModal }: NavigatorInLineProps) => {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Container>
            <ImageContainer>
                <Imagem src={mainLogoRemovebg} alt="Main Logo" />
            </ImageContainer>
            {showMenu && (
                <MenuOptionsContainer>
                    <MenuContainer>
                        {isAdmin ? (
                            <>
                                <GenosPrimaryButtonText
                                    title="Novo Agendamento"
                                    size="medium"
                                    selected={pathname === '/'}
                                    onClick={() => router.push('/')}
                                />
                                <GenosPrimaryButtonText
                                    title="Criar Agenda"
                                    size="medium"
                                    selected={pathname === '/CreateAgenda'}
                                    onClick={() => router.push('/CreateAgenda')}
                                />
                                <GenosPrimaryButtonText
                                    title="Agenda"
                                    size="medium"
                                    selected={pathname === '/MyAgenda'}
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
                        ) : (
                            <>
                                <GenosPrimaryButtonText
                                    title="Novo Agendamento"
                                    size="medium"
                                    selected={pathname === '/'}
                                    onClick={() => router.push('/')}
                                />
                                <GenosPrimaryButtonText
                                    title="Agendados"
                                    size="medium"
                                    selected={pathname === '/Scheduled'}
                                    onClick={() => router.push('/Scheduled')}
                                />
                                <GenosPrimaryButtonText
                                    title="Histórico"
                                    size="medium"
                                    selected={pathname === '/Previous'}
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
                    </MenuContainer>
                </MenuOptionsContainer>
            )}
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
        </Container>
    )
}
