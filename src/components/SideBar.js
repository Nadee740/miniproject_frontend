    //---Documentation---
    // const links=[
    //     {
    //         title:"Users", :: label of the link
    //         to:null, :: to link
    //         icon:userSvg, :: icon of the link
    //         subLinkOpen:true, :: should sublink be open by default
    //         subLinkActiveIndex:0, :: index of the active sublink
    //         subLinks:[
    //             {
    //                 title:"Inmate",
    //                 to:"inmates",
    //                 icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    //                             <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                         </svg>,
    //             },
    //         ]
    //     }
    // }

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import App from '../App'
import keySvg from'../icons/key.svg'
import logoutSvg from'../icons/logout.svg'
import userSvg from'../icons/user.svg'

function SideBar({myLinks, roles, setRole, myActiveIndex, roleIndex, currentRole}) {

    const [activeIndex, setActiveIndex] = useState(-1)

    const [links, setLinks] = useState(myLinks)

    const [rolesOpen, setRolesOpen] = useState(true)

    // useEffect(() => {
    //     if(localStorage.getItem('activeIndex')==null){
    //         localStorage.setItem('activeIndex',JSON.stringify(0))
    //     }
    //     else{
    //         var localActiveIndex=localStorage.getItem('activeIndex')
    //         setActiveIndex(parseInt(localActiveIndex))
    //     }
            
    // }, [])

    const rolesMap={
        'admin':'admin',
        'SA':'Staff Advisor',
        'HOD':'HOD',
        'WD':'Warden',
        'HO':'Hostel Office',
        'MTRN':'Matron',
        'SG':'Seargant'
    }
    
    useEffect(() => {

        var myActiveIndex=localStorage.getItem('activeIndex')==null?0:parseInt(localStorage.getItem('activeIndex'))

        var newLinks=myLinks.map(item=>({...item}))

        //closing all the opened links(with sublinks) that are not active
        newLinks.forEach((link, linkIndex) => {
            if(linkIndex!=myActiveIndex && link.subLinks!=undefined && link.subLinkOpen==true)
            {
                console.log("enterd in here")
                newLinks[linkIndex].subLinkOpen=false
            }
        });

        console.log("newlinksefs : ",newLinks, "myactiveindex : ",myActiveIndex)

        setLinks([...newLinks])

        //if the link 0 (active link on initial load) has sublinks, set active subLinkindex to 0 in localstorage
        if((localStorage.getItem('subIndex')==null || localStorage.getItem('subIndex')==="-1") && myLinks.length >0 && myLinks[0].subLinks!=undefined)
            localStorage.setItem('subIndex',JSON.stringify(0))
    }, [myLinks])

    let navigate = useNavigate();
    const logout=()=>{
        axios.post('http://localhost:8080/logout')
        .then(function (response) {
            console.log("success" , response);
            navigate("/")
            window.location.reload()
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
    }
    
    const SideBarLink=({link, index})=>{
        return (
            <div 
                onClick={()=>{

                    //To close any link that have sublinks
                    links.forEach((link, linkIndex) => {
                        if(index!=linkIndex && link.subLinks!=undefined && link.subLinkOpen==true)
                        {
                            var newLinks=[...links]
                            newLinks[linkIndex].subLinkOpen=false
                            
                            if(linkIndex==activeIndex)
                            {
                                newLinks[activeIndex].subLinkActiveIndex=-1
                            } 
                            
                            setLinks([...newLinks])
                        }
                    });

                    //If current index has no sublinks, then set the active link to current link
                    if(link.subLinks==undefined)
                    {
                        console.log("here2")
                        localStorage.setItem('subIndex',JSON.stringify(-1))
                        localStorage.setItem('activeIndex',JSON.stringify(index))
                        setActiveIndex(index)
                    }

                    //To open the link that have sublinks (Note that the link is not made active. The link is made active only after a sublink is clicked)
                    if(link.subLinks!=undefined)
                    {
                        console.log("here5")
                        var newLinks=[...links]
                        newLinks[index].subLinkOpen=!link.subLinkOpen
                        setLinks(newLinks)
                    }
                }}
                key={index} 
                className={'flex flex-row cursor-pointer justify-between py-2 px-2 '+(index==activeIndex&&link.subLinks==undefined?' text-blue-500 ':' text-black ')}
            >
                <div className='flex flex-row space-x-4 items-center'>
                    {/* <div className='text-black'>
                        {link.icon}
                    </div> */}
                    <div className={(index==activeIndex?'w-1 bg-stone-800 rounded-full h-3/4':'')}/>
                    <img src={link.icon}/>
                    <div>{link.title}</div>
                </div>

                {/* Arrow down icon */}
                {link.subLinks!=undefined&&(
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='flex flex-row bg-primary min-h-screen h-full text-sm overflow-hidden'>
            <div className='flex flex-col w-full bg-white overflow-y-auto'>
                <div className='flex flex-row items-center px-2 py-4 space-x-3'>
                    {/* LOGO */}
                    <div className='bg-white border border-solid border-black rounded-full w-12 aspect-square'/>
                    <div>Name</div>
                </div>
                {/* <hr className='h-px bg-stone-800 w-full' /> */}

                <div className='flex flex-col items-start w-full px-2' id="main-links">
                    {links.map((link, index)=>(
                        <div className='flex flex-col w-full'>
                            
                            {link.to!=null&&<Link to={link.to} className="">
                                <SideBarLink link={link} index={index} />
                            </Link>}
                            {link.to==null&&<SideBarLink link={link} index={index} />}

                            {/* Sublinks div */}
                            {link.subLinks!=undefined&&<div className={'flex flex-col bg-gray-100 ' + (link.subLinkOpen?'dropdown-visible':'dropdown-hidden')}>
                                {link.subLinks.map((subLink, subIndex)=>(
                                    <Link to={subLink.to} className="">
                                    <div 
                                        key={subIndex} 
                                        className={'ml-8 py-2 px-2 flex flex-row space-x-4 justify-self-start items-center '+(parseInt(localStorage.getItem('subIndex'))==subIndex?'text-blue-500':'text-black')}
                                        onClick={()=>{
                                            var newLinks=[...links]
                                            newLinks[index].subLinkActiveIndex=subIndex
                                            localStorage.setItem('subIndex',JSON.stringify(subIndex))

                                            //When sublink is clicked the current index is made active
                                            localStorage.setItem('activeIndex',JSON.stringify(index))
                                            setActiveIndex(index)
                                            setLinks(newLinks)
                                        }}
                                    >
                                        <div className='text-black'>
                                            {subLink.icon}
                                        </div>
                                        <div>{subLink.title}</div>
                                    </div>
                                    </Link>
                                ))}
                            </div>}
                        </div>
                    ))}

                    {/* Roles */}
                    {roles!=undefined&&(<div className='flex flex-col w-full'>
                        <div 
                            className='flex flex-row bg-slate-200 cursor-pointer justify-between py-2 px-2 text-black '
                            onClick={()=>{setRolesOpen(open=>!open)}}
                        >
                            <div className='flex flex-row space-x-4 items-center ml-4'>
                                {/* <div className='text-black'>
                                    {link.icon}
                                </div> */}
                                <img src={userSvg}/>
                                <div>Roles</div>
                            </div>
                            {/* Arrow down icon */}
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Roles List */}
                        <div className={'flex flex-col bg-gray-100 overflow-hidden ' + (rolesOpen?'dropdown-visible':'dropdown-hidden')}>
                            {roles.map((role, rIndex)=>(

                                // Give route address of corresponding home in the 'to' attribute of the following Link
                                <Link to={role.split(' ').join('')} className="">
                                <div 
                                    key={rIndex} 
                                    className={'ml-8 py-2 px-2 flex flex-row space-x-4 justify-self-start items-center ' +(role==currentRole?' text-blue-500 ':' text-black ')}
                                    onClick={()=>{
                                        // setRole(rIndex)
                                        setRole(role)
                                        setActiveIndex(0)
                                        // localStorage.setItem('activeIndex','0')
                                        // localStorage.setItem('role',JSON.stringify(rIndex))
                                    }}
                                    onBlur={()=>{
                                        setRolesOpen(false)
                                    }}
                                >
                                    <div className='text-black'>
                                        <img src={userSvg}/>
                                    </div>
                                    <div>{rolesMap[role]}</div>
                                </div>
                                </Link>
                            ))}
                        </div>

                    </div>)}
                </div>

                
                <div className='flex flex-col justify-end h-full w-full mb-3'>
                    {/* <hr className='h-px bg-stone-800 w-full' /> */}
                    <div className='w-full px-2'>
                        <div className='flex flex-row space-x-4 justify-self-start items-center px-2 py-2'>
                            <div className='text-black'>
                                <img src={keySvg} />
                            </div>
                            <div className='py-2'>Change Password</div>
                        </div>

                        <div className='flex flex-row space-x-4 justify-self-start items-center px-2 py-2'>
                            <div className='text-black'>
                                <img src={logoutSvg}/>
                            </div>
                            <div 
                                className='py-2 cursor-pointer'
                                onClick={logout}
                            >Logout</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar