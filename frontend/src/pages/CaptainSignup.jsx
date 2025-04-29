/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
        const [password, setpassword] = useState();
        const [firstName, setfirstName] = useState();
        const [lastName, setlastName] = useState();
        const [userData, setuserData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
            setuserData({
                fullName:{
                    firstName: firstName,
                    lastName: lastName,
                },
                email: email,
                password: password
            });
            setfirstName('');
            setlastName('');
            setEmail('');
            setpassword('');
        }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
                    <div>
                    <img className='w-16' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Logo" />
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h3 className='text-lg font-medium mb-2'>What's our Captain's Name?</h3>
                        <div className='flex gap-4 mb-5'>
                        <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' required value={firstName} onChange= {(e) =>{
                            setfirstName(e.target.value)
                        }}
                        type="text" placeholder='First Name'/>
                        <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' required value={lastName} onChange= {(e) =>{
                            setlastName(e.target.value)
                        }}
                        type="text" placeholder='Last Name'/>
                        </div>
                        <h3 className='text-lg font-medium mb-2'>What's our Captain's Email</h3>
                        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required value={email} onChange= {(e) =>{
                            setEmail(e.target.value)
                        }}
                        type="email" placeholder='email@example.com'/>
                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required value={password}
                        onChange= {(e)=>{
                            setpassword(e.target.value)
                        }} type="password" placeholder='password'/>
                        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign up</button>
                        <p className='text-center'>Already a Captain? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
                    </form>
                    </div>
                    <div>
                    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
                    </div>
                </div>
    );
};

export default CaptainSignup;