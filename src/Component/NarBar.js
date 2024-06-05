import { useState, useEffect } from "react"; 
import { auth } from "../Firebase-config";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { BsBlockquoteRight } from 'react-icons/bs';
import {signOut} from 'firebase/auth';


let Links =[
  {name:"Dashbaord", link:"/dashboard"},
  {name:"Birth", link:"/birth_registration"},
  {name:"antenetal", link:"/antenetal_registration"},
  {name:"search", link:"/search"},
  {name:"about", link:"/about"},
];


const NarBar = () => {

  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [isAuth, setisAuth] = useState(localStorage.getItem('AdminIsAuthorised'));

  //auth user with useEffect
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => { 
     if (authUser){
       setuser(authUser);
     }else{
       setuser(null)
     }
    })
 },[user]);

    

      //toggling 
      const [open,setOpen]=useState(false);
      const handleClose = ()=>{
        setOpen(!open)
      }

      //sign out functionality...
  const logOut = () =>{
    if (window.confirm('ARE YOU SURE YOU WANT TO LOG OUT FROM YOUR ACCOUNT ?')){
      signOut(auth).then(()=>{
      localStorage.clear();
      setuser(null);
      setisAuth(false);
      navigate('/login');
    })
    }
  };

  return (
    <div className='shadow-md w-full fixed z-10 top-0 left-0 font-mono'>
    <div className='md:flex items-center justify-between bg-white py-3 md:px-10 px-3'>
    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
      <span className='text-3xl mr-1 pt-2'></span>
      <Link to='/' className="text-[#880808] hover:text-[#772525]  text-2xl"> cHospital </Link>
    </div>
    
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
    {open ? <AiOutlineClose/> : <BsBlockquoteRight/> }
    </div>

    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`} onClick={handleClose}>
      {
        Links.map((links)=>(
          <li key={links.name} className='md:ml-8 text-[18px] md:my-0 my-7' >
            <Link to={links.link} className='text-[#1F2937] font-semibold hover:text-gray-400 duration-500'>{links.name}</Link> 
          </li>
        ))
      }
     

    {!isAuth ? (  <Link to='/login'><button className='bg-[#0F172A] text-white font-[Poppins] py-1 px-6 rounded md:ml-8 hover:bg-[#1F2937]
    duration-500'> Login </button> </Link> ) : (
      <button onClick={logOut} className='bg-[#0F172A] text-white font-[Poppins] py-1 px-6 rounded md:ml-8 hover:bg-[#1F2937]
      duration-500'> SignOut </button>
    )}
    </ul>
    </div>
  </div>  )
}

export default NarBar;


