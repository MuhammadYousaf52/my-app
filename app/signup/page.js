"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import React from 'react'
import { signIn } from 'next-auth/react'


const Signup = () => {
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleChange =  (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            alert("Passwords do not match")
            return
        }
        try{
            const response = await fetch("/api/auth/signup",{
                method : 'POST',
                headers : {
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password:formData.password
                }) 
            })
            const data = await response.json()
            if(response.ok){
                alert('Account Created Successfully!')
                setFormData({
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    confirmPassword:""
                })
            }
            else{
                alert(data.error || 'something went wrong')
            } 
        } 
        catch(error){
                alert("Network Error")
            }
    }
    return (
        <div className='text-white mt-8 sm:mt-12 md:mt-20 flex justify-center items-center min-h-[60vh] px-4'>
            <motion.div 
            initial={{opacity:0, y: 50}}
            animate={{opacity:1, y: 0}}
            transition={{duration:0.6}}
            className='form rounded-2xl w-full max-w-[400px] sm:max-w-[450px] bg-gradient-to-br from-[#363882] to-[#5357D2] p-4 sm:p-6 md:p-8 shadow-2xl mb-8 sm:mb-12 md:mb-20'>
                <motion.h1 
                initial={{opacity:0, y: -20}}
                animate={{opacity:1, y: 0}}
                transition={{duration:0.5, delay: 0.2}}
                className='font-bold text-2xl sm:text-3xl text-center mb-6 sm:mb-8'>Sign Up</motion.h1>
                
                <form onSubmit={handleSubmit}>
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.5, delay: 0.4}}
                className='space-y-3 sm:space-y-4'>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <div className='flex-1'>
                            <label className='block font-semibold text-xs sm:text-sm mb-1 sm:mb-2' htmlFor="firstName">First Name</label>
                            <input onChange={handleChange} value={formData.firstName} className='w-full rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm sm:text-base' placeholder='First name' type="text" name="firstName" id="firstName" />
                        </div>
                        <div className='flex-1'>
                            <label className='block font-semibold text-xs sm:text-sm mb-1 sm:mb-2' htmlFor="lastName">Last Name</label>
                            <input onChange={handleChange} value={formData.lastName} className='w-full rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm sm:text-base' placeholder='Last name' type="text" name="lastName" id="lastName" />
                        </div>
                    </div>
                    
                    <div>
                        <label className='block font-semibold text-xs sm:text-sm mb-1 sm:mb-2' htmlFor="email">Email</label>
                        <input onChange={handleChange} value={formData.email} className='w-full rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm sm:text-base' placeholder='Enter your email' type="email" name="email" id="email" />
                    </div>
                    
                    <div>
                        <label className='block font-semibold text-xs sm:text-sm mb-1 sm:mb-2' htmlFor="password">Password</label>
                        <input onChange={handleChange} value={formData.password} className='w-full rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm sm:text-base' placeholder='Create password' type="password" name="password" id="password" />
                    </div>
                    
                    <div>
                        <label className='block font-semibold text-xs sm:text-sm mb-1 sm:mb-2' htmlFor="confirmPassword">Confirm Password</label>
                        <input onChange={handleChange} value={formData.confirmPassword} className='w-full rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm sm:text-base' placeholder='Confirm password' type="password" name="confirmPassword" id="confirmPassword" />
                    </div>
                    
                    <button type='submit' className='cursor-pointer w-full py-2 sm:py-3 rounded-xl bg-[#6366F1] hover:bg-[#5357D2] font-bold transition-colors duration-300 mt-4 sm:mt-6 text-sm sm:text-base'>Sign Up</button>
                    
                    <div className="text-base sm:text-lg font-bold flex justify-center items-center">OR</div>
                    
                    <button onClick={()=>{signIn("google")}} className="w-full py-2 sm:py-3 rounded-xl bg-[#797CE9] text-white font-semibold flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#6366F1] transition-colors duration-300 text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                    </button>
                    
                </motion.div>
                </form>
            </motion.div>
        </div>
    )
}

export default Signup
