import React from 'react'
import Sidebar from '../Bar/Sidebar'
import Bartop from '../Bar/bartop'


function About() {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='w-full'>
            <Bartop />
            <div className='p-5'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet modi ad illo autem laborum doloremque sint ipsam quis. Ipsum ratione praesentium unde nesciunt ut! Consequuntur quam voluptate maiores est tenetur.
                
            </div>
        </div>
    </div>
  )
}

export default About