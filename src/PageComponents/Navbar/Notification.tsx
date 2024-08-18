import { useSocketContext } from "@/context/socketContext"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "../LoadingSpinner"
import { Link } from "react-router-dom"
import AvatarProfile from "../AvatarProfile"
import notificationSound from '@/assets/notification.mp3'
import formatTime from "@/lib/formatTime"

enum NotificationStatus {
    Viewed = "Viewed",
    Notviewed = "Notviewed"
}

type Notification = {
    id: string,
    status: NotificationStatus,
    body: string,
    link: string | null,
    notificationFrom: {
        id: string,
        name: string,
        profile: string | null
    },
    createdAt: Date
}

const NotificationButton = () => {
    const [popOver, setPopOver] = useState<boolean>(false)
    const socket = useSocketContext()
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['Notification'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/api/user/getNotification', {
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data as Notification[]
        }, 
    })

    const notViewedNotifCount = useMemo(() => {
        return data?.reduce((curr, item) => {
            const isNotViewed = item.status === NotificationStatus.Notviewed
            
            if(!isNotViewed) return curr
            return curr + 1
        }, 0)
    }, [data])

    useEffect(() => {
        if(!socket) return
        socket.on('notification', (data) => {
            // use Query client here to update the data
            queryClient.setQueryData(['Notification'], (oldData: Notification[]) => {
                console.log(oldData)
                return [
                    ...oldData, data
                ]
            })
            const audio = new Audio(notificationSound)
            audio.muted = true
            audio.muted = false
            audio.play()
        })
    }, [socket])
    

    return (
        <div>
            <Popover open={popOver} onOpenChange={setPopOver}>
                <PopoverTrigger asChild>
                    <Button
                    variant={'ghost'}
                    className="relative"
                    >   
                        {notViewedNotifCount !== 0 && !isLoading &&
                        <div className="w-[18px] h-[18px] bg-red-600 rounded-full absolute top-[2px] right-[13px]
                        text-white text-xs flex justify-center items-center">
                            {notViewedNotifCount}
                        </div>}
                        <BellIcon size={28} className="text-primary fill-primary" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-lg w-[380px]">
                    {
                        isLoading ? 
                        <LoadingSpinner />
                        :
                        <NotificationDisplay 
                        setPopOver={setPopOver}
                        notifications={data || []} />
                    }
                </PopoverContent>
            </Popover>

        </div>
    )
}

type NotificationDisplayProps = {
    notifications: Notification[],
    setPopOver: Dispatch<SetStateAction<boolean>>
}

const NotificationDisplay = ({
    notifications,
    setPopOver
} : NotificationDisplayProps) => {

    
    if(notifications.length === 0) return <EmptyNotification />

    return (
        <div className="flex flex-col rounded-lg">
            <h2 className="font-bold text-xl">Notifications</h2>
            <div className="w-full flex justify-end pr-1 mb-2">
                <Link 
                onClick={() => setPopOver(false)}
                className="text-blue-600"
                to={'/notifications'}>
                    All notifications
                </Link>
            </div>
            <div>
                {notifications.map((notification) => {
                    
                    return (
                        <Link 
                        className="flex gap-2 mb-3 item"
                        key={notification.id} 
                        to={`${notification.link}`}>
                            <AvatarProfile 
                            className="mt-2"
                            authorName={notification.notificationFrom.name}  
                            authorProfile={notification.notificationFrom.profile || ''}
                            />
                           <div className="flex gap-2 justify-between w-full"
                           aria-label="body">

                            <div className="information">
                                <p className=" py-1">
                                    {notification.body}
                                </p>

                                <h2 className="text-muted-foreground">{formatTime(notification.createdAt.toString())}</h2>
                            </div>

                            <div aria-label="status"
                            className="flex flex-col justify-center">
                                <div 
                                className="h-3 w-3 bg-blue-500 text-blue-500 rounded-full"
                                aria-label="status" />
                            </div>

                           </div>
                        </Link>
                    )

                })}
            </div>
        </div>
    )
}

const EmptyNotification = () => {
    return (
        <div className="h-[50px] flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold">Empty notification</h2>
        </div>
    )
}

export default NotificationButton