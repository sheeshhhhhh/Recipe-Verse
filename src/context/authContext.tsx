import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState, useEffect } from 'react'

type AuthProviderProps = {
    children: React.ReactNode,
}

type AuthProviderState= {
    loading: boolean,
    user: any | undefined// create User type later
}

// this state is created so that createContext will not make an error
const initialState: AuthProviderState = {
    loading: true,
    user: undefined
}

const AuthContext = createContext<AuthProviderState>(initialState)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export function AuthProvider({
    children
}: AuthProviderProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res: Response = await fetch('http://localhost:4000/api/auth/check', {
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error('failed to fectch for user')
            return data
        }
    })

    const value = {
        user: data?.user,
        loading: isLoading,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}