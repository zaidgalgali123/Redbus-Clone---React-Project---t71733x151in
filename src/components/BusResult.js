import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BusResult=({bus})=>{
    const navigate=useNavigate();
    return (
        <div className="bg-warning p-4 d-flex justify-content-between mt-3 align-items-center "
        style={{cursor:"pointer"}}
        onClick={()=>{
            navigate("/book-seats");
        }}
        >
            <h4>{bus.busName}</h4>
            <div className="d-flex flex-column">
                <div>Departure</div>
                <h4>{bus.departureTime}</h4>
            </div>
            <div className="d-flex flex-column">
                <div>Arrival</div>
                <h4>{bus.arrivalTime}</h4>
            </div>
            <div className="d-flex flex-column">                
                <h4>{bus.ticketPrice} {<FaRupeeSign />}</h4>
            </div>
            
        </div> 
    );

};
export default BusResult;
