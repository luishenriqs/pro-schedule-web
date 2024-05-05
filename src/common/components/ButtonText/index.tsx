import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    Container,
    TitleContainer,
    MediumPrimaryTitle,
    SmallPrimaryTitle,
    MediumSecondaryTitle,
    SmallSecondaryTitle,
    MediumTertiaryTitle,
    SmallTertiaryTitle,
} from './styles'

type Props = ButtonProps & {
    title: string
    size?: 'medium' | 'small'
    onClick?: () => void
}

export function PrimaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <MediumPrimaryTitle>{title}</MediumPrimaryTitle>
                ) : (
                    <SmallPrimaryTitle>{title}</SmallPrimaryTitle>
                )}
            </TitleContainer>
        </Container>
    )
}

export function SecondaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <MediumSecondaryTitle>{title}</MediumSecondaryTitle>
                ) : (
                    <SmallSecondaryTitle>{title}</SmallSecondaryTitle>
                )}
            </TitleContainer>
        </Container>
    )
}

export function TertiaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <MediumTertiaryTitle>{title}</MediumTertiaryTitle>
                ) : (
                    <SmallTertiaryTitle>{title}</SmallTertiaryTitle>
                )}
            </TitleContainer>
        </Container>
    )
}
