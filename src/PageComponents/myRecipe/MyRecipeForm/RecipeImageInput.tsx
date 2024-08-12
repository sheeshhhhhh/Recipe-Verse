import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { recipeInfoType } from "./MyRecipeCreate"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

type RecipeImageInputProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const RecipeImageInput = ({
    recipeInfo,
    setRecipeInfo
} : RecipeImageInputProps) => {

    const setChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => file)
            setRecipeInfo(prev => ({
                ...prev,
                image: filesArray
            }))
        }
    }

    return (
        <div>
            <Label htmlFor="image">Recipe Image</Label>
            <Input 
            onChange={setChangeImage}
            multiple={true}
            accept="image/*" // restrict to image files
            id="image" 
            type="file" />
        </div>
    )
}

export default RecipeImageInput