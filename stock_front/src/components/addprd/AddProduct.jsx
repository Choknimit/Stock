import React from 'react'
import Sidebar from '../Bar/Sidebar'
import Bartop from '../Bar/bartop'
function AddProduct() {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='w-full'>
            <Bartop />
            <div className='p-5'>
                <div className='my-5 text-2xl'>
                    <h1>เพิ่มสินค้า</h1>
                </div>

                <form action="">
                    <div className='border bg-white box-shadow42 flex flex-col gap-8 p-10 rounded-md'>
                        <input className='border p-2' type="text" placeholder='Product Name'/>
                        <input className='border p-2' type="text" placeholder='Product Price'/>
                        <input className='border p-2' type="text" placeholder='Product Description'/>
                        <input type="file" />
                    <div className='text-white text-sm'>
                        <button className='p-2 bg-blue-500 rounded-md px-3 transition duration-300 hover:bg-blue-700 '>SAVE</button>
                    </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default AddProduct