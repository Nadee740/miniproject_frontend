import axios from "axios"
import { useState,useContext,useEffect } from "react"
import { baseUrl } from "../baseUrl"
import { UserContext } from "../Contexts/UserContext"
import ConfirmDialog from '../components/ConfirmDialog'

function MessOutHistory({messOutHistory,setMessOutHistory,isEmpty,setIsEmpty,setNoofDays}) {

  const {user,setLoading}=useContext(UserContext)
  const [open1, setOpen1] = useState(false);
  const [modalHeading,setModalHeading]=useState("")
  const [modalText,setModalText]=useState("")
  const [cancelFromDate,setCancelFromDate]=useState("")
  const [cancelToDate,setCancelToDate]=useState("")
  const [tempfrom,setTempFrom]=useState("")
  const [tempto,setTempTo]=useState("")
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8080/inmate/messoutdays')
        .then((res)=>{
          console.log(res.data)
          setNoofDays(res.data[0].value)
        })
    axios.get(`${baseUrl}/inmate/messouthistory`,{params:{user_id:user.user_id}})
    .then(res=>{
      console.log(res.data)
      setMessOutHistory(res.data.rows)
      if(res.data.rows.length>0){
        setIsEmpty(false)
      }
      setLoading(false)
    })
  }, [])

  const dateConverter = (inputdate)=>{
    const date=new Date(inputdate);
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

  const cancelPress = (fromdate,todate,fdate,tdate)=>{
    setOpen1(true)
    setModalHeading("Confirmation")
    setModalText(`Do you want to cancel the messout from ${dateConverter(fromdate)} to ${dateConverter(todate)}?`)
    setCancelFromDate(fromdate)
    setCancelToDate(todate)
    setTempFrom(fdate)
    setTempTo(tdate)
  }

  const cancelMessOut = (fromdate,todate)=>{
    setLoading(true)
    axios.delete(`${baseUrl}/inmate/cancelmessout`,{
      params:{
        user_id:user.user_id,
        fromdate:fromdate,
        todate:todate
      }
    })
    .then(res=>{
      console.log(res)
      setMessOutHistory(messOutHistory.filter(item=>item.fromdate!=tempfrom && item.todate!=tempto))
      setLoading(false)
    })
  }

  const today = ()=>{
    const date=new Date();
    return date.getTime();
  }
   
       return (
         <>
           <div className='w-12/12'>
             <h1 className="font-semibold text-black text-lg mb-3 mt-3">Mess Out History</h1>
             {isEmpty?<p>No MessOut History</p>:<table className='w-full relative table-auto'>
                 <tr className='rounded-xl p-3 bg-primary text-center'>
                   <th className='p-3'>Sl.No</th>
                   <th className='p-3'>From Date</th>
                   <th className='p-3'>To Date</th>
                   <th className='p-3'>Number of Days</th>
                   <th className='p-3'></th>
                 </tr>
                 {messOutHistory.map((user, index)=>{
                   var fdate=new Date(user.fromdate)
                   var tdate=new Date(user.todate)
                   var actualfdate=fdate.getDate()+'/'+(fdate.getMonth()+1)+'/'+fdate.getFullYear()
                   var actualtdate=tdate.getDate()+'/'+(tdate.getMonth()+1)+'/'+tdate.getFullYear()
                   return(
                    <tr 
                      key={index}
                      className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                    >
                      <td className='p-3'>{index+1}</td>
                      <td className='p-3'>{actualfdate}</td>
                      <td className='p-3'>{actualtdate}</td>
                      <td className='p-3'>{((tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24))+1}</td>
                      <td className='p-3'>{today()<tdate.getTime()?<button className="submit-button-black" onClick={()=>{cancelPress(fdate,tdate,user.fromdate,user.tdate)}}>Cancel</button>:''}</td>
                    </tr>
                 )})}
             </table>}
           </div>
           <ConfirmDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText} confirmFunction={()=>{cancelMessOut(cancelFromDate,cancelToDate)}}/>
         </>
       )
     }


export default MessOutHistory