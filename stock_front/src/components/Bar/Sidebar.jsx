import React from 'react'
import { Link } from 'react-router-dom'
import { FaBeer,  } from 'react-icons/fa';
import { RiFilePaperLine } from 'react-icons/Ri'
import { RxHamburgerMenu } from 'react-icons/rx'


function Sidebar() {
    const menus =[
        { name: 'หน้าแรก', link: '/', icon: <RiFilePaperLine />},
        { name: 'About', link: '/about', icon: <FaBeer /> },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
        { name: 'LInk', link: '/link', icon: <FaBeer />  },
    ]
    
  return (

    <div className='bg-white drop-shadow-md h-screen w-64 overflow-y-auto scrollbar-hide border'>
        <div className='text-black mt-3 p-6 flex flex-col justify-center'>
            <div className='mb-10 text-2xl flex items-center'>
                <RxHamburgerMenu />
                <h1 className='px-5'>Stock</h1>
            </div>
            <div className='text-base p-1 active-link'>
                {menus.map((menu, i) => (
                    <Link key={i} to={menu.link} className='flex items-center'>
                        <div className='pr-6 pb-10'>
                            {menu.icon}
                        </div>
                        <div className='pb-10'>
                            {menu.name}
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    </div>
  )
}

export default Sidebar