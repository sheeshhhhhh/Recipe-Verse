import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import useChange from "@/lib/useChange"
import { Dispatch, SetStateAction } from "react"
import { recipeInfoType } from "./MyRecipeCreate"

type TagsandMealTypeProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const TagsandMealType = ({
    recipeInfo,
    setRecipeInfo
} : TagsandMealTypeProps) => {

    const { handleChangeObject } = useChange<recipeInfoType>()
 
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                name="tags"
                value={recipeInfo.tags}
                onChange={(e) => handleChangeObject(e, setRecipeInfo)}
                id="tags" 
                placeholder="Enter tags separated by commas"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select aria-label="mealType">
                    <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default TagsandMealType