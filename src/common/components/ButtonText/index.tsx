import React from 'react'
import { ButtonProps } from '@mui/material'
import {
    Container,
    TitleContainer,
} from './styles'
import { Genos_Primary_24_500, Genos_Primary_16_500, Genos_Secondary_16_500, Genos_Secondary_24_500 } from '../Typography'

type Props = ButtonProps & {
    title: string
    size?: 'medium' | 'small'
    onClick?: () => void
}


export function GenosPrimaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <Genos_Primary_24_500 text={title} />
                ) : (
                    <Genos_Primary_16_500 text={title} />
                )}
            </TitleContainer>
        </Container>
    )
}

export function GenosSecondaryButtonText({ title, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container onClick={onClick} {...rest}>
            <TitleContainer>
                {size === 'medium' ? (
                    <Genos_Secondary_24_500 text={title} />
                ) : (
                    <Genos_Secondary_16_500 text={title} />
                )}
            </TitleContainer>
        </Container>
    )
}


