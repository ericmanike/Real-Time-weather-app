import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaCloudMoon } from 'react-icons/fa6'

function Layout() {
  return (<>
    <div className='w-full h-[150px] bg-[#071d44] md:text-2xl text-white flex flex-row flex-nowrap justify-between items-center gap-20  px-5 md:px-15 '>

        <FaCloudMoon className='text-[gold] h-20 w-20' />
        <div className='flex flex-row justify-center items-center gap-10  w-fit '>
    <span 
    className="relative after:content-[''] after:absolute  after:bottom-0 after:left-0 after:w-0 after:h-1 hover:after:w-full after:bg-[maroon] after:transition-all after:duration-500  after:ease-in-out"
    
    ><Link to='/'>Home</Link> </span>

  <span className="relative after:absolute after:content-['']  after:bottom-0 after:left-0 after:w-0 after:h-1 hover:after:w-full after:bg-[maroon] after:transition-all after:duration-500  after:ease-in-out"><Link to='weather'>Global weather</Link></span>

      </div>   

    </div>
    <Outlet />
</>
  )
}

export default Layout