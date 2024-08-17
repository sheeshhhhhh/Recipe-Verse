import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useAuthContext } from "@/context/authContext"
import { useredirect } from "@/lib/redirect"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"
import Profile from "./Profile"
import Username from "./Username"
import Password from "./Password"
import TwoFactorAuthentication from "./TwoFactorAuthentication"
import DeleteAccount from "./DeleteAccount"
import ChangeAvatar from "./ChangeAvatar"

type initialValueUserType = {
    name: string,
    username: string,
    profile: string | null,
    MultiFactor: boolean,
    userInfo: {
        bio: string | null,
        email: string | null
    },
}

const Settings = () => {

    const { NavigateWithNext } = useredirect()
    const { user } = useAuthContext()    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userInfo', user.id],
        queryFn: async () => {
            const res: Response = await fetch('http://localhost:4000/api/user/getUserInfo', { credentials: 'include' })
            const data = await res.json()
            if(data.auth === false) return NavigateWithNext('/login')
            if(data.error) throw new Error(data.error)
            return data as initialValueUserType
        },
        retry: false
    })

    if(isLoading) return (
        <div className="flex-1">
            {/* implement skeleton loading later */}
            <LoadingSpinner className="h-12 w-12 mt-20" />
        </div>
    )
    
    if(isError || !data) return <Navigate to={'/error?message=failed to load settings'} />

    return (
        <main className="flex-1 p-6 md:p-10">
            <div className='mx-auto max-w-3xl'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold'>Profile</h1>
                    <p className='text-muted-foreground'>
                        Update your personal information settings
                    </p>
                </div>
                <div className='space-y-8'>

                    <Profile 
                    initialBio={data.userInfo.bio}
                    initialEmail={data.userInfo.email}
                    initialName={data.name}

                    />
                    <Username 
                    initialUsername={data.username} 
                    />
                    <ChangeAvatar 
                    initialName={data.name}
                    initialProfile={data.profile}
                    />
                    <Password />
                    <TwoFactorAuthentication 
                    MultiFactor={data.MultiFactor}
                    />
                    <DeleteAccount />
                </div>
            </div>
        </main>
    )
}

export default Settings