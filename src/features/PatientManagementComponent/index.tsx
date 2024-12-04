import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetUserById } from '@common/api'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { User } from '@common/models'
import { FilledPrimaryButton } from '@common/components/Button'
import { LoadingComponent } from '@common/components/Loading'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, TitleContainer, Content, EditIcon, UserInfo } from './styles'

export const PatientManagementComponent = () => {
    const router = useRouter()
    const { email } = router.query

    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])

    const getUser = useCallback(async (email: string) => {
        const selectedUser = await GetUserById(email)
        console.log('SELECTED USER ', JSON.stringify(selectedUser))
        if (selectedUser) setUser(selectedUser)
    }, [])

    useEffect(() => {
        if (typeof email === 'string') {
            getUser(email)
        }
    }, [email, getUser])

    // Atualiza as propriedades do usuário localmente
    const handleEditField = (field: keyof User, value: string | boolean | null) => {
        if (user) {
            const updatedUser = { ...user, [field]: value }
            setUser(updatedUser)
        }
    }

    if (!user) return <div>Carregando...</div>

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <TitleContainer>
                        <Genos_Secondary_24_500 text="Edite seu paciente" />
                    </TitleContainer>
                    <Content>
                        {Object.entries(user).map(([key, value]) => (
                            <UserInfo key={key}>
                                <span>{key}:</span>
                                <div>
                                    {typeof value === 'boolean' ? (
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleEditField(key as keyof User, e.target.checked)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={value as string}
                                            onChange={(e) => handleEditField(key as keyof User, e.target.value)}
                                        />
                                    )}
                                    <EditIcon>
                                        <ModeEditOutlineOutlinedIcon />
                                    </EditIcon>
                                </div>
                            </UserInfo>
                        ))}
                    </Content>
                </>
            )}
            <FilledPrimaryButton title="Salvar" onClick={() => {}} />
            <GenosPrimaryButtonText title="Voltar" size="small" onClick={() => router.back()} />
        </Container>
    )
}
