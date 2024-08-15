import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useChange from '@/lib/useChange'
import { profile } from 'console'
import { ChangeEvent, useState } from 'react'
import AvatarProfile from '../AvatarProfile'

type profileInfoType = {
    name: string,
    email: string,
    profile: string
}

type ProfileProps = {
    initialName: string,
    initialEmail: string | null,
    initialProfile: string | null
}

const Profile = ({
    initialName,
    initialEmail,
    initialProfile
} : ProfileProps) => {
    const [profileInfo, setProfileInfo] = useState<profileInfoType>({
        name: initialName,
        email: initialEmail || '',
        profile: initialProfile || ''
    })
    // profile change is a bit complicated because it requires us to have a file
    const { handleChangeObject } = useChange<profileInfoType>()

    return (
        <Card id="profile">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name, email, and avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                        id="name" 
                        type="text"
                        name='name'
                        value={profileInfo.name}
                        onChange={(e) => handleChangeObject(e, setProfileInfo)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                        id="email" 
                        type="text"
                        name='email'
                        value={profileInfo.email}
                        onChange={(e) => handleChangeObject(e, setProfileInfo)}
                        />
                    </div>
                </div>
                <div className="space-y-6">
                    <Label>Avatar</Label>
                    <div className="flex items-center gap-4">
                        
                        <AvatarProfile 
                        className='h-14 w-14' 
                        authorProfile={profileInfo.profile} 
                        authorName={profileInfo.name}  
                        />

                        <Button variant="outline">Change Avatar</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}

export default Profile