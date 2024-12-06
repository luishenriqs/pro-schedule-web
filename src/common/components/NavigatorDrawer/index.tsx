import React, { useCallback, useMemo } from 'react'
import { Drawer } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { UseSignOut } from '@common/api'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useUser } from '@common/hooks/contexts/UserContext'
import { NavigatorDrawerProps, MenuItem } from '@common/models'
import { Genos_Primary_20_500, Genos_Secondary_20_500 } from '../Typography'
import { ButtonIcon, Container, ExitIcon, LogoutContainer, Imagem, MenuContainer } from './styles'

export const NavigatorDrawer = ({ isOpen }: NavigatorDrawerProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const { user, clearUser } = useUser()

    // Função genérica para navegação
    const handleNavigation = (route: string) => {
        if (pathname === route) {
            router.refresh()
        } else {
            router.push(route)
        }
    }

    // Menu Items Base
    const baseMenuItems: MenuItem[] = [{ order: 1, title: 'Novo Agendamento', route: '/' }]

    const noUserMenuItems: MenuItem[] = [...baseMenuItems, { order: 2, title: 'Login', route: '/SignIn' }]

    const userMenuItems: MenuItem[] = [
        ...baseMenuItems,
        { order: 2, title: 'Agendados', route: '/Scheduled' },
        { order: 3, title: 'Histórico', route: '/Previous' },
    ]

    const adminMenuItems: MenuItem[] = [
        ...baseMenuItems,
        { order: 2, title: 'Criar Agenda', route: '/CreateAgenda' },
        { order: 3, title: 'Minha Agenda', route: '/MyAgenda' },
        { order: 4, title: 'Usuários', route: '/Users' },
    ]

    // Seleciona o menu baseado no usuário
    const menuItems = useMemo(() => {
        if (!user) return noUserMenuItems
        if (user.isAdmin) return adminMenuItems
        return userMenuItems
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // Renderiza os itens do menu
    const renderMenuItems = () =>
        menuItems.map((item) => (
            <ButtonIcon key={item.order} onClick={() => handleNavigation(item.route)}>
                {pathname === item.route ? (
                    <Genos_Primary_20_500 text={item.title} />
                ) : (
                    <Genos_Secondary_20_500 text={item.title} />
                )}
            </ButtonIcon>
        ))

    const handleExit = useCallback(() => {
        UseSignOut()
        setTimeout(() => clearUser(), 1000)
    }, [clearUser])

    return (
        <Drawer anchor="left" open={isOpen} onClose={() => handleNavigation('/')}>
            <Container>
                <Imagem src={mainLogoRemovebg} alt="Main Logo" />
                <MenuContainer>{renderMenuItems()}</MenuContainer>
                {user && (
                    <LogoutContainer onClick={handleExit}>
                        <ExitIcon />
                        <Genos_Secondary_20_500 text="Sair" />
                    </LogoutContainer>
                )}
            </Container>
        </Drawer>
    )
}
