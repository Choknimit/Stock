import React, {useState, useEffect} from 'react'
import axios from 'axios'



function MainProduct() {
  const [users, setUsers] = useState([])

//   useEffect(() => {
//     const Fectuser = async () => {
//         // const result = await axios(`http://localhost:5000/api/users`)
//         const result = await axios(`https://jsonplaceholder.typicode.com/users`)
//         // setUsers(result.data.user)
//         setUsers(result.data)
//         console.log(result.data);
//     };
//     Fectuser();
// }, [])

useEffect(() => {
  const Fectuser = async () => {
    const result = await axios('http://localhost:5000/api/users')
    setUsers(result.data.user)
    console.log(result.data.user)
  }
  Fectuser()
},[])



  return (
    <div className='container mx-auto p-20'>
      {users.map((user) => (
        <h1 key={user._id}>
          {user.name}
        </h1>
      ))}
    </div>
  )
}

export default MainProduct