// // import React from 'react';
// // import PlaceCard from './PlaceCard';

// // const Itinerary = ({ trip }) => {
// //   const itinerary = trip?.tripData?.[0]?.itinerary || {};  // Ensure it's an object if empty
// //   console.log(itinerary);
  
// //   // Get the days of the itinerary (e.g., 'day1', 'day2', etc.)
// //   const days = Object.keys(itinerary);

// //   return (
// //     <div>
// //       <h2 className='font-bold text-xl mt-5'>Itinerary</h2>
// //       <div>
// //         {days.map((dayKey, index) => {
// //           const dayData = itinerary[dayKey]; // Access the day data using dayKey

// //           // Ensure places_to_visit is an array before calling .map()
// //           const placesToVisit = dayData?.places_to_visit || [];

// //           return (
// //             <div key={index} className='mt-5'>
// //               <h2 className='font-medium text-lg'>Day {index + 1}</h2>
// //               <div className='grid md:grid-cols-2 gap-5'>
// //                 {placesToVisit.map((places_to_visit, placeIndex) => (
// //                   <div>
// //                     <h2 className='text-sm font-medium text-[#ff3131]'>{places_to_visit.timing}</h2>
// //                     <PlaceCard places_to_visit={places_to_visit} />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Itinerary;




// // // import React from 'react';
// // // import PlaceCard from './PlaceCard';

// // // const Itinerary = ({ trip }) => {
// // //   const itinerary = trip?.tripData?.[0]?.itinerary || {}; 
  
// // //   console.log(itinerary);
// // //   const days = Object.keys(itinerary);

// // //   return (
// // //     <div>
// // //       <h2 className="font-bold text-xl mt-5">Itinerary</h2>
// // //       <div>
// // //         {days.length > 0 ? (
// // //           days.map((dayKey, index) => {
// // //             const dayData = itinerary[dayKey]; 
// // //             return (
// // //               <div key={index} className="mt-5">
// // //                 <h2 className="font-medium text-lg">Day {index + 1} - {dayData?.theme || "No theme"}</h2>
// // //                 <div className="grid md:grid-cols-2 gap-5">
// // //                   {Array.isArray(dayData?.places_to_visit) && dayData?.places_to_visit.length > 0 ? (
// // //                     dayData?.places_to_visit.map((place, placeIndex) => (
// // //                       <div key={placeIndex}>
// // //                         <h2 className="text-sm font-medium text-[#ff3131]">{place.timing}</h2>
// // //                         <PlaceCard places_to_visit={place} />
// // //                       </div>
// // //                     ))
// // //                   ) : (
// // //                     <p>No places to visit available for this day.</p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         ) : (
// // //           <p>No itinerary data available.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Itinerary;


// import React from 'react';
// import PlaceCard from './PlaceCard';

// const Itinerary = ({ trip }) => {
//   // Accessing itinerary safely, falling back to an empty object if it's not found
//   const itinerary = trip?.tripData?.[0]?.itinerary || {};

//   // Get the keys of the days dynamically (e.g., 'day_1', 'day_2', etc.)
//   const days = Object.keys(itinerary); 

//   return (
//     <div>
//       <h2 className='font-bold text-xl mt-5'>Itinerary</h2>
//       <div>
//         {days.map((dayKey, index) => {
//           // Accessing the schedule for each dynamic day key
//           const dayData = itinerary[dayKey]?.schedule || [];  // Safe access to schedule
          
//           // Render if there are places for the given day
//           return (
//             dayData.length > 0 && (
//               <div key={index} className='mt-5'>
//                 <h2 className='font-medium text-lg'>{`Day ${index + 1}`}</h2>
//                 <div className='grid md:grid-cols-2 gap-5'>
//                   {dayData.map((item, placeIndex) => (
//                     <div key={placeIndex}>
//                       <h2 className='text-sm font-medium text-[#ff3131]'>{item.time}</h2>
//                       <PlaceCard places_to_visit={item.place} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Itinerary;

// import React from 'react'
// import PlaceCard from './PlaceCard';

// const Itinerary = ({trip}) => {
//   const itinerary = trip?.tripData?.tripData?.[0]?.itinerary || {};
//   console.log(itinerary)
//   return (
//     <div>
//       <h2 className='font-bold text-xl mt-5'>Itinerary</h2>
//       <div>
//         {itinerary.map((item, index) => (
//           <div className='mt-5'>
//             <h2 className='font-medium text-lg'> Day {item.day}</h2>
//             <div className='grid md:grid-cols-2 gap-5'>
//             {item.places_to_visit.map((places_to_visit, index) => (
//               <div>
//                 <h2 className='text-sm font-medium text-[#ff3131]'>{places_to_visit.timing}</h2>
//                 <PlaceCard places_to_visit={places_to_visit} />
//               </div>
//             ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Itinerary;


// import React from 'react';
// import PlaceCard from './PlaceCard';

// const Itinerary = ({ trip }) => {
//   console.log(trip)
//   // Access the itinerary object
//   const itinerary = trip?.tripData?.tripData?.[0]?.itinerary || {};
//   // console.log(itinerary);

//   return (
//     <div>
//       <h2 className="font-bold text-xl mt-5">Itinerary</h2>
//       <div>
//         {/* Convert itinerary object into an array and map over it */}
//         {Object.keys(itinerary).map((dayKey, index) => (
//           <div key={index} className="mt-5">
//             <h2 className="font-medium text-lg">{dayKey.replace('_', ' ').toUpperCase()}</h2>
//             <div className="grid md:grid-cols-2 gap-5">
//               {/* Map over the schedule array for each day */}
//               {itinerary[dayKey]?.schedule?.map((place, placeIndex) => (
//                 <div key={placeIndex}>
//                   <PlaceCard place={place.place} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Itinerary;


import React from 'react';
import PlaceCard from './PlaceCard';

const Itinerary = ({ trip }) => {
  const itinerary = trip?.tripData?.tripData?.[0]?.itinerary || {};

  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.split('_')[1], 10); 
    const dayB = parseInt(b.split('_')[1], 10); 
    return dayA - dayB; 
  });

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Itinerary</h2>
      <div>
        {sortedDays.map((dayKey, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">{dayKey.replace('_', ' ').toUpperCase()}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {itinerary[dayKey]?.schedule?.map((place, placeIndex) => (
                <div key={placeIndex}>
                  <PlaceCard place={place.place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
