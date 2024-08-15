import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'

const TwoFactorAuthentication = () => {

    return (
        <Card id="2fa">
            <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Enhance your account security with 2FA.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">2FA is disabled</p>
                        <p className="text-muted-foreground">
                            Enable two-factor authentication to add an extra layer of security to your account
                        </p>
                    </div>
                    <EnableModal />
                </div>
            </CardContent>
        </Card>
    )
}


const EnableModal = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    // implement functionality later

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button
                onClick={() => setModalOpen(true)}
                >
                    Enable 2FA
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enable 2Fa</DialogTitle>
                    <DialogDescription>
                        Two factor authentication add extra layer of security to your account. 
                        this can be disabled any time.
                    </DialogDescription>
                    <h2 className='text-sm text-red-500'>
                        You will receive the code in your email every time you try to login
                    </h2>
                </DialogHeader>
                <DialogFooter>
                    <div className='w-full flex justify-between'>

                        <Button 
                        onClick={() => setModalOpen(false)}
                        className='max-w-[100px] w-full'
                        variant={'outline'}
                        >
                            Cancel
                        </Button>

                        <Button
                        className='max-w-[100px] w-full'
                        >
                            Enable
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TwoFactorAuthentication