import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Dispatch, SetStateAction, useState } from 'react'
import { recipeInfoType } from './MyRecipeCreate'

type IngredientInputProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const IngredientInput = ({
    recipeInfo,
    setRecipeInfo
} : IngredientInputProps) => {
    const [ingredientInput, setIngredientInput] = useState<string>('')
    const [removeIngredient, setRemoveIngredient] = useState<string>('')

    const addToIngredients = () => {
        if(!ingredientInput) return // don't add if no input yet

        const newingredientsArr = [...recipeInfo.ingredients]
        newingredientsArr.push(ingredientInput)

        setRecipeInfo((prev) => ({
            ...prev,
            ingredients: newingredientsArr
        }))

        setIngredientInput('')
    }

    const removeIngredients = () => {
        const newArr = [...recipeInfo.ingredients]
        const filteredArray = newArr.filter((item) => item !== removeIngredient)

        setRecipeInfo((prev) => ({
            ...prev,
            ingredients: filteredArray
        }))
        setIngredientInput('')
    }

    return (
        <div className="grid gap-2">
            <Label>Ingredients</Label>
            <div className="grid gap-2">
                <div className="flex items-center gap-2">
                    <Input 
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Ingredient" />
                    <Button onClick={addToIngredients}
                    disabled={!ingredientInput} variant="ghost" size="icon">
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    {/* ues select where you map every instruction to just pick what to delete */}
                    <Select value={removeIngredient} onValueChange={setRemoveIngredient}>
                        <SelectTrigger>
                            <SelectValue placeholder={'remove Ingredient'}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>remove</SelectLabel>
                                {recipeInfo.ingredients.map((ingredient, idx) => {
                                    return (
                                        <SelectItem key={idx} value={ingredient}>{ingredient}</SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button 
                    disabled={!removeIngredient}
                    onClick={removeIngredients}
                    variant="ghost" size="icon">
                        <MinusIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14" />
        </svg>
    )
}
  
  
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
        )
}
  

export default IngredientInput