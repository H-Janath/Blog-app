import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {singInSuccess} from '../redux/User/UserSlice';
import {useNavigate} from 'react-router-dom'
export default function OAuth() {
    const auth = getAuth(app)
    const dispathch = useDispatch();
    const navigate = useNavigate();

    const handlGoogleClick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try{
            const resultFromGoogle = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    GooglePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json();
           
            if(res.ok){
                dispathch(singInSuccess(data))
                navigate('/')
            }
        }catch(error){
            console.log(error)
        }
 
    }
  return (

    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handlGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue With Google
    </Button>
  )
}
