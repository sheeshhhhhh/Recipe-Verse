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
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const checkauth = async () => {
            try {
                const res: Response = await fetch('http://localhost:4000/api/auth/check', {
                    credentials: 'include'
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)
                
                setUser(data?.user)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        checkauth()
    }, [])

    const value = {
        user,
        loading
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}