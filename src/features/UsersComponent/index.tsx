import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetAllUsers } from '@common/api'
import { useUser } from '@common/hooks/contexts/UserContext'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { FilledPrimaryButton, OutlineErrorButton, OutlinePrimaryButton } from '@common/components/Button'
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
    AdminIcon,
    UserContainer,
    ManagerIcon,
    HistoryIcon,
    BlockedIcon,
    DeleteIcon,
} from './styles'
import { orderUsers } from '@common/utils/helpers'
import { ModalDeleteUser } from '@common/components/ModalDeleteUser'

export const UsersComponent = () => {
    const router = useRouter()
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState<UserProps[]>([] as UserProps[])
    const [userToBeDeleted, setUserToBeDeleted] = useState<UserProps>({} as UserProps)
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)

    const getAllUsers = useCallback(async () => {
        const allUsers = await GetAllUsers()
        if (allUsers) {
            setUsers(orderUsers(allUsers))
        }
        setIsLoading(false)
    }, [])

    // Get All Users
    useEffect(() => {
        if (user?.isManager) getAllUsers()
    }, [getAllUsers, user?.isManager])

    const handleEdit = (user: UserProps) => {
        router.push({
            pathname: '/UsersManagement',
            query: { email: user.email },
        })
    }

    const handleHistory = (user: UserProps) => {
        router.push({
            pathname: '/UserHistory',
            query: { email: user.email, firstName: user.firstName },
        })
    }

    const handleDelete = (user: UserProps) => {
        setUserToBeDeleted(user)
        setOpenDeleteUserModal(true)
    }

    return (
        <>
            {!user?.isManager || isLoading ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header />
                    <TitleContainer>
                        <Genos_Primary_24_500 text={'Olá ' + user?.firstName} />
                        <Genos_Secondary_24_500 text="Gerencie os usuários" />
                    </TitleContainer>
                    <Content>
                        {users.map((user) => (
                            <UserRow key={user.id}>
                                <UserContainer>
                                    <Questrial_Secondary_20_500 text={user.firstName + ' ' + user.lastName} />
                                    {user.isAdmin && <AdminIcon />}
                                    {user.isManager && <ManagerIcon />}
                                    {user.isBlocked && <BlockedIcon />}
                                </UserContainer>
                                <ButtonsContainer>
                                    <ButtonsTextContainer>
                                        <FilledPrimaryButton
                                            title="Editar"
                                            onClick={() => handleEdit(user)}
                                            style={{ width: '130px', margin: '0px', marginRight: '10px' }}
                                        />
                                        <OutlinePrimaryButton
                                            title="Histórico"
                                            onClick={() => handleHistory(user)}
                                            style={{ width: '130px', margin: '0px', marginRight: '10px' }}
                                        />
                                        <OutlineErrorButton
                                            title="Excluir"
                                            onClick={() => handleDelete(user)}
                                            style={{ width: '130px', margin: '0px' }}
                                        />
                                    </ButtonsTextContainer>
                                    <ButtonsIconsContainer>
                                        <EditIcon onClick={() => handleEdit(user)} />
                                        <HistoryIcon onClick={() => handleHistory(user)} />
                                        <DeleteIcon onClick={() => handleDelete(user)} />
                                    </ButtonsIconsContainer>
                                </ButtonsContainer>
                            </UserRow>
                        ))}
                    </Content>
                    <ModalDeleteUser
                        open={openDeleteUserModal}
                        userToBeDeleted={userToBeDeleted}
                        handleClose={() => setOpenDeleteUserModal(false)}
                    />
                </Container>
            )}
        </>
    )
}
