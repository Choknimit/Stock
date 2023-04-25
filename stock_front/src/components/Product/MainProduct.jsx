import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../Bar/Sidebar'
import Bartop from '../Bar/bartop'
import Image from './ProductImage'
import { Button, Modal } from 'antd';
import { createPrd } from '../functions/product'

function MainProduct() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const FectPrd = async () => {
            const result = await axios('http://localhost:5000/api/productType/prd')
            setProducts(result.data.products)
            // console.log(result.data.products)
        }
        FectPrd()
    }, [])

    // const [valueData, setValueData] = useState({
    //     prdname: '',
    //     prdprice: '',
    //     prddes: '',
    // })
    const [options, setOptions] = useState([])
    const [typePrd_id, setTypePrd_id] = useState('')
    const [prdphoto, setPrdPhoto] = useState(null)
    const [prdname, setPrdname] = useState('')
    const [prdprice, setPrdprice] = useState('')
    const [prddes, setPrddes] = useState('')
    
    useEffect(() => {
        const fectTypePrd = async () => {
            const res = await axios('http://localhost:5000/api/productType')
            // console.log(res.data.ProductType)
            setOptions(res.data.ProductType)
        }
        fectTypePrd()
    }, [])


    const handleFile = (e) => {
        // console.log(e.target.files[0])
        const files = e.target.files[0]
        setPrdPhoto(files)
    }
    
    const handleOption = (e) => {
        const optionsSeclect = (e.target.value)
        setTypePrd_id(optionsSeclect)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = async () => {
        setIsModalOpen(false)
        console.log(typePrd_id, prdname, prdprice, prddes, prdphoto)
        const formData = new FormData()
        formData.append('typePrd_id', typePrd_id)
        formData.append('prdname', prdname)
        formData.append('prdprice', prdprice)
        formData.append('prddes', prddes)
        formData.append('prdphoto', prdphoto)
        await axios.post('http://localhost:5000/api/productType/addPrd', formData)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    
    


  return (
    <div className='flex h-screen'>
        <Sidebar />

        <div className='w-full'>
            <Bartop />
            
            <div className='p-5'>
                <div className='bg-midnight rounded-md my-8'>
                    {/* < Link to='/addprd' className='text-sm border-blue-900 bg-blue-700 p-2 text-slate-50 rounded-md hover:bg-blue-900 border'>
                        <button>เพิ่มสินค้า</button>
                    </Link> */}
                    <Button type='primary' onClick={showModal} className=''>
                        เพิ่มสินค้า
                    </Button>
                    
                    <Modal title='Product' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                        <div className='flex flex-col gap-5'>
                            <select name="" id="" className='border p-2' value={typePrd_id} onChange={handleOption}>
                                <option disabled value="" >Choose Product Type</option>
                                {options.map((type) => (
                                    <option key={type._id} value={type._id}>{type.prdTypeName}</option>
                                ))}
                            </select>
                            <input onChange={e=>setPrdname(e.target.value)} name='prdname' className='p-2 border' type="text" placeholder='Product Name' />
                            <input onChange={e=>setPrdprice(e.target.value)} name='prdprice' className='p-2 border' type="number" placeholder='Product Price' />
                            <input onChange={e=>setPrddes(e.target.value)} name='prddes' className='p-2 border' type="text" placeholder='Product Description' />
                            <input onChange={handleFile} type="file" />
                        </div>
                    </Modal>

                </div>
                <div className='box-shadow42 bg-white p-5 rounded-md'>
                    <table className='table-auto w-full border-collapse border border-slate-500'>
                        <thead >
                            <tr>
                                {/* <th className='border border-slate-200 p-1'>Lorem, ipsum.</th> */}
                                <th className='border border-slate-200 p-2'>Name</th>
                                <th className='border border-slate-200 p-2'>Photo</th>
                                <th className='border border-slate-200 p-2'>Price</th>
                                <th className='border border-slate-200 p-2'>Description</th>
                                <th className='border border-slate-200 p-2'>Product Type</th>
                                <th className='border border-slate-200 p-2'>Action</th>
                            </tr>
                        </thead>
                        {products.map((prd) => (
                            <tbody key={prd.id}>
                                <tr>
                                    {/* <td className='border p-2'>{prd.id}</td> */}
                                    <td className='border p-2'>{prd.prdname}</td>
                                    {/* <td className='border p-2'>{prd.prdphoto}</td> */}
                                    <td className='border p-2 w-40'><Image {...prd} /></td>
                                    <td className='border p-2'>{prd.prdprice}</td>
                                    <td className='border p-2'>{prd.prddes}</td>
                                    {prd.typePrd_id.map((type) => (
                                        <td key={type._id}  className='border p-2'>{type.prdTypeName}</td>
                                        ))}
                                    <td className='border p-2'></td>
                                </tr>
                        </tbody>
                        ))}
                        
                    </table>

                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates necessitatibus atque earum adipisci! Laborum, dolorem omnis. Eveniet doloribus iste molestias harum, doloremque autem incidunt voluptas alias tenetur nisi possimus tempora!
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default MainProduct