import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { FilledPrimaryButton } from '@common/components/Button'
import { UserProps } from '@common/models'
import { Questrial_Secondary_20_500, Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, TitleContainer, Content, UserRow, ButtonsContainer } from './styles'
import { GetAllUsers } from '@common/api'

export const UsersComponent = () => {
    const router = useRouter()

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
                        <Genos_Secondary_24_500 text="Gerencie os usuários" />
                    </TitleContainer>
                    <Content>
                        {users.map((user) => (
                            <UserRow key={user.id}>
                                <Questrial_Secondary_20_500 text={user.firstName + ' ' + user.lastName} />
                                <ButtonsContainer>
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
                                </ButtonsContainer>
                            </UserRow>
                        ))}
                    </Content>
                </>
            )}
        </Container>
    )
}
