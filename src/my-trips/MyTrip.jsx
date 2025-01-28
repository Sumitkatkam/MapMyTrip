import { db } from '@/AI Service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UsersTripsCard from './components/UsersTripsCard';

const MyTrip = () => {

  const navigate = useNavigate();
  const [usersTrips, setUsersTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  },[])

  const GetUserTrips = async () => {
    const users = JSON.parse(localStorage.getItem('users'));
    if(!users){
        navigate('/');
        return;
    }
    const q = query(collection(db, 'AiTrips'), where('usersEmail', '==', users?.email));
    const querySnapshot = await getDocs(q);
    setUsersTrips([]);
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setUsersTrips(prevVal => [...prevVal, doc.data()]);
    });
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-7'>
            {usersTrips?.length>0?usersTrips.map((trip, index) => (
                <UsersTripsCard trip={trip} key={index}/>
            ))
        : [1,2,3,4,5,6].map((item, index) => (
            <div key={index} className='h-[250px] w-[300px] bg-slate-200 animate-pulse rounded-xl'>

            </div>
        ))
        }
        </div>
    </div>
  )
}

export default MyTrip;