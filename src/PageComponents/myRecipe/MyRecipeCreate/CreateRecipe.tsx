import { FormEvent } from "react"
import MyRecipeForm, { recipeInfoType } from "../MyRecipeForm/MyRecipeCreate"
import useCreateRecipe from "./CreateRecipe.hook"



const CreateRecipe = () => {
    const { loading, create } = useCreateRecipe()

    const callbackFunction = async (e: FormEvent<HTMLFormElement>, recipeData: recipeInfoType) => {
        e.preventDefault()
        
        await create(recipeData)
    }
    // put loading later
    return (
        <MyRecipeForm callbackFunction={callbackFunction} />
    )
}

export default CreateRecipe