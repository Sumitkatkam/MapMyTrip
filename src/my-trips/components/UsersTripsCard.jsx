import { GetPlaceDetails, PHOTO_REF_URL } from '@/AI Service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UsersTripsCard = ({trip}) => {

  const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
      trip && GetPlacePhoto();
    },[trip])
    const GetPlacePhoto = async() =>{
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      }
      const result = await GetPlaceDetails(data).then(resp =>{
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    }

  return (
    <Link to={'/view-trip/' + trip?.id}>
    <div className='mt-10 hover:scale-105 transition-all hover:shadow-lg rounded-xl p-2'>
        <img src={photoUrl?photoUrl : '/placeholder.jpg'} className='object-cover rounded-xl h-[250px] w-[300px]'/>
        <div>
            <h2 className='font-bold text-lg mt-2'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays}-Days, {trip?.userSelection?.budget} Trip</h2>
        </div>
    </div> 
    </Link>
  )
}

export default UsersTripsCard