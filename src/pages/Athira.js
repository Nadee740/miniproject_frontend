import React from 'react'
import {Link} from "react-router-dom"
import HomeNavbar from '../components/HomeNavbar'
import Hostel from '../icons/athira.jpg'
function Athira() {
  return (
    <div style={{backgroundImage: `url(${Hostel})`,objectFit:"contain"}} className="flex flex-col self-center bg-slate-200 min-h-screen">
      {/* <HomeNavbar/> */}
      <div className="flex items-center justify-between w-5/6 m-auto" style={{minHeight:"80vh"}}>
        <div>
          <div>
            <h2 className="font-bold text-4xl">Thanks Idh Ready aaki thaneeen Pinee njaan karanjadh sahicheeennnn mmhuuuaaaaaaaah</h2>
          </div>
          <div className="flex items-center justify-center pt-10">
            <Link to="/" className="bg-stone-800 text-white px-4 py-2 rounded-lg">I Love You </Link>
          </div>
        </div>
        <div className='bg-red-800 w-96 h-72 p-5 rounded-lg rotate-12'>
        <img src={Hostel} className="w-full h-72 rounded-lg -rotate-12 -translate-y-2 -translate-x-2" alt="" />
        </div>
        
      </div>
    </div>
  )
}

export default Athira