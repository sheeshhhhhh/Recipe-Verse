import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useChange from "@/lib/useChange"
import { Dispatch, SetStateAction } from "react"
import { recipeInfoType } from "./MyRecipeCreate"

type DescriptionProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const Description = ({
    recipeInfo,
    setRecipeInfo
} : DescriptionProps) => {

    const { handleChangeTextArea } = useChange<recipeInfoType>()

    return (
        <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
            name="description"
            value={recipeInfo.description}
            onChange={(e) => handleChangeTextArea(e, setRecipeInfo)}
            id="description" 
            rows={3} 
            placeholder="Enter recipe description" />
        </div>
    )
}

export default Description