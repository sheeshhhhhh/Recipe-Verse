import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useChange from '@/lib/useChange'
import { Dispatch, SetStateAction } from 'react'
import { recipeInfoType } from './MyRecipeCreate'

type InstructionProps = {
    recipeInfo: recipeInfoType,
    setRecipeInfo: Dispatch<SetStateAction<recipeInfoType>>
}

const Instruction = ({
    recipeInfo,
    setRecipeInfo
} : InstructionProps) => {
    const { handleChangeTextArea } = useChange<recipeInfoType>()
    
    return (
        <div className="grid gap-2">
            <Label htmlFor="instruction">Instruction</Label>
            <Textarea 
            name="instruction"
            value={recipeInfo.instruction}
            onChange={(e) => handleChangeTextArea(e, setRecipeInfo)}
            id="instruction" 
            rows={3} 
            placeholder="Enter recipe description" />
        </div>
    )
}

export default Instruction