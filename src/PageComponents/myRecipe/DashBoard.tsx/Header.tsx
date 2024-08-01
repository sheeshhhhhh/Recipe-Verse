import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const DashboardHeader = () => {
  return (
    <header className="flex justify-around px-6">
        <Card className="h-[160px] w-[300px] shadow-md">
          <CardHeader className="py-3">
            <CardDescription className="text-[100%]">Post this Month </CardDescription>
            <CardTitle className="text-5xl font-bold">8 Posts</CardTitle>
            <CardDescription>
              +25% from last month
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Progress value={25} className="h-2" />
          </CardFooter>
        </Card>
        <Card className="h-[160px] w-[300px] shadow-md">
          <CardHeader>
            <CardDescription className="text-[100%]">Total Views</CardDescription>
            <CardTitle className="text-5xl font-bold">1300</CardTitle>
          </CardHeader>
        </Card>
        <Card className="h-[160px] w-[300px] shadow-md">
          <CardHeader>
            <CardDescription className="text-[100%]">Total Post Reaction</CardDescription>
            <CardTitle className="text-5xl font-bold">1300</CardTitle>
          </CardHeader>
        </Card>
    </header>
  )
}

export default DashboardHeader