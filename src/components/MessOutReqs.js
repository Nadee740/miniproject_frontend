import {useState,useEffect,useContext} from "react"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { baseUrl } from '../baseUrl'
import {UserContext} from '../Contexts/UserContext'
function MessOutReqs({noofDays,setNoofDays}) {

     const [messreqs, setMessreqs] = useState([])
     const [tabSelected, setTabSelected] = useState(1)
     const [isEdit,setIsEdit]=useState(false)
     const {setLoading}=useContext(UserContext)

     useEffect(() => {
       setLoading(true)
       axios.get(`${baseUrl}/inmate/messoutrequests`)
       .then(res=>{
         console.log(res.data)
         setMessreqs(res.data.rows)
         setLoading(false)
       })
     }, [])
     

     const submitHandler =(e)=>{
       e.preventDefault();
       setIsEdit(!isEdit)
       axios.put(`${baseUrl}/inmate/messoutdays`,{
         noofDays:noofDays
       })
       .then((res)=>{
         console.log(res)
       })
     }
       return (
         <>
           <div className='w-11/12'>
             <div className="flex items-center mt-5 mb-5">
                <p className="font-semibold">Minimum Number of Days for Mess Out: 
                  {isEdit?<input type="number" min="1" max="100" className="border-solid border-2 rounded-lg ml-3 p-1 w-20" 
                    value={noofDays} onChange={(e)=>{setNoofDays(e.target.value)}}/>:<span className="ml-3">{noofDays}</span>}
                </p>
                {!isEdit?<button className="submit-button-black ml-5" onClick={()=>{setIsEdit(!isEdit)}}><EditIcon/> Edit</button>:
                <button className="submit-button-black text-sm ml-5" onClick={submitHandler}><CheckIcon className="text-sm"/> Confirm</button>}
             </div>
             <h2 className="text-black font-semibold text-lg mt-5 mb-3">Mess Out Requests</h2>
             <table className='w-full relative table-auto'>
                 <tr className='rounded-xl p-3 bg-primary text-center'>
                   <th className='p-3'>Sl.No</th>
                   <th className='p-3'>Admission No.</th>
                   <th className='p-3'>Name</th>
                   <th className='p-3'>From Date</th>
                   <th className='p-3'>To Date</th>
                   <th className='p-3'>Number of Days</th>
                 </tr>
                 {messreqs.map((user, index)=>{
                   var fdate=new Date(user.fromdate)
                   var tdate=new Date(user.todate)
                   return(
                   <tr
                     key={index} 
                     className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                   >
                     <td className='p-3'>{index+1}</td>
                     <td className='p-3'>{user.hostel_admission_no}</td>
                     <td className='p-3'>{user.name}</td>
                     <td className='p-3'>{fdate.getDate()+'/'+fdate.getMonth()+'/'+fdate.getFullYear()}</td>
                     <td className='p-3'>{tdate.getDate()+'/'+tdate.getMonth()+'/'+tdate.getFullYear()}</td>
                     <td className='p-3'>{(tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24)}</td>
                   </tr>
                 )})}
             </table>
           </div>
         </>
       )
     }


export default MessOutReqs