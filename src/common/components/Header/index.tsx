import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { DrawerNavigator } from '../DrawerNavigator'
import { GenosPrimaryButtonText } from '../ButtonText'
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
    ImageContainer,
} from './styles'

function Header() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Container>
            <DrawerHeaderContainer>
                <HeaderContent>
                    <Imagem
                        src={require('../../../../assets/Massaro/main-logo-removebg.png')}
                        alt={'logo'}
                    />
                    <ButtonIcon onClick={() => setOpen(!open)}>
                        <IconMenu />
                    </ButtonIcon>
                </HeaderContent>
                <DrawerNavigator isOpen={open} />
            </DrawerHeaderContainer>
            <InlineHeaderContainer>
                <ImageContainer>                    
                    <Imagem
                        src={require('../../../../assets/Massaro/main-logo-removebg.png')}
                        alt={'logo'}
                    />
                </ImageContainer>
                <MenuOptionsContainer>
                    <GenosPrimaryButtonText title="Novo Agendamento" onClick={() => router.push('/')} size="medium" />
                    <GenosPrimaryButtonText title="Agendados" onClick={() => router.push('/Scheduled')} size="medium" />
                    <GenosPrimaryButtonText title="Histórico" onClick={() => router.push('/Previous')} size="medium" />
                </MenuOptionsContainer>
            </InlineHeaderContainer>
        </Container>
    )
}

export default React.memo(Header)
