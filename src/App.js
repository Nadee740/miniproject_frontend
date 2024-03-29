import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import StudentHome from './pages/Student/StudentHome';
import FacultyHome from './pages/StaffAdvisor/AdvisorHome';
import StudentsDetails from './pages/StaffAdvisor/StudentsDetails';
import SaViewApplication from './pages/StaffAdvisor/SaViewApplication';
import AdminHome from './pages/Admin/AdminHome';
import AdminInmates from './pages/Admin/AdminInmates';
import AdminNonInmates from './pages/Admin/AdminNonInmates';
import ViewDetails from './pages/Student/ViewDetails';
import HostelApplication from './pages/Student/HostelApplication';
import NonInmateCertificate from './pages/Student/NonInmateCertificate';
import AdminPaths from './pages/Admin/AdminPaths';
import AllotmentRule from './pages/Admin/AllotmentRule';
import HostelRegistry from './pages/Admin/HostelRegistry';
import CreateApplications from './pages/Admin/CreateApplication';
import HostelBlocks from './pages/Admin/HostelBlocks';
import AdminFaculty from './pages/Admin/AdminFaculty';
import InmateHome from './pages/Inmate/InmateHome';
import CertificatePage from './pages/Inmate/CertificatePage';
import MessPage from './pages/Inmate/MessPage';
import MessSecretary from './pages/Inmate/MessSecretary'
import Nodue from './pages/Inmate/Nodue'
import MessDirector from './pages/Inmate/MessDirector'
import HostelPage from './pages/Inmate/HostelPage';
import { useEffect, useState } from 'react';
import SignupInvite from './pages/StaffAdvisor/SignupInvite';
import CommonHome from './pages/CommonHome';
import Page404 from './pages/Page404'
import WardenHome from './pages/Warden/WardenHome';
import HostelAdmission from './pages/Warden/HostelAdmission';
import HostelOfficeHome from './pages/HostelOffice/HostelOfficeHome'
import AdmissionHostelOffice from './pages/HostelOffice/AdmissionHostelOffice';
import HostelOfficeMess from './pages/HostelOffice/HostelOfficeMess';
import Matron from './pages/Matron/Matron';
import MatronHome from './pages/Matron/MatronHome';
import MessBill from './components/MessBill';
import MessOutList from './components/MessOutList';
import UploadMessBill from './components/UploadMessBill';
import MessBillPage from './pages/Matron/MessBillPage';
import MessOutPage from './components/MessOutPage';
import UploadMessBillPage from './pages/Matron/UploadMessBillPage';
import MessOutListPage from './pages/Matron/MessOutListPage';
import StudentsDetailsHod from './pages/HOD/StudentsDetailsHod';
import HodViewApplication from './pages/HOD/HodViewApplication';
import SignupInviteHod from './pages/HOD/SignupInviteHod';
import AddStaffAdvisor from './pages/HOD/AddStaffAdvisor';
import axios from 'axios';
import SergeantHome from './pages/Sergeant/SergeantHome';
import ViewComplaints from './pages/Sergeant/ViewComplaints';
import SeatMatrix from './pages/Admin/SeatMatrix';
import {UserContext,LoadingContext} from './Contexts/UserContext'
import AdvisorHome from './pages/StaffAdvisor/AdvisorHome';
import HodHome from './pages/HOD/HodHome';
import BackdropLoading from './components/BackdropLoading';
import ViewApplications from './pages/Warden/ViewApplications';
import FacultySignUp from './pages/FacultySignUp'
import Athira from './pages/Athira';
import ApplyMessout from './pages/Student/ApplyMessout';
import MessManagementWarden from './pages/Warden/MessManagement';
import { baseUrl } from './baseUrl';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import SetNewPasswordPage from './pages/SetNewPassword';
import AddPerDayMessExpense from './pages/Sergeant/AddPerDayMessExpense';
import MessExpensePage from './pages/Sergeant/MessExpensePage';
import MessExpenseList from './pages/Sergeant/MessExpenseList';
import ClerkHome from './pages/Clerk/ClerkHome';
import MessExpenseClerk from './pages/Clerk/MessExpenseClerk';

