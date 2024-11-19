import React from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useRouter } from 'next/navigation'
import { NavigatorInLineProps } from '@common/models'
import { GenosPrimaryButtonText } from '../ButtonText'
import { Genos_White_14_500 } from '../Typography'
import { Imagem } from '../Header/styles'
import { ButtonIcon, CalendarMenu, Container, Empty, ImageContainer, MenuOptionsContainer, RedCircle } from './styles'

export const NavigatorInLine = ({ showMenu, isAdmin, payloads, handleOpenConfirmModal }: NavigatorInLineProps) => {
    const router = useRouter()

    return (
        <Container>
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
        </Container>
    )
}
