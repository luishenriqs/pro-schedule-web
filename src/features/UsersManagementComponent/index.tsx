import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetUserById, UpdateUser } from '@common/api'
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

export const UsersManagementComponent = () => {
    const router = useRouter()
    const { emmitAlert, emmitError, emmitSuccess } = useNotification()
    const { email } = router.query

    const [user, setUser] = useState<UserProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const getUser = useCallback(async () => {
        const selectedUser = typeof email === 'string' && (await GetUserById(email))

        if (selectedUser) {
            setUser(selectedUser)
        } else {
            setUser(null)
            emmitAlert('Não foi possível recuperar os dados do usuário!')
        }
        setIsLoading(false)
    }, [email, emmitAlert])

    useEffect(() => {
        getUser()
    }, [getUser])

    const handleEditField = (field: keyof UserProps, value: string | boolean | number | null) => {
        if (user) {
            const updatedUser = { ...user, [field]: value }
            setUser(updatedUser)
        }
    }

    // Salva as alterações feitas no usuário
    const handleSaveUpdate = useCallback(async () => {
        if (user) {
            setIsSaving(true)
            try {
                if (user && user.email) {
                    await UpdateUser(user.email, user)
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
    }, [emmitError, emmitSuccess, router, user])

    if (!user) {
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
                        <Genos_Secondary_24_500 text={'Edite os dados de ' + user.firstName} />
                    </TitleContainer>
                    <Content>
                        {Object.entries(user)
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
