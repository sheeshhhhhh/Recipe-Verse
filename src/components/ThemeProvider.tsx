import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode,
    defaultTheme?: Theme,
    storageKey?: string,    
}

type ThemeProviderState = {
    theme: Theme,
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
} : ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme // get the theme in storage but if did not exist then just get default
    )

    useEffect(() => {
        // when the theme changes it will also render so that it can process the changes
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if(theme === 'system') {
            // if it's system theme we get the theme to the system and set it if not then just set the theme
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

            root.classList.add(systemTheme)
            return
        } 

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        }
    }

    return(
        <ThemeContext.Provider {...props} value={value} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if(context === undefined) {
        throw new Error("useTheme must be within the Themeprovider Context")
    }

    return context
}