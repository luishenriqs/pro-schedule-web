import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../../../firebaseConfig'
import { GetUserEmail } from '@common/api'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { UserProps } from '@common/models'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { Genos_Secondary_24_500 } from '@common/components/Typography'
import { Container, Content, TitleContainer } from './styles'

export const PaymentComponent = () => {
    const router = useRouter()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    // LOGGED IN USER
    const getData = useCallback(
        async (email: string | null | undefined) => {
            const docRef = email && doc(db, 'users', email)
            const docSnap = docRef && (await getDoc(docRef))

            if (docSnap && docSnap.exists()) {
                const user = docSnap.data()
                setUser(user)
                // console.log('Logged in user! ', JSON.stringify(user))
            } else {
                console.log('No logged in user!')
            }
        },
        [db]
    )

    useEffect(() => {
        const userLogged = GetUserEmail()
        if (userLogged) getData(userLogged)
    }, [getData])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <TitleContainer>
                        {!!user.firstName && <Genos_Secondary_24_500 text={`Olá ${user.firstName}`} />}
                        <Genos_Secondary_24_500 text="Faça o pagamento" />
                    </TitleContainer>
                    <Content>
                        <GenosPrimaryButtonText
                            title="Voltar para agenda"
                            size="small"
                            onClick={() => router.push('/')}
                        />
                    </Content>
                </>
            )}
        </Container>
    )
}
