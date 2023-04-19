import axios from 'axios'
import { useEffect,useContext } from 'react'
import { baseUrl } from '../baseUrl'
import {UserContext} from '../Contexts/UserContext'
const CurrentMessInmates = (props)=>{
  const {setLoading} = useContext(UserContext)
 
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/inmate/viewmessinmates`)
    .then(res=>{
      console.log(res.data)
      props.setInmates(res.data)
      setLoading(false)
    })
  }, [])
    
    return(
        <table className='w-11/12 relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Hostel Admission No.</th>
                <th className='p-3'>Room No.</th>
              </tr>
              {props.inmates.map((user, index)=>(
                <tr 
                  key={index}
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3'>{user.hostel_admission_no}</td>
                  <td className='p-3'>{user.block_name} - {user.room_no}</td>
                </tr>
              ))}
          </table>
    )
}
export default CurrentMessInmates