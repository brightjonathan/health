import { useState, useEffect } from 'react';
import './App.css'; 
import './Style/Searchstyling.css';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import NarBar from './Component/NarBar';
import {auth} from './Firebase-config';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from './Pages/About';
import Birth from './Pages/Birth';
import Antenetal from './Pages/Antenetal';
import Search from './Pages/Search';
import AntenetalDetails from './Component/AntenetalDetails';
import BirthDetails from './Component/BirthDetails';
import PageNotFound from './Pages/PageNotFound';
import Dashboard from './Pages/Dashboard';
import { SkeletonTheme } from 'react-loading-skeleton';
 

const App = () => {

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

  return (
    <SkeletonTheme>
    <ToastContainer position='top-right' />
    <NarBar />
   <Routes>
    <Route path='/' element={<Home/>} /> 
    <Route path='/dashboard' element={<Dashboard isAuth={isAuth}/>} />
    <Route path='/sign_up' element={<SignUp setisAuth={setisAuth}/>} />
    <Route path='/login' element={<Login setisAuth={setisAuth} setuser={setuser} />} />
    <Route path='/about' element={<About/>} /> 
    <Route path='/birth_registration' element={<Birth isAuth={isAuth} />} />
    <Route path='/Birth_update/:id' element={<Birth isAuth={isAuth} />} />
    <Route path='/antenetal_registration' element={<Antenetal isAuth={isAuth} />} />
    <Route path='/antenetal__update/:id' element={<Antenetal isAuth={isAuth} />} />
    <Route path='/search' element={<Search isAuth={isAuth} />} />
    <Route path='/antenetal_detail/:id' element={<AntenetalDetails isAuth={isAuth} />} />
    <Route path='/birth_detail/:id' element={<BirthDetails isAuth={isAuth} />} /> 
    <Route path='*' element={<PageNotFound />} /> 
   </Routes>
   </SkeletonTheme>
  )
}

export default App;


