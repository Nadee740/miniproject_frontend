import {useState,useEffect} from 'react'
import MessOutForm from "./MessOutForm"
import MessOutHistory from "./MessOutHistory"
import axios from 'axios'
import MessOutFormEdit from './MessoutFormEdit'
function MessOutPage({noofDays,setNoofDays,noofMaxmessoutDays,setnoofMaxmessoutDays,noOfMaxMessOutsinMonth,setnoOfMaxMessOutsinMonth}) {
  const [messOutHistory, setMessOutHistory] = useState([])
  const [isEmpty,setIsEmpty]=useState(true)
  const [editPrevData,seteditPrevData]=useState(false);
  const [editPrevFromDate,setEditPrevFromDate]=useState();
  const [editPrevToDate,setEditPrevToDate]=useState();

  return (
     
    editPrevData?<div className='w-11/12'>
    <MessOutFormEdit  setEditPrevFromDate={setEditPrevFromDate} editPrevFromDate={editPrevFromDate} editPrevToDate={editPrevToDate}  seteditPrevData={seteditPrevData} isEmpty={isEmpty} setIsEmpty={setIsEmpty} noofDays={noofDays} noofMaxmessoutDays={noofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory}/>
    <hr/>
</div>:<div className='w-11/12'>
        <MessOutForm isEmpty={isEmpty} setIsEmpty={setIsEmpty} noofDays={noofDays} noofMaxmessoutDays={noofMaxmessoutDays} noOfMaxMessOutsinMonth={noOfMaxMessOutsinMonth} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory}/>
        <hr/>
        <MessOutHistory setEditPrevFromDate={setEditPrevFromDate} setEditPrevToDate={setEditPrevToDate} editPrevData={editPrevData} seteditPrevData={seteditPrevData} isEmpty={isEmpty} setIsEmpty={setIsEmpty} messOutHistory={messOutHistory} setMessOutHistory={setMessOutHistory} setNoofDays={setNoofDays} setnoofMaxmessoutDays={setnoofMaxmessoutDays} setnoOfMaxMessOutsinMonth={setnoOfMaxMessOutsinMonth}/>
    </div>
 
  )
}

export default MessOutPage