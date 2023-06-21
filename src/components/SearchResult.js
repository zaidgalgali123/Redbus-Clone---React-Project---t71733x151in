import React, { useContext } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import BusResult from "./BusResult";
import { Button } from "react-bootstrap";
import JourneyContext from "../context/JourneyContext";
import { useNavigate } from "react-router-dom";
const SearchResult = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { from, to } = useContext(JourneyContext);
  const navigate = useNavigate();

  const [srtbyDeparture, setSrtbyDeparture] = useState("ascending");
  const [srtbyArrival, setSrtbyArrival] = useState("ascending");
  const [srtbyPrice, setSrtbyPrice] = useState("ascending");
  function calculateSec(str) {
    if (str.length === 7) {
      const hh = parseInt(str.substring(0, 2)) * 3600;
      const mm = parseInt(str.substring(3, 5)) * 60;
      let hd = 0;
      if (str.substring(5, 7) === "PM" && hh !== 12) hd = 43200;
      return hh + mm + hd;
    } else {
      const hh = parseInt(str.substring(0, 1)) * 3600;
      const mm = parseInt(str.substring(2, 4)) * 60;
      let hd = 0;
      if (str.substring(4, 6) === "PM" && hh !== 12) hd = 43200;
      return hh + mm + hd;
    }
  }
  function sortByDeparture() {
    const sortedList = [...buses];
    if (srtbyDeparture === "ascending") {
      sortedList.sort(
        (a, b) => calculateSec(a.departureTime) - calculateSec(b.departureTime)
      );
      setBuses(sortedList);
      setSrtbyDeparture("descending");
    } else {
      sortedList.sort(
        (a, b) => calculateSec(b.departureTime) - calculateSec(a.departureTime)
      );
      setBuses(sortedList);
      setSrtbyDeparture("ascending");
    }
    setSrtbyArrival("ascending");
    setSrtbyPrice("ascending");
  }
  function sortByArrival() {
    const sortedList = [...buses];
    if (srtbyArrival === "ascending") {
      sortedList.sort(
        (a, b) => calculateSec(a.arrivalTime) - calculateSec(b.arrivalTime)
      );
      setBuses(sortedList);
      setSrtbyArrival("descending");
    } else {
      sortedList.sort(
        (a, b) => calculateSec(b.arrivalTime) - calculateSec(a.arrivalTime)
      );
      setBuses(sortedList);
      setSrtbyArrival("ascending");
    }
    setSrtbyDeparture("ascending");
    setSrtbyPrice("ascending");
  }
  function sortByPrice() {
    const sortedList = [...buses];
    if (srtbyPrice === "ascending") {
      sortedList.sort((a, b) => a.ticketPrice - b.ticketPrice);
      setBuses(sortedList);
      setSrtbyPrice("descending");
    } else {
      sortedList.sort((a, b) => b.ticketPrice - a.ticketPrice);
      setBuses(sortedList);
      setSrtbyPrice("ascending");
    }
    setSrtbyArrival("ascending");
    setSrtbyDeparture("ascending");
  }

  useEffect(() => {
    if (!from || !to) {
      navigate("/");
    }
  }, []);
  async function fetchBuses() {
    setIsLoading(true);
    const response = await fetch(
      `https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses`
    );
    const allBuses = await response.json();
    setIsLoading(false);
    setBuses(allBuses);
    console.log(allBuses);
  }
  useEffect(() => {
    fetchBuses();
  }, [from, to]);
  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }

  // function sortResults(criteria) {
  //   if (criteria === "Price") {
  //     const busesCopy = [...buses];
  //     const sortedBuses = busesCopy.sort((a, b) => {
  //       if (Number(a.ticketPrice) < Number(b.ticketPrice)) return -1;
  //       return 1;
  //     });
  //     setBuses(sortedBuses);
  //   }
  // }
  return (
    <div className="bg-danger p-2 d-flex flex-column">
      <div className="bg-white p-2 d-flex w-75 align-self-center">
        <h4 className="w-50">Sort By</h4>
        <div className="d-flex justify-content-around w-100">
          <Button variant="danger" onClick={sortByDeparture}>
            Departure
          </Button>
          <Button variant="danger" onClick={sortByArrival}>
            Arrival
          </Button>
          <Button variant="danger" onClick={sortByPrice}>
            Price
          </Button>
        </div>
      </div>
      {buses.map((bus) => {
        return <BusResult bus={bus} />;
      })}
    </div>
  );
};

export default SearchResult;

/*
https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses
*/
 
