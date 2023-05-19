import axios from 'axios'
import { useEffect,useContext, useState } from 'react'
import { baseUrl } from '../baseUrl'
import {UserContext} from '../Contexts/UserContext'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
const MessAttendance = (props)=>{
    const {user,setLoading} = useContext(UserContext)
    var date = new Date();
    var dateFormat = date.getFullYear() + "-" +((date.getMonth()+1).length != 2 ? "0" + (date.getMonth() + 1) : (date.getMonth()+1));
    const [selectedDate, setSelectedDate] = useState(dateFormat);
    const[selectedHostel,setSelectedHostel]=useState("MH");
 
  useEffect(() => {
    if(window.location.href.includes('inmate'))
    {
        setSelectedHostel(user.hostel)
    }
    setLoading(true)
    axios.get(`${baseUrl}/warden/get-mess-attendance?hostel=${selectedHostel}&&date=${selectedDate}`)
    .then(res=>{
      console.log(res.data)
      props.setAllInmates(res.data.data)
      setLoading(false)
    })
  }, [selectedHostel,selectedDate])

  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const downloadExcel=async()=>{
        // using Java Script method to get PDF file
      const ws=XLSX.utils.json_to_sheet(props.allInmates);
      const wb={Sheets:{'data':ws},SheetNames:['data']};
      const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
      const data=new Blob([excelBuffer],{type:fileType});
      FileSaver.saveAs(data,`Mess Attendance ${selectedDate}.xlsx`)
    
  }
    
    return(
     <>
         <div className="flex items-center justify-between w-100 p">
          {user.stage=="inmate"?<select
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option >{user.hostel==="MH"?'Mens Hostel':'Ladies Hostel'}</option>
          </select>:<select
          defaultValue={selectedHostel}
            onChange={(e) => {
              setSelectedHostel(e.target.value);
            }}
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option value="MH">Mens Hostel</option>
            <option value="LH">Ladies Hostel</option>
          </select>}
          {/* <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select>  */}
      
        </div>
        <div className="flex items-center justify-between w-9/12 py-4">
    
          <p className="font-semibold">Select Date </p>
          <input
           defaultValue={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            type="month"
          ></input>
        </div>
        <div className="flex items-center justify-between w-8/12 py-4">
          <p className="font-semibold">No Of Requests :</p>
          <p className="font-semibold">{props.allInmates.length} </p>
        </div>
        <div className="flex items-center justify-end mb-5">
          <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5" onClick={()=>{
            downloadExcel()
          }}>
            Download as Excel
          </button>
        </div>
        <table className='w-11/12 relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Hostel Admission No.</th>
                
                <th className='p-3'>Attendance.</th>
                <th className='p-3'>Room No.</th>
              </tr>
              {props.allInmates.map((user, index)=>(
                <tr 
                  key={index}
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3'>{user.hostel_admission_no}</td>
                  <td className='p-3'>{user.val}</td>
                  {/* <td className='p-3'>{user.block_name} - {user.room_no}</td> */}
                </tr>
              ))}
          </table>
          </>
          
    )
}
export default MessAttendance;