import React, { useCallback, useMemo } from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { UseSignOut } from '@common/api'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@common/hooks/contexts/UserContext'
import { usePayload } from '@common/hooks/contexts/PayloadContext'
import { NavigatorInLineProps } from '@common/models'
import { GenosPrimaryButtonText } from '../ButtonText'
import { Genos_White_14_500 } from '../Typography'
import { EasyTooltip } from '../EasyTooltip'
import { Imagem } from '../Header/styles'
import {
    ButtonIcon,
    CalendarMenu,
    Container,
    Empty,
    ExitIcon,
    ImageContainer,
    MenuContainer,
    MenuOptionsContainer,
    RedCircle,
} from './styles'

export const NavigatorInLine = ({ showMenu, payloads, handleOpenConfirmModal }: NavigatorInLineProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const { user, clearUser } = useUser()
    const { clearPayloads } = usePayload()

    const handleExit = useCallback(() => {
        UseSignOut()
        setTimeout(() => {
            clearUser()
            clearPayloads()
        }, 1000)
        router.push('/')
    }, [clearPayloads, clearUser, router])

    // Gerenciamento dos itens do menu
    const menuItems = useMemo(() => {
        const baseItems = [{ title: 'Novo Agendamento', route: '/', adminOnly: false }]

        const userItems = [
            { title: 'Agendados', route: '/Scheduled', adminOnly: false },
            { title: 'Histórico', route: '/Previous', adminOnly: false },
        ]

        const adminItems = [
            { title: 'Minha Agenda', route: '/MyAgenda', adminOnly: true },
            { title: 'Criar Agenda', route: '/CreateAgenda', adminOnly: true },
            { title: 'Usuários', route: '/Users', adminOnly: true },
        ]

        if (!user) {
            return [...baseItems, { title: 'Login', route: '/SignIn', adminOnly: false }]
        }

        return !user?.isAdmin ? [...baseItems, ...userItems] : [...adminItems]
    }, [user])

    // Renderização de itens de menu
    const renderMenuItems = () =>
        menuItems.map((item) => (
            <GenosPrimaryButtonText
                key={item.route}
                title={item.title}
                size="medium"
                selected={pathname === item.route}
                onClick={() => router.push(item.route)}
            />
        ))

    return (
        <Container>
            <ImageContainer>
                <Imagem src={mainLogoRemovebg} alt="Main Logo" />
            </ImageContainer>

            {showMenu && (
                <MenuOptionsContainer>
                    <MenuContainer>{renderMenuItems()}</MenuContainer>
                </MenuOptionsContainer>
            )}

            {pathname === '/' && payloads.length > 0 ? (
                <ButtonIcon onClick={handleOpenConfirmModal}>
                    <CalendarMenu />
                    <RedCircle>
                        <Genos_White_14_500 text={payloads.length} />
                    </RedCircle>
                </ButtonIcon>
            ) : (
                <Empty />
            )}

            {user && (
                <EasyTooltip title="Sair" placement="bottom" arrow>
                    <ButtonIcon onClick={handleExit}>
                        <ExitIcon />
                    </ButtonIcon>
                </EasyTooltip>
            )}
        </Container>
    )
}
