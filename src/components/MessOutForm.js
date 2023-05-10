import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import { baseUrl } from "../baseUrl";
function MessOutForm({
  noofDays,
  noofMaxmessoutDays,
  noOfMaxMessOutsinMonth,
  messOutHistory,
  setMessOutHistory,
  setIsEmpty,
}) {
  const [exceededLimit,setExceededLimit]=useState(false);
  const [isMessout, setisMessOut] = useState(false);
  const [MessoutFromdate, setMessoutFromdate] = useState();
  const [fromDate, setFromDate] = useState("");
  const [calcToDate, setCalcSetDate] = useState(0);
  const [allowableDays, setAllowableDays] = useState();
  const [cumulativeMessCount, setCumulativeMessCount] = useState(0);
  const [toDate, setToDate] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [days, setDays] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { user, setLoading } = useContext(UserContext);
  
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
            if(res.data.AllowableDays<noofDays)
            {
                setExceededLimit(true)
            }
            else if(res.data.status=='failed')
            {
                setExceededLimit(true)
            }
          setAllowableDays(res.data.AllowableDays);
        } else {
          setMessoutFromdate(res.data.data.fromdate);

          setCalcSetDate(res.data.data.todate);
        }
      });
    setLoading(false);
  },[messOutHistory]);
  const submitForm = () => {
    setLoading(true);
    const date = new Date(fromDate);
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
    axios
      .post(`${baseUrl}/inmate/applymessout`, {
        user_id: user.user_id,
        fromDate: fromDate,
        toDate: toDate,
        hostel:user.hostel
      })
      .then((res) => {
        console.log(res.data)
        if(res.data.status=='ok')
        {
            setMessOutHistory([...messOutHistory, res.data.data[0]]);
            // setisMessOut(true);
            setIsEmpty(false);
            setFromDate("");
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
    setLoading(true);
    axios
      .post(`${baseUrl}/inmate/applymessin`, {
        user_id: user.user_id,
        toDate: toDate,
      })
      .then((res) => {
        console.log(res.data)
        setMessOutHistory([...messOutHistory, res.data.data.rows[0]]);
        setIsEmpty(false);
        setFromDate("");
        setToDate("");
        setLoading(false);
      });
  };

  const getToday = () => {
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate() + 1).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const getMessinStartDate = () => {
    let date;
    const today = new Date();
    const messoutfromdate = new Date(MessoutFromdate);
    const messinMinDate = new Date(
      messoutfromdate.setDate(messoutfromdate.getDate() + noofDays - 1)
    );
    today < messinMinDate ? (date = messinMinDate) : (date = today);
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

  const submitHandler = (e) => {
    e.preventDefault();
    var fdate = isMessout ? new Date(MessoutFromdate) : new Date(fromDate);
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
          setModalHeading("Confirmation");
          setModalText(
            "You have filled Mess in  from " +
              toDate +
              ". Do you want to confirm?"
          );
          setOpen2(true);
        }
      } else {
        setModalHeading("Confirmation");
        if (allowableDays != 0) {
          const date = new Date(fromDate);
          const messinMinDate = new Date(
            date.setDate(date.getDate() + allowableDays)
          );
          setModalText(
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
        {exceededLimit?"Exceeded Monthly Limit for this month":isMessout ? "Apply for Mess in" : "Apply for Mess Out"}
      </h2>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 w-6/12 gap-4 mb-3">
          {exceededLimit?"":(isMessout ? (
            <>
              <label htmlFor="">From:</label>{" "}
              <input
                type="date"
                value={toDate}
                min={getMessinStartDate()}
                max={getMessInMaxDate()}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
                required
              />
            </>
          ) : (
            <>
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
            </>
          ))}
        </div>
        {noofDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Minimum {noofDays} days of leave
          is required for Mess Out
        </p>:""}
        {noofMaxmessoutDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Maximum {noofMaxmessoutDays}{" "}
          days of leave possible per Mess Out
        </p>:""}
        {noOfMaxMessOutsinMonth>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" />
          You can request {noOfMaxMessOutsinMonth - cumulativeMessCount} more
          mess out in this month
        </p>:""}
        <div className="w-full flex items-end justify-end mt-5">
          <button
            type="submit"
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>
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
    </div>
  );
}
export default MessOutForm;
