import React, { useEffect, useState } from 'react'
import { Firestore, collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebaseConfig'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { Genos_Primary_20_500, Questrial_Primary_20_500 } from '@common/components/Typography'
import { Container, ScheduledContent } from './styles'

export const ScheduledComponent = () => {
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
    }, [firebase])

    return (
        <>
            {isLoading ? (
                <Container>
                    <LoadingComponent />
                </Container>
            ) : (
                <Container>
                    <Header />
                    <ScheduledContent>
                        <Genos_Primary_20_500 text="ScheduledComponent - Genos" />
                        <Questrial_Primary_20_500 text="ScheduledComponent - Questrial" />
                    </ScheduledContent>
                </Container>
            )}
        </>
    )
}
