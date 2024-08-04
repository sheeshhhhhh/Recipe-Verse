import { FormEvent, MouseEvent } from "react"
import MyRecipeForm, { recipeInfoType } from "../MyRecipeForm/MyRecipeCreate"
import useCreateRecipe from "./CreateRecipe.hook"



const CreateRecipe = () => {
    const { create, saveDraft } = useCreateRecipe()

    const callbackFunction = async (e: FormEvent<HTMLFormElement>, recipeData: recipeInfoType) => {
        e.preventDefault()
        
        await create(recipeData)
    }

    const savedraft = async (e: MouseEvent<HTMLButtonElement>, recipeData: recipeInfoType) => {
        e.preventDefault()
        console.log(recipeData)
        await saveDraft(recipeData)
    }
    // put loading later
    return (
        <MyRecipeForm saveDraft={savedraft} callbackFunction={callbackFunction} />
    )
}

export default CreateRecipe