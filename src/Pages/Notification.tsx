import AllNotification from "@/PageComponents/Notification/AllNotification"
import CommentsNotification from "@/PageComponents/Notification/CommentsNotification"
import PostsNotification from "@/PageComponents/Notification/PostsNotification"
import Sidebar from "@/PageComponents/Notification/Sidebar"
import { Link, Route, Routes } from "react-router-dom"


const Notification = () => {


    return (
        <div className="mx-auto p-4 max-w-[1024px]
        grid grid-cols-4 gap-4 
        ">
            <header 
            className="max-w-[992px] w-full h-[45px] flex justify-between col-span-4"
            aria-label="heeader">

                <h2 className="text-3xl font-bold">Notification</h2>

                <Link 
                className="font-bold"
                to={'/settings'}>
                    Settings
                </Link>

            </header>
            <aside 
            className="h-full w-full max-w-[240px]"
            aria-label="sidebard"
            >
                <Sidebar />
            </aside>
            <main
            className="col-span-3 w-full h-full"
            aria-label="contents"
            >
                <Routes>
                    <Route path="" element={ <AllNotification /> } />
                    <Route path="/Comments" element={ <CommentsNotification /> } />
                    <Route path="/Posts" element={ <PostsNotification /> } />
                </Routes>
            </main>
        </div>
    )
}

export default Notification