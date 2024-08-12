import { useLocation, useNavigate } from 'react-router-dom'

export const useredirect = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const NavigateWithNext = (url: string, options?: any) => {
        navigate(`${url}?next=${location.pathname}`, {...options})
    }

    const redirect = (url: string) => {
        const navigate = useNavigate()
        navigate(url)
    }

    const refreshRedirect = (url: string, goback?: boolean) => {
        const location = useLocation()
        window.location.assign(`url${goback && `?next=${location.pathname}`}`)
    }
    
    return { NavigateWithNext, redirect, refreshRedirect }
}