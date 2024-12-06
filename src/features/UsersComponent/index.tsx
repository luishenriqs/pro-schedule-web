import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetAllUsers } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { FilledPrimaryButton } from '@common/components/Button'
import { UserProps } from '@common/models'
import { Questrial_Secondary_20_500, Genos_Secondary_24_500, Genos_Primary_24_500 } from '@common/components/Typography'
import {
    Container,
    TitleContainer,
    Content,
    UserRow,
    ButtonsContainer,
    ButtonsIconsContainer,
    EditIcon,
    ButtonsTextContainer,
} from './styles'

export const UsersComponent = () => {
    const router = useRouter()
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState<UserProps[]>([] as UserProps[])

    const getAllUsers = useCallback(async () => {
        const allUsers = await GetAllUsers()
        if (allUsers) {
            setUsers(allUsers)
        }
        setIsLoading(false)
    }, [])

    // Get All Users
    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    const handleEdit = (user: UserProps) => {
        router.push({
            pathname: '/UsersManagement',
            query: { email: user.email },
        })
    }

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Primary_24_500 text={'Olá ' + user?.firstName} />
                        <Genos_Secondary_24_500 text="Gerencie os usuários" />
                    </TitleContainer>
                    <Content>
                        {users.map((user) => (
                            <UserRow key={user.id}>
                                <Questrial_Secondary_20_500 text={user.firstName + ' ' + user.lastName} />
                                <ButtonsContainer>
                                    <ButtonsTextContainer>
                                        <FilledPrimaryButton
                                            title="Editar"
                                            onClick={() => handleEdit(user)}
                                            style={{ width: '130px', margin: '0px', marginRight: '10px' }}
                                        />
                                        {/* ------ BACKLOG: History page ------ */}
                                        {/* <OutlinePrimaryButton
                                            title="Histórico"
                                            onClick={() => {}}
                                            style={{ width: '130px', margin: '0px' }}
                                        /> */}
                                    </ButtonsTextContainer>
                                    <ButtonsIconsContainer>
                                        <EditIcon onClick={() => handleEdit(user)} />
                                        {/* <HistoryIcon onClick={() => {}} /> */}
                                    </ButtonsIconsContainer>
                                </ButtonsContainer>
                            </UserRow>
                        ))}
                    </Content>
                </>
            )}
        </Container>
    )
}
