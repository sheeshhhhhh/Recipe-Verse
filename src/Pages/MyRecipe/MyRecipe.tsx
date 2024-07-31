
import CreateRecipe from "@/PageComponents/myRecipe/MyRecipeCreate/CreateRecipe"
import MyRecipeEdit from "@/PageComponents/myRecipe/MyRecipeEdit/MyRecipeEdit"
import SideBar from "@/PageComponents/myRecipe/SideBar"
import { Route, Routes } from "react-router-dom"

const MyRecipe = () => {
    
    return (
        <div className="h-screen flex gap-3 pt-9">
            <div className="flex min-w-[500px] justify-end sticky">
                <SideBar />
            </div>
            <div className="flex flex-row-reverse justify-end w-full">
                <div className="p-5 w-[1100px]">
                    {/* Sub Routes */}
                    <Routes>
                        <Route path="dashboard" element={<h2>Dashboard</h2>} />
                        <Route path="edit" element={<MyRecipeEdit />} />
                        <Route path="create" element={<CreateRecipe />} />
                        <Route path="draft" element={<h2>Draft</h2>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default MyRecipe