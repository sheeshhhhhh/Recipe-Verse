
import { useSearchParams } from 'react-router-dom'

const Error = () => {
  const [seachParams, setSearchParams] = useSearchParams()
  const message = seachParams.get('message') || ''

  return (
    <div className='min-h-screen w-full flex justify-center pt-40'>
      <div className='space-y-2'>
        <h2 className='font-bold text-6xl'>404 Error</h2>
        <p className='font-bold text-xl'>An error occured</p>
        {message && 
        <h3 className='text-3xl font-bold'>
          Error: {" "}
          <span className='text-red-600'>{message}</span>
        </h3>}
      </div>
    </div>
  )
}

export default Error