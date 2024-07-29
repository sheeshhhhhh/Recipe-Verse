import { useEffect, useState } from "react"


const useDebounce = <T extends unknown>(value: T, delay: number): T | undefined => {
    const [debounceValue, setDebounceValue] = useState<T>()
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue
}

export default useDebounce