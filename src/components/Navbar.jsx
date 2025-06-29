import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-500'>&lt;</span>
            
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            
            </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
                
            </li>
        </ul> */}
        <button className=' bg-white my-5 mx-2 rounded-full flex justify-between items-center'><img className='invert rounded-2xl w-10' src="src/components/navlogonew.jpg" alt="logo" />
        <span className=' text-green-600 font-bold px-3'>Ayaan</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar