import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { DrawerNavigator } from '../DrawerNavigator'
import { TertiaryButtonText } from '../ButtonText'
import {
    Container,
    DrawerHeaderContainer,
    HeaderContent,
    ButtonIcon,
    Imagem,
    IconMenu,
    Empty,
    InlineHeaderContainer,
    MenuOptionsContainer,
} from './styles'

function Header() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Container>
            <DrawerHeaderContainer>
                <HeaderContent>
                    <Empty />
                    <ButtonIcon onClick={() => setOpen(!open)}>
                        <IconMenu />
                    </ButtonIcon>
                </HeaderContent>
                <DrawerNavigator isOpen={open} />
            </DrawerHeaderContainer>
            <InlineHeaderContainer>
                <Imagem
                    src={require('../../../../assets/ProSchedule/pro-schedule-logo.png')}
                    alt={'logo'}
                />
                <MenuOptionsContainer>
                    <TertiaryButtonText title="Home" onClick={() => router.push('/Dash')} size="small" />
                    <TertiaryButtonText title="Dr. Joyce Schwartz" onClick={() => router.push('/About')} size="small" />
                    <TertiaryButtonText
                        title="Tratamentos Corporais"
                        onClick={() => router.push('/ContentOne')}
                        size="small"
                    />
                    <TertiaryButtonText
                        title="Tratamentos Faciais"
                        onClick={() => router.push('/ContentTwo')}
                        size="small"
                    />
                    <TertiaryButtonText title="Agendamento" onClick={() => router.push('/Scheduling')} size="small" />
                </MenuOptionsContainer>
            </InlineHeaderContainer>
        </Container>
    )
}

export default React.memo(Header)
