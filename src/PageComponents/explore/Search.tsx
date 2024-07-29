import { Input } from "@/components/ui/input"
import useChange from "@/lib/useChange"
import { FilterType } from "@/Pages/Explore/Explore"
import { Search } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export type ExploreSearchProps = {
    input?: string,
    setInput: Dispatch<SetStateAction<FilterType>>
}

const ExploreSearch = ({
    input,
    setInput
} : ExploreSearchProps) => {

  const { handleChangeObject } = useChange<FilterType>()

  return (
    <form className="relative ml-auto flex-1 md:grow-0 items-center">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
        name="search"
        value={input}
        onChange={(e) => handleChangeObject(e, setInput)}
        type='search'
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
    </form>
  )
}

export default ExploreSearch