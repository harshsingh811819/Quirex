import React from "react"
import NavBar from "./components/landingComponents/NavBar";
const NotFound = () => {
    return(<>
    <NavBar/>
    <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8"><h1 className="text-center fs-1 text-danger w-200"><span className="fs-1 fw-bolder text-dark">Error 404</span> <br /></h1></div>
        <div className="col-sm-2"></div>
    </div>
    
    </>)
}

export default NotFound;