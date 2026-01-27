import React, { useEffect, useState } from 'react'
import { IoBedOutline } from "react-icons/io5";
import { LuBedSingle } from "react-icons/lu";
import { FaVectorSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavBar from './NavBar';
import axios from 'axios';
const Property = () => {
   const [listData, setListData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/property-list');
     if(response?.data?.code==200){
      setListData(response?.data?.data)
     }

  }
  const location = useLocation();
  return (
    <>
      {location?.pathname != "/" && <NavBar />}
     <div className='row property py-5'>
        <div className="text-center ">
          <div className="tagline ">Properties </div>
          <h2 className="section-title">Featured Listings</h2>
        </div>
        <div className='col-sm-1'></div>
        <div className='col-sm-10'>
          <div className='row py-3 px-3 '>
              return (<>
                <div className='col-sm-4  px-3 mb-4'>
                  <div className="card  mx-auto shadow-lg border border-0">
                    <img src="/img/1.png" className="card-img-top featuredimg" alt="..." />
                    <div className="card-body">
                      <div className='d-flex justify-content-between bg-secondary'>
                        <p className='mycolor1'><b>price</b>/Month</p>
                      <h5 className="card-title"><b className='mycolor2'>title</b></h5>
                      </div>
                      <p className="card-text featuredp ">description</p>
                      <div className='row bg-secondary'>
                        <div className='col-4 featureddiv featuredp'>
                          <p className='m-0 ps-2'>area<IoBedOutline /></p>
                          <span className='ps-2'>Bedrooms</span>
                        </div>
                         
                      </div>
                    </div>
                  </div>
                </div>
              </>)
          </div>
        </div>
        <div className='col-sm-1'></div>
      </div>
    </>
  )
}

export default Property



  