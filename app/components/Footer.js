"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer 
    initial={{opacity:0, y: 50}}
    animate={{opacity:1, y: 0}}
    transition={{duration:0.8, delay: 0.3}}
    className='bg-gradient-to-r from-[#6366F1] to-[#5357D2] text-white py-4 px-4 sm:py-6 sm:px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <div className='text-lg font-bold mb-1'>Scribbly</div>
        <p className='text-xs opacity-90 mb-2'>Your thoughts, organized and secure.</p>
        <div className='text-xs opacity-75'>
          © 2025 Scribbly. All rights reserved.
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer