import Settings from '@/PageComponents/setting/Settings'
import SideBar from '@/PageComponents/setting/SideBar'

const Setting = () => {
  
  return (
    <div className='min-h-screen w-full bg-background text-foreground flex'>
        <SideBar />
        <Settings />
    </div>
  )
}

export default Setting