import React from 'react'
import { ButtonProps } from '@mui/material'
import { Genos_Error_20_500, Genos_Primary_20_500, Genos_Secondary_20_500 } from '../Typography'
import {
    OutlinePrimaryContainer,
    OutlineSecondaryContainer,
    FilledPrimaryContainer,
    FilledSecondaryContainer,
    OutlineErrorContainer,
} from './styles'

type Props = ButtonProps & {
    title: string
    onClick?: () => void
}

export function OutlinePrimaryButton({ title, onClick, ...rest }: Props) {
    return (
        <OutlinePrimaryContainer onClick={onClick} {...rest}>
            <Genos_Secondary_20_500 text={title} />
        </OutlinePrimaryContainer>
    )
}

export function OutlineSecondaryButton({ title, onClick, ...rest }: Props) {
    return (
        <OutlineSecondaryContainer onClick={onClick} {...rest}>
            <Genos_Primary_20_500 text={title} />
        </OutlineSecondaryContainer>
    )
}

export function OutlineErrorButton({ title, onClick, ...rest }: Props) {
    return (
        <OutlineErrorContainer onClick={onClick} {...rest}>
            <Genos_Error_20_500 text={title} />
        </OutlineErrorContainer>
    )
}

export function FilledPrimaryButton({ title, onClick, ...rest }: Props) {
    return (
        <FilledPrimaryContainer onClick={onClick} {...rest}>
            <Genos_Secondary_20_500 text={title} />
        </FilledPrimaryContainer>
    )
}

export function FilledSecondaryButton({ title, onClick, ...rest }: Props) {
    return (
        <FilledSecondaryContainer onClick={onClick} {...rest}>
            <Genos_Primary_20_500 text={title} />
        </FilledSecondaryContainer>
    )
}
