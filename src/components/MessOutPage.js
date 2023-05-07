import {useState,useEffect} from 'react'
import MessOutForm from "./MessOutForm"
import MessOutHistory from "./MessOutHistory"
import axios from 'axios'
function MessOutPage({noofDays,setNoofDays,noofMaxmessoutDays,setnoofMaxmessoutDays,noOfMaxMessOutsinMonth,setnoOfMaxMessOutsinMonth}) {
  const [messOutHistory, setMessOutHistory] = useState([])
  const [isEmpty,setIsEmpty]=useState(true)
  return (
    <div className='w-11/12'>
        <MessOutForm isEmpty={isEmpty} setIsEmpty={setIsEmpty} noofDays={noofDays} noofMaxmessoutDays={noofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory}/>
        <hr/>
        <MessOutHistory isEmpty={isEmpty} setIsEmpty={setIsEmpty} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory} setNoofDays={setNoofDays} setnoofMaxmessoutDays={setnoofMaxmessoutDays} setnoOfMaxMessOutsinMonth={setnoOfMaxMessOutsinMonth}/>
    </div>
  )
}

export default MessOutPage