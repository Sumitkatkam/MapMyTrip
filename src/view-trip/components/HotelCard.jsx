import { GetPlaceDetails, PHOTO_REF_URL } from '@/AI Service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({hotels}) => {

  const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
      hotels && GetPlacePhoto();
    },[hotels])
    const GetPlacePhoto = async() =>{
      const data = {
        textQuery: hotels.hotel_name
      }
      const result = await GetPlaceDetails(data).then(resp =>{  
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    }  
  return (
    <div>
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotels.hotel_name + "," + hotels.address} target='_ blank'>
                <div className='hover:scale-110 transition-all cursor-pointer'>
                    <img src={photoUrl?photoUrl : '/placeholder.jpg'} className="rounded-lg h-[200px] w-full object-cover" />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotels.hotel_name}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotels.address}</h2>
                        <h2 className='text-sm'>💰 ${hotels.price_per_night} price per night</h2>
                        <h2 className='font-medium'>⭐ {hotels.rating} stars</h2>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default HotelCard