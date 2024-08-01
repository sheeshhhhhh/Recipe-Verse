import { Input } from '@/components/ui/input'
import useDebounce from '@/lib/useDebounce'
import { Search } from "lucide-react"
import { useEffect, useState } from 'react'

type SearchDraftProps = {
    handleSearch:  (search: string) => Promise<{ error: any; } | undefined>
}

const SearchDraft = ({
    handleSearch
} : SearchDraftProps) => {
    const [search, setSearch] = useState<string>()
    const debounce = useDebounce(search, 350)

    useEffect(() => {
        console.log(debounce)
        // handleSearch(search)
    }, [debounce])

    return (
        <form className="relative mb-2 ml-auto flex-1 md:grow-0 items-center">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='search'
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </form>
    )
}

export default SearchDraft