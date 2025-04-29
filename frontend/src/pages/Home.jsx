import React from 'react';
import welcomeLogo from "../assets/trafficlightimg.png";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-bottom'
            style={{ backgroundImage: `url(${welcomeLogo})` }}>
                <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

// bg-[url(../assets/trafficlightimg.png)]