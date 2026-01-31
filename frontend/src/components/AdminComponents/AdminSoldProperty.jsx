import { useState, useEffect } from 'react'
import React from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaRegTrashCan } from "react-icons/fa6";


const AdminSoldProperty = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  // console.log(list);

  const fetchData = async () => {
    // console.log(UserData);

    const response = await axios.get('http://localhost:9000/api/admin-sold-list')
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  }

  const handleDeleteProperty = async (_id) => {
      Swal.fire({
        title: "Are you sure want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const response = await axios.post('http://localhost:9000/api/delete-sold-item',{_id});
          if(response?.data?.code == 200){
            Swal.fire({
              title: "Delete Property",
              text: response?.data?.message,
              icon: "success"
            })
            fetchData()
            
          }
          else{
            Swal.fire({
              title: "Deleted failed",
              text: response?.data?.message,
              icon: "error"
            })
          }
        }
      });
    }
  return (
    <div>
      <NavBar />
      <div className="row">
        <h1 className='text-danger text-center'>Admin Sold List </h1>
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          {/* table ki starting */}
          <table className="table">
            <thead className='table table-dark'>
              <tr >
                <th scope="col">Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Price</th>
                <th scope="col">Area</th>
                <th scope="col">Location</th>
                <th scope="col">Media</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (<>
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td><span className='d-flex text-align-center'>{item?.contact}</span></td>
                    <td>{item?.price}</td>
                    <td>{item?.area}</td>
                    <td>{item?.location}</td>
                    <td><img height="60" width="100" src={`http://localhost:9000/img/${item?.pic}`} className='rounded' /></td>
                    <td><button onClick={() => handleDeleteProperty(item?._id)} className='btn btn-outline-danger'>Delete <FaRegTrashCan className='mb-2'/></button></td>
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

export default AdminSoldProperty
