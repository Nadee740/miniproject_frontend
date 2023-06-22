import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { UserContext } from "../Contexts/UserContext";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
function MessOutReqs({selectedHostel,setSelectedHostel,messoutpredaysk,setMessoutpredaysk,noofDays, setNoofDays, maxNoofDays, setMaxNoofDays,maxNoofDaysMonth,setNoofDaysMonth }) {
  const {user}=useContext(UserContext)
    var date = new Date();
  var dateFormat = date.getFullYear() + "-" +((date.getMonth()+1).length != 2 ? "0" + (date.getMonth() + 1) : (date.getMonth()+1)) + "-" + (date.getDate().length != 2 ?"0" + date.getDate() : date.getDate());
  const [selectedDate, setSelectedDate] = useState(dateFormat);
  const [messreqs, setMessreqs] = useState([]);
  const [tabSelected, setTabSelected] = useState(1);
  const [isEditKpred,setisEditKpred]=useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [isMaxEdit, setIsMaxEdit] = useState(false);
  const [isMaxmonthEdit,setIsMaxmonthedit]=useState(false);
  const { setLoading } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    if(user.stage=='inmate')
    {
        setSelectedHostel(user.hostel)
    }else{
        setSelectedHostel("MH")
    }
    axios
      .get(
        `${baseUrl}/inmate/messoutrequests?hostel=${selectedHostel}&&date=${selectedDate}`
      )
      .then((res) => {
        console.log(res.data);
        setMessreqs(res.data.rows);
        setLoading(false);
      });
  }, [selectedHostel, selectedDate]);

  //  useEffect(() => {
  //     setLoading(true)
  //     axios.get(`${baseUrl}/inmate/messoutrequests?hostel=${selectedHostel}&&date=${selectedDate}`)
  //     .then(res=>{
  //       console.log(res.data)
  //       setMessreqs(res.data.rows)
  //       setLoading(false)
  //     })
  //   }, [selectedHostel])


  const submitHandlerMessoutk = (e) => {
    e.preventDefault();
    setisEditKpred(!isEditKpred);
    axios
      .put(`${baseUrl}/inmate/messoutpredaysk?hostel=${selectedHostel}`, {
        noofDays: messoutpredaysk,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    axios
      .put(`${baseUrl}/inmate/messoutdays?hostel=${selectedHostel}`, {
        noofDays: noofDays,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const submitMaximumNoofDays = (e) => {
    e.preventDefault();
    setIsMaxEdit(!isMaxEdit);
    axios
      .put(`${baseUrl}/inmate/messoutmaximumdays?hostel=${selectedHostel}`, {
        noofDays: maxNoofDays,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const submitMaximumNoofDaysInMonth = (e) => {
    e.preventDefault();
    setIsMaxmonthedit(!isMaxmonthEdit);
    axios
      .put(`${baseUrl}/inmate/messoutmaximumdays-month?hostel=${selectedHostel}`, {
        noofDays: maxNoofDaysMonth,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const downloadExcel=async()=>{
        // using Java Script method to get PDF file
      const ws=XLSX.utils.json_to_sheet(messreqs);
      const wb={Sheets:{'data':ws},SheetNames:['data']};
      const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
      const data=new Blob([excelBuffer],{type:fileType});
      FileSaver.saveAs(data,`Mess Out List ${selectedDate}.xlsx`)
    
  }
  return (
    <>
      <div className="w-11/12">
      {
        user.stage=='inmate'? <div className="flex items-center justify-between w-4/12">
          <select
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option >{user.hostel=='MH'?'Mens Hostel':'Ladies Hostel'}</option>
          </select>
          {/* <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select>  */}
        </div>: <div className="flex items-center justify-between w-4/12">
          <select
            onChange={(e) => {
              setSelectedHostel(e.target.value);
            }}
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option value="MH">Mens Hostel</option>
            <option value="LH">Ladies Hostel</option>
          </select>
          {/* <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select>  */}
        </div>
      }
       
        <div className="flex items-center justify-end mb-5">
          <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5" onClick={()=>{
            downloadExcel()
          }}>
            Download as Excel
          </button>
        </div>
        <div className="flex items-center mt-5 mb-5">
          <p className="font-semibold">
            Minimum Number of Days Before next mess out:
            {isEditKpred ? (
              <input
                type="number"
                min="0"
                max="100"
                className="border-solid border-2 rounded-lg ml-3 p-1 w-20"
                value={messoutpredaysk}
                onChange={(e) => {
                  setMessoutpredaysk(e.target.value);
                }}
              />
            ) : (
              <span className="ml-3">{messoutpredaysk}</span>
            )}
          </p>
          {!isEditKpred  ? (
            <button
              className="submit-button-black ml-5"
              onClick={() => {
                setisEditKpred(!isEditKpred)
              }}
            >
              <EditIcon /> Edit
            </button>
          ) : (
            <button
              className="submit-button-black text-sm ml-5"
              onClick={submitHandlerMessoutk }
            >
              <CheckIcon className="text-sm" /> Confirm
            </button>
          )}
        </div>

        <div className="flex items-center mt-5 mb-5">
          <p className="font-semibold">
            Minimum Number of Days for Mess Out:
            {isEdit ? (
              <input
                type="number"
                min="1"
                max="100"
                className="border-solid border-2 rounded-lg ml-3 p-1 w-20"
                value={noofDays}
                onChange={(e) => {
                  setNoofDays(e.target.value);
                }}
              />
            ) : (
              <span className="ml-3">{noofDays}</span>
            )}
          </p>
          {!isEdit ? (
            <button
              className="submit-button-black ml-5"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              <EditIcon /> Edit
            </button>
          ) : (
            <button
              className="submit-button-black text-sm ml-5"
              onClick={submitHandler}
            >
              <CheckIcon className="text-sm" /> Confirm
            </button>
          )}
        </div>
        <div className="flex items-center mt-5 mb-5">
          <p className="font-semibold">
            Maximum Number of Days for Mess Out:
            {isMaxEdit ? (
              <input
                type="number"
                min="1"
                max="100"
                className="border-solid border-2 rounded-lg ml-3 p-1 w-20"
                value={maxNoofDays}
                onChange={(e) => {
                  setMaxNoofDays(e.target.value);
                }}
              />
            ) : (
              <span className="ml-3">{maxNoofDays}</span>
            )}
          </p>
          {!isMaxEdit ? (
            <button
              className="submit-button-black ml-5"
              onClick={() => {
                setIsMaxEdit(!isMaxEdit);
              }}
            >
              <EditIcon /> Edit
            </button>
          ) : (
            <button
              className="submit-button-black text-sm ml-5"
              onClick={submitMaximumNoofDays}
            >
              <CheckIcon className="text-sm" /> Confirm
            </button>
          )}
        </div>
        <div className="flex items-center mt-5 mb-5">
          <p className="font-semibold">
            Maximum No of Days for Mess Out in a Month:
            {isMaxmonthEdit ? (
              <input
                type="number"
                min="1"
                max="100"
                className="border-solid border-2 rounded-lg ml-3 p-1 w-20"
                value={maxNoofDaysMonth}
                onChange={(e) => {
                  setNoofDaysMonth(e.target.value);
                }}
              />
            ) : (
              <span className="ml-3">{maxNoofDaysMonth}</span>
            )}
          </p>
          {!isMaxmonthEdit ? (
            <button
              className="submit-button-black ml-5"
              onClick={() => {
                setIsMaxmonthedit(!isMaxmonthEdit);
              }}
            >
              <EditIcon /> Edit
            </button>
          ) : (
            <button
              className="submit-button-black text-sm ml-5"
              onClick={submitMaximumNoofDaysInMonth}
            >
              <CheckIcon className="text-sm" /> Confirm
            </button>
          )}
        </div>
        <h2 className="text-black font-semibold text-lg mt-5 mb-3">
          Mess Out Requests
        </h2>
        <div className="flex items-center justify-between w-4/12 py-4">
          <p className="font-semibold">Select Date </p>
          <input
           defaultValue={selectedDate}
            onChange={(e) => {
               
              setSelectedDate(e.target.value);
            }}
            type="date"
          ></input>
        </div>
        <div className="flex items-center justify-between w-4/12 py-4">
          <p className="font-semibold">No Of Requests :</p>
          <p className="font-semibold">{messreqs.length} </p>
        </div>
        <table className="w-full relative table-auto">
          <tr className="rounded-xl p-3 bg-primary text-center">
            <th className="p-3">Sl.No</th>
            <th className="p-3">Admission No.</th>
            <th className="p-3">Name</th>
            <th className="p-3">From Date</th>
            <th className="p-3">To Date</th>
            <th className="p-3">Number of Days</th>
          </tr>
          {messreqs.map((user, index) => {
            var fdate = new Date(user.fromdate);
            var tdate = new Date(user.todate);
            return (
              <tr
                key={index}
                className={
                  "border-b text-center border-slate-200 border-solid hover:bg-gray-300"
                }
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.hostel_admission_no}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">
                  {fdate.getDate() +
                    "/" +
                    parseInt(fdate.getMonth() +1)+
                    "/" +
                    fdate.getFullYear()}
                </td>
                <td className="p-3">
                  {tdate.getDate() +
                    "/" +
                    parseInt(tdate.getMonth() +1)+
                    "/" +
                    tdate.getFullYear()}
                </td>
                <td className="p-3">
                  {(tdate.getTime() - fdate.getTime()) / (1000 * 3600 * 24)}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default MessOutReqs;
