import { fetchNotification } from "./fetchNotification.hook"
import Notifications from "./Notifications"

const PostsNotification = () => {
 
  const { data, isLoading } = fetchNotification('Posts')

  return (
    <Notifications data={data} loading={isLoading} />
  )
}

export default PostsNotification