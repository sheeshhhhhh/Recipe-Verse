import DashboardHeader from "./Header"
import PostTable from "./PostTable"
import useDashboard from "./useDashboard.hook"

export type PostDataType = {
  recipe: {
    title: string
  },
  status: string,
  views: number,
  likes: number,
  favorites: number,
  _count: {
    comments: number,
  }
  createdAt: Date
}


const Dashboard = () => {
  
  // emplot apgination later
  const { post, getpostDashboard } = useDashboard()

  return (
    <div>
      <h1 className="ml-12 mb-5 font-bold text-5xl">DashBoard</h1>
      <div className="flex flex-col gap-[2rem]">
        <DashboardHeader />
        <PostTable posts={post} />
      </div>
    </div>
  )
}

export default Dashboard