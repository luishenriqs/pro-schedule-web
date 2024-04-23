import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer } from '@mui/material'
import { TextPrimary20_700 } from '../Typography'
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
            title: 'Bem vindo',
            route: '/Wellcome',
            icon: 'HomeOutlined',
            onClickHandler: () => {
                location.pathname === '/Wellcome' ? router.refresh() : router.push('/Wellcome')
            },
        },
        {
            order: 2,
            title: 'Entrar',
            route: '/SignIn',
            icon: 'HomeOutlined',
            onClickHandler: () => {
                location.pathname === '/SignIn' ? router.refresh() : router.push('/SignIn')
            },
        },
        {
            order: 3,
            title: 'Início',
            route: '/',
            icon: 'HomeOutlined',
            onClickHandler: () => {
                location.pathname === '/' ? router.refresh() : router.push('/')
            },
        },
        {
            order: 4,
            title: 'Cadastro',
            route: '/Register',
            icon: 'CalendarMonthOutlined',
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
                    <Icon iconName={item.icon} color={COLORS.font_primary} margin='0 8px 0 0' />
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
                <MenuContainer>
                    {menuOptions()}
                </MenuContainer>
            </Container>
        </Drawer>
    )
}
