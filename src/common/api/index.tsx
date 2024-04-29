import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { firebaseConfig } from '../../../firebaseConfig'

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth()

type DataProps = {
    email: string
    password: string
}

//==> Cria novo usuário no firestore/auth
export const createAuth = async (data: DataProps) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user
            if (user) {
                return { success: true, status: 201, message: 'Usuário cadastrado com sucesso!' }
            }
            return { success: false, status: 400, message: 'Falha ao cadastrar o usuário!' }
        })
        .catch((error) => {
            console.error(error)
            if (error.code === 'auth/email-already-in-use')
                return { success: false, status: error.code, message: 'Email não disponível para uso!' }
            if (error.code === 'auth/invalid-email')
                return { success: false, status: error.code, message: 'Email inválido!' }
            if (error.code === 'auth/weak-password')
                return { success: false, status: error.code, message: 'Senha fraca!' }
            return { success: false, status: 400, message: 'Falha na requisição!' }
        })
}

//==> Conecta usuário
export const SignIn = async (data: DataProps) => {
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
export const SignOut = async () => {
    return signOut(auth).then(() => {
        return { success: true, status: 200, message: 'Usuário desconectado!' }
    }).catch((error) => {
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

//==> Escreve dados nas coleções do firestore
export const writeData = async (newData: any, entity: string) => {
    try {
        const dataCollection = collection(firestore, entity)
        const newDocRef = await addDoc(dataCollection, newData)
        if (newDocRef) return { success: true, status: 201, message: 'Dados adicionados com sucesso!' }
        return { success: false, status: 400, message: 'Falha ao adicionar o documento!' }
    } catch (error) {
        return { success: false, status: 400, message: 'Erro ao adicionar documento: ' + `${error}` }
    }
}
