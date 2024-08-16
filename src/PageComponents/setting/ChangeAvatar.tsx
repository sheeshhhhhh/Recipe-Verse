import LoadingSpinner from '../LoadingSpinner'
import AvatarProfile from '../AvatarProfile'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useState } from 'react'
import { handleDrag, handleDrop, handleFileChange } from '@/lib/FileInput_utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadIcon } from 'lucide-react'
import { useAuthContext } from '@/context/authContext'

type ChangeAvatarProps = {
    initialName: string,
    initialProfile: string | null
}

const ChangeAvatar = ({
    initialName,
    initialProfile
} : ChangeAvatarProps) => {
    const [profile, setProfile] = useState<File | string>('')
    const [rendredProfile, setRenderedProfile] = useState<string>(initialProfile || '')

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            // if(!profile) return toast.error('no profile') 
                
            const formData = new FormData();
            formData.append('avatar', profile)  

            const res = await fetch('http://localhost:4000/api/user/changeAvatar', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        },
        onSuccess: async (data) => {
            if(data.success === true) {
               queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>update your profile picture to something more recognizable</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="pl-6 flex items-center gap-10">
                        
                        
                        <AvatarProfile 
                        className='h-16 w-16' 
                        authorProfile={rendredProfile} 
                        authorName={initialName}  
                        /> 

                        <label
                        onDrop={(e) => handleDrop(e, setProfile, setRenderedProfile)}
                        onDragOver={handleDrag}
                        >
                           
                                <div className='bg-muted w-[300px] h-[120px] flex justify-center items-center rounded-xl
                                border-2 border-dashed border-muted-foreground'>
                                    <UploadIcon className='text-muted-foreground' size={60} />
                                </div>
                            

                            <input 
                            hidden
                            onChange={(e) => handleFileChange(e, setProfile, setRenderedProfile)}
                            type='file'
                            />
                        </label>

                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                disabled={isPending}
                onClick={() => mutate()}
                >
                    {isPending ? <LoadingSpinner /> : "Change Avatar" }
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ChangeAvatar