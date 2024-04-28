import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../../firebaseConfig'

export const writeData = async (newData: any, entity: string) => {
    const app = initializeApp(firebaseConfig)
    const firestore = getFirestore(app)
    
    try {
        const dataCollection = collection(firestore, entity)
        const newDocRef = await addDoc(dataCollection, newData)
        if (newDocRef) {
            return{ success: true, status: 200, message: 'Dados adicionados com sucesso!' }
        }
        return
    } catch (error) {
        console.error('Erro ao adicionar documento: ', error);
        throw error;
    }
}