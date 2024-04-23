import React from 'react'
import { useRouter } from 'next/router'
import { PrimaryButton } from '@common/components/Button'
import { Container, Imagem, Title } from './styles'

export const WellcomeComponent = () => {
    const router = useRouter()
    return (
        <Container>
            <Imagem
                src={require('../../../assets/pro-schedule-logo.png')}
                alt={'Pro-Schedule-logo'}
            />
            <Title>Seja bem-vindo</Title>
            <PrimaryButton title='Entrar' onClick={() => router.push('/SignIn')} />
        </Container>
    )
}