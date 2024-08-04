import { useEffect, useState } from 'react'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
} from 'firebase/auth'
import { firebaseConfig } from '../../../firebaseConfig'
import { FormValues } from '@common/models'

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth()

//==> Cria novo usuário no firestore/auth
export const CreateAuth = async (data: FormValues) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = userCredential.user
        if (user) {
            return { success: true, status: 201, message: 'Usuário cadastrado com sucesso!' }
        }

        return { success: false, status: 400, message: 'Falha ao cadastrar o usuário!' }
    } catch (error: any) {
        console.error(error)
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, status: error.code, message: 'Email não disponível para uso!' }
        }
        if (error.code === 'auth/invalid-email') {
            return { success: false, status: error.code, message: 'Email inválido!' }
        }
        if (error.code === 'auth/weak-password') {
            return { success: false, status: error.code, message: 'Senha fraca!' }
        }
        return { success: false, status: 400, message: 'Falha na requisição!' }
    }
}

//==> Conecta usuário
export const UseSignIn = async (data: FormValues) => {
    return signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user
            if (user) {
                return { success: true, status: 200, message: 'Usuário autenticado com sucesso!' }
            }
            return { success: false, status: 400, message: 'Falha ao autenticar o usuário!' }
        })
        .catch((error) => {
            console.error(error.code)
            if (error.code === 'auth/user-not-found')
                return { success: false, status: error.code, message: 'Email ou senha inválidos!' }
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password')
                return { success: false, status: error.code, message: 'Email ou senha inválidos!' }
            if (error.code === 'auth/invalid-credential')
                return { success: false, status: error.code, message: 'Email ou senha inválidos!' }
            if (error.code === 'auth/too-many-requests')
                return {
                    success: false,
                    status: error.code,
                    message: 'Muitas tentativas, senha bloqueada. Resete sua senha e tente novamente mais tarde!',
                }
            return { success: false, status: 400, message: 'Falha na requisição!' }
        })
}

//==> Desconecta usuário
export const UseSignOut = async () => {
    return signOut(auth)
        .then(() => {
            return { success: true, status: 200, message: 'Usuário desconectado!' }
        })
        .catch((error) => {
            return { success: false, status: `${error.status}`, message: `${error.message}` }
        })
}

//==> Recupera senha
export const RecoverPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            return { success: true, status: 200, message: 'Enviamos um link em seu email para redefinição de senha.' }
        })
        .catch((error) => {
            return { success: false, status: `${error.status}`, message: `${error.message}` }
        })
}

export const UseUser = () => {
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    return user
}

//==> Verifica se ocorre alteração no status do usuário
export const UseUserStateChanged = async () => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log('na api ------> ', JSON.stringify(user))
            return user
        } else {
            return { message: 'Usuário desconectado!' }
        }
    })
}

//==> Escreve dados nas coleções do firestore
export const UseWriteData = async (newData: any, entity: string) => {
    try {
        const dataCollection = collection(firestore, entity)
        const newDocRef = await addDoc(dataCollection, newData)
        if (newDocRef) return { success: true, status: 201, message: 'Dados adicionados com sucesso!' }
        return { success: false, status: 400, message: 'Falha ao adicionar o documento!' }
    } catch (error) {
        return { success: false, status: 500, message: 'Erro ao adicionar documento: ' + `${error}` }
    }
}
