import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"

type UsernameProps = {
    initialUsername: string
}

const Username = ({
    initialUsername
} : UsernameProps) => {
    const [username, setUsername] = useState<string>(initialUsername || '')

    const queryClient = useQueryClient()
    const { mutate: changeUsername, isPending } = useMutation({
        mutationFn: async () => {
            if(!username) throw new Error('empty username is not valid')
            const res = await fetch('http://localhost:4000/api/user/changeusername', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: username
                }),
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

            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Username</CardTitle>
                <CardDescription>update your username to something more memorable</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="username">New Username</Label>
                    <Input 
                    id="username" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                onClick={() => changeUsername()}
                >
                    Update Username
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Username