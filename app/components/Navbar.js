"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "linear" }}
        className='sticky top-4 z-10 sm:top-6 md:top-8 mx-2 sm:mx-4 md:mx-0'
      >
        <header className='flex justify-center'>
          <nav className='flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl sm:rounded-3xl bg-[#6366F1] text-white w-full max-w-[700px]'>
            <Link href={"/"}><div className="logo font-extrabold text-lg sm:text-xl md:text-2xl transition-all duration-300 hover:text-[20px] sm:hover:text-[24px] md:hover:text-[28px]">Scribbly</div></Link>
            {session? (<div className="login flex justify-center items-center gap-2 sm:gap-3">
              <div className='flex justify-center items-center font-bold text-lg bg-[#4c4d9c] rounded-xl p-2'>
                {`Welcome ${session.user?.name?.split(' ')[0] || 'User'}`}
              </div>
              <button onClick={() => signOut({callbackUrl: '/'})} className="login-btn py-1 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold cursor-pointer hover:scale-[110%] transition-all duration-300 hover:bg-[#6264bf] bg-[#797CE9] text-xs sm:text-sm md:text-base">Sign Out</button>
            </div>): <div className="login flex justify-center items-center gap-2 sm:gap-3">
               <Link href={"/login"}><button className="login-btn py-1 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold cursor-pointer hover:scale-[110%] transition-all duration-300 hover:bg-[#6264bf] bg-[#797CE9] text-xs sm:text-sm md:text-base">Login</button></Link>
              <Link href={"/signup"}><button className="signup-btn py-1 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold cursor-pointer hover:scale-[110%] transition-all duration-300 hover:bg-[#363882] bg-[#5357D2] text-xs sm:text-sm md:text-base">Sign Up</button></Link>
            </div>}
          </nav>
        </header>
      </motion.div>
    </>
  )
}

export default Navbar
