import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectItem, SelectContent, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import useChange from "@/lib/useChange"
import { FilterType } from "@/Pages/Explore/Explore"
import { Dispatch, SetStateAction } from "react"

type FilterProps = {
    filter: FilterType,
    setFilter: Dispatch<SetStateAction<FilterType>>
}

const Filter = ({
    filter,
    setFilter
} : FilterProps) => {

    const cuisine = ['Italian', 'Chinese', 'Mexican', 'Filipino', 'Japanese', 'American', 'Korean', 'Arabic']
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks']

    const { handleChangeString, handleChangeNumber, handleChangeObject } = useChange<FilterType>()

    return (
        <div className="h-[644px] sticky top-8">
            <h2 className="font-bold text-3xl ml-3 mb-2">Filter</h2>
            <ScrollArea className="h-[600px] w-[280px]">
                <div className="flex flex-col gap-4 pl-2">
                    <div>
                        <h2 className="font-semibold mb-2">Meal type</h2>
                        <RadioGroup 
                        value={filter.mealType} 
                        onValueChange={value => handleChangeString('mealType', value, setFilter)}  
                        className="ml-2">
                            {mealTypes.map((mealType) => (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={mealType.toLowerCase()} />
                                    <Label>{mealType}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="w-[230px] flex gap-4 items-center">
                        <h2 className="font-semibold">Cuisine</h2>
                        <Select 
                        value={filter.cuisine}
                        onValueChange={value => handleChangeString('cuisine', value, setFilter)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Cuisine" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cuisine</SelectLabel>
                                    {cuisine.map((item) => 
                                        <SelectItem value={item.toLowerCase()}>{item}</SelectItem>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[230px] flex flex-col">
                        <h2 className="font-semibold text-sm mb-2">Meal Preferences</h2>
                        <Select 
                        value={filter.mealPreference}
                        onValueChange={value => handleChangeString('mealPreference', value, setFilter)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Meal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Meal Preferences</SelectLabel>
                                    <SelectItem value="comfort">Comfort food</SelectItem>
                                    <SelectItem value="healthy">Healthy food</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="h-[60px]">
                        <div className="flex items-center mb-2 h-[40px]">
                            <h2 className="font-semibold mr-9">Cost</h2>
                              <div className="flex items-center relative">
                                <h2 className="font-bold top-2 absolute">$</h2>
                                <Input 
                                name="cost"
                                onChange={e => handleChangeObject(e, setFilter)}
                                className="font-medium w-20 ring-0 border-none" 
                                value={filter.cost} />
                              </div>
                        </div>
                        <Slider 
                        value={[filter.cost || 0]}
                        onValueChange={(value) => handleChangeNumber('cost', value[0], setFilter)} 
                        className="w-[240px]" 
                        max={1000} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default Filter