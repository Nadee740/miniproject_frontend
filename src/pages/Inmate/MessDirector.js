import React, { useState,useEffect, useContext } from 'react'
import UploadMessBill from '../../components/UploadMessBill'
import MessOutList from '../../components/MessOutList'
import {motion} from 'framer-motion'
import MessDuesView from '../../components/MessDuesView'
import CurrentMessInmates from '../../components/CurrentMessInmates'
import MessOutReqs from '../../components/MessOutReqs'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'
import { UserContext } from '../../Contexts/UserContext'
import MessAttendance from '../../components/MessAttendance'
function MessDirector() {
 const {user}=useContext(UserContext)
  const [selectedHostel,setSelectedHostel]=useState('MH');
  const [tabSelected, setTabSelected] = useState(1)
  const [messoutpredaysk,setMessoutpredaysk ]=useState(0)
  const [noofDays,setNoofDays]=useState(0)
  const [maxNoofDays,setMaxNoofDays]=useState(null)
  const [maxNoofDaysMonth,setNoofDaysMonth]=useState(0);
  const [inmates, setInmates] = useState([])
  const [allInmates,setAllInmates]=useState([])

  useEffect(() => {
    if(user.stage=='inmate')
    {
        axios.get(`${baseUrl}/inmate/messoutdays?hostel=${user.hostel}`)
        .then((res)=>{
          setNoofDays(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/maximum-messoutdays?hostel=${user.hostel}`)
        .then((res)=>{
          setMaxNoofDays(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/maximum-messoutdays-month?hostel=${user.hostel}`)
        .then((res)=>{
            setNoofDaysMonth(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/messoutpredaysk?hostel=${user.hostel}`)
        .then((res)=>{
            setMessoutpredaysk(res.data[0].value)
        })
        
    }
    else
    {
        axios.get(`${baseUrl}/inmate/messoutdays?hostel=${selectedHostel}`)
        .then((res)=>{
          setNoofDays(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/maximum-messoutdays?hostel=${selectedHostel}`)
        .then((res)=>{
          setMaxNoofDays(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/maximum-messoutdays-month?hostel=${selectedHostel}`)
        .then((res)=>{
            setNoofDaysMonth(res.data[0].value)
        })
        axios.get(`${baseUrl}/inmate/messoutpredaysk?hostel=${selectedHostel}`)
        .then((res)=>{
            setMessoutpredaysk(res.data[0].value)
        })
    }

  }, [])
  return (
    <div className='flex flex-col w-full items-center min-h-screen h-full overflow-y-scroll'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Mess Director</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}  className='flex flex-col items-center py-8 space-y-4 w-11/12:w-full md mt-8 bg-white rounded-xl'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold relative mb-3'>
              <div
                className='cursor-pointer '
                onClick={()=>{
                  setTabSelected(1)
                }}
              >
                  <div>Current Mess Inmates </div>
                  <div className={tabSelected===1?'mt-2 h-1 self-center w-10/12 bg-stone-800 rounded-full':''}/>
              </div>

              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(2)
                }}
              >
                <div>Mess Out List</div>
                <div className={tabSelected===2?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(3)
                }}
              >
                <div>Mess Attendance</div>
                <div className={tabSelected===3?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(4)
                }}
              >
                <div>Upload Mess Bill</div>
                <div className={tabSelected===3?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
              <div 
                className='ml-5 cursor-pointer'
                onClick={()=>{
                  setTabSelected(5)
                }}
              >
                <div>Mess Dues</div>
                <div className={tabSelected===4?'mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full':''}/>
              </div>
          </div>

          {tabSelected===1&&<div className='text-sm mb-2'>Showing 1-8 out of 200 results</div>}
          <br />
        </div>
        {tabSelected===1&&<CurrentMessInmates inmates={inmates} setInmates={setInmates}/>}
        {tabSelected===2&&<MessOutReqs selectedHostel={selectedHostel} setSelectedHostel={setSelectedHostel} messoutpredaysk={messoutpredaysk} setMessoutpredaysk={setMessoutpredaysk} maxNoofDays={maxNoofDays} setMaxNoofDays={setMaxNoofDays} noofDays={noofDays} setNoofDays={setNoofDays} maxNoofDaysMonth={maxNoofDaysMonth} setNoofDaysMonth={setNoofDaysMonth}/>}
        {tabSelected===3&&<MessAttendance allInmates={allInmates} setAllInmates={setAllInmates}/>}
        {tabSelected===4&&<UploadMessBill/>}
        {tabSelected===5&&<MessDuesView/>}

      </motion.div>
    </div>
  )
}

export default MessDirector