import React from 'react'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button clicked! Navigating to /create-trip");
    navigate('/create-trip');
  };
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[48px] text-center mt-10'>
            <span className='text-[#ff3131]'>Discover Your Next Adventure with AI: <br/></span>Personalized Trip Planner ✈</h1>
        <p className='text-xl text-center text-gray-500'>Discover the future of travel planning—personalized, intuitive, and effortless. <br /> Your next adventure is just a click away with our AI-powered guide.</p>
        <Link to={'/create-trip'}>
        <Button>Explore Now 🗺️✨</Button>
        </Link>
        <img src="/LandingPage.png" className='mt-10'/>
    </div>
  )
}

export default Hero;