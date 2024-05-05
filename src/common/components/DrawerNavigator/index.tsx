import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer } from '@mui/material'
import { Genos_Primary_20_500 } from '../Typography'
import { Icon } from '../Icons'
import { ButtonIcon, Container, Imagem, MenuContainer } from './styles'
import { COLORS } from '@common/styles/theme'

type DrawerProps = {
    isOpen: boolean
}

type MenuItem = {
    order: number
    route: string
    title: string
    icon: string
    onClickHandler: () => void
}

export const DrawerNavigator = ({ isOpen }: DrawerProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const availableMenuItems: MenuItem[] = [
        {
            order: 1,
            title: 'Home',
            route: '/',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/' ? router.refresh() : router.push('/')
            },
        },
        {
            order: 2,
            title: 'Dr. Joyce Schwartz',
            route: '/About',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/About' ? router.refresh() : router.push('/About')
            },
        },
        {
            order: 3,
            title: 'Tratamentos Corporais',
            route: '/ContentOne',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/ContentOne' ? router.refresh() : router.push('/ContentOne')
            },
        },
        {
            order: 4,
            title: 'Tratamentos Faciais',
            route: '/ContentTwo',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/ContentTwo' ? router.refresh() : router.push('/ContentTwo')
            },
        },
        {
            order: 5,
            title: 'Agendamento',
            route: '/Scheduling',
            icon: '',
            onClickHandler: () => {
                location.pathname === '/Scheduling' ? router.refresh() : router.push('/Scheduling')
            },
        },
    ]

    const menuOptions = useCallback(() => {
        return availableMenuItems.map((item) => {
            return (
                <ButtonIcon
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
                <Imagem src={require('../../../../assets/photos/clinic/logo/primaryLogo-removebg.png')} alt={'logo'} />
                <MenuContainer>{menuOptions()}</MenuContainer>
            </Container>
        </Drawer>
    )
}
