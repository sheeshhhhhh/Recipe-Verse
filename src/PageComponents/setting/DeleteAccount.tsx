import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useredirect } from "@/lib/redirect"
import { useMutation } from "@tanstack/react-query"
import { totalmem } from "os"
import { useState } from "react"
import toast from "react-hot-toast"
import { useActionData } from "react-router-dom"


const DeleteAccount = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>Permanently delete your account and all associated data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="max-w-[400px]">
                        Deleting your account is a permanent action. All your data will 
                        be erased and you will not be able to recover it
                    </p>
                    <DeleteModal />
                </div>
            </CardContent>
        </Card>
    )
}

const DeleteModal = () => {
    const [password, setPassword] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)

    const { NavigateWithNext, redirect } = useredirect()

    const { mutate: DeleteAccount, isPending } = useMutation({
        mutationFn: async () => {
            if(!password) throw new Error('password is empty')
            const res = await fetch('http://localhost:4000/api/user/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    password: password
                }),
                credentials: 'include'
            })
            const data = await res.json()
            if(data.auth === false) return NavigateWithNext('/login')
            if(data.error) throw new Error(data.error)
            return data
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            if(data.success === true) {
                window.location.assign('http://localhost:3000/login')
            }
        }
    })

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal} >
            <DialogTrigger asChild>
                <Button
                onClick={() => setOpenModal(true)}
                className="mr-8"
                variant={'destructive'}
                >
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription className="text-destructive">
                        Deleting your account is a permanent action. 
                        All your data will be erased and you will not be able to recover it
                    </DialogDescription>
                </DialogHeader>
                <Input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <DialogFooter>
                    <div className="w-full flex justify-between">
                        
                        <Button 
                        disabled={isPending}
                        onClick={() => setOpenModal(false)}
                        className='max-w-[100px] w-full'
                        variant={'outline'}
                        >
                            Cancel
                        </Button>

                        <Button
                        disabled={isPending}
                        onClick={() => DeleteAccount()}
                        variant={'destructive'}
                        >
                            Delete Account
                        </Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 

export default DeleteAccount