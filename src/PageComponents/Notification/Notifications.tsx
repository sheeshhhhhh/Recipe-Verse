import formatTime from "@/lib/formatTime"
import AvatarProfile from "../AvatarProfile"
import LoadingSpinner from "../LoadingSpinner"
import { Notification as NotificationType } from "./types"



type NotificationsProps = {
    data?: NotificationType[],
    loading: boolean
}

const Notifications = ({
    data,
    loading
} : NotificationsProps) => {

    if(loading) return <LoadingSpinner />
    if(data?.length === 0) return (
        <div className="w-full h-[700px] flex flex-col pt-20 items-center">
            <InfoIcon size={80} className="mb-10" />
            <h2 className="font-bold text-3xl">Empty Notification</h2>
        </div>
    ) // make a design later

    return (
        <div className="space-y-3">
            {data?.map((notifs: NotificationType) => {
                return <Notification data={notifs} />
            })}
        </div>
    )
}

import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { InfoIcon } from "lucide-react"

type NotificationProps = {
    data: NotificationType
}

const Notification = ({
    data
} : NotificationProps) => {

    return (
        <Card className="flex last:after:placeholder:gap-4">
            <Link 
            to={`/profile/${data.notificationFrom.id}`}
            className="py-4 pl-4">
                <AvatarProfile 
                className="h-14 w-14 mr-3"
                authorName={data.notificationFrom.name} 
                authorProfile={data.notificationFrom.profile || ''} />
            </Link>
            <Link 
            to={data.link || ''}
            className="flex justify-between w-full pr-4 py-4"
            aria-label="body">
                <div
                className="fit" 
                aria-label="content" >
                    <h2 
                    className="text-lg">
                        {data.body}
                    </h2>
                    <p>{formatTime(data.createdAt)}</p>
                </div>
                <div 
                aria-label='status' 
                className="flex flex-col justify-center mr-5" >
                    <div className="h-3 w-3 bg-blue-500 text-blue-500 rounded-full" />
                </div>
            </Link>
        </Card>
    )

}

export default Notifications