import React, { useEffect, useState } from 'react'
import { FaRegSquare } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import NavBar from '../landingComponents/NavBar'
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';
import Swal from 'sweetalert2';
const AdminPropertyList = () => {
  const [listData, setListData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/property-list');
    if (response?.data?.code == 200) {
      setListData(response?.data?.data)
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
        const response = await axios.post('http://localhost:9000/api/delete-property',{_id});
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
    <>
      <NavBar />
      <div className='row property py-5'>
        <div className="text-center ">
          <div className="tagline ">Properties </div>
          <h2 className="section-title">Featured Listings</h2>
        </div>
        {/* <div className='col-sm-1'></div> */}
        <div className='col-sm-12'>
          <div className='row py-3 px-3 '>
            {listData?.map((item, index) => {
              return (<>
                <div className='col-sm-3  px-3 mb-4'>
                  <div className="card  mx-auto shadow-lg border border-0 ">
                    <img src={`http://localhost:9000/img/${item?.pic}`} className="card-img-top img-fluid featuredimg"  alt="..." />
                    <FaRegTrashCan role='button' className='left-0 m-2 fs-3 text-danger ' onClick={() => handleDeleteProperty(item?._id)}/>
                    <div className="card-body">
                      <div className='d-flex justify-content-between'>
                        <p className='mycolor1'><b><FaRupeeSign />{item?.price}</b></p>
                        <h5 className="card-title"><b className='mycolor2'>{item?.title}</b></h5>
                      </div>
                      <p className="card-text featuredp ">{item?.description}</p>
                      <div className='row'>
                        <div className='col-6 featureddiv featuredp'>
                          <p className='m-0 ps-2'><FaRegSquare />{item?.area} Sq. ft</p>
                          {/* <FaRegTrashCan /> */}

                        </div>
                        <div className='col-6 featureddiv featuredp'>
                          <p className='m-0 ps-2'><MdLocationPin />{item?.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>)
            })}
            {listData?.length == 0 && <h1 className='text-center'>No Record Found</h1>}
          </div>
        </div>
        {/* <div className='col-sm-1'></div> */}
      </div>
    </>
  )
}

export default AdminPropertyList
