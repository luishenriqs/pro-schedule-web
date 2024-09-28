import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    Genos_Primary_24_500,
    Genos_Primary_16_500,
    Genos_Secondary_16_500,
    Genos_Secondary_24_500,
} from '../Typography'
import { Container, TitleContainer } from './styles'

type Props = ButtonProps & {
    title: string
    size?: 'medium' | 'small'
    selected?: boolean
    onClick?: () => void
}

const typographStyle = (size: string, selected: boolean, title: string) => {
    switch (selected) {
        case true:
            return size === 'medium' ? <Genos_Primary_24_500 text={title} /> : <Genos_Primary_16_500 text={title} />

        case false:
            return size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_24_500 text={title} />

        default:
            return size === 'medium' ? <Genos_Primary_24_500 text={title} /> : <Genos_Primary_16_500 text={title} />
    }
}

export function GenosPrimaryButtonText({ title, size = 'medium', selected = false, onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>{typographStyle(size, selected, title)}</TitleContainer>
        </Container>
    )
}

export function GenosSecondaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_16_500 text={title} />}
            </TitleContainer>
        </Container>
    )
}
