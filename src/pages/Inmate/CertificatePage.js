import React, { useState,useEffect, useContext } from 'react'
import CertificateForm from '../../components/CertificateForm'
import ApplicationList from '../../components/ApplicationList'
import {motion} from 'framer-motion'
import { UserContext } from '../../Contexts/UserContext';
import { baseUrl } from '../../baseUrl';
function CertificatePage() {
  
  const {user} = useContext(UserContext)

  const [certificates, setCertificates] = useState([])
  const [tabSelected, setTabSelected] = useState(1)
  const [appsno,setAppsno]=useState(0)

  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Certificates</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative mb-3'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>View Applications <span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>{appsno}</span></div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-9/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                <div>Apply for New Certificate</div>
                <div className={tabSelected===2?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>    
          </div>

          {tabSelected===1&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>}
          <br />
        </div>
        {tabSelected===1?<ApplicationList certificates={certificates} setCertificates={setCertificates} setAppsno={setAppsno}/>:<CertificateForm/>}
      </motion.div>
    </div>
  )
}

export default CertificatePage