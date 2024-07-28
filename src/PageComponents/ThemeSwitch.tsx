import { useTheme } from "@/components/ThemeProvider"
import { Switch } from "@/components/ui/switch"


const ThemeSwitch = () => {

    const { setTheme, theme } = useTheme()
    
    const handleCheckChange = (e: boolean) => {
        if(e === true) {
            setTheme('dark')
        } else if(e === false) {
            setTheme('light')
        }
    }
    
    return (
        <div>
            <Switch 
            checked={theme === 'dark'}
            onCheckedChange={handleCheckChange} 
            />
        </div>
    )
}

export default ThemeSwitch