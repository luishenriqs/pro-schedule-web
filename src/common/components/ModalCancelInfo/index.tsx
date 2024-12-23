import React, { useCallback } from 'react'
import { Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ModalProps } from './model'
import { FilledPrimaryButton } from '../Button'
import { Genos_Secondary_24_500, Genos_Secondary_20_500 } from '../Typography'
import { Container } from './styles'

export const ModalCancelInfo = ({ open, message, info, handleClose, ...props }: ModalProps) => {
    const router = useRouter()

    const handleConfirmation = useCallback(() => {
        handleClose()
        router.refresh()
    }, [handleClose, router])

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
                <Genos_Secondary_24_500 text={message} />
                <Genos_Secondary_20_500 text={info} />
                <FilledPrimaryButton title="Fechar" onClick={handleConfirmation} />
            </Container>
        </Modal>
    )
}
