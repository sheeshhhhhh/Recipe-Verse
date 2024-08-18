import Notifications from "./Notifications"
import { fetchNotification } from "./fetchNotification.hook"



const AllNotification = () => {

    const { data, isLoading } = fetchNotification('All')
    
    return (
        <Notifications data={data} loading={isLoading} />
    ) 
}

export default AllNotification