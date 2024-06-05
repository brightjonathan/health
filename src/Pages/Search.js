import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AntenetalSearch from '../Component/AntenetalSearch';
import BirthSearch from '../Component/BirthSearch';

const Search = ({ isAuth }) => {

    const navigate = useNavigate();
    const [active, setactive] = useState('FirstCard');

    useEffect(()=>{
      if(!isAuth){
        navigate('/login')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);


  return (
    <div className='section bg_birth'>
    <div className="settings">
    <div className="settings__wrapper ">
      <h2 className="settings__title mt-5"> Central Hospital Search Engine</h2>

      <div className="settings__top">
        <button className='setting__btn active__btn' onClick={() => setactive('FirstCard')}> Birth Search </button>
        <button className="setting__btn active__btn" onClick={() => setactive('SecondCard')}> Antenetal search </button>
      </div>

      <div>
        { active === 'FirstCard' && <BirthSearch/> }
        { active ===  'SecondCard' && <AntenetalSearch/> } 
        
      </div>
      
      </div>
  </div>    
  </div>
  )
}

export default Search
