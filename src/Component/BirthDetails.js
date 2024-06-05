import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams  } from 'react-router-dom';
import { db } from '../Firebase-config';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const BirthDetails = ({isAuth}) => {

    const {id} = useParams();
  const navigate = useNavigate();
  const [singlebirth, setsinglebirth] = useState(null);


  //getting the birth details 
  const getBirthDetail = async()=>{
    const docRef = doc(db, 'BirthData', id);
    const snapshot = await getDoc(docRef)
    setsinglebirth(snapshot.data());
  };

  useEffect(()=>{
    id && getBirthDetail();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[id])


   
   useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className='mt-9'> 
      <div className=' px-5 py-5 rounded-md'>
        <h3 className=' pt-4 text-xl text-black pb-2 font-bold' > {`${singlebirth?.childs_name}'s`} Birth Registration details </h3>

        <div className='grid grid-cols-1 gap-4'>
        <div className="mb-6 font-mono">
          <div className='text-[#f01f0c]'>
                <h1> ID: {singlebirth?.User?.id} </h1>
                <h1> Full name: {singlebirth?.User?.name} </h1>
                <h1> Email:  {singlebirth?.User?.email} </h1>
          </div>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Mother's Name: </span>  {singlebirth?.mother_name || <Skeleton/>} </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Father's Name :</span> {singlebirth?.Father_name || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Gender :</span> {singlebirth?.Gender || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> child's Name : </span> {singlebirth?.childs_name || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Permanent Address :</span> {singlebirth?.Permanent_Address || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> L.G.A  : </span>  {singlebirth?.LGA || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Weight :</span> {singlebirth?.weight || <Skeleton/> }kg </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Date of Birth : </span> {singlebirth?.Date_of_Birth || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Phone Number :</span> {singlebirth?.Phone_Number || <Skeleton/> } </h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> Time of Birth: </span> {singlebirth?.Time_of_Birth || <Skeleton/> }</h1>
               <h1 className=' text-xl'> <span className='font-bold text-black'> State of origin: </span> {singlebirth?.State_of_origin || <Skeleton/> }</h1> 
               <h1 className=' text-xl'> <span className='font-bold text-black'> city: </span> {singlebirth?.city || <Skeleton/> }</h1>
               <h1 className=' text-xl text-[#f01f0c]'> <span className='font-bold'> Date Submitted: </span> {singlebirth?.timestamp.toDate().toDateString() || <Skeleton/> }</h1> 
        </div>
        </div>
        </div>     
    </div>
  )
}

export default BirthDetails
