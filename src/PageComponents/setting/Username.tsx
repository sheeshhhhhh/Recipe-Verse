import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

type UsernameProps = {
    initialUsername: string
}

const Username = ({
    initialUsername
} : UsernameProps) => {
    const [username, setUsername] = useState<string>(initialUsername || '')

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
                <Button>Update Username</Button>
            </CardFooter>
        </Card>
    )
}

export default Username