import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom"
import { SearchContext } from "../Context/SearchContext";
import "./reserve.css";
import axios from "axios";
const Reserve = ({setOpen,hotelId}) => {
    const {data} =useFetch(`https://bookingbackend-m7ip.onrender.com/hotel/getrooms/${hotelId}`);
const [selectedRoom,setSelectedRoom] =useState([]);

const {date} = useContext(SearchContext);

const navigate=useNavigate();
const handleRoom = (e) => {
    const checked=e.target.checked;
    const value=e.target.value;
    setSelectedRoom( checked ? [...selectedRoom,value] : selectedRoom.filter(item => item !== value));
};


const getDatesInRange= (startDate,endDate) => {
    const start=new Date(startDate);
    const end=new Date(endDate);
    const dates=new Date(start.getTime());

    const datelist=[];

    while(dates <= end){
      
      datelist.push(new Date(dates).getTime());
        dates.setDate(dates.getDate() + 1);
    }
  
    return datelist;

}

const alldates=(getDatesInRange(date[0].startDate,date[0].endDate));

const isAvailable = (roomNumber) => {
  // console.log("Room Id is ");
  
  // const temp=roomNumber.unavailableDates;
  // console.log("Unavailable Dates");
  // console.log(temp);
  // console.log("alldates selected now");
  // console.log(alldates);
 
  const isFound = roomNumber.unavailableDates.some((datess) => 
      alldates.includes(new Date(datess).getTime())
    );

//   const isFound = temp.some((datess) =>{
//     console.log("Datess" + datess)
//     console.log("Inside");
//  console.log(new Date(datess).getTime());
//  console.log(alldates.includes(new Date(datess).getTime()));
//   alldates.includes(new Date(datess).getTime());
// }
//   );
  console.log("Value of isFound " + isFound);
  return !isFound;
};



const handleclick = async() => {
try {
await Promise.all(selectedRoom.map((roomdate) => {
  console.log(selectedRoom);
    const res= axios.put(`/room/available/${roomdate}`, 
    {date : alldates}
    )

return res.data;
}))
setOpen(false);
navigate("/");

}catch(err){
    
}


}



return <div className="reserve">
<div className="rcontainer"> 
<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false) } /> 
<span>Select your Rooms: </span>
{data.map(item => (
    <div className="rItem">
        <div className="rInfo">
        <div className="rTitle"> {item.title}</div>
        <div className="rDesc">{item.Desc}</div>
        <div className="rMaxPeople">Max People : {item.maxPeople}</div>
        <div className="rPrice">Price: {item.price}</div>
        </div>
      <div className="roomSelector"> 
       {item.roomNumbers.map(roomNumber => (
            <div className="rRoom">
            <label className="rNumber">{roomNumber.number}</label>
            <input type="checkbox" value={roomNumber._id} onChange={handleRoom}   disabled={!isAvailable(roomNumber)}/>
        
            </div>
            ))} </div>
    </div>
))}
<div onClick={handleclick} className="rButton">Reserve Now</div>
</div>
</div> 

}

export default Reserve;
