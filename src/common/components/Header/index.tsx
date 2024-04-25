import React, { useState } from 'react'
import { DrawerNavigator } from '../DrawerNavigator'
import { TextPrimary20_700, TextPrimary16_500 } from '@common/components/Typography'
import { Container, HeaderWrapper, HeaderContent, IconContainer, ButtonIcon, Line, Imagem, IconMenu } from './styles'

type HeaderProps = {
    title: string
    text?: string
}

function Header({ title, text }: HeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <Container>
            <HeaderWrapper>
                <HeaderContent>
                    <IconContainer>
                        <Imagem src={require('../../../../assets/schedule_icon.png')} alt={'Pro-Schedule-logo'} />
                    </IconContainer>
                    <TextPrimary20_700 text={title} />
                    <ButtonIcon onClick={() => setOpen(!open)}>
                        <IconMenu />
                    </ButtonIcon>
                </HeaderContent>
                {text && <TextPrimary16_500 text={text} />}
            </HeaderWrapper>
            <DrawerNavigator isOpen={open} />
        </Container>
    )
}

export default React.memo(Header)
