import { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { toast } from "react-toastify";
import {auth, db } from '../Firebase-config';
import { addDoc, collection, getDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { FaRegAddressCard  } from 'react-icons/fa';
import {GrLocation} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import {GiWeightScale} from 'react-icons/gi';
import {AiFillFileText} from 'react-icons/ai';
import {BsPhone} from 'react-icons/bs';
import {FaCity} from 'react-icons/fa';


const stateOption = [
    'Abia state','Adamawa state','Akwa Ibom state','Anambra state','Bauchi state','Bayelsa state','Benue state',
    'Borno state','Cross River state','Delta state','Ebonyi state','Edo state','Ekiti state','Enugu state','Gombe state',
    'Imo state','Jigawa state','Kaduna state','Kano state','Katsina state','Kebbi state','Kogi state','Kwara state','Lagos state',
    'Nasarawa state','Niger state','Ogun state','Ondo state','Osun state','Oyo state','Plateau state','Rivers state','Sokoto state',
    'Taraba state','Yobe state','Zamfara state','Federal Capital Territory (FCT)'
  ];
  
  
  const initialState = {
    Full_name: '',
    Age: '',
    Medical_history: '',
    family_history: '',
    Permanent_Address: '',
    previous_pregnancies: '',
    current_pregnancies: '',
    Local_Government: '',
    weight: '',
    Phone_Number: '',
    Date_of_Birth: '',
    Time_of_Birth: '',
    State_of_origin: '',
    city: ''
  };


const Antenetal = ({ isAuth }) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [formValue, setFormValue] = useState(initialState);

  const { Full_name, Age, Medical_history, family_history, previous_pregnancies, Permanent_Address,
  current_pregnancies, Local_Government, weight, Phone_Number, Date_of_Birth, Time_of_Birth, State_of_origin, city
  } = formValue;

//targeting the input fields
const onInputChange = (e)=>{
  setFormValue({...formValue, [e.target.name]: e.target.value});
};

  
//targetting the category input
const onCategoryChange_three = (e) => {
  setFormValue({ ...formValue, State_of_origin: e.target.value });
};


//Handle the Submit functionality
const handleSubmit = async(e)=>{
  e.preventDefault();

  if (!id) {

    if ( Full_name === '' || Age === '' || Medical_history === '' || family_history === '' || previous_pregnancies === '' || Permanent_Address === '' 
       || current_pregnancies === '' || Local_Government === '' || weight === '' || Phone_Number === '' || Date_of_Birth === '' || State_of_origin === '' || city === '' ) 
      {
      toast.error('Please Fill in all the Input Field')
     }else{
       try {
         await addDoc(collection(db, 'AntenetalData'), {
           User : {
             name: auth.currentUser.displayName,
             email: auth.currentUser.email,
             id: auth.currentUser.uid
           },
           ...formValue,
           timestamp: serverTimestamp()
         })
         navigate('/dashboard')
         toast.success('submitted successfully')
       } catch (err) {
         console.log(err)
       }
     }

  }else{
    if ( Full_name === '' || Age === '' || Medical_history === '' || family_history === '' || previous_pregnancies === '' || Permanent_Address === '' 
     || current_pregnancies === '' || Local_Government === '' || weight === '' || Phone_Number === '' || Date_of_Birth === '' || State_of_origin === '' || city === '' )
    {
      toast.error('Please Fill in all the Input Field')
    } else{
       
      try {
        await updateDoc(doc(db, "AntenetalData", id), {
          User : {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            id: auth.currentUser.uid
          },
          ...formValue, 
          Updatedtimestamp: serverTimestamp()
        })
        toast.success(' Updated Successfully')
        navigate('/dashboard')
      } catch (err) {
        console.log(err.message)
      }

    }
    
  }
    
}



useEffect(()=>{
  if(!isAuth){
    navigate('/login')
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuth]);



    //funtion for populating the data for updating
    const getSingleBlog = async ()=>{
      const docRef = doc(db, "AntenetalData", id)
      const snapshot = await getDoc(docRef)
    
      if(snapshot.exists()){
         //console.log(snapshot.data())
         setFormValue({...snapshot.data()})
    
      }else{
       console.log('no data exists')
      }
    }
    
    
     useEffect(()=>{
       id && getSingleBlog();
         // eslint-disable-next-line react-hooks/exhaustive-deps
     },[id])


  return (
    <div className='mt-[10vh] bg_birth'>
    <div className='max-w-[800px] m-auto px-4 py-16'>
      <div className='dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'> {!id ? 'Create Antenetal Registration' : 'Updated Antenetal Registration'}  </h1> 
        <form onSubmit={handleSubmit} >
          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label>Full Name</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="Full name" 
                  name='Full_name'
                  value={Full_name}
                  onChange={onInputChange}
                />
                <CgProfile className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            <div className='md:my-4'>
              <label>Age</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="number" 
                  placeholder="Age" 
                  name='Age'
                  value={Age}
                  onChange={onInputChange}
                />
                 <CgProfile className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label>Medical  History </label>
              <div className='my-2 w-full relative '>
                <textarea  
              placeholder="your medical History" 
              name='Medical_history' 
              className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
              value={Medical_history}
              onChange={onInputChange}
              />
                <AiFillFileText className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            <div className='md:my-4'>
              <label>Family  History</label>
              <div className='my-2 w-full relative '>
              <textarea  
              placeholder="your family History"
              name='family_history' 
              className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
              value={family_history}
              onChange={onInputChange}
              />
                 <AiFillFileText className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label> previous Pregnancies </label>
              <div className='my-2 w-full relative '>
              <textarea  
              placeholder="previous pregnancies" 
              name='previous_pregnancies'
              className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
              value={previous_pregnancies}
              onChange={onInputChange}
              />
                <AiFillFileText className='absolute right-2 top-3 text-gray-400'/> 
              </div>
            </div> 

            <div className='md:my-4'>
              <label> Current Pregnancies </label>
              <div className='my-2 w-full relative '>
              <textarea  
              placeholder="current pregnancies" 
              name='current_pregnancies'
              className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
              value={current_pregnancies}
              onChange={onInputChange}
              />
               <AiFillFileText className='absolute right-2 top-3 text-gray-400' />
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label>L.G.A</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg'
                  placeholder="L.G.A" 
                  name='Local_Government'
                  value={Local_Government}
                  onChange={onInputChange}
                />
                 <GrLocation className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            <div className='md:my-4'>
              <label> Weight </label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="number" 
                  placeholder="weight in kg"
                  name='weight'
                  value={weight}
                  onChange={onInputChange}
                />
                 <GiWeightScale className='absolute right-2 top-3 text-gray-400'/> 
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label> Date of Birth </label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="date" 
                  placeholder="dd/mm/yyyy" 
                  name='Date_of_Birth'
                  value={Date_of_Birth}
                  onChange={onInputChange}
                />
              </div>
            </div> 

            <div className='md:my-4'>
              <label> Phone Number </label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="number" 
                  placeholder="+234 81*******" 
                  name='Phone_Number'
                  value={Phone_Number}
                  onChange={onInputChange}
                />
                <BsPhone className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
          <div className='md:my-4'>
              <label> Permanent Address</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="Rumuola street" 
                  name='Permanent_Address'
                  value={Permanent_Address}
                  onChange={onInputChange}
                />
                <FaRegAddressCard className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 
            </div> 

            <div className='md:my-4'>
              <label> Time of Birth </label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="time" 
                  placeholder="dd/mm/yyyy"
                  name='Time_of_Birth'
                  value={Time_of_Birth}
                  onChange={onInputChange}
                />
              </div>
            </div> 
            
          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label> City </label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="city" 
                  name='city'
                  value={city}
                  onChange={onInputChange}
                />
                <FaCity className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            <div className='md:my-4'>
              <label> State of origin </label>
              <div className='my-2 w-full relative '>
              <select value={State_of_origin} onChange={onCategoryChange_three} >
                  {stateOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
             </select>
              </div>
            </div> 
            
          </div>
          <button type='submit' className='w-full my-4 md:my-2 p-3 bg-[#02020F] text-white rounded-lg font-semibold'> {!id ? 'Submit' : 'Update'} </button>
          </form>

          </div>
          </div>
          </div>
  )
}

export default Antenetal
