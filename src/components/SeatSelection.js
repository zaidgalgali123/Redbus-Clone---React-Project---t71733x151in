import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import "../styles/seat.css";
import {Button} from 'react-bootstrap';
import JourneyContext from '../context/JourneyContext';
import { useNavigate } from 'react-router-dom';

const SeatSelection = () => {
    const [selectedSeat, setSelectedSeat] = useState([])
    const {from,to}=useContext(JourneyContext);
    const navigate=useNavigate();
    // useEffect(
    //     ()=>{
    //         if(!from||!to)
    //             navigate("/");
    //     },[]
    // );
    function seatNum(i, j) {
        return 8 * i + j + 1;
    }

    return (
        <div>
            <Container className='bg-danger'>
                {[1, 2, 3].map((seatRow, i) => {
                    return (
                        <div className={`row d-flex justify-content-center m-0 mw-100 p-4 mt-${Math.ceil(seatRow * 1.5)}`} key={seatRow}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((seat, j) => {
                                return <div className={`seat ${selectedSeat.includes(seatNum(i, j)) ? 'bg-success' : ""}`}
                                    key={8 * i + j}
                                    onClick={
                                        () => {
                                            const previousSeats = [...selectedSeat];
                                            if (selectedSeat.includes(seatNum(i, j))) {
                                                const allSeatsExceptCurrent = previousSeats.filter(
                                                    (currentSeat) => {
                                                        return currentSeat != seatNum(i, j);
                                                    }
                                                );
                                                setSelectedSeat(allSeatsExceptCurrent);
                                            }
                                            else
                                                setSelectedSeat([...previousSeats, seatNum(i, j)]);
                                        }
                                    }
                                >{8 * i + j + 1}</div>
                            })
                            }
                            
                        </div>
                        
                    );
                })
                }
                {selectedSeat.length? <Button variant="success">Book Tickets</Button>:""}
            </Container>
        </div>
    )
}

export default SeatSelection;
