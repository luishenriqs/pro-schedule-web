import React from 'react'
import { ButtonProps } from '@mui/material'
import { COLORS } from '@common/styles/theme'
import { Icon } from '../Icons'
import {
    ButtonContainer,
    Container,
} from './styles'

type Props = ButtonProps & {
    icon: string
    size?: 'medium' | 'small'
    onClick?: () => void
}

export function PrimaryButtonIcon({ icon, size = 'medium', onClick, ...rest }: Props) {
    return (
        <ButtonContainer onClick={onClick} {...rest}>
            {size === 'medium' ? (
                <Icon iconName={icon} color={COLORS.font_primary} />
            ) : (
                <Icon iconName={icon} color={COLORS.font_primary} />
            )}
        </ButtonContainer>
    )
}

export function SecondaryButtonIcon({ icon, size = 'medium', onClick, ...rest }: Props) {
    return (
        <ButtonContainer onClick={onClick} {...rest}>
            {size === 'medium' ? (
                <Icon iconName={icon} color={COLORS.font_secondary} />
            ) : (
                <Icon iconName={icon} color={COLORS.font_secondary} />
            )}
        </ButtonContainer>
    )
}

export function BackgroundButtonIcon({ icon, size = 'medium', onClick, ...rest }: Props) {
    return (
        <Container>
            <ButtonContainer onClick={onClick} {...rest}>
                {size === 'medium' ? (
                    <Icon iconName={icon} color={COLORS.background} />
                ) : (
                    <Icon iconName={icon} color={COLORS.background} />
                )}
            </ButtonContainer>
        </Container>
    )
}
