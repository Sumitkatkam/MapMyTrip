import { GetPlaceDetails, PHOTO_REF_URL } from '@/AI Service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({place}) => {
  const [photoUrl, setPhotoUrl] = useState();
      useEffect(() => {
        place && GetPlacePhoto();
      },[place])
      const GetPlacePhoto = async() =>{
        const data = {
          textQuery: place.place_name
        }
        const result = await GetPlaceDetails(data).then(resp =>{
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      })
      }  
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.place_name} target='_ blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl : '/placeholder.jpg'} className='w-[180px] h-[150px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg'>{place.place_name}</h2>
            <p className='text-sm text-gray-500'>{place.description}</p>
            <h2 className="text-sm font-medium text-[#ff3131] mt-2">{place.timing}</h2>
            <h2 className='mt-2'>${place.ticket_pricing}</h2>
            <h2 className='text-sm font-semibold mt-2'>Recommended Visit Time: {place.recommended_visiting_time}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCard;