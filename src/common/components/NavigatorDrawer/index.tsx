import React, { useCallback, useEffect, useState } from 'react'
import mainLogoRemovebg from '../../../../assets/Massaro/main-logo-removebg.png'
import { useRouter, usePathname } from 'next/navigation'
import { Drawer } from '@mui/material'
import { Genos_Primary_20_500, Genos_Secondary_20_500 } from '../Typography'
import { Icon } from '../Icons'
import { NavigatorDrawerProps, MenuItem } from '@common/models'
import { COLORS } from '@common/styles/theme'
import { ButtonIcon, Container, Imagem, MenuContainer } from './styles'

export const NavigatorDrawer = ({ isOpen, isAdmin }: NavigatorDrawerProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const onClickSchedluling = useCallback(() => {
        if (pathname === '/') {
            router.refresh()
        } else {
            router.push('/')
        }
    }, [pathname, router])

    const onClickAvailability = useCallback(() => {
        if (pathname === '/Availability') {
            router.refresh()
        } else {
            router.push('/Availability')
        }
    }, [pathname, router])

    const onClickMyAgenda = useCallback(() => {
        if (pathname === '/MyAgenda') {
            router.refresh()
        } else {
            router.push('/MyAgenda')
        }
    }, [pathname, router])

    const onClickSignIn = useCallback(() => {
        if (pathname === '/SignIn') {
            router.refresh()
        } else {
            router.push('/SignIn')
        }
    }, [pathname, router])

    const onClickSignUp = useCallback(() => {
        if (pathname === '/SignUp') {
            router.refresh()
        } else {
            router.push('/SignUp')
        }
    }, [pathname, router])

    const onClickScheduled = useCallback(() => {
        if (pathname === '/Scheduled') {
            router.refresh()
        } else {
            router.push('/Scheduled')
        }
    }, [pathname, router])

    const onClickPrevious = useCallback(() => {
        if (pathname === '/Previous') {
            router.refresh()
        } else {
            router.push('/Previous')
        }
    }, [pathname, router])

    const userMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Novo Agendamento',
            route: '/',
            icon: '',
            selected: pathname === '/',
            onClickHandler: () => {
                onClickSchedluling()
            },
        },
        {
            order: 2,
            title: 'Agendados',
            route: '/Scheduled',
            icon: '',
            selected: pathname === '/Scheduled',
            onClickHandler: () => {
                onClickScheduled()
            },
        },
        {
            order: 3,
            title: 'Histórico',
            route: '/Previous',
            icon: '',
            selected: pathname === '/Previous',
            onClickHandler: () => {
                onClickPrevious()
            },
        },
        {
            order: 4,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            selected: pathname === '/SignIn',
            onClickHandler: () => {
                onClickSignIn()
            },
        },
        {
            order: 5,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            selected: pathname === '/SignUp',
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
            selected: pathname === '/',
            onClickHandler: () => {
                onClickSchedluling()
            },
        },
        {
            order: 2,
            title: 'Disponibilidade',
            route: '/Availability',
            icon: '',
            selected: pathname === '/Availability',
            onClickHandler: () => {
                onClickAvailability()
            },
        },
        {
            order: 3,
            title: 'Minha Agenda',
            route: '/MyAgenda',
            icon: '',
            selected: pathname === '/MyAgenda',
            onClickHandler: () => {
                onClickMyAgenda()
            },
        },
        {
            order: 4,
            title: 'Login',
            route: '/SignIn',
            icon: '',
            selected: pathname === '/SignIn',
            onClickHandler: () => {
                onClickSignIn()
            },
        },
        {
            order: 5,
            title: 'Cadastro',
            route: '/SignUp',
            icon: '',
            selected: pathname === '/SignUp',
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
                        onClick={() => (pathname === item.route ? router.refresh() : router.push(item.route))}
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
        [pathname, router]
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
