import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    
    }
    useEffect(() => {
        getPasswords()
        
        


    }, [])
    const copytext = (text) => {
        toast('Copy to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("src/components/cross.png")) {
            ref.current.src = "src/components/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "src/components/cross.png"
            passwordRef.current.type = "text"
        }

    }

    const savePassword = async () => {

        setpasswordArray([...passwordArray,{...form,id:uuidv4()}])
        let res =await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,id})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
        
        // console.log(passwordArray)
        setform({ site: "", username: "", password: "" })



    }
    const deletePassword = async(id) => {
        console.log("Deleting password with id",id)

        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        let res =await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form,id})})
        toast('Password deleted succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
 
        // console.log(passwordArray)



    }
    const editPassword = (id) => {
        toast('Copy to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        console.log("Edit password with id",id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
       



    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
            <div className="  mycontainer  ">
                <h1 className='text-xl text font-bold text-center '>
                    <span className='text-green-700'>&lt;</span>

                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className=" flex flex-col p-4 gap-6 text-black items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='' />
                            <span className='absolute right-[4px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={35} src="src/components/eye.png" alt="eye.png" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-8 py-2 w-fit gap-4 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center '><a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='flex items-center justify-center'>

                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.site) }}>

                                                    <lord-icon
                                                        style={{
                                                            "width": "25px",
                                                            "height": "25px", "padding-top": "3px", "paddingLeft": "3px"
                                                        }}
                                                        src="https://cdn.lordicon.com/rpviwvwn.json"
                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>
                                            </div>

                                        </td>
                                        <td className=' py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>

                                                    <lord-icon
                                                        style={{
                                                            "width": "25px",
                                                            "height": "25px", "padding-top": "3px", "paddingLeft": "3px"
                                                        }}
                                                        src="https://cdn.lordicon.com/rpviwvwn.json"
                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>
                                            </div>


                                        </td>

                                        <td className=' py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.password) }}>

                                                    <lord-icon
                                                        style={{
                                                            "width": "25px",
                                                            "height": "25px", "padding-top": "3px", "padding-left": "3px"
                                                        }}
                                                        src="https://cdn.lordicon.com/rpviwvwn.json"
                                                        trigger="hover">

                                                    </lord-icon>

                                                </div>
                                            </div>
                                        </td>
                                        <td className=' justify-center py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon></span>
                                            <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}

                </div>
            </div>
        </>

    )
}

export default Manager