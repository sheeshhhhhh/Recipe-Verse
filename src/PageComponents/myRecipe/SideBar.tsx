import { Link, NavLink } from "react-router-dom"


const SideBar = () => {
  return (
    <div className="p-3">

        <div>

            <Link to={'/myrecipe/dashboard'}>
              <h2 className="font-bold text-3xl mb-5">My Recipes</h2>
            </Link>

        </div>
        <div className="flex flex-col gap-2 pl-3">
          
          <div>
            <NavLink
            to={'/myrecipe/edit'}
            className={({ isActive }) => (
              `${isActive ? "underline-offset-8 underline" : ""} navlink`
            )}
            >
              Edit
            </NavLink>
          </div>

          <div>
            <NavLink
            to={'/myrecipe/draft'}
            className={({ isActive }) => (
              `${isActive ? "underline-offset-8 underline" : ""} navlink`
            )}
            >
              Draft
            </NavLink>
          </div>

          <div>
            <NavLink
            to={'/myrecipe/create'}
            className={({ isActive}) => (
              `${isActive ? "underline-offset-8 underline" : ""} navlink`
            )}
            >
              Create
            </NavLink>
          </div>

        </div>
        
    </div>
  )
}

export default SideBar