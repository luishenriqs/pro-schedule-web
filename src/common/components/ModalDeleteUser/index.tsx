import React, { useCallback, useEffect, useState } from 'react'
import { Modal, TextField } from '@mui/material'
import { useNotification } from '@common/hooks/useNotification'
import { FilledPrimaryButton } from '../Button'
import { GenosSecondaryButtonText } from '../ButtonText'
import { ModalProps } from './model'
import { Genos_Secondary_24_500, Questrial_Secondary_16_500, Questrial_Error_16_500 } from '../Typography'
import { Container, ContentContainer, InputContainer } from './styles'
import { ModalInfo } from '../ModalInfo'

export const ModalDeleteUser = ({ open, userToBeDeleted, handleClose, ...props }: ModalProps) => {
    const { emmitError } = useNotification()
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [infoTitle, setInfoTitle] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [value, setValue] = useState<string>('')
    const [match, setMatch] = useState<boolean>(false)

    useEffect(() => {
        if (userToBeDeleted.firstName === value) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    }, [userToBeDeleted.firstName, value])

    const handleDeleteUser = useCallback(async () => {
        if (!userToBeDeleted) return

        try {
            // const resp = await DeleteUser(userToBeDeleted.email)
            const resp = { success: true }

            if (resp?.success) {
                if (resp?.success) {
                    setInfoTitle('Cadastro excluído com sucesso!')
                    setInfoMessage(
                        'O usuário não terá mais acesso a área restrita da aplicação até que efetue um novo cadastro!'
                    )
                    setOpenInfoModal(true)
                    handleClose()
                }
            } else {
                console.error('Erro ao excluir o cadastro.')
                emmitError('Erro ao excluir o cadastro.')
                handleClose()
            }
        } catch (error) {
            console.error('Erro ao excluir cadastro', error)
            emmitError('Não foi possível excluir o cadastro!')
        }
    }, [emmitError, handleClose, userToBeDeleted])

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
                <Genos_Secondary_24_500 text="Exclusão de cadastro" />
                <ContentContainer>
                    <Questrial_Secondary_16_500
                        text={`Você deseja excluir o cadastro de ${userToBeDeleted.firstName} ${userToBeDeleted.lastName}?`}
                    />
                    <Questrial_Error_16_500
                        text={`Obs: Após esta ação ${userToBeDeleted.firstName} ${userToBeDeleted.lastName} não terá mais acesso a área privada desta aplicação até que faça um novo cadastro!`}
                    />
                    <InputContainer>
                        <Questrial_Secondary_16_500 text={`Digite o primeiro nome: ${userToBeDeleted.firstName}`} />
                        <TextField
                            label="Primeiro Nome"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            size="small"
                            variant="outlined"
                            style={{ width: '260px' }}
                            margin="normal"
                            onChange={(e: any) => setValue(e.target.value)}
                        />
                    </InputContainer>
                </ContentContainer>
                {match && <FilledPrimaryButton title="Confirmar" onClick={handleDeleteUser} />}
                <ContentContainer>
                    <GenosSecondaryButtonText title="Voltar" size="medium" onClick={handleClose} />
                </ContentContainer>
                <ModalInfo
                    open={openInfoModal}
                    infoTitle={infoTitle}
                    infoMessage={infoMessage}
                    handleClose={() => setOpenInfoModal(false)}
                />
            </Container>
        </Modal>
    )
}
