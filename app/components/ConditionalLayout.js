"use client"
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname()
  
  const hideNavbarFooter = ['/notes/new']
  const isEditPage = (pathname.startsWith('/notes/') && pathname !== '/notes' && pathname !== '/notes/new') || pathname.startsWith('/notes/view/')
  const shouldHideNavbarFooter = hideNavbarFooter.includes(pathname) || isEditPage
  const hideFooterOnly = ['/notes']
  
  const shouldHideFooter = hideFooterOnly.includes(pathname) || shouldHideNavbarFooter
  
  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  )
}

export default ConditionalLayout