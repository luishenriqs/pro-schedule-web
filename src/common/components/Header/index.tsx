import React, { useState } from 'react'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import { DrawerNavigator } from '../DrawerNavigator'
import { TextPrimary20bold, TextPrimary16medium } from '@common/components/Typography'
import { Container, HeaderWrapper, HeaderContent, IconContainer, ButtonIcon, Line } from './styles'

type HeaderProps = {
    title: string
    text?: string
}

export function Header({ title, text }: HeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <Container>
            <HeaderWrapper>
                <HeaderContent>
                    <IconContainer>
                        <Image
                            src={require('../../../../assets/schedule_icon.png')}
                            alt={'Pro-Schedule-logo'}
                            width={80}
                            height={80}
                        />
                    </IconContainer>
                    <TextPrimary20bold text={title} />
                    <ButtonIcon onClick={() => setOpen(!open)}>
                        <MenuIcon />
                    </ButtonIcon>
                </HeaderContent>
                {text && <TextPrimary16medium text={text} />}
            </HeaderWrapper>
            <Line />
            <DrawerNavigator isOpen={open} />
        </Container>
    )
}
