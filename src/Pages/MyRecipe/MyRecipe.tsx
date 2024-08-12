
import Dashboard from "@/PageComponents/myRecipe/DashBoard.tsx/Dashboard"
import CreateRecipe from "@/PageComponents/myRecipe/MyRecipeCreate/CreateRecipe"
import MyRecipeDraft from "@/PageComponents/myRecipe/MyRecipeDraft/MyRecipeDraft"
import MyRecipeEdit from "@/PageComponents/myRecipe/MyRecipeEdit/MyRecipeEdit"
import SideBar from "@/PageComponents/myRecipe/SideBar"

import { Route, Routes } from "react-router-dom"

const MyRecipe = () => {
    
    return (
        <div className="min-h-screen flex gap-3 pt-9">
            <div className="flex w-full max-w-[500px] justify-end sticky">
                <SideBar />
            </div>
            <div className="flex flex-row-reverse justify-end w-full">
                <div className="p-5 w-[1100px] h-auto">
                    {/* Sub Routes */}
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />}     />
                        <Route path="edit/:postId"  element={<MyRecipeEdit />}  />
                        <Route path="create"    element={<CreateRecipe />}  />
                        <Route path="draft"     element={<MyRecipeDraft />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default MyRecipe