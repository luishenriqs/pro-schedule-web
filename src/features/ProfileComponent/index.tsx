import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetUserByEmail, UpdateUser } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import { Checkbox, TextField } from '@mui/material'
import { useNotification } from '@common/hooks/useNotification'
import { UserProps } from '@common/models'
import { FilledPrimaryButton } from '@common/components/Button'
import { LoadingComponent } from '@common/components/Loading'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { InputNumber } from '@common/components/InputNumber'
import {
    Genos_Error_24_500,
    Genos_Secondary_24_500,
    Genos_Success_24_500,
    Questrial_Secondary_20_500,
} from '@common/components/Typography'
import { Container, TitleContainer, Content, EditIcon, UserInfo, LabelContainer, InputContainer } from './styles'

export const ProfileComponent = () => {
    const router = useRouter()
    const { user } = useUser()
    const { emmitAlert, emmitError, emmitSuccess } = useNotification()
    const { email } = router.query

    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const getUser = useCallback(async () => {
        const userSelected = typeof email === 'string' && (await GetUserByEmail(email))

        if (userSelected) {
            setSelectedUser(userSelected)
        } else {
            setSelectedUser(null)
            emmitAlert('Não foi possível recuperar os dados do usuário!')
        }
        setIsLoading(false)
    }, [email, emmitAlert])

    useEffect(() => {
        if (user?.isAdmin) getUser()
    }, [getUser, user?.isAdmin])

    const handleEditField = (field: keyof UserProps, value: string | boolean | number | null) => {
        if (selectedUser) {
            const updatedUser = { ...selectedUser, [field]: value }
            setSelectedUser(updatedUser)
        }
    }

    // Salva as alterações feitas no usuário
    const handleSaveUpdate = useCallback(async () => {
        if (selectedUser) {
            setIsSaving(true)
            try {
                if (selectedUser && selectedUser.email) {
                    await UpdateUser(selectedUser.email, selectedUser)
                    emmitSuccess('Dados salvos com sucesso!')
                    router.back()
                }
            } catch (error) {
                console.error('Erro ao salvar os dados.', error)
                emmitError('Erro ao salvar os dados.')
            } finally {
                setIsSaving(false)
            }
        }
    }, [emmitError, emmitSuccess, router, selectedUser])

    if (!selectedUser) {
        return (
            <Container>
                <TitleContainer>
                    <Genos_Secondary_24_500 text="Dados não encontrados!" />
                </TitleContainer>
                <GenosPrimaryButtonText title="Voltar" size="small" onClick={() => router.back()} />
            </Container>
        )
    }

    return (
        <Container>
            {isLoading || isSaving ? (
                <LoadingComponent />
            ) : (
                <>
                    <TitleContainer>
                        <Genos_Secondary_24_500 text={'Edite os dados de ' + selectedUser.firstName} />
                    </TitleContainer>
                    <Content>
                        {Object.entries(selectedUser)
                            .filter(([key]) => !['password', 'id', 'cpf'].includes(key))
                            .sort((a, b) => {
                                const order = [
                                    'firstName',
                                    'lastName',
                                    'isManager',
                                    'isAdmin',
                                    'email',
                                    'phone',
                                    'credits',
                                ]
                                return order.indexOf(a[0]) - order.indexOf(b[0])
                            })
                            .map(([key, value]) => {
                                const displayNames: { [key: string]: string } = {
                                    firstName: 'Primeiro Nome',
                                    lastName: 'Último Nome',
                                    isManager: 'Perfil Manager',
                                    isAdmin: 'Perfil Admin',
                                    email: 'Email',
                                    phone: 'WhatsApp',
                                    credits: 'Creditos',
                                }

                                return (
                                    <UserInfo key={key}>
                                        <LabelContainer>
                                            <EditIcon />
                                            <Questrial_Secondary_20_500 text={displayNames[key] + ':'} />
                                        </LabelContainer>
                                        <InputContainer>
                                            {typeof value === 'boolean' ? (
                                                <Checkbox
                                                    checked={value}
                                                    onChange={(e) =>
                                                        handleEditField(key as keyof UserProps, e.target.checked)
                                                    }
                                                    checkedIcon={<Genos_Success_24_500 text="✓" />}
                                                    icon={<Genos_Error_24_500 text="✗" />}
                                                    style={{ height: '30px' }}
                                                />
                                            ) : typeof value === 'number' ? (
                                                <InputNumber
                                                    value={value}
                                                    onChange={(newValue) =>
                                                        handleEditField(key as keyof UserProps, newValue)
                                                    }
                                                />
                                            ) : (
                                                <TextField
                                                    value={value as string}
                                                    slotProps={{
                                                        inputLabel: {
                                                            shrink: true,
                                                        },
                                                    }}
                                                    size="small"
                                                    variant="outlined"
                                                    style={{ width: 'auto' }}
                                                    onChange={(e: any) =>
                                                        handleEditField(key as keyof UserProps, e.target.value)
                                                    }
                                                />
                                            )}
                                        </InputContainer>
                                    </UserInfo>
                                )
                            })}
                    </Content>
                </>
            )}
            <FilledPrimaryButton title="Salvar" onClick={handleSaveUpdate} />
            <GenosPrimaryButtonText title="Voltar" size="small" onClick={() => router.back()} />
        </Container>
    )
}
