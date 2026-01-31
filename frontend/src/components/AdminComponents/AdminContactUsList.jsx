import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import NavBar from '../landingComponents/NavBar';
const AdminContactUsList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/get-contact-us');
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  }
  const show=(data)=>{
    Swal.fire({
      tile:"Message",
      text:data,
      icon:'info'
    })
  }
  return (
    <>
      <NavBar />
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10 mt-4">
          <div className='text-danger text-center fs-2 fw-bold mb-3'>Contact List</div>
          <table className='table'>
            <thead className='table table-dark'>
              <tr>
                <th>Sr.No </th>
                <th>Name </th>
                <th>Email </th>
                <th>Contact </th>
                <th>Subject </th>
                <th>Message </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item,index) => {
                return (<>
                  <tr>
                    <td>{index+1} </td>
                    <td>{item?.name} </td>
                    <td>{item?.email} </td>
                    <td>{item?.contact} </td>
                    <td>{item?.subject} </td>
                    {/* <td>{item?.message} </td> */}
                    <td onClick={()=>show(item?.message)}>{item?.message?.slice(0,30)}... </td>
                  </tr>
                </>)
              })}
            </tbody>
          </table>

        </div>
        <div className="col-sm-1"></div>
      </div>
    </>
  )
}

export default AdminContactUsList