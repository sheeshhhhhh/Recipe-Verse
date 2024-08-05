import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"
import { memo, useEffect, useState } from "react"

type postStatType = {
  monthPost: number,
  previousMonth: number,
  views: number,
  likes: number,
  increase: number
}

const DashboardHeader = () => {
  const [postStat, setPostStat] = useState<postStatType>()

  useEffect(() => {
    const getStats = async () => {
      try {
          const res:Response = await fetch('http://localhost:4000/api/dashboard/getPostStats', {
            credentials: 'include'
          })

          const data = await res.json()

          if(data.error) throw new Error(data.error)
          //data.previousMonth
          const increase = data.previousMonth > 0 
          ? ((data.monthPost - data.previousMonth) / data.previousMonth) * 100 
          : 100 // If there was no data for the previous month, assume a 100% increase
          
          setPostStat({
            ...data,
            increase: increase
          })
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  }, [])

    
  return (
    <header className="flex justify-around px-6">
        <Card className="h-[160px] w-[300px] shadow-md">
        {
          postStat ?
          <div>
            <CardHeader className="py-3">
              <CardDescription className="text-[100%]">Post this Month </CardDescription>
              <CardTitle className="text-5xl font-bold">{postStat.monthPost} Posts</CardTitle>
              <CardDescription>
                {postStat?.increase}% from last month
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Progress value={postStat.increase} className="h-2" />
            </CardFooter>
          </div>
            : 
          <LoadingSpinner className="h-8 w-8 mt-16" />
        }
        </Card> 
        <Card className="h-[160px] w-[300px] shadow-md">
          {
            postStat ?
            <CardHeader>
              <CardDescription className="text-[100%]">Total Views</CardDescription>
              <CardTitle className="text-5xl font-bold">{postStat.views}</CardTitle>
            </CardHeader>
              :
            <LoadingSpinner className="h-8 w-8 mt-16" />
          }
        </Card>
        <Card className="h-[160px] w-[300px] shadow-md">
          {
            postStat ?
            <CardHeader>
              <CardDescription className="text-[100%]">Total Post Likes</CardDescription>
              <CardTitle className="text-5xl font-bold">{postStat.likes}</CardTitle>
            </CardHeader>
              :
            <LoadingSpinner className="h-8 w-8 mt-16" />
          }
        </Card>
    </header>
  )
}

export default memo(DashboardHeader)