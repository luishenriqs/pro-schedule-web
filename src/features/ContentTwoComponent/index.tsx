import React, { useEffect, useState } from 'react'
import { Firestore, collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebaseConfig'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { Genos_Primary_20_500, Questrial_Primary_20_500 } from '@common/components/Typography'
import { Container, ContentTwoContent } from './styles'

export const ContentTwoComponent = () => {
    const app = initializeApp(firebaseConfig)
    const firebase = getFirestore(app)

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    async function getData(firebase: Firestore) {
        const users = collection(firebase, 'users')
        const querySnapshot = await getDocs(users)
        const dataList = querySnapshot.docs.map((doc) => doc.data())

        // console.log('dataList ----> ', dataList)

        return dataList
    }

    useEffect(() => {
        getData(firebase)
    }, [])

    return (
        <Container>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header />
                    <ContentTwoContent>
                        <Genos_Primary_20_500 text="Joyce Schwartz - JOYCE SCHWARTZ - ESTÉTICA AVANÇADA - Genos" />
                        <Questrial_Primary_20_500 text="Joyce Schwartz - JOYCE SCHWARTZ - ESTÉTICA AVANÇADA - Questrial" />
                    </ContentTwoContent>
                </>
            )}
        </Container>
    )
}
