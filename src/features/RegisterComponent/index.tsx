import React, { useEffect, useState } from 'react'
import {  Firestore, collection, getDocs, getFirestore } from "firebase/firestore"
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebaseConfig'
import Header from '@common/components/Header'
import { LoadingComponent } from '@common/components/Loading'
import { TextPrimary20_700, TextPrimary16_500, TextSecondary24_700 } from '@common/components/Typography'
import { Container, DashboardContent } from './styles'

export const RegisterComponent = () => {
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
    
        console.log('dataList ----> ', dataList)
    
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
                    <Header title="Cadastro" />
                    <DashboardContent>
                        <TextPrimary20_700 text="REGISTER COMPONENT" />
                        <TextPrimary16_500 text="REGISTER COMPONENT" />
                        <TextSecondary24_700 text="REGISTER COMPONENT" />
                    </DashboardContent>
                </>
            )}
        </Container>
    )
}