function App() {
  const [user, setUser] = useState(undefined)
  const [authenticating, setAuthenticating] = useState(false)
  const [loading,setLoading] = useState(false)
  /*
    user={
      username:tve18cs061,
      password:"ppppp",
      ...,
      roles:[hod,warden] //roles can be separately returned as an array
    }

  */

  useEffect(() => {
    // setUser(
    //     {
    //         user_id: '1',
    //         password: '$2a$08$ffVGf5oCXvZVPK4NodMfEO5FKubBdEY4MZLLuwAyWlTgRJypT51FC',
    //         name: 'nadeem',
    //         email: 'nadeemblayparambil@gmail.com',
    //         mobile_no: '773607084',
    //         designation: 'faculty',
    //         is_admin: true,
    //         roles: [ 'admin','HOD','WD','SA','MTRN','SG','HO','CLRK' ]
    //       }
          
    // )
    setUser(
<<<<<<< HEAD
      {designation: "student",
          email: "nadeemblayparambil@gmail.com",
          is_admin:false,
          mobile_no: "+917736070884",
          name: "student1",
          password: "$2a$10$PO8QaMy8ZeuSvRFvr9b20eNymwwloSCcBDTAf6gDyRnt9kSU9mkCq",
          roles:  ['ms', 'md'],
          stage: "inmate",
          hostel: 'LH',
          user_id: "4"}
    )
    // setAuthenticating(true)
    // setLoading(true)
    // console.log("Im inside useffect isauthenticated")
    // axios.get('http://localhost:8080/auth/isAuthenticated',{
=======
        {designation: "student",
            email: "nadeemblayparambil@gmail.com",
            is_admin:false,
            mobile_no: "+917736070884",
            name: "student1",
            password: "$2a$10$PO8QaMy8ZeuSvRFvr9b20eNymwwloSCcBDTAf6gDyRnt9kSU9mkCq",
            roles:  ['ms', 'md'],
            stage: "inmate",
            hostel: 'LH',
            user_id: "4"}
    )
    // setAuthenticating(true)
    // setLoading(true)
    // console.log("Im inside useffect isauthenticated")
   
    // axios.get(`${baseUrl}/auth/isAuthenticated`,{
>>>>>>> 4b9a3a50cccb7ff8421264d82499ebccb1961f9f
    //     withCredentials: true
    // })
    // .then(function (response) {

    //     setAuthenticating(false)
    //     setLoading(false)

    //     console.log("success" , response ,"response.data");
<<<<<<< HEAD
    //     if(response.data!="")
    //       setUser(response.data)
    //     else 
    //       setUser(null)
=======
    //     if(response.data!='')
    //     {        console.log(response.data)
    //         setUser(response.data)}
    //     else{
    //         setUser(null)
    //         console.log("errr");
    //     } 

>>>>>>> 4b9a3a50cccb7ff8421264d82499ebccb1961f9f
    // })
    // .catch(function (error) {
    //     setAuthenticating(false)
    //     setLoading(false)
    //     console.log("FAILED!!! ",error);
    // });
  }, [])
  
  return (
    <div className='App'>
      <UserContext.Provider value={{user,setUser,loading,setLoading}}>
      <BrowserRouter>
        <Routes>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/set-new-password" element={<SetNewPasswordPage/>}/>
        {user!=null  && (<Route path="/change-password" element={<ChangePassword/>}/>)}
          {user===null&&(<Route path="/" element={<LandingPage/>}/>)}
          {user==null&&(<Route path="/login" element={<LoginPage/>}/>)}
          {user==null&&(<Route path="/signup" element={<SignUpPage/>}/>)}
          {user==null&&(<Route path="/facultysignup" element={<FacultySignUp/>}/>)}
          
          {user!=null&&(user.designation=='faculty')&&(
          <Route path="/" element={<CommonHome user={user}/>}>
            {/* Admin Routes */}
            {user.is_admin==true&&(<Route path="admin" element={<AdminHome/>}>
              <Route index element={<AdminInmates/>} />
              <Route path="inmates" element={<AdminInmates/>} />
              <Route path="noninmates" element={<AdminNonInmates/>} />
              <Route path="faculty" element={<AdminFaculty/>} />
              <Route path="allotmentrule" element={<AllotmentRule/>} />
              <Route path="applicationpaths" element={<AdminPaths/>} />
              <Route path="hostelregistry" element={<HostelRegistry/>} />
              <Route path="createapplication" element={<CreateApplications/>} />
              <Route path="hostelblocks" element={<HostelBlocks/>} />
              <Route path="seatmatrix" element={<SeatMatrix/>} />
            </Route>)}

            {/* staffadvisor Routes */}
            <Route path="SA" element={<AdvisorHome/>}>
              <Route index element={<StudentsDetails/>}/>
              <Route path="studentsdetails" element={<StudentsDetails/>}/>
              <Route path="signupinvite" element={<SignupInvite/>}/>
              <Route path="saviewapplication" element={<SaViewApplication/>}/>
            </Route>

            {/* hod Routes */}
            <Route path="/HOD" element={<HodHome/>}>
              <Route index element={<StudentsDetailsHod/>}/>
              <Route path="studentsdetails" element={<StudentsDetailsHod/>}/>
              <Route path="addstaffadvisor" element={<AddStaffAdvisor/>}/>
              <Route path="hodviewapplication" element={<HodViewApplication/>}/>
            </Route>

            {/* Warden Routes */}
            <Route path="/WD" element={<WardenHome/>}>
              <Route index element={<HostelAdmission/>}/>
              <Route path="mess-expense" element={<MessExpensePage/>}/>
              <Route path="admission" element={<HostelAdmission/>}/>
              <Route path="hostelregistry" element={<HostelRegistry/>}/>
              <Route path="applications" element={<ViewApplications/>}/>
              <Route path="messmanagement" element={<MessSecretary/>}/>
            </Route>

            <Route path="/SG" element={<SergeantHome/>}>
              <Route index element={<MessExpensePage/>}/>
              <Route path="complaints" element={<ViewComplaints/>}/>
            </Route>

            <Route path="/MTRN" element={<SergeantHome/>}>
              <Route index element={<MessExpensePage/>}/>
              <Route path="complaints" element={<ViewComplaints/>}/>
            </Route>

            {/* Hostel Office Routes */}
            <Route path="/HO" element={<HostelOfficeHome/>}>
              <Route index element={<AdmissionHostelOffice/>}/>
              <Route path="admission" element={<AdmissionHostelOffice/>}/>
              <Route path="hostelregistry" element={<HostelRegistry/>}/>
              <Route path="mess" element={<HostelOfficeMess/>}/>
            </Route>

            <Route path="/CLRK" element={<ClerkHome/>}>
              <Route index element={<MessExpenseClerk/>}/>
              <Route path="admission" element={<MessExpenseClerk/>}/>
            </Route>

          </Route>
          )}

          {/* Student Routes */}
          {user!=null && user.designation=='student' && user.stage=='noninmate'&&(<Route path="/" element={<StudentHome/>}>
            <Route index element={<ViewDetails/>}/>
            <Route path="hostelapply" element={<HostelApplication/>}/>
            <Route path="noninmatecertificate" element={<CertificatePage/>}/>
            
          </Route>)}

          {user!=null && user.designation=='student' && user.stage=='noninmate'&&(<Route path="/student" element={<StudentHome/>}>
            <Route index element={<ViewDetails/>}/>
            <Route path="hostelapply" element={<HostelApplication/>}/>
            <Route path="noninmatecertificate" element={<CertificatePage/>}/>
            
          </Route>)}

          {/* Inmate Routes */}
          {user!=null && user.designation=='student' && user.stage=='inmate'&&(<Route path="/" element={<InmateHome/>}>
            <Route index element={<MessPage/>}/>
            <Route path="mess" element={<MessPage/>}/>
            <Route path="certificates" element={<CertificatePage/>}/>
            <Route path="certificates/nodue" element={<Nodue/>}/>
            <Route path="noninmatecertificate" element={<NonInmateCertificate/>}/>
            <Route path="messsec" element={<MessSecretary/>}/>
            <Route path="mess-expense" element={<MessExpensePage/>}/>
            <Route path="messdirector" element={<MessDirector/>}/>
            <Route path="hostel" element={<HostelPage/>}/>
            <Route path="apply-messout" element={<ApplyMessout/>}/>
          </Route>)}

          {user!=null && user.designation=='student' && user.stage=='inmate'&&(<Route path="/inmate" element={<InmateHome/>}>
            <Route index element={<MessPage/>}/>
            <Route path="mess" element={<MessPage/>}/>
            <Route path="certificates" element={<CertificatePage/>}/>
            <Route path="certificates/nodue" element={<Nodue/>}/>
            <Route path="noninmatecertificate" element={<NonInmateCertificate/>}/>
            <Route path="messsec" element={<MessSecretary/>}/>
            <Route path="messdirector" element={<MessDirector/>}/>
            <Route path="hostel" element={<HostelPage/>}/>
          </Route>)}
          {authenticating==false&&(<Route path="*" element={<Page404/>}/>)}

          {/* Matron Routes */}
          {/* <Route path="MTRN" element={<MatronHome/>}>
            <Route index element={<MessBillPage/>}/>
            <Route path="messbill" element={<MessBillPage/>}/>
            <Route path="mess-expense-list" element={<MessExpenseList/>}/>
            <Route path="messoutlist" element={<MessOutListPage/>}/>
            <Route path="uploadmessbill" element={<UploadMessBillPage/>}/>
          </Route> */}
          
        </Routes>
      </BrowserRouter>
      <BackdropLoading/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
