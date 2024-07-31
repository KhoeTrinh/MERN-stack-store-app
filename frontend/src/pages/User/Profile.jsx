import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
    const [ username, setUsername ] = useState('') 
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
  return (
    <div>Profile</div>
  )
}

export default Profile