import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    PrimaryContainer,
    SecondaryContainer,
    TitleContainer,
    MediumPrimaryTitle,
    SmallPrimaryTitle,
    MediumSecondaryTitle,
    SmallSecondaryTitle,
} from './styles'

type Props = ButtonProps & {
    title: string
    size?: 'medium' | 'small'
    onClick?: () => void
}

export function PrimaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <PrimaryContainer onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <MediumPrimaryTitle>{title}</MediumPrimaryTitle>
                ) : (
                    <SmallPrimaryTitle>{title}</SmallPrimaryTitle>
                )}
            </TitleContainer>
        </PrimaryContainer>
    )
}

export function SecondaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <SecondaryContainer onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <MediumSecondaryTitle>{title}</MediumSecondaryTitle>
                ) : (
                    <SmallSecondaryTitle>{title}</SmallSecondaryTitle>
                )}
            </TitleContainer>
        </SecondaryContainer>
    )
}
