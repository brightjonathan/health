import {useState, useEffect} from 'react';
import { db } from '../Firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../Style/SearchTesting.css';

const AntenetalSearch = () => {

         //created a usestate for my filter function
         const [filterdata, setfilterdata]= useState([]);

         //making it an empty string,so that whenever click it will erase every targeted value
         const [wordEntered, setwordEntered] = useState('');


         useEffect(()=> {
          const getmedicalform = onSnapshot(
           collection(db, 'AntenetalData'),
           (snapshot)=>{
             let list = []
             snapshot.docs.forEach((doc)=>{
               list.push({id: doc.id, ...doc.data()});
             });
             setfilterdata(list);
             console.log(list)
           }
          )
          return ()=>{
           getmedicalform()
          }
       },[]);
  
       const handleSubmit = (e)=>{
        e.preventDefault();
        const searchword = e.target.value
        
        setwordEntered(searchword)
        setfilterdata(filterdata.filter((data)=>
        data.Full_name.toLowerCase().includes(wordEntered.toLowerCase())))
  
        if(searchword === ''){
          setfilterdata([])
        }else {
          setfilterdata(filterdata.filter((data)=>
          data.Full_name.toLowerCase().includes(wordEntered.toLowerCase())))
        }
    };

         
  return (
    <div> 
    <div className="relative">

        <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none ">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" 
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" 
              strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
        </div>

        <input type="search" value={wordEntered} onChange={handleSubmit} 
        className="block w-full p-4 pr-9 text-sm text-gray-900 border border-gray-300 
        rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          dark:focus:border-blue-500 " placeholder="Search antenetal registration..." />
    
    </div>

{filterdata.length !== 0 ? (
<div className="dataresult">
{filterdata.slice(0, 1).map((e, index)=>{
    return <Link to={`/antenetal_detail/${e.id}`} key={index}>
        <p className='text-blue-300 dataiteam'> {e.Full_name} </p>
        </Link>
})}
</div>

) : (<h2 className='text-white'>No data found </h2>)} 

</div>
  )
}

export default AntenetalSearch
