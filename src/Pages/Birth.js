import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { auth, db } from '../Firebase-config';
import { addDoc, collection, getDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams} from 'react-router-dom';
import { FaBaby, FaRegAddressCard  } from 'react-icons/fa'
import {GrLocation} from 'react-icons/gr'
import {CgProfile} from 'react-icons/cg'
import {GiWeightScale} from 'react-icons/gi'
import {BsPhone} from 'react-icons/bs'
import {FaCity} from 'react-icons/fa'


const categoryOption = [
  "male",
  "female",
];

const stateOption = [
  'Abia state','Adamawa state','Akwa Ibom state','Anambra state','Bauchi state','Bayelsa state','Benue state',
  'Borno state','Cross River state','Delta state','Ebonyi state','Edo state','Ekiti state','Enugu state','Gombe state',
  'Imo state','Jigawa state','Kaduna state','Kano state','Katsina state','Kebbi state','Kogi state','Kwara state','Lagos state',
  'Nasarawa state','Niger state','Ogun state','Ondo state','Osun state','Oyo state','Plateau state','Rivers state','Sokoto state',
  'Taraba state','Yobe state','Zamfara state','Federal Capital Territory (FCT)'
];


const initialState = {
  mother_name: '',
  Father_name: '', 
  childs_name: '',
  Permanent_Address: '',
  LGA : '',
  weight : '',
  Date_of_Birth:'',
  Phone_Number : '',
  Time_of_Birth: '',
  Gender: '',
  State_of_origin: '',
  city: ''
};

const Birth = ({ isAuth }) => {

    const navigate = useNavigate();
    const {id} = useParams();
  const [formValue, setFormValue] = useState(initialState);

  const { mother_name, Father_name, childs_name, Permanent_Address, LGA, 
  weight, Date_of_Birth, Phone_Number, Time_of_Birth, Gender, State_of_origin, city 
  } = formValue;

  //targeting the input fields
const onInputChange = (e)=>{
  setFormValue({...formValue, [e.target.name]: e.target.value})
};


  //targetting the category input
const onCategoryChange_three = (e) => {
  setFormValue({ ...formValue, State_of_origin: e.target.value });
};


//targetting the category input
const onCategoryChange_two = (e) => {
  setFormValue({ ...formValue, Gender: e.target.value });
};


//Handle the Submit functionality
const handleSubmit = async(e)=>{
  e.preventDefault();

  if (!id) {

    if ( mother_name === '' || Father_name === '' || childs_name === '' || Permanent_Address === '' || LGA === '' 
       || weight === '' || Date_of_Birth === '' || Phone_Number === '' || Time_of_Birth === '' || Gender === '' || State_of_origin === '' || city === '') 
      {
      toast.error('Please Fill in all the Input Field')
     }else{
       try {
         await addDoc(collection(db, 'BirthData'), {
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
    if ( mother_name === '' || Father_name === '' || childs_name === '' || Permanent_Address === '' || LGA === '' 
    || weight === '' || Date_of_Birth === '' || Phone_Number === '' || Time_of_Birth === '' || Gender === '' || State_of_origin === '' || city === '')
    {
      toast.error('Please Fill in all the Input Field')
    } else{
       
      try {
        await updateDoc(doc(db, "BirthData", id), {
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
      const docRef = doc(db, "BirthData", id)
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
        <h1 className='text-2xl font-bold text-gray-800 mb-4'> {!id ? 'Create  Birth Registration' : 'Edit Birth Registration'}  </h1> 
        <form onSubmit={handleSubmit} >
          <div className='grid md:grid-cols-3 md:gap-8'>
            
          <div className='md:my-4'>
              <label>Mother's name</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="mother's name" 
                  name='mother_name'
                  value={mother_name}
                  onChange={onInputChange}
                />
                <CgProfile className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            <div className='md:my-4'>
              <label>Father's name</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="Father's name" 
                  name='Father_name'
                  value={Father_name}
                  onChange={onInputChange}
                />
                <CgProfile className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div> 

            
            <div className='md:my-4'>
              <label>Child's name</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                    type="text" 
                    placeholder="Child's Name" 
                    name='childs_name'
                    value={childs_name}
                    onChange={onInputChange}
                />
                <FaBaby className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div>            
          </div>


          <div className='grid md:grid-cols-3 md:gap-8'>
            
          <div className='md:my-4'>
              <label>Permanent Address</label>
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

            <div className='md:my-4'>
              <label>L.G.A</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="text" 
                  placeholder="L.G.A" 
                  name='LGA'
                  value={LGA}
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



          <div className='grid md:grid-cols-3 md:gap-8'>
            
          <div className='md:my-4'>
              <label>Date of Birth </label>
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

            
            <div className='md:my-4'>
              <label>Time of Birth</label>
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
              <label> State of Origin </label>
              <div className='my-2 w-full relative '>
              <select  value={State_of_origin} onChange={onCategoryChange_three}>
                  {stateOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>
            </div>

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

          </div>

          <div className='grid md:grid-cols-2 md:gap-8'>
            
          <div className='md:my-4'>
              <label> Gender </label>
              <div className=' w-[70%] relative '>
              <select value={Gender} onChange={onCategoryChange_two} >
                  {categoryOption.map((option, index) => (
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

export default Birth;





