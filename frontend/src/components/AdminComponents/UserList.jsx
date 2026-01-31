// import React from 'react'
// import NavBar from '../landingComponents/NavBar'
// const UserList = () => {
//   return (
//     <div>
//         <NavBar/>
//      UserList 
//     </div>
//   )
// }

// export default UserList


import { useState, useEffect } from 'react'
import React from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'


const UserList = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  // console.log(list);

  const fetchData = async () => {
    // console.log(UserData);

    const response = await axios.get('http://localhost:9000/api/admin-user-list')
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  }
  return (
    <div>
      <NavBar />
      <div className="row">
        <h1 className='text-danger text-center'>Admin User List </h1>
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          {/* table ki starting */}
          <table className="table">
            <thead className='table table-dark'>
              <tr >
                <th scope="col">Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                
                <th scope="col">Media</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (<>
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.address}</td>
                    <td>{item?.contact}</td>
                    <td><img className=' rounded-circle border border-4 border-dark' height="80" width="80" src={`http://localhost:9000/img/${item?.profile}`} /></td>
                  </tr>
                </>)
              })}
            </tbody>
          </table>
          {data?.length == 0 && <p className='text-center text-danger'>No Record Found</p>}

        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  )
}

export default UserList;
