import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import {useState,useContext,useEffect} from 'react'
import { UserContext } from '../Contexts/UserContext';
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';
function MessOutForm({noofDays,messOutHistory,setMessOutHistory,setIsEmpty,setNoofDays}) {
    const [fromDate,setFromDate]=useState("")
    const [toDate,setToDate]=useState("")
    const [modalText,setModalText]=useState("")
    const [modalHeading,setModalHeading]=useState("")
    const [days,setDays]=useState(0)
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const {user,setLoading} = useContext(UserContext)
    
    const submitForm = ()=>{
        setLoading(true)
        axios.post('http://localhost:8080/inmate/applymessout',{
                    user_id:user.user_id,
                    fromDate:fromDate,
                    toDate:toDate
                }).then((res)=>{
                    setMessOutHistory([...messOutHistory,res.data.rows[0]])
                    setIsEmpty(false)
                    setFromDate("")
                    setToDate("")
                    setLoading(false)
                })
    }

    const getToday=()=>{
        const date=new Date();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let year = date.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return year+"-"+month+"-"+day;
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        var fdate=new Date(fromDate)
        var tdate=new Date(toDate)
        if(fdate.getTime()>tdate.getTime()){
            setModalHeading("Invalid Date")
            setModalText("Check the dates entered.")
            setOpen1(true)
        }
        else{
            var days=((tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24))+1
            setDays(days+1)
            if(days<noofDays){
                setModalHeading("Not Applicable")
                setModalText("Mess Out not allowed for "+days+" days")
                setOpen1(true)
            }
            else{
                setModalHeading("Confirmation")
                setModalText("You have filled Mess Out for "+days+" days from "+fromDate+" to "+toDate+". Do you want to confirm?")
                setOpen2(true)
            }

        }
        
    }
    return (
        <div className='mb-3'>
            <h2 className='font-semibold text-lg mb-2'>Apply for Mess Out</h2>
            <form onSubmit={submitHandler}>
                <div className='grid grid-cols-2 w-6/12 gap-4 mb-3'>
                    <label htmlFor="">Period of Leave From:</label>  <input type="date" value={fromDate} min={getToday()} onChange={(e)=>{setFromDate(e.target.value)}} className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" required/>
                    <label htmlFor="">To:</label> <input type="date" value={toDate} min={getToday()} onChange={(e)=>{setToDate(e.target.value)}} className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" required/>
                </div>
                <p className="flex items-center"><InfoIcon className="text-sm mr-1"/> Minimum {noofDays} days of leave is required for Mess Out</p>
                <div className="w-full flex items-end justify-end mt-5">
                    <button type="submit" className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Submit</button>
                </div>
            </form>
            <AlertDialog open={open1} setOpen={setOpen1} modalHeading={modalHeading} modalText={modalText}/>
            <ConfirmDialog open={open2} setOpen={setOpen2} modalHeading={modalHeading} modalText={modalText} confirmFunction={submitForm}/>
            
        </div>

    )
}
export default MessOutForm