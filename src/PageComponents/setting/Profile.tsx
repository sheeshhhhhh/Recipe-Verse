import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useChange from '@/lib/useChange'
import { useState } from 'react'
import AvatarProfile from '../AvatarProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../LoadingSpinner'
import { Textarea } from '@/components/ui/textarea'

type profileInfoType = {
    name: string,
    email: string,
    bio: string
}

type ProfileProps = {
    initialName: string,
    initialEmail: string | null,
    initialBio: string | null
}

const Profile = ({
    initialName,
    initialEmail,
    initialBio
} : ProfileProps) => {
    const [profileInfo, setProfileInfo] = useState<profileInfoType>({
        name: initialName,
        email: initialEmail || '',
        bio: initialBio || ''
    })
    // profile change is a bit complicated because it requires us to have a file
    const { handleChangeObject, handleChangeTextArea } = useChange<profileInfoType>()
    const queryClient = useQueryClient();

    const { mutate: changeUserInfo, isPending, error } = useMutation({
        mutationFn: async () => {
            if(!profileInfo.name) throw new Error('blank name is not allowed')

            const res = await fetch('http://localhost:4000/api/user/changeUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(profileInfo),
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data as profileInfoType
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const nameBlankError = error?.message === 'blank name is not allowed' // required in the data base
    const emailAlreadyExist = error?.message === 'email already exist' // unique constraint

    return (
        <Card id="profile">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name, email, and avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    <div className="space-y-2">
                        <Label 
                        className={`${nameBlankError && 'text-red-600'}`}
                        htmlFor="name">
                            Name
                        </Label>
                        <Input 
                        id="name" 
                        type="text"
                        name='name'
                        className={`${nameBlankError && 'border-red-600 focus-visible:border-input focus-visible:ring-red-600'}`}
                        value={profileInfo.name}
                        onChange={(e) => handleChangeObject(e, setProfileInfo)}
                        />
                        {nameBlankError && <p className='text-red-600 font-medium'>{error.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label 
                        className={`${emailAlreadyExist && 'text-red-600'}`}
                        htmlFor="email">
                            Email
                        </Label>
                        <Input 
                        id="email" 
                        type="text"
                        name='email'
                        className={`${emailAlreadyExist && 'border-red-600 focus-visible:border-input focus-visible:ring-red-600'}`}
                        value={profileInfo.email}
                        onChange={(e) => handleChangeObject(e, setProfileInfo)}
                        />
                        {emailAlreadyExist && <p className='text-red-600 font-medium'>{error.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor='bio'>Bio</Label>
                    <Textarea 
                    value={profileInfo.bio}
                    onChange={(e) => handleChangeTextArea(e, setProfileInfo)}
                    name='bio'
                    id='bio' 
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                onClick={() => changeUserInfo()}
                disabled={isPending}
                >
                    {isPending ? <LoadingSpinner /> : "Save Changes" }
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Profile