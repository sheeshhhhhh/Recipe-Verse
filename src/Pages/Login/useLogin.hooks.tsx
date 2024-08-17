import { useState } from 'react'
import { LoginInfoType } from './Login'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'


const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const next: string = searchParams.get('next') || ''

  const login = async (loginInfo: LoginInfoType) => {
    if(!loginInfo.username || !loginInfo.password) return
    setLoading(true)
    try {
      const res: Response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo),
        credentials: 'include'
      })

      const data = await res.json()
      if(data.error) throw new Error(data.error)
      
      if(data.otpRequired === true) {
        // when the user use otp
        return window.location.assign(`http://localhost:3000/otp?next=${next}&id=${data.userId}&email=${data.email}`)
      }

      // if there was next redirect then if not then just redirect to default which is /explore
      if(next) {
        return window.location.assign(`http://localhost:3000${next}`)  
      } else {
        return window.location.assign('http://localhost:3000/explore')
      }

    } catch (error: any) {
        console.log('Error in the useLogin hook Error: ' + error)
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin