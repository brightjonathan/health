import { useState, useEffect } from 'react';
import AntenetalDashboard from '../Component/AntenetalDashboard';
import BirthDashboard from '../Component/BirthDashboard';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import {db} from '../Firebase-config';
import { toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton';


const Dashboard = ({isAuth}) => {


  const [Birth, setBirth] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [Antenetal, setAntenetal] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);


  
  useEffect(()=>{
      const getBlogs = onSnapshot(
        collection(db, 'BirthData'),
        (snapshot) =>{
          let list = []
          snapshot.docs.forEach((doc)=>{
            list.push({id: doc.id, ...doc.data()})
          });
          setBirth(list)
          setisloading(false)
        }, (err)=>{
          console.log(err)
        }
      )

      return ()=>{
        getBlogs();
      }

  },[])


  //delete functionality
  const Birth_delete = async (id)=>{
    if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE ?')){
      try {
        const postDoc = doc(db, 'BirthData', id)
        await deleteDoc(postDoc)
        toast.success('deleted successfully')
        //navigate('/post') 
      } catch (err) {
        console.log(err)
      }
    }
    
  };


  useEffect(()=>{
    const getBlogs = onSnapshot(
      collection(db, 'AntenetalData'),
      (snapshot) =>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id, ...doc.data()});
        });
        setAntenetal(list);
        setisloading(false);

      }, (err)=>{
        console.log(err)
      }
    )

    return ()=>{
      getBlogs();
    }

},[])


 //delete functionality
 const Antenetal_delete = async (id)=>{
  if (window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE ?')){
    try {
      const postDoc = doc(db, 'AntenetalData', id)
      await deleteDoc(postDoc)
      toast.success('deleted successfully')
      //navigate('/post')
    } catch (err) {
      console.log(err)
    }
  }
  
}

if(isloading){
  return <Skeleton count={3} />
}

  return (
    <div className='mt-[15vh]'>
   <BirthDashboard Birth={Birth} Birth_delete={Birth_delete} /> 

    <hr className='text-2xl mt-9 '/>

    <AntenetalDashboard Antenetal={Antenetal}  Antenetal_delete={Antenetal_delete} />
    
    </div>
  )
}

export default Dashboard;

