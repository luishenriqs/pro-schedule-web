import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer } from '@mui/material'
import { ButtonIcon, Container, IconMenu, Imagem } from './styles'
import { TextPrimary20_700 } from '../Typography'

type DrawerProps = {
    isOpen: boolean
}

type MenuItem = {
    order: number
    route: string
    title: string
    icon: JSX.Element
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
            title: 'Dashboard',
            route: '/',
            icon: <IconMenu sx={{ color: '#fff' }} />,
            onClickHandler: () => {
                location.pathname === '/' ? router.refresh() : router.push('/')
            },
        },
        {
            order: 2,
            title: 'Register',
            route: '/Register',
            icon: <IconMenu sx={{ color: '#fff' }} />,
            onClickHandler: () => {
                location.pathname === '/Register' ? router.refresh() : router.push('/Register')
            },
        },
    ]

    const menuOptions = useCallback(() => {
        return availableMenuItems.map((item) => {
            return (
                <ButtonIcon onClick={() =>
                    location.pathname === item.route ? router.refresh() : router.push(item.route)
                }>
                    <IconMenu />
                    <TextPrimary20_700 text={item.title} />
                </ButtonIcon>
            )
        })
    }, [])

    return (
        <Drawer anchor="left" open={open} onClose={() => setOpen(!isOpen)}>
            <Container>
                <Imagem
                    src={require('../../../../assets/pro-schedule-logo.png')}
                    alt={'Pro-Schedule-logo'}
                />
                {menuOptions()}
            </Container>
        </Drawer>
    )
}
