import React from 'react'
import { Modal } from '@mui/material'
import { Container, ContentContainer } from './styles'
import { ModalProps } from './model'
import { FilledPrimaryButton } from '../Button'
import { useRouter } from 'next/router'
import { GenosSecondaryButtonText } from '../ButtonText'
import { Genos_Secondary_24_500, Questrial_Secondary_16_500 } from '../Typography'

export const ModalSighUp = ({ open, handleClose, ...props }: ModalProps) => {
    const router = useRouter()

    return (
        <Modal
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="dialog-description"
            {...props}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Container>
                <Genos_Secondary_24_500 text="Faça o seu login" />
                <FilledPrimaryButton title="Login" onClick={() => router.push('/SignIn')} />
                <ContentContainer>
                    <Questrial_Secondary_16_500 text="Ainda não possui uma conta?" />
                    <GenosSecondaryButtonText
                        title="Cadastre-se"
                        size="medium"
                        onClick={() => router.push('/SignUp')}
                    />
                </ContentContainer>
            </Container>
        </Modal>
    )
}
