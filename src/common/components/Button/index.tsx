import React from 'react'
import { ButtonProps } from '@mui/material'
import { PrimaryContainer, SecondaryContainer, TitleContainer, PrimaryTitle, SecondaryTitle } from './styles';

type Props = ButtonProps & {
    title: string
    onClick?: () => void
}

export function PrimaryButton({ title, onClick, ...rest }: Props) {
    return (
        <PrimaryContainer onClick={onClick} {...rest}>
            <TitleContainer>
                <PrimaryTitle>{title}</PrimaryTitle>
            </TitleContainer>
        </ PrimaryContainer>
    )
}

export function SecondaryButton({ title, onClick, ...rest }: Props) {
    return (
        <SecondaryContainer onClick={onClick} {...rest}>
            <TitleContainer>
                <SecondaryTitle>{title}</SecondaryTitle>
            </TitleContainer>
        </ SecondaryContainer>
    )
}