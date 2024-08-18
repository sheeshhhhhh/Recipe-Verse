import { fetchNotification } from "./fetchNotification.hook"
import Notifications from "./Notifications"

const CommentsNotification = () => {
    
    const { data, isLoading } = fetchNotification('Comments')

    return (
        <Notifications data={data} loading={isLoading} />
    ) 
}

export default CommentsNotification