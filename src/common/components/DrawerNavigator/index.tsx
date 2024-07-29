import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer } from '@mui/material'
import { Genos_Primary_20_500 } from '../Typography'
import { Icon } from '../Icons'
import { DrawerProps, MenuItem } from '@common/models'
import { COLORS } from '@common/styles/theme'
import { ButtonIcon, Container, Imagem, MenuContainer } from './styles'

export const DrawerNavigator = ({ isOpen, isAdmin }: DrawerProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const userMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Novo Agendamento',
            route: '/',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/' ? router.refresh() : router.push('/')
            },
        },
        {
            order: 2,
            title: 'Agendados',
            route: '/Scheduled',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/Scheduled' ? router.refresh() : router.push('/Scheduled')
            },
        },
        {
            order: 3,
            title: 'Histórico',
            route: '/Previous',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/Previous' ? router.refresh() : router.push('/Previous')
            },
        },
        {
            order: 4,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/SignIn' ? router.refresh() : router.push('/SignIn')
            },
        },
        {
            order: 5,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/SignUp' ? router.refresh() : router.push('/SignUp')
            },
        },
    ]

    const adminMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Novo Agendamento',
            route: '/',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/' ? router.refresh() : router.push('/')
            },
        },
        {
            order: 2,
            title: 'Minha Agenda',
            route: '/MyAgenda',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/MyAgenda' ? router.refresh() : router.push('/MyAgenda')
            },
            
        },
        {
            order: 3,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/SignIn' ? router.refresh() : router.push('/SignIn')
            },
        },
        {
            order: 4,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/SignUp' ? router.refresh() : router.push('/SignUp')
            },
        },
    ]

    const menuOptions = useCallback((options: MenuItem[]) => {
        return options.map((item, index) => {
            return (
                <ButtonIcon
                    key={index}
                    onClick={() => (location.pathname === item.route ? router.refresh() : router.push(item.route))}
                >
                    <Icon iconName={item.icon} color={COLORS.black} margin="0 8px 0 0" />
                    <Genos_Primary_20_500 text={item.title} />
                </ButtonIcon>
            )
        })
    }, [])

    return (
        <Drawer anchor="left" open={open} onClose={() => setOpen(!isOpen)}>
            <Container>
                <Imagem src={require('../../../../assets/Massaro/main-logo-removebg.png')} alt={'logo'} />
                <MenuContainer>{isAdmin ? menuOptions(adminMenuItems) : menuOptions(userMenuItems)}</MenuContainer>
            </Container>
        </Drawer>
    )
}
