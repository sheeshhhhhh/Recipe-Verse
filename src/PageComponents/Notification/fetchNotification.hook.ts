import { useQuery } from "@tanstack/react-query"
import { Notification } from "./types"

type type = 'All' | 'Comments' | 'Posts'

export const fetchNotification = (type: type) => {
    const { data, isLoading } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/api/user/Notification/${type}`, {
                credentials: 'include'
            })
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            return data as Notification[]
        }
    })
    // probably need a useState for pages for pagination automatic
    return { data, isLoading }
}