import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { FilledPrimaryButton } from '@common/components/Button'
import { User } from '@common/models'
import { Questrial_Secondary_20_500, Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, TitleContainer, Content, UserRow } from './styles'

export const PatientsComponent = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])

    const handleEdit = (user: User) => {
        router.push({
            pathname: '/PatientManagement',
            query: { email: user.email },
        })
    }

    const usersMock = [
        {
            address: '',
            birthday: '',
            cep: '',
            city: '',
            complement: '',
            cpf: '',
            email: 'lh.p@hotmail.com',
            firstName: 'Luís Henrique',
            id: 'f845d119-f483-431f-a27d-8d22ee20b73c',
            isAdmin: true,
            isManager: true,
            isOwner: true,
            lastName: 'Pereira',
            neighborhood: '',
            password: '123456',
            phone: '16981011280',
            state: '',
        },
        {
            address: 'Rua das Flores, 123',
            birthday: '1990-05-15',
            cep: '12345-678',
            city: 'Ribeirão Preto',
            complement: 'Apt 201',
            cpf: '123.456.789-01',
            email: 'julieta@email.com',
            firstName: 'Julieta',
            id: 'a12b34c56-d78e90f1-2345-6789abcdef01',
            isAdmin: false,
            isManager: true,
            isOwner: false,
            lastName: 'Borges',
            neighborhood: 'Jardim Interlagos',
            password: 'abcdef',
            phone: '11987654321',
            state: 'SP',
        },
        {
            address: 'Av. Central, 987',
            birthday: '1985-11-20',
            cep: '87654-321',
            city: 'Rio de Janeiro',
            complement: '',
            cpf: '987.654.321-00',
            email: 'sorahia@email.com',
            firstName: 'Sorahia',
            id: 'b34c12d56-e78f01g2-3456-789abcdef02',
            isAdmin: true,
            isManager: false,
            isOwner: true,
            lastName: 'Pereira',
            neighborhood: 'Copacabana',
            password: '654321',
            phone: '21998765432',
            state: 'RJ',
        },
        {
            address: 'Rua 3, 456',
            birthday: '1995-08-10',
            cep: '54321-987',
            city: 'São Paulo',
            complement: 'Casa',
            cpf: '456.789.123-12',
            email: 'lisa@email.com',
            firstName: 'Lisandra',
            id: 'c56d34b12-f90g12h3-4567-890abcdef03',
            isAdmin: false,
            isManager: true,
            isOwner: false,
            lastName: 'Chaves',
            neighborhood: 'Savassi',
            password: 'password123',
            phone: '31987654321',
            state: 'MG',
        },
    ]

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        <Genos_Secondary_24_500 text="Gerencie seus pacientes" />
                    </TitleContainer>
                    <Content>
                        {usersMock.map((user) => (
                            <UserRow key={user.id}>
                                <Questrial_Secondary_20_500 text={user.firstName + ' ' + user.lastName} />
                                <FilledPrimaryButton
                                    title="Editar"
                                    onClick={() => handleEdit(user)}
                                    style={{ width: '130px' }}
                                />
                            </UserRow>
                        ))}
                    </Content>
                </>
            )}
        </Container>
    )
}
