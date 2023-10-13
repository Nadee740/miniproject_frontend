import React, { useState, useEffect, useContext } from "react";
import CertificateForm from "../../components/CertificateForm";
import ApplicationList from "../../components/ApplicationList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
function CertificatePage() {
  const { user } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(null);

  const [certificates, setCertificates] = useState([]);
  const [tabSelected, setTabSelected] = useState(1);
  const [appsno, setAppsno] = useState(0);

  return (
    <div className="flex flex-col w-full items-center min-h-screen h-full">
      <div className="flex flex-row justify-between w-11/12 pt-4 items-center">
        <div className="text-xl font-bold">Certificates</div>
        <div className="flex flex-row space-x-4 items-center">
          <div className="bg-white border rounded-full w-10 aspect-square" />
          <div>user Name</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 bg-white rounded-xl admin-dashbord-height"
      >
        {/* white box nav bar */}
        <div className="flex flex-row justify-between w-11/12 items-center">
          <div className="flex flex-row text-black text-sm font-bold relative mb-3">
            <div
              className="cursor-pointer "
              onClick={() => {
                setTabSelected(1);
              }}
            >
              <div>
                View Applications{" "}
                <span className="ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default">
                  {appsno}
                </span>
              </div>
              <div
                className={
                  tabSelected === 1
                    ? "mt-2 h-1 self-center w-9/12 bg-stone-800 rounded-full"
                    : ""
                }
              />
            </div>

            <div
              className="ml-5 cursor-pointer"
              onClick={() => {
                setTabSelected(2);
              }}
            >
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveMenu("menu2")}
                  onMouseLeave={() => setActiveMenu("null")}
                  className="text-black font-bold hover:text-gray-600 transitions hover:transition-ease-in-out transform hover:transform:1s duration-100 text-sm font medium px-2 py-1rounded-md focus:outline-none"
                >
                  {" "}
                  Apply for New Certificate
                </button>
                {activeMenu === "menu2" && (
                  <ul
                    onMouseEnter={() => setActiveMenu("menu2")}
                    onMouseLeave={() => setActiveMenu("null")}
                    className="absolute w-full py-2 z-30 bg-gray-300 border border-gray-800 rounded-md shadow-lg"
                  >
                    <li className=" menu   px-4 py-2 text-capitalize bg-gray-300 border border-gray-800 hover:bg-gray-100 text-black  ">
                      <Link to="/nodue">no due</Link>
                      <button className="ml-4  px-4 rounded-xl float-right bg-blue-500 text-black font-bold  ">Apply</button>
                    </li>
                    <li className=" menu px-4 py-2  bg-gray-300 border border-gray-800 hover:bg-gray-100 text-black">
                      {/* <Link to="/tech_officers">Technical Officers</Link> */}
                      mess
                      <button className="ml-4  px-4 rounded-xl float-right bg-blue-500 text-black font-bold  ">Apply</button>
                    </li>
                    <li className="menu px-4 py-2  bg-gray-300 border border-gray-800 hover:bg-gray-100 text-black">
                      {/* <Link to="/research_suprevisors">Research  Suprevisors</Link>  */}
                      admin
                      <button className="ml-4  px-4 rounded-xl float-right bg-blue-500 text-black font-bold  ">Apply</button>
                    </li>
                    <li className=" menu px-4 py-2  bg-gray-300 border border-gray-800 hover:bg-gray-100 text-black">
                      {/* <Link to="/research_scholars"> Reaserch  Scholars </Link> */}{" "}
                      djk
                      <button className="ml-4  px-4 rounded-xl float-right bg-blue-500 text-black font-bold  ">Apply</button>
                    </li>
                  </ul>
                )}
              </div>

              <div
                className={
                  tabSelected === 2
                    ? "mt-2 h-1 w-12/12 self-center bg-stone-800 rounded-full"
                    : ""
                }
              />
            </div>
          </div>

          {tabSelected === 1 && (
            <div className="text-sm mb-2">Showing 1-8 out of 200 results</div>
          )}
          <br />
        </div>
        {tabSelected === 1 ? (
          <ApplicationList
            certificates={certificates}
            setCertificates={setCertificates}
            setAppsno={setAppsno}
          />
        ) : (
          <CertificateForm />
        )}
      </motion.div>
    </div>
  );
}

export default CertificatePage;
