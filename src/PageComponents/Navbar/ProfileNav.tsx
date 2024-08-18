import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import AvatarProfile from '../AvatarProfile'
import { useAuthContext } from '@/context/authContext'
import { Link } from 'react-router-dom'
import { LogOutIcon, UserRoundIcon, ClipboardListIcon, SettingsIcon } from 'lucide-react'
import { useState } from 'react'
  


const ProfileNav = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { user } = useAuthContext()

    const logOut = async () => {
        const res = await fetch('http://localhost:4000/api/auth/logout', { credentials: 'include' })
        const data = await res.json()
        if(data.error) return toast.error('failed to log out') 
        window.location.assign(`http://localhost:3000${location.pathname}`)
    }
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <AvatarProfile  
                className='h-10 w-10'
                authorName={user.name}
                authorProfile={user.profile}
                />
            </SheetTrigger>
            <SheetContent className='py-3 px-4 w-[220px] sm:w-[320px]' >
                <SheetHeader>
                    <div className='flex gap-3'>
                        <AvatarProfile  
                        authorName={user.name}
                        authorProfile={user.profile}
                        />
                        <div>
                            <SheetTitle>{user.name}</SheetTitle>
                            <SheetDescription>{user.username}</SheetDescription>
                        </div>
                    </div>
                </SheetHeader>
                <div className='mt-6 flex flex-col gap-1'>
                    <Link
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 flex font-medium items-center gap-3 hover:bg-accent hover:text-accent-foreground'
                    to={`/profile/${user.id}`}>
                        <UserRoundIcon />
                        Profile
                    </Link>
                    <Link
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 flex font-medium items-center gap-3 hover:bg-accent hover:text-accent-foreground'
                    to={'myrecipe/dashboard'}
                    >
                        <ClipboardListIcon />
                        Dashboard
                    </Link>
                    <Link
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 flex font-medium items-center gap-3 hover:bg-accent hover:text-accent-foreground'
                    to={'settings'}
                    >
                        <SettingsIcon />
                        Settings
                    </Link>
                    <Button 
                    className='justify-start text-base items-center gap-3' 
                    variant={'ghost'} 
                    onClick={logOut}>
                        <LogOutIcon />
                        Logout
                    </Button>   
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ProfileNav