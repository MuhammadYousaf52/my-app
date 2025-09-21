"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession()
  return (
    <>
    <div className="Hero-section text-white mx-auto mt-8 sm:mt-12 md:mt-16 w-full max-w-[442px] px-4">
      <motion.div
      initial={{opacity:0, x : -200}}
      animate={{opacity:1, x : 0}}
      transition={{duration:1, delay: 0.5, ease: "linear"}}
       className=" heading font-extrabold text-2xl sm:text-3xl md:text-[40px] text-center leading-tight sm:leading-normal md:leading-[50px]">Capture your thoughts. Anytime. Anywhere.</motion.div>
      <motion.div 
      initial={{opacity:0, x : 200}}
      animate={{opacity:1, x : 0}}
      transition={{duration:1, delay: 0.5, ease: "linear"}}
      className="subheading text-center mt-3 sm:mt-4 text-sm sm:text-base md:text-[18px] font-semibold">Because the best ideas deserve more than sticky notes.</motion.div>
      <motion.div
      initial={{opacity:0, y : 100}}
      animate={{opacity:1, y : 0}}
      transition={{duration:1, delay: 0.5, ease: "linear"}}
       className="button flex justify-center items-center mt-3 sm:mt-4 bg-[]"><Link href={session?'/notes':'/login'}><button className="px-4 sm:px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-600 duration-300 hover:scale-[110%] transition cursor-pointer text-sm sm:text-base">Start Taking Notes</button></Link></motion.div>
    </div>
    
    <div className="features-section mt-8 sm:mt-10 mb-8 sm:mb-10 px-4 sm:px-6 md:px-8">
      <motion.h2 
      initial={{opacity:0, y: 30}}
      animate={{opacity:1, y: 0}}
      transition={{duration:0.6, delay: 0.6}}
      className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">Key Features</motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
        
        <motion.div 
        initial={{opacity:0, y: 50}}
        animate={{opacity:1, y: 0}}
        transition={{duration:0.6, delay: 0.8}}
        className="feature-card bg-gradient-to-br from-[#6366F1] to-[#5357D2] p-3 sm:p-4 rounded-xl text-white hover:scale-105 transition-transform duration-300">
          <div className="text-xl sm:text-2xl mb-2">✍️</div>
          <h3 className="text-base sm:text-lg font-bold mb-1">Quick Notes</h3>
          <p className="text-xs sm:text-sm opacity-90">Jot Down Easily</p>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 50}}
        animate={{opacity:1, y: 0}}
        transition={{duration:0.6, delay: 1.0}}
        className="feature-card bg-gradient-to-br from-[#797CE9] to-[#6366F1] p-3 sm:p-4 rounded-xl text-white hover:scale-105 transition-transform duration-300">
          <div className="text-xl sm:text-2xl mb-2">📁</div>
          <h3 className="text-base sm:text-lg font-bold mb-1">Organize</h3>
          <p className="text-xs sm:text-sm opacity-90">Folders to your Liking</p>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 50}}
        animate={{opacity:1, y: 0}}
        transition={{duration:0.6, delay: 1.2}}
        className="feature-card bg-gradient-to-br from-[#5357D2] to-[#363882] p-3 sm:p-4 rounded-xl text-white hover:scale-105 transition-transform duration-300">
          <div className="text-xl sm:text-2xl mb-2">🔍</div>
          <h3 className="text-base sm:text-lg font-bold mb-1">Search</h3>
          <p className="text-xs sm:text-sm opacity-90">Find anything fast</p>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 50}}
        animate={{opacity:1, y: 0}}
        transition={{duration:0.6, delay: 1.4}}
        className="feature-card bg-gradient-to-br from-[#363882] to-[#6264bf] p-3 sm:p-4 rounded-xl text-white hover:scale-105 transition-transform duration-300">
          <div className="text-xl sm:text-2xl mb-2">🔒</div>
          <h3 className="text-base sm:text-lg font-bold mb-1">Sync</h3>
          <p className="text-xs sm:text-sm opacity-90">Your data is secured in our database</p>
        </motion.div>
        
      </div>
    </div>
    </>
  );
}
