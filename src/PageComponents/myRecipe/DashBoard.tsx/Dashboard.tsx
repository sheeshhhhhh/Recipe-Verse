
import DashboardHeader from "./Header"
import PostTable from "./PostTable"

export type PostDataType = {
  title: string,
  status: string,
  views: number,
  likes: number,
  favorites: number,
  comments: number,
  createdAt: Date
}

//this is just an example data
const exampleData: PostDataType[] = [
  {
    title: "Spaghetti Bolognese",
    status: "Published",
    views: 1500,
    likes: 300,
    favorites: 120,
    comments: 50,
    createdAt: new Date("2023-07-15T12:00:00Z")
  },
  {
    title: "Chicken Curry",
    status: "Draft",
    views: 800,
    likes: 200,
    favorites: 80,
    comments: 30,
    createdAt: new Date("2023-07-18T15:30:00Z")
  },
  {
    title: "Vegetable Stir Fry",
    status: "Published",
    views: 1200,
    likes: 250,
    favorites: 100,
    comments: 45,
    createdAt: new Date("2023-07-10T08:00:00Z")
  },
  {
    title: "Beef Tacos",
    status: "Published",
    views: 1100,
    likes: 220,
    favorites: 90,
    comments: 40,
    createdAt: new Date("2023-07-12T11:00:00Z")
  },
  {
    title: "Vegan Salad",
    status: "Draft",
    views: 700,
    likes: 150,
    favorites: 70,
    comments: 25,
    createdAt: new Date("2023-07-19T13:45:00Z")
  },
  {
    title: "Pancakes",
    status: "Published",
    views: 2000,
    likes: 400,
    favorites: 150,
    comments: 60,
    createdAt: new Date("2023-07-08T09:15:00Z")
  },
  {
    title: "Grilled Salmon",
    status: "Draft",
    views: 900,
    likes: 180,
    favorites: 85,
    comments: 35,
    createdAt: new Date("2023-07-16T17:30:00Z")
  }
]


const Dashboard = () => {
  return (
    <div>
      <h1 className="ml-12 mb-5 font-bold text-5xl">DashBoard</h1>
      <div className="flex flex-col gap-[2rem]">
        <DashboardHeader />
        <PostTable posts={exampleData} />
      </div>
    </div>
  )
}

export default Dashboard