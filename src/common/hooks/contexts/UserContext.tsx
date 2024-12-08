import { UserLoggedInContextType, UserProps } from '@common/models'
import React, { createContext, useContext, useState, useEffect } from 'react'

// Criação do contexto
const UserLoggedInContext = createContext<UserLoggedInContextType | undefined>(undefined)

// Provedor do contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null)

    // Carregar o usuário do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    // Atualizar localStorage sempre que o usuário logado mudar
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user') // Remove do localStorage se o usuário for nulo
        }
    }, [user])

    // Salvar o usuário logado
    const saveUser = (loggedInUser: UserProps) => {
        setUser(loggedInUser)
    }

    // Remover o usuário logado
    const clearUser = () => {
        setUser(null) // Limpa o estado local
        localStorage.removeItem('user') // Remove do localStorage
    }

    return <UserLoggedInContext.Provider value={{ user, saveUser, clearUser }}>{children}</UserLoggedInContext.Provider>
}

// Hook personalizado para acessar o contexto
export const useUser = () => {
    const context = useContext(UserLoggedInContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
