import { collection, getFirestore, setDoc, doc, writeBatch, getDocs, query, where, getDoc } from 'firebase/firestore'
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
import { FormValues, ScheduleObjectProps, User } from '@common/models'

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

//==> Recupera email usuário logado
export const UseUser = () => {
    const auth = getAuth()
    return auth.currentUser?.email
}

//==> Verifica se ocorre alteração no status do usuário
export const UseUserStateChanged = async () => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            return user
        } else {
            return { message: 'Usuário desconectado!' }
        }
    })
}

//==> Escreve dados nas coleções do firestore
export const UseWriteData = async (newData: any, entity: string) => {
    try {
        if (!newData.email) {
            return { success: false, status: 400, message: 'O campo email é obrigatório!' }
        }

        const dataCollection = collection(firestore, entity)
        const newDocRef = doc(dataCollection, newData.email)

        await setDoc(newDocRef, newData)

        return { success: true, status: 201, message: 'Dados adicionados com sucesso!' }
    } catch (error) {
        return { success: false, status: 500, message: 'Erro ao adicionar documento: ' + `${error}` }
    }
}

export const UseWriteMultipleDataWithRetry = async (
    dataArray: any[],
    entity: string,
    chunkSize = 25,
    maxRetries = 3
) => {
    try {
        const chunks = []
        const failedChunks: any[][] = []

        // Divide o array em blocos de tamanho 'chunkSize'
        for (let i = 0; i < dataArray.length; i += chunkSize) {
            chunks.push(dataArray.slice(i, i + chunkSize))
        }

        // Função para processar um único bloco
        const processChunk = async (chunk: any[]) => {
            try {
                const batch = writeBatch(firestore)
                const collectionRef = collection(firestore, entity)

                chunk.forEach((data) => {
                    const docRef = doc(
                        collectionRef,
                        data.email || `${data.year}-${data.month}-${data.day}-${data.hour}`
                    )
                    batch.set(docRef, data)
                })

                await batch.commit() // Salva o bloco no Firestore
                return true
            } catch (error) {
                console.error('Erro ao processar bloco:', error)
                return false
            }
        }

        // Processa todos os blocos
        for (const chunk of chunks) {
            const success = await processChunk(chunk)
            if (!success) {
                failedChunks.push(chunk) // Adiciona o bloco à lista de falhas
            }
        }

        // Tenta reprocessar os blocos que falharam
        let retries = 0
        while (failedChunks.length > 0 && retries < maxRetries) {
            console.log(`Reprocessando blocos... Tentativa ${retries + 1}`)
            const retryChunks = [...failedChunks]
            failedChunks.length = 0 // Limpa a lista para registrar falhas novamente

            for (const chunk of retryChunks) {
                const success = await processChunk(chunk)
                if (!success) {
                    failedChunks.push(chunk) // Mantém os blocos que ainda falham
                }
            }
            retries++
        }

        if (failedChunks.length > 0) {
            console.warn('Alguns dados não puderam ser salvos após todas as tentativas.')
            return { success: false, status: 207, message: 'Dados parcialmente salvos', failedChunks }
        }

        return { success: true, status: 201, message: 'Todos os dados foram salvos com sucesso!' }
    } catch (error) {
        console.error('Erro geral ao salvar dados:', error)
        return { success: false, status: 500, message: 'Erro ao salvar dados: ' + `${error}` }
    }
}

// return ==> month fornecido, enable: Igual a true, custumerId: Vazio ("").
export const UseAvailableScheduleByMonth = async (year: number, month: number): Promise<ScheduleObjectProps[]> => {
    try {
        const db = getFirestore()
        const scheduleCollection = collection(db, 'schedule')

        const q = query(
            scheduleCollection,
            where('year', '==', year),
            where('month', '==', month),
            where('enable', '==', true)
        )

        // Obtenha os documentos da consulta
        const querySnapshot = await getDocs(q)

        // Mapeie os documentos para o tipo 'Schedule'
        const schedules: ScheduleObjectProps[] = querySnapshot.docs
            .map((doc) => {
                const data = doc.data()
                return {
                    year: data.year,
                    month: data.month,
                    day: data.day,
                    hour: data.hour,
                    custumerId: data.custumerId,
                    enable: data.enable,
                }
            })
            .filter((schedule) => schedule.custumerId === '')

        return schedules
    } catch (error) {
        console.error('Error fetching schedules:', error)
        throw error
    }
}

export const GetUserById = async (id: string) => {
    try {
        const userRef = doc(firestore, 'users', id)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
            const userData = userDoc.data() as User
            return userData
        } else {
            return {} as User
        }
    } catch (error) {
        console.error('Error fetching schedules:', error)
        throw error
    }
}
