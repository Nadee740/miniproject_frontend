import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import { baseUrl } from "../baseUrl";
function MessOutForm({
    noofkdaybefore,
    noofDays,
  noofMaxmessoutDays,
  noOfMaxMessOutsinMonth,
  messOutHistory,
  setMessOutHistory,
  setIsEmpty,
}) {
  const [isEditable,setIsEditable]=useState(true);
  const [exceededLimit,setExceededLimit]=useState(false);
  const [isMessout, setisMessOut] = useState(false);
  const [MessoutFromdate, setMessoutFromdate] = useState();
  const [editedMessoutFromdate, setEditedMessoutFromdate] = useState();
  const [editedMessoutTodate,setEdittedMessoutTodate]=useState();
  const [fromDate, setFromDate] = useState("");
  const [calcToDate, setCalcSetDate] = useState(0);
  const [allowableDays, setAllowableDays] = useState();
  const [cumulativeMessCount, setCumulativeMessCount] = useState(0);
  const [toDate, setToDate] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [modal1Text, setModal1Text] = useState("");
  const [modal1Heading, setModal1Heading] = useState("");
  const [days, setDays] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3,setOpen3]=useState(false);

  const { user, setLoading } = useContext(UserContext);
  
  const dateConverter = (inputdate) => {
    const date = new Date(inputdate);
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    console.log( [year, month, day].join("-"))
    return [year, month, day].join("-");
  };

  useEffect(() => {
 
    setLoading(true);
    axios
      .post(`${baseUrl}/inmate/checkmessout`, {
        user_id: user.user_id,
        hostel:user.hostel
      })
      .then((res) => {
        setCumulativeMessCount(res.data.NomessOutDaysinMonth);
        console.log(res.data)
        setisMessOut(res.data.isMessout);

        if (!res.data.isMessout) {
            if(res.data.iseditable)
            {  if(res.data.AllowableDays<noofDays)
                {
                    setExceededLimit(true)
                }
                else if(res.data.status=='failed')
                {
                    setExceededLimit(true)
                }
              setAllowableDays(res.data.AllowableDays);
            }
              else{
                
                setFromDate(res.data.fromdate);
                setEditedMessoutFromdate(res.data.fromdate);
                setToDate(res.data.todate);
                setEdittedMessoutTodate(res.data.todate)
                setIsEditable(false)
              }
          
        } else {
          setMessoutFromdate(res.data.data.fromdate);
          setAllowableDays(res.data.AllowableDays);
         setEditedMessoutFromdate(res.data.data.fromdate)
          setCalcSetDate(res.data.data.todate);
        }
      });
    setLoading(false);
  },[messOutHistory]);


  const submitForm = () => {
    setLoading(true);
    const date = isMessout?new Date(editedMessoutFromdate): new Date(fromDate);


    const messinMinDate = new Date(
      date.setDate(date.getDate() + allowableDays - 1)
    );

    const date1 =
      messinMinDate.getFullYear() +
      "-" +
      parseInt(messinMinDate.getMonth() + 1) +
      "-" +
      messinMinDate.getDate();

    const toDate = allowableDays == 0 ? null : date1;

    const isUpdate=MessoutFromdate==editedMessoutFromdate
    axios
      .post(`${baseUrl}/inmate/applymessout?update=${!isUpdate}&&oldmessout=${dateConverter(MessoutFromdate)}`, {
        user_id: user.user_id,
        fromDate: isMessout?editedMessoutFromdate:fromDate,
        toDate: toDate,
        hostel:user.hostel
      })
      .then((res) => {
        console.log(res.data)
        if(res.data.status=='ok')
        {
            //words.filter(word => word.length > 6)
            if(isMessout)
            {
                const messOutHistorydata=messOutHistory.filter(messout=>messout.fromdate!=MessoutFromdate)
                setMessOutHistory([...messOutHistorydata, res.data.data[0]]);
            }
            else
            setMessOutHistory([...messOutHistory, res.data.data[0]]);
            // setisMessOut(true);
            setIsEmpty(false);
            isMessout?setFromDate(editedMessoutFromdate):(setEditedMessoutFromdate(fromDate));
            setToDate("");
            setLoading(false);
        }
        else{
            setFromDate("");
            setToDate("");
            setLoading(false);
            setModalHeading("Invalid Date");
            setModalText("You have already applied for messout for the entered dates.");
            setOpen1(true);
        }
 
      });
  };
  const submitMessinForm = () => {
    if(editedMessoutFromdate!=MessoutFromdate)
    {
        submitForm()
    }
    else{

        setLoading(true);
        axios
          .post(`${baseUrl}/inmate/applymessin`, {
            user_id: user.user_id,
            toDate: toDate,
          })
          .then((res) => {
            console.log(res.data)
            const messOutHistorydata=messOutHistory.filter(messout=>messout.fromdate!=fromDate && messout.todate!=toDate)
            setMessOutHistory([...messOutHistorydata, res.data.data.rows[0]]);
            setIsEditable(false);
            setFromDate(fromDate);
            setToDate(toDate)
            setIsEmpty(false);
            setFromDate("");
            setToDate("");
            setLoading(false);
          });
    }

  };

  const getToday = () => {
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate() + noofkdaybefore).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const GetMessinStartDate= async()=>{
    let daysadd;
    const messoutfromdate = new Date(editedMessoutFromdate);
    noofDays==0?daysadd=1:daysadd=noofDays
    const date= new Date(
      messoutfromdate.setDate(messoutfromdate.getDate() + daysadd- 1 )
    );
    // alert(date)
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    // alert(year + "-" + month + "-" + day)
    return year + "-" + month + "-" + day;
  }
  const getMessinStartDate = () => {
    let date,daysadd;
    const today = new Date();
    const messoutfromdate = new Date(MessoutFromdate);
    noofDays==0?daysadd=1:daysadd=noofDays
    const messinMinDate = new Date(
      messoutfromdate.setDate(messoutfromdate.getDate() + daysadd- 1 )
    );    // today < messinMinDate ? (date = messinMinDate) : (date = today);
    date = messinMinDate
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const getMessInMaxDate = () => {
    const date = new Date(calcToDate);
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  
  const submitMessinHandler=async()=>{

    var fdate = isMessout ? new Date(editedMessoutFromdate) : new Date(fromDate);
    console.log(fdate);
    
    var tdate = new Date(toDate);
    console.log(tdate)
    if (fdate.getTime() > tdate.getTime()) {
      setModalHeading("Invalid Date");
      setModalText("Check the dates entered.");
      setOpen1(true);
    } else {
      if (isMessout) {

        var days = (tdate.getTime() - fdate.getTime()) / (1000 * 3600 * 24) + 1;
        setDays(days + 1);
        if (days < noofDays) {
          setModalHeading("Not Applicable");
          setModalText("Mess Out not allowed for " + days + " days");
          setOpen1(true);
        } else {
                setModalHeading("Confirmation");
                setModalText(
                  "You have filled Mess in  from " +
                    toDate +
                    ". Mess Out cannot be edited after you submit Do you want to confirm?"
                );
                setOpen2(true);
            }
        
    }
}
  }

  const submitEditMessdata=async()=>{
    setLoading(true);
    axios
      .post(`${baseUrl}/inmate/editmessdata`, {
        user_id: user.user_id,
        fromdate:dateConverter(fromDate),
        todate:dateConverter(toDate),
        editedMessoutFromdate:dateConverter(editedMessoutFromdate),
        editedMessouttodate:dateConverter(editedMessoutTodate),
        hostel:user.hostel
      })
      .then((res) => {
        if(res.data.status=="ok")
        {
            const messOutHistorydata=messOutHistory.filter(messout=>messout.fromdate!=fromDate && messout.toDate!=toDate)
            setMessOutHistory([...messOutHistorydata, res.data.data[0]]);
           setFromDate(res.data.data[0].fromdate)
           setMessoutFromdate(res.data.data[0].fromdate)
           setToDate(res.data.data[0].todate);
    
        }
        else{
            setModalHeading("Invalid Date");
            setModalText("You cannot apply messout for the given date");
            setOpen1(true);

        }
   
       setLoading(false)
      })
  }
  
  const EditMessoutData=()=>{
    var fdate = new Date(editedMessoutFromdate) 
    var tdate = new Date(editedMessoutTodate);
    if (fdate.getTime() > tdate.getTime()) {
      setModalHeading("Invalid Date");
      setModalText("Check the dates entered.");
      setOpen1(true);
    } 
    else if((tdate-fdate)/(1000 * 3600 * 24)<noofDays)
          {
            setModalHeading("Invalid Date");
            setModalText("You cannot apply messout for the given date");
            setOpen1(true);
          }
    else{
        setModal1Heading("Confirmation")
        setModal1Text("You have applied mess out from "+ dateConverter(editedMessoutFromdate)+" to "+ dateConverter(editedMessoutTodate)+" Do you want to confirm ?");
        setOpen3(true)
    }
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
    var fdate = isMessout ? new Date(editedMessoutFromdate) : new Date(fromDate);
    var tdate = new Date(toDate);
    if (fdate.getTime() > tdate.getTime()) {
      setModalHeading("Invalid Date");
      setModalText("Check the dates entered.");
      setOpen1(true);
    } else {
      if (isMessout) {

        var days = (tdate.getTime() - fdate.getTime()) / (1000 * 3600 * 24) + 1;
        setDays(days + 1);
        if (days < noofDays) {
          setModalHeading("Not Applicable");
          setModalText("Mess Out not allowed for " + days + " days");
          setOpen1(true);
        } else {
            if(editedMessoutFromdate==MessoutFromdate)
            {
                setModalHeading("Confirmation");
                setModalText(
                  "You have filled Mess in  from " +
                    toDate +
                    ". Do you want to confirm?"
                );
            }
            else{
                setModalHeading("Confirmation");
                setModalText(
                    "You have edited the messout from  date to " +
                      editedMessoutFromdate +
                      ". Do you want to confirm?"
                  );

            }
   
          setOpen2(true);
        }
      } else {
        setModalHeading("Confirmation");
        if (allowableDays != 0) {
          const date = new Date(fromDate);
          const messinMinDate = new Date(
            date.setDate(date.getDate() + allowableDays)
          );
          allowableDays>1000?setModalText(
            "You have filled Mess Out  from " +
              fromDate +"\nDo you want to confirm?"
          ):setModalText(
            "You have filled Mess Out  from " +
              fromDate +
              ". \n you will automatically entered to mess from " +
              messinMinDate.getDate() +
              "-" +
              parseInt(messinMinDate.getMonth() + 1) +
              "-" +
              messinMinDate.getFullYear() +
              "\nDo you want to confirm?"
          );
        } else
          setModalText(
            "You have filled Mess Out  from " +
              fromDate +
              ". Do you want to confirm?"
          );
        setOpen2(true);
      }
      // var days=((tdate.getTime()-fdate.getTime())/(1000 * 3600 * 24))+1
      // setDays(days+1)
      // if(days<noofDays){
      //     setModalHeading("Not Applicable")
      //     setModalText("Mess Out not allowed for "+days+" days")
      //     setOpen1(true)
      // }
      // else{

      //     setModalHeading("Confirmation")
      //     setModalText("You have filled Mess Out  from "+fromDate+". Do you want to confirm?")
      //     setOpen2(true)
      // }
    }
  };
  return (
    <div className="mb-3">
      <h2 className="font-semibold text-lg mb-2">
        {isEditable?exceededLimit?"Exceeded Monthly Limit for this month":isMessout ? "Apply for Mess in" : "Apply for Mess Out":"You Have upcoming Mess out "}
      </h2>
      <form onSubmit={submitHandler}>
        
          {exceededLimit?"":(isMessout ?  (
            <>
            <div className="grid grid-cols-2 w-100 gap-4 mb-3">
              <label htmlFor="">Edit From date:</label>{" "}
              <input
                type="date"
                defaultValue={dateConverter(editedMessoutFromdate)}
                min={getToday()}
                max={getMessInMaxDate()}
                onChange={(e) => {
                  setEditedMessoutFromdate(e.target.value);
                }}
                className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"

              />
            </div>
            {
            !exceededLimit?<div className="w-full flex items-end justify-end mt-5">
          <button
            type="submit"
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>:""
        }
            <div className="grid grid-cols-2 w-100 gap-4 mb-3 mt-5">
                 <label htmlFor="">To:</label>{" "}
              <input
                type="date"
                value={toDate}
                min={getMessinStartDate()}
                max={getMessInMaxDate()}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
                required={MessoutFromdate==editedMessoutFromdate}
              />
              </div>
            </>
          ) : isEditable?(
            <>
            <div className="grid grid-cols-2 w-100 gap-4 mb-3">
              <label htmlFor="">Period of Leave From:</label>{" "}
              <input
                type="date"
                value={fromDate}
                min={getToday()}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
                className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
                required
              />
              </div>
            </>
          ):(<> <div className="grid grid-cols-2 w-100 gap-4 mb-3">
              <label htmlFor="">Mess out from:</label>{" "}
              <input 
                type="date"
                value={dateConverter(editedMessoutFromdate)}
                onChange={(e)=>{
                    setEditedMessoutFromdate(e.target.value)
                }}
                // max={getMessInMaxDate()}
                className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
                min={getToday()}
              />
                <label htmlFor="">Mess in From:</label>{" "}
              <input
                type="date"
                min={dateConverter(editedMessoutFromdate)}
                value={dateConverter(editedMessoutTodate)}
                onChange={(e)=>{
                    setEdittedMessoutTodate(e.target.value)
                }}
                className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"

              />
            </div>
            <div className="w-full flex items-end justify-end mt-5">
          <button
            type={"button"}
            onClick={()=>{
                EditMessoutData()
            }}
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>
            </>))}
        {noofDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Minimum {noofDays} days of leave
          is required for Mess Out
        </p>:""}
        {noofMaxmessoutDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Maximum {noofMaxmessoutDays}{" "}
          days of leave possible per Mess Out
        </p>:""}
        {noOfMaxMessOutsinMonth - cumulativeMessCount>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" />
          You can request {noOfMaxMessOutsinMonth - cumulativeMessCount} more
          mess out in this month
        </p>:""}
        {
            !exceededLimit&&isEditable?
            <div className="w-full flex items-end justify-end mt-5">
          <button
            type={isMessout?toDate.length>0?"button":"submit":"submit"}
            onClick={()=>{
                if(toDate.length>0)
            submitMessinHandler()
            }}
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>:""
        }
   
      </form>
      <AlertDialog
        open={open1}
        setOpen={setOpen1}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      <ConfirmDialog
        open={open2}
        setOpen={setOpen2}
        modalHeading={modalHeading}
        modalText={modalText}
        confirmFunction={isMessout ? submitMessinForm : submitForm}
      />
         <ConfirmDialog
        open={open3}
        setOpen={setOpen3}
        modalHeading={modal1Heading}
        modalText={modal1Text}
        confirmFunction={ submitEditMessdata}
      />
    </div>
  );
}
export default MessOutForm;
