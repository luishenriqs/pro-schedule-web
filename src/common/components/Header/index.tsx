import React, { useState } from 'react'
import { DrawerNavigator } from '../DrawerNavigator'
import { TextPrimary20_700 } from '@common/components/Typography'
import { Container, HeaderContent, IconContainer, ButtonIcon, Imagem, IconMenu, Empty } from './styles'

type HeaderProps = {
    title: string
    text?: string
}

function Header({ title }: HeaderProps) {
    const [open, setOpen] = useState(false)

    return ( 
        <Container>
            <HeaderContent>
                <Empty />
                {/* <IconContainer>
                    <Imagem src={require('../../../../assets/schedule_icon.png')} alt={'Pro-Schedule-logo'} />
                </IconContainer> */}
                {/* <TextPrimary20_700 text={title} /> */}
                <ButtonIcon onClick={() => setOpen(!open)}>
                    <IconMenu />
                </ButtonIcon>
            </HeaderContent>
            <DrawerNavigator isOpen={open} />
        </Container>
    )
}

export default React.memo(Header)
