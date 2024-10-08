import { NoNavBarPages } from '@/App'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authContext'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeSwitch from '../ThemeSwitch'
import NotificationButton from './Notification'
import ProfileNav from './ProfileNav'

const NavBar = () => {
    const location = useLocation()
    const hideNavBar = NoNavBarPages.includes(location.pathname)

    const { user: authenticated } = useAuthContext()

    return (
        <nav className="top-0 z-50 bg-clip-padding  shadow-sm dark:#171717">
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex justify-between h-14 items-center'>

                    <Link 
                    className='text-3xl font-bold dark:text-white '
                    to={'/'}>
                        Recipe Verse
                    </Link>

                    {/* hide some parts of nav bar */}
                    {!hideNavBar && <nav className='hidden md:flex gap-8'>
                        <NavLink
                        className={({ isActive}) =>
                            `${isActive ? "underline-offset-8 underline" : ""} navlink `
                        }
                        to={'/Explore'}
                        >
                            Explore 
                        </NavLink>

                        <NavLink
                        className={({ isActive}) =>
                            `${isActive ? "underline-offset-8 underline" : ""} navlink `
                        }
                        to={'/Vission'}
                        >
                            Vission
                        </NavLink>

                        <NavLink
                        className={({ isActive}) =>
                            `${isActive ? "underline-offset-8 underline" : ""} navlink `
                        }
                        to={'/Examples'}
                        >
                           Examples
                        </NavLink>

                        <NavLink
                        className={({ isActive}) =>
                            `${isActive ? "underline-offset-8 underline" : ""} navlink `
                        }
                        to={'/About'}
                        >
                            About
                        </NavLink>
                    </nav>}

                    {/* show only when not authenticated authenticated */}
                    <div className='flex items-center gap-6'>
                        {/* make a dynamic where if not logged in then render this but if login in then render log out or select menu something */}
                        {
                            !authenticated ? 
                            <div>
                                <Link to={`/login?next=${location.pathname}`}>
                                    <Button 
                                    variant={'outline'} 
                                    className='text-base'>  
                                            Login
                                    </Button>
                                </Link>

                                <Link to={'/signUp'}>
                                    <Button className='text-base'>
                                        sign Up
                                    </Button>
                                </Link>
                            </div> :

                            <div className='flex items-center '>
                                {/* fix later and also make hook for this */}
                                <NotificationButton />
                                <ProfileNav />
                            </div>
                        }

                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar