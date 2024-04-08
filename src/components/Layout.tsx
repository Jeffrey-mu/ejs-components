import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Layout() {
  return (
    <>
      <Header />
      <div className='min-h-screen px-4'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
