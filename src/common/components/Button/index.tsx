import React from 'react'
import { ButtonProps } from '@mui/material'
import { Genos_Primary_20_500, Genos_Secondary_20_500 } from '../Typography'
import {
    OutlinePrimaryContainer,
    OutlineSecondaryContainer,
    FilledPrimaryContainer,
    FilledSecondaryContainer,
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
