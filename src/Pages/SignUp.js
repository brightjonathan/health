import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineMail, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'; 
//import {FcGoogle} from 'react-icons/fc';
import {auth, provider } from '../Firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


//initail state for the input 
const initialState = {
    name:'',
    email: '',
    password: '',
    password2: ''
  };

const SignUp = ({setisAuth}) => {

  
      //an object for loging in the admin panel
      const Admin_name = process.env.REACT_APP_Admin_name;
      const Admin_Email = process.env.REACT_APP_Admin_Email;
      const Admin_Password = process.env.REACT_APP_Admin_Password;

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState(initialState);
    const { name, email, password, password2 } = formValue;

    //targeting the input form
  const onInputChange = (e)=>{
    setFormValue({...formValue, [e.target.name]: e.target.value})
   }

   //state for password visiblity
   const [passwordEye, setPasswordEye] = useState(false);
   const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

   
    //func... for password one
    const handlePasswordEye = () => {
        setPasswordEye(!passwordEye)
    }
    
      //func... for password two
      const handleConfirmPasswordEye = () => {
        setConfirmPasswordEye(!confirmPasswordEye)
      }


      
    //submit functionality
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '' || password2 === ''){
          return toast.error(' please fill all the input field');
        };
  
        if( name !== Admin_name || email !== Admin_Email || password !== Admin_Password){
          return toast.error('invalid admin credentail')
        } else if (password !== password2){
          return toast.error('password do not match') 
        } else if (password.length <= 6){
           return toast.error('password is not strong')
        } else{
          try {
           if (name && email && password ){
            const {user} = await createUserWithEmailAndPassword(
              auth, email, password
            );
            await updateProfile(user, {displayName: `${name}`})
            toast.success('signup successfully');
            localStorage.setItem('AdminIsAuthorised', true);
            setisAuth(true);
            navigate('/')
           }          
          } catch (error) {
            toast.error('user already exit')
            console.error(error)
          }
        }
        
      }

        //Google signUp func..
  const signinwithgoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
      localStorage.setItem('AdminIsAuthorised', true); //storing in localstorage
      toast.success('signup successfully');
      setisAuth(true);
      navigate('/')
    })
 };

  return (
    <div className='mt-4 bg_image'>
    <div className='max-w-[800px] m-auto px-4 py-16'>
      <div className='dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
        <h1 className='text-2xl font-bold text-gray-800'> Create Account </h1> 
        <form onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 md:gap-8'>
            <div className='md:my-4'>
              <label> Name </label>
              <div className='my-2 w-full relative'>
                <input 
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
                  type="text" 
                  placeholder='Enter your Name' 
                  name='name'
                  value={name}
                  onChange={onInputChange}
                />
              </div>
            </div>

            
            <div className='md:my-4'>
              <label>Email Address</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="email" 
                  placeholder='Enter Email Address' 
                  name='email'
                  value={email}
                  onChange={onInputChange}
                />
                <AiOutlineMail className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div>            
          </div>
          
          <div className='grid md:grid-cols-2 gap-2 md:gap-8'>
            <div className='md:my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(passwordEye === false) ? 'password' : 'text'} 
                  placeholder='Enter Password'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                />
                <div className='absolute right-2 top-3'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
              </div>
            </div>


            <div className='md:my-4'>
              <label>Confirm Password</label>
              <div className='my-2 w-full relative'>
                <input 
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(confirmPasswordEye === false) ? 'password' : 'text'} 
                  placeholder='Confirm Password'  
                  name='password2'
                  value={password2}
                  onChange={onInputChange}
                />
                <div className='absolute right-2 top-3'>
                  {(confirmPasswordEye === false) ? <AiFillEyeInvisible onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
                </div> 
              </div>
            </div>

          </div>

          <p className='text-center text-sm py-1'>By signing up you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
                                                               
          
          <button type='submit' className='w-full my-4 md:my-2 p-3 bg-[#02020F] text-white rounded-lg font-semibold'> Create Account </button>
        </form>

        <hr className="my-6 border-gray-300 w-full"/>
          
            { /* <button onClick={signinwithgoogle} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
              <div className="flex items-center justify-center">
              <FcGoogle className='w-7 h-7'/>
                  <span className="ml-4"> Sign in with Google </span>
              </div>
            </button> */ }

    
        <div>Already have an account? <Link className='text-[#986c55] underline' to='/login'>Login</Link></div>
      </div>
    </div>
  </div>
  )
}

export default SignUp
