/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pjEmvkh93Ff
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { FormEvent, MouseEvent, useEffect, useState } from "react"

import { Recipe } from "@/Pages/Explore/Explore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useChange from "@/lib/useChange"
import { ImagesIcon } from "lucide-react"


import CuisineandMealPreferences from "./CuisineandMealPreferences"
import Description from "./Description"
import IngredientInput from "./IngredientInput"
import Instruction from "./Instruction"
import TagsandMealType from "./TagsandMealType"
import TimeandServing from "./TimeandServing"
import LoadingSpinner from "@/PageComponents/LoadingSpinner"
import RecipeImageInput from "./RecipeImageInput"
import ImageCarousel from "@/PageComponents/ImageCarousel"


export interface recipeInfoType extends Partial<Recipe>  {}

// shoudl make this component viable for both create and edit
export type MyRecipeProps = {
    recipeData?: recipeInfoType,
    loading?: boolean
    callbackFunction: (e: FormEvent<HTMLFormElement>, recipeData: recipeInfoType) => any,// add loading
    saveDraft?: (e: MouseEvent<HTMLButtonElement>, recipeData: recipeInfoType, postId?: string) => Promise<any>
}

export default function MyRecipeForm({
    recipeData,
    callbackFunction,
    loading,
    saveDraft
} : MyRecipeProps) {
    const [recipeInfo, setRecipeInfo] = useState<recipeInfoType>(recipeData || 
        {
            title: '',
            image: [],
            description: '',
            ingredients: [],
            cookingTime: '',
            servings: 0,
            callToAction: '',
            cost: 0,
            cuisine: '',
            mealType: '',
            mealPreference: '',
            instruction: '',
            rating: 0 // this is nothing
    })
    const { handleChangeObject } = useChange<recipeInfoType>()

    // make a hook that will handle the submit and loading where when loadingthe input will be loading state
    // and also unclickable
    
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto ">
            <form
            onSubmit={e => callbackFunction(e, recipeInfo)}
            className="grid gap-6 relative">
                {loading && (
                    <div className="w-full h-full rounded-lg z-40 bg-black opacity-45 absolute flex flex-col items-center ">
                        <LoadingSpinner className="h-12 w-12 mt-32 text-white" />
                        <h2 className="font-bold text-2xl text-white">Saving...</h2>
                    </div>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="title">Recipe Title</Label>
                    <Input name="title" value={recipeInfo.title} 
                    onChange={(e) => handleChangeObject(e, setRecipeInfo)} 
                    id="title" 
                    placeholder="Enter recipe title" />
                </div>
                <div className="grid gap-2">
                    {/* mkae a handle Change file in the recipeInfoTypes later */}
                    <RecipeImageInput recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                </div>
                    <Description recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                    <Instruction recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                    <IngredientInput recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                    <TimeandServing recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                    <TagsandMealType recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} />
                    <CuisineandMealPreferences recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} /> 
                <div className="flex gap-3 justify-end">
                    {saveDraft && <Button onClick={(e) => saveDraft(e, recipeInfo)} type="button" variant={'secondary'}>Save Draft</Button>}
                    <Button type="submit">Save Recipe</Button>
                </div>
            </form>
            <Preview recipeInfo={recipeInfo} />
        </div>
    )
}

type PreviewProps = {
    recipeInfo: recipeInfoType
}

function Preview({ recipeInfo } : PreviewProps) {   


    return (
        <div className="bg-muted p-6 rounded-lg h-fit">
            <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{recipeInfo.title ? recipeInfo.title : "No Title"}</h2>
                <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <DisplayImage images={recipeInfo.image} />
                <div className="grid gap-2 ">
                    <div className="text-muted-foreground">
                        <span className="font-medium">Cooking Time:</span> {recipeInfo.cookingTime}
                    </div>
                    <div className="text-muted-foreground">
                        <span className="font-medium">Servings:</span> {recipeInfo.servings}
                    </div>
                    <div className="text-muted-foreground">
                        <span className="font-medium">Cuisine:</span> {recipeInfo.cuisine}
                    </div>
                    <div className="text-muted-foreground">
                        <span className="font-medium">Meal Preference:</span> {recipeInfo.mealPreference}
                    </div>
                    <div className="text-muted-foreground">
                        <span className="font-medium">Meal Type:</span> {recipeInfo.mealType}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold">Description</h3>
                <div>
                    {recipeInfo.description}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold">Ingredients</h3>
                <ul className="list-disc pl-6 space-y-2">
                    {recipeInfo?.ingredients?.map((Ingredient, idx) => <li key={idx}>{Ingredient}</li>)}
                </ul>
            </div>
            <div className="w-[465px]">
                <h3 className="text-xl font-bold">Instructions</h3>
                <div className="prose">
                    {recipeInfo.instruction}
                </div>
            </div>
            </div>
        </div>
    )
}

type DisplayImageProps = {
    images: string[] | File[] | undefined
}

function DisplayImage({ images }: DisplayImageProps) {
    const [imageURL, setImageURL] = useState<string[]>([])
    
    useEffect(() => {
        setImageURL([])
        images?.forEach((image) => {
            if(image instanceof File) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    setImageURL(prev => [...prev, e.target.result])
                }
                reader.readAsDataURL(image)
            } else {
                setImageURL(prev => [...prev, image])
            }   
        })
    }, [images])

    if(!imageURL.length) return (
        <div className="w-[300px]">
            <ImagesIcon width={300} size={150} />
            <h2 className="text-lg font-semibold text-muted-foreground text-center">No Images</h2>
        </div>
    )

    return (
        <div className="w-[300px]">
            <ImageCarousel size={300} images={imageURL} />
            {/* delete certain images for edit later */}
        </div>
    )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


// function XIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }