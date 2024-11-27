import React, { createContext, useContext, useState, useEffect } from 'react'
import { PayloadContextType, ScheduleObjectProps } from '@common/models'

const PayloadContext = createContext<PayloadContextType | undefined>(undefined)

export const PayloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [payloads, setPayloads] = useState<ScheduleObjectProps[]>([])

    // Carregar dados do localStorage ao iniciar
    useEffect(() => {
        const storedPayloads = localStorage.getItem('payloads')
        if (storedPayloads) {
            setPayloads(JSON.parse(storedPayloads))
        }
    }, [])

    // Atualizar localStorage quando os payloads mudarem
    useEffect(() => {
        localStorage.setItem('payloads', JSON.stringify(payloads))
    }, [payloads])

    // Adicionar novo payload de forma cumulativa
    const addPayload = (newPayload: ScheduleObjectProps) => {
        setPayloads((prevPayloads) => [...prevPayloads, newPayload])
    }

    // Limpar todos os payloads
    const clearPayloads = () => {
        setPayloads([]) // Limpa o estado local
        localStorage.removeItem('payloads') // Remove do localStorage
    }

    return <PayloadContext.Provider value={{ payloads, addPayload, clearPayloads }}>{children}</PayloadContext.Provider>
}

// Hook personalizado para acessar o contexto
export const usePayload = () => {
    const context = useContext(PayloadContext)
    if (!context) {
        throw new Error('usePayload must be used within a PayloadProvider')
    }
    return context
}
