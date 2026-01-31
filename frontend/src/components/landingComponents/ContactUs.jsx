import React from 'react'
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../landingComponents/NavBar';
import { FaMessage } from "react-icons/fa6";

const ContactUs = () => {

  const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        contact: yup.string().required().min(10).max(10),
        subject: yup.string().required().min(8).max(20),
        message: yup.string().required(),
      });
  
  
      const {register,handleSubmit,formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const handleContact = async(data)=>{
      const response =await axios.post('http://localhost:9000/api/add-contact-us',data);
      if(response?.data?.code==200){
        Swal.fire({
          title:"Contact us",
          text:response?.data?.message,
          icon:"success"
        })
      }
    }
  
  return (
    <>
    <NavBar/>
     <div className="container my-5">
                 <h2 className="text-center">Contact</h2>
                 <div className="row justify-content-center">
                   <div className="col-md-10 col-lg-8">
                     <div className="form-box">
                       <form onSubmit={handleSubmit((d) => handleContact(d))}>
                         <div className="row g-3">
         
                           <div className="col-md-6">
                             <label className="form-label">Your Name</label>
                             <div className="input-group">
                               <span className="input-group-text"><FaUser /></span>
                               <input type="text" {...register('name')} className="form-control" placeholder="Enter your name" />
                             </div>
                             {errors.name && <p className="text-danger">{errors.name.message}</p>}
                           </div>
         
         
                           <div className="col-md-6">
                             <label className="form-label">Your Email</label>
                             <div className="input-group">
                               <span className="input-group-text"><FaEnvelope /></span>
                               <input type="email" {...register('email')} className="form-control" placeholder="Enter your email" />
                             </div>
                             {errors.email && <p className="text-danger">{errors.email.message}</p>}
                           </div>
         
         
                           <div className="col-md-6">
                             <label className="form-label">Phone Number</label>
                             <div className="input-group">
                               <span className="input-group-text"><IoMdCall /></span>
                               <input type="tel" {...register('contact')} className="form-control" placeholder="Enter phone number" />
                             </div>
                             {errors.contact && <p className="text-danger">{errors.contact.message}</p>}
                           </div>
         
         
                           <div className="col-md-6">
                             <label className="form-label">Subject</label>
                             <div className="input-group">
                               <span className="input-group-text"><FaKey /></span>
                               <input type="text" {...register('subject')} className="form-control" placeholder="Subject" />
                             </div>
                             {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
                           </div>
         
         
         
                           <div className="col-md-12">
                             <label className="form-label">Message</label>
                             <div className="input-group">
                               <span className="input-group-text"><FaMessage /></span>
                               <textarea type="text" {...register('message')} className="form-control" placeholder="Enter Your Message" />
                             </div>
                             {errors.message && <p className="text-danger">{errors.message.message}</p>}
                           </div>
                           <div className="text-center mt-4">
                             <input type="submit" className="btn px-5 btn-login" value="Submit" />
                           </div>
                         </div>
                       </form>
                     </div>
                   </div>
                 </div>
               </div>
    </>
  )
}

export default ContactUs