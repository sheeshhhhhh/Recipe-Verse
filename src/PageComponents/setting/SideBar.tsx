import { FileCode2Icon, LockIcon, SettingsIcon, UserIcon } from 'lucide-react'

const SideBar = () => {
  return (
    <aside className='w-64 flex-col border-r bg-card p-6 md:flex sticky top-10'>
      <div className='mb-6 flex items-center gap-2 sticky top-10'>
        <SettingsIcon className='h-6 w-6' />
        <h2 className='text-xl font-bold'>Settings</h2>
      </div>
      <nav className='space-y-1 sticky top-[89px]'>
        <a
        href={'#profile'}
        className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted'
        >
          <UserIcon />
          Profile
        </a>
        <a
        href={'#security'}
        className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted'
        >
          <LockIcon />
          Security
        </a>
        <a
        href={'#2fa'}
        className='flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted'
        >
          <FileCode2Icon />
          2FA
        </a>
      </nav>
    </aside>
  )
}

export default SideBar