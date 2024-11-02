import React, { useCallback, useEffect, useState } from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useRouter } from 'next/navigation'
import { Drawer } from '@mui/material'
import { Genos_Primary_20_500, Genos_Secondary_20_500 } from '../Typography'
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

    const onClickSchedluling = useCallback(() => {
        if (location.pathname === '/') {
            router.refresh()
        } else {
            router.push('/')
        }
    }, [router])

    const onClickMyAgenda = useCallback(() => {
        if (location.pathname === '/MyAgenda') {
            router.refresh()
        } else {
            router.push('/MyAgenda')
        }
    }, [router])

    const onClickSignIn = useCallback(() => {
        if (location.pathname === '/SignIn') {
            router.refresh()
        } else {
            router.push('/SignIn')
        }
    }, [router])

    const onClickSignUp = useCallback(() => {
        if (location.pathname === '/SignUp') {
            router.refresh()
        } else {
            router.push('/SignUp')
        }
    }, [router])

    const onClickScheduled = useCallback(() => {
        if (location.pathname === '/Scheduled') {
            router.refresh()
        } else {
            router.push('/Scheduled')
        }
    }, [router])

    const onClickPrevious = useCallback(() => {
        if (location.pathname === '/Previous') {
            router.refresh()
        } else {
            router.push('/Previous')
        }
    }, [router])

    const userMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Novo Agendamento',
            route: '/',
            icon: '',
            selected: location.pathname === '/',
            onClickHandler: () => {
                onClickSchedluling()
            },
        },
        {
            order: 2,
            title: 'Agendados',
            route: '/Scheduled',
            icon: '',
            selected: location.pathname === '/Scheduled',
            onClickHandler: () => {
                onClickScheduled()
            },
        },
        {
            order: 3,
            title: 'Histórico',
            route: '/Previous',
            icon: '',
            selected: location.pathname === '/Previous',
            onClickHandler: () => {
                onClickPrevious()
            },
        },
        {
            order: 4,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            selected: location.pathname === '/SignIn',
            onClickHandler: () => {
                onClickSignIn()
            },
        },
        {
            order: 5,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            selected: location.pathname === '/SignUp',
            onClickHandler: () => {
                onClickSignUp()
            },
        },
    ]

    const adminMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Novo Agendamento',
            route: '/',
            icon: '',
            selected: location.pathname === '/',
            onClickHandler: () => {
                onClickSchedluling()
            },
        },
        {
            order: 2,
            title: 'Minha Agenda',
            route: '/MyAgenda',
            icon: '',
            selected: location.pathname === '/MyAgenda',
            onClickHandler: () => {
                onClickMyAgenda()
            },
        },
        {
            order: 3,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            selected: location.pathname === '/SignIn',
            onClickHandler: () => {
                onClickSignIn()
            },
        },
        {
            order: 4,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            selected: location.pathname === '/SignUp',
            onClickHandler: () => {
                onClickSignUp()
            },
        },
    ]

    const menuOptions = useCallback(
        (options: MenuItem[]) => {
            return options.map((item, index) => {
                return (
                    <ButtonIcon
                        key={index}
                        onClick={() => (location.pathname === item.route ? router.refresh() : router.push(item.route))}
                    >
                        <Icon iconName={item.icon} color={COLORS.black} margin="0 8px 0 0" />
                        {item.selected ? (
                            <Genos_Primary_20_500 text={item.title} />
                        ) : (
                            <Genos_Secondary_20_500 text={item.title} />
                        )}
                    </ButtonIcon>
                )
            })
        },
        [router]
    )

    return (
        <Drawer anchor="left" open={open} onClose={() => setOpen(!isOpen)}>
            <Container>
                <Imagem src={mainLogoRemovebg} alt="Main Logo" />
                <MenuContainer>{isAdmin ? menuOptions(adminMenuItems) : menuOptions(userMenuItems)}</MenuContainer>
            </Container>
        </Drawer>
    )
}
