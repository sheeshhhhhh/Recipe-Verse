import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useChange from "@/lib/useChange"
import { Dispatch, SetStateAction } from "react"
import { recipeInfoType } from "./MyRecipeCreate"

type CuisineandMealPreferencesProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const CuisineandMealPreferences = ({
    recipeInfo,
    setRecipeInfo 
} : CuisineandMealPreferencesProps) => {

    const { handleChangeString } = useChange<recipeInfoType>()

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="cuisine">Cuisine</Label>
                <Select 
                value={recipeInfo.cuisine} 
                onValueChange={value => handleChangeString('cuisine', value, setRecipeInfo)} 
                aria-label="cuisine">
                    <SelectTrigger>
                        <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="mealPreference">Meal Preference</Label>
                    <Select 
                    value={recipeInfo.mealPreference} 
                    onValueChange={value => handleChangeString('mealPreference', value, setRecipeInfo)} 
                    aria-label="mealPreference">
                    <SelectTrigger>
                        <SelectValue placeholder="Select meal preference" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                        <SelectItem value="omnivore">Omnivore</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default CuisineandMealPreferences