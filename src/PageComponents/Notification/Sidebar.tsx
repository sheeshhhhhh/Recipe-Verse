import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const subRoutes: string[] = ['All', 'Comments', 'Posts'];
    const location = useLocation() 
    const lastUrl = location.pathname.split('/')
    
    return (
        <div className='pt-4 '>
            <div>
                {subRoutes.map((value) => (
                    <Link
                    className={`p-2 flex justify-start rounded-lg ${(lastUrl[2] || 'All') === value ? 'bg-muted font-medium' : 'hover:bg-muted hover:bg-opacity-40'}`}
                    to={`${value === 'All' ? '/notifications' : `/notifications/${value}`}`} // made to make sure all is just notification with no additional params
                    >
                        {value}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar