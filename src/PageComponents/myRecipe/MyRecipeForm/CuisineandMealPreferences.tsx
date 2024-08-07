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
    const cuisine = ['Italian', 'Chinese', 'Mexican', 'Filipino', 'Japanese', 'American', 'Korean', 'Arabic']

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
                        {cuisine.map((item, idx) => 
                            <SelectItem key={idx} value={item.toLowerCase()}>{item}</SelectItem>)
                        }
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
                        <SelectItem value="comfort">comfort food</SelectItem>
                        <SelectItem value="healthy">healthy food</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default CuisineandMealPreferences