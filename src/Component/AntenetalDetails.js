import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams  } from 'react-router-dom';
import { db } from '../Firebase-config';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const AntenetalDetails = ({isAuth}) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [antenetal, setantenetal] = useState(null);

    
  //getting the antenetal details 
  const getantenetalDetail = async()=>{
    const docRef = doc(db, 'AntenetalData', id);
    const snapshot = await getDoc(docRef);
    setantenetal(snapshot.data());
  };

  useEffect(()=>{
    id && getantenetalDetail();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[id]);


   
   useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  
  return (
    <div className='mt-8'> 
      <div className=' px-5 py-5 rounded-md'>
        <h3 className=' pt-4 text-xl text-black pb-2 font-bold' > {`${antenetal?.Full_name}'s`} Antenetal Registration details </h3>

        <div className='grid grid-cols-1 gap-4'>
        <div className="mb-6 font-mono">
          <div className='text-[#f01f0c]'>
                <h1> ID: {antenetal?.User?.id} </h1>
                <h1> Full name: {antenetal?.User?.name} </h1>
                <h1> Email:  {antenetal?.User?.email} </h1>
          </div>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Full Name: </span>  {antenetal?.Full_name} </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Age :</span> {antenetal?.Age || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Medical History :</span> {antenetal?.Medical_history || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Family History : </span> {antenetal?.family_history || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Permanent Address :</span> {antenetal?.Permanent_Address || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Previous Pregnancies  : </span>  {antenetal?.previous_pregnancies || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Current Pregnancies:</span> {antenetal?.current_pregnancies || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Local Government: </span> {antenetal?.Local_Government || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Weight: </span> {antenetal?.weight || <Skeleton/> }kg</h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Phone Number: </span> {antenetal?.Phone_Number || <Skeleton/> }</h1> 
               <h1 className=' text-xl'> <span className='font-bold text-black'> Date of Birth: </span> {antenetal?.Date_of_Birth || <Skeleton/> }</h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Time of Birth: </span> {antenetal?.Time_of_Birth || <Skeleton/> }</h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> State of origin: </span> {antenetal?.State_of_origin || <Skeleton/> }</h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> City: </span> {antenetal?.city || <Skeleton/> }</h1> 
               <h1 className=' text-xl text-[#f01f0c]'> <span className='font-bold text-black'> Date Submitted: </span> {antenetal?.timestamp.toDate().toDateString() || <Skeleton/> }</h1> 
        </div>
        </div>
        </div>     
    </div>
  )
}

export default AntenetalDetails;
