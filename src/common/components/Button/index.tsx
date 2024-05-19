import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    OutlinePrimaryContainer,
    OutlineSecondaryContainer,
    FilledPrimaryContainer,
    FilledSecondaryContainer,
    WhiteText,
    PrimaryText,
    SecondaryText,
} from './styles'

type Props = ButtonProps & {
    title: string
    onClick?: () => void
}

export function OutlinePrimaryButton({ title, onClick, ...rest }: Props) {
    return (
        <OutlinePrimaryContainer onClick={onClick} {...rest}>
            <PrimaryText>{title}</PrimaryText>
        </OutlinePrimaryContainer>
    )
}

export function OutlineSecondaryButton({ title, onClick, ...rest }: Props) {
    return (
        <OutlineSecondaryContainer onClick={onClick} {...rest}>
            <SecondaryText>{title}</SecondaryText>
        </OutlineSecondaryContainer>
    )
}

export function FilledPrimaryButton({ title, onClick, ...rest }: Props) {
    return (
        <FilledPrimaryContainer onClick={onClick} {...rest}>
            <WhiteText>{title}</WhiteText>
        </FilledPrimaryContainer>
    )
}

export function FilledSecondaryButton({ title, onClick, ...rest }: Props) {
    return (
        <FilledSecondaryContainer onClick={onClick} {...rest}>
            <WhiteText>{title}</WhiteText>
        </FilledSecondaryContainer>
    )
}
