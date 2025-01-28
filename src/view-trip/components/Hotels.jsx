import React from 'react'
import HotelCard from './HotelCard';

const Hotels = ({trip}) => {
  const hotels = trip?.tripData?.tripData?.[0]?.hotel_options || [];
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotels Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
            {hotels.map((hotels, index) =>(
                <HotelCard hotels={hotels}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels;