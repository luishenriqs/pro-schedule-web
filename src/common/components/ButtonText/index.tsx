import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    Genos_Primary_24_500,
    Genos_Primary_16_500,
    Genos_Secondary_16_500,
    Genos_Secondary_24_500,
    Genos_Error_24_500,
    Genos_Error_16_500,
} from '../Typography'
import { Container, TitleContainer } from './styles'

type Props = ButtonProps & {
    title: string
    size?: 'medium' | 'small'
    selected?: boolean
    onClick?: () => void
}

const primaryButtonStyle = (size: string, selected: boolean, title: string) => {
    switch (selected) {
        case true:
            return size === 'medium' ? <Genos_Primary_24_500 text={title} /> : <Genos_Primary_16_500 text={title} />

        case false:
            return size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_16_500 text={title} />

        default:
            return size === 'medium' ? <Genos_Primary_24_500 text={title} /> : <Genos_Primary_16_500 text={title} />
    }
}

// STYLE PRIMARY IF SELECTED
export function GenosPrimaryButtonText({ title, size = 'medium', selected = false, onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>{primaryButtonStyle(size, selected, title)}</TitleContainer>
        </Container>
    )
}

const secondaryButtonStyle = (size: string, selected: boolean, title: string) => {
    switch (selected) {
        case true:
            return size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_16_500 text={title} />

        case false:
            return size === 'medium' ? <Genos_Primary_24_500 text={title} /> : <Genos_Primary_16_500 text={title} />

        default:
            return size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_16_500 text={title} />
    }
}

// STYLE SECONDARY IF SELECTED
export function GenosSecondaryButtonText({ title, size = 'medium', selected = false, onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>{secondaryButtonStyle(size, selected, title)}</TitleContainer>
        </Container>
    )
}

const errorButtonStyle = (size: string, selected: boolean, title: string) => {
    switch (selected) {
        case true:
            return size === 'medium' ? <Genos_Error_24_500 text={title} /> : <Genos_Error_16_500 text={title} />

        case false:
            return size === 'medium' ? <Genos_Secondary_24_500 text={title} /> : <Genos_Secondary_16_500 text={title} />

        default:
            return size === 'medium' ? <Genos_Error_24_500 text={title} /> : <Genos_Error_16_500 text={title} />
    }
}

// STYLE ERROR IF SELECTED
export function GenosErrorButtonText({ title, size = 'medium', selected = false, onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>{errorButtonStyle(size, selected, title)}</TitleContainer>
        </Container>
    )
}
