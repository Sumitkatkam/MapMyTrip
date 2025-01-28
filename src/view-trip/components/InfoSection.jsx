import { GetPlaceDetails, PHOTO_REF_URL } from '@/AI Service/GlobalApi';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";


const InfoSection = ({trip}) => {

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
    <div>
        <img src={photoUrl?photoUrl : '/placeholder.jpg'}className='h-[340px] w-full rounded-xl object-cover'/>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.noOfDays} Days</h2>
                      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>{trip?.userSelection?.budget} Budget</h2>
                      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Travellers: {trip?.userSelection?.traveller}</h2>
                    </div>
            </div>
            <Button className='p-5 rounded-lg'><FaShareAlt /></Button>
        </div>
    </div>

  )
}

export default InfoSection;