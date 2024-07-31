import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useChange from "@/lib/useChange"
import { Dispatch, SetStateAction } from "react"
import { recipeInfoType } from "./MyRecipeCreate"

type TimeandServingProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const TimeandServing = ({
    recipeInfo,
    setRecipeInfo
} : TimeandServingProps) => {

    const { handleChangeObject } = useChange<recipeInfoType>()
        
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="cookingTime">Cooking Time</Label>
                <Input
                name="cookingTime" 
                value={recipeInfo.cookingTime}
                onChange={(e) => handleChangeObject(e, setRecipeInfo)}
                id="cookingTime" 
                type="number" 
                placeholder="Minutes" 
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="servings">Servings</Label>
                <Input 
                name="servings" 
                value={recipeInfo.servings}
                onChange={(e) => handleChangeObject(e, setRecipeInfo)}
                id="servings" 
                type="number" 
                placeholder="Number of servings" 
                />
            </div>
        </div>
    )
}

export default TimeandServing