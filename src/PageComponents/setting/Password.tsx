import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardFooter,CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import useChange from '@/lib/useChange'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoadingSpinner from '../LoadingSpinner'

type PasswordInfoType = {
    password: string,
    newPassword: string,
    confirmPassword: string
}

const Password = () => {
    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [passwordInfo, setPasswordInfo] = useState<PasswordInfoType>({
        password: '',
        newPassword: '',
        confirmPassword: ''
    })

    const { handleChangeObject } = useChange<PasswordInfoType>()
    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: async () => {
            if(!passwordInfo.password || !passwordInfo.newPassword || !passwordInfo.confirmPassword) {
                throw new Error('fill in the all the files')
            }

            const res = await fetch('http://localhost:4000/api/user/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(passwordInfo),
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            if(data.success === true) {
                toast.success(data.message)
            }
        }
    })

    return (
        <Card id="security">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 relative">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                    id="current-password" 
                    type={passwordShow ? "text" : "password"} 
                    name='password'
                    value={passwordInfo.password}
                    onChange={(e) => handleChangeObject(e, setPasswordInfo)}
                    />
                    <div 
                    onClick={() => setPasswordShow(prev => !prev)}
                    className='absolute top-[33px] right-3'>
                        {passwordShow ? 
                        <EyeIcon /> 
                        :
                        <EyeOffIcon />
                        }
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                    id="new-password" 
                    type="password" 
                    name='newPassword'
                    value={passwordInfo.newPassword}
                    onChange={(e) => handleChangeObject(e, setPasswordInfo)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                    id="confirm-password" 
                    type="password" 
                    name='confirmPassword'
                    value={passwordInfo.confirmPassword}
                    onChange={(e) => handleChangeObject(e, setPasswordInfo)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                onClick={() => changePassword()}
                disabled={isPending}
                >
                    { isPending ? <LoadingSpinner /> : "ChangePassword" }
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Password