import "./Hotel.css";
import Navbar from "../components/Navbar/navbar"
import Header from "../components/Header/header"
import Reserve from "../components/Reserve/reserve"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faCircleXmark, faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import Mail from "../components/mail/mail.jsx"
import {  useContext, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../components/Context/SearchContext";
import { AuthContext } from "../components/Context/AuthContext";





const Hotel = () =>{
  const images=[{src:"https://cf.bstatic.com/xdata/images/hotel/max300/443808283.webp?k=e93a059bd431ea81cfea542c67fd6f1701f6ce3d99455388530b27defd5e3d99&o="},
  {src:"https://cf.bstatic.com/xdata/images/hotel/max300/449475834.webp?k=4441be0eb85abcf5cec7c668b8a74e5a2f6b483a62a834557aa5962d9c665a3d&o="},
  {src:"https://cf.bstatic.com/xdata/images/hotel/max300/428123452.webp?k=09074157cce1bef2dce0a4aedc6e52ef72ddbfae08e92b4953edcf773c16ba9e&o="},
  {src:"https://cf.bstatic.com/xdata/images/hotel/max300/417566418.webp?k=e38f76e43b728cc06b2a5a8e54dcd15c732ab583b35861b4390ea82667d894a4&o="},
  {src:"https://cf.bstatic.com/xdata/images/hotel/max300/282136945.webp?k=2f946ef37ad423cae516b82744484b54ddbe68293a623a11ab29fa0b58c41a2a&o="},
  {src:"https://cf.bstatic.com/xdata/images/hotel/max300/386033365.webp?k=bab21739930d38a52cc3c55acaf1e8ccf2ac5cea80e01550bf330318211fa8b5&o="}, 
]

const [openSlider,setOpenSlider]=useState(false);
const [indexNumber,setIndexNumber] =useState(0);

const handleOpen = (index) => {
  setOpenSlider(true);
  setIndexNumber(index);
}

const handleImage  = (destination) => {
    let  newIndexNumber;
    if(destination==="l"){
      newIndexNumber = indexNumber === 0 ? 5  : indexNumber-1;
    }
    else {
      newIndexNumber = indexNumber === 5 ? 0  : indexNumber+1;
    }
    setIndexNumber(newIndexNumber);
}

const location =useLocation();
const id=location.pathname.split("/")[2];

const  {data,loading,error,reFetch} = useFetch(`/hotel/find/${id}`);
const {user} =useContext(AuthContext);


const  {date, options}= useContext(SearchContext);

const navigate =useNavigate();
const daysdifference= (date1,date2) => {
  const timediff= Math.abs(date2.getTime() - date1.getTime());
  const diffdate= Math.ceil(timediff/(1000*60*60*24));
  return diffdate+1;
}
const handleReserveSearch = () => {
  if(user) {
    setopenModal(true);

  }
  else {
    navigate("/login");
  }
}
const [openModal,setopenModal] =useState(false);
const days=daysdifference(date[0].endDate,date[0].startDate);
  return  <div>
     <Navbar></Navbar>
     <Header type="list"></Header>
    {loading ? "loading" : <div className="hotelContainer">
    {openSlider && <div className="Slider">
      <div className="sliderWrapper">
      <FontAwesomeIcon icon={faCircleXmark} className="closeImage" onClick={()=>setOpenSlider(false)}/>
      <FontAwesomeIcon icon={faArrowLeft} className="arrowKeys" onClick={() => handleImage("l")} />
      <img src={images[indexNumber].src} />
      <FontAwesomeIcon icon={faArrowRight}  className="arrowKeys"  onClick={() => handleImage("r")} />
      </div>
     </div>}
      <div className="hotelWrapper">
        <span className="hotelTitle">{data.name}</span>
        <div className="hotelLocation">
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{data.Address}</span>
        </div>
        <span className="hoteladdress">Excellent Locaton- {data.distance} from Center</span>
        <span className="hotelpoint"> Book a stay over $114 at this proprty and get a free airport taxi</span>
        <div className="imagesWrapper">
        {images.map((image,i)=>(
          <div className="singleImageWrapper">
            <img src={image.src} className="singleImage" onClick={() => handleOpen(i)}/>
          </div>
        )
        
        )} </div>
          <div className="hotelDescription">
            <div className="hotelDescleft">
            <h1>Stay in the Heart of Delhi</h1>
            <p className="descContent">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            </div>
            <div className="hotelDescright">
            <h3>Perfect for a 9- Day Stay</h3>
            <span className="hoteldesc">Located i the Reat heat of Delhi,this property is an excellent location score of 9.8</span>
            <span className="hotelPrice">$<b>{(options.rooms * days * data.cheapestPrice)} </b>({days})</span>
            <button onClick={handleReserveSearch}> Reserve or Book Now</button>
              
            </div>
          </div>


      </div>
      <Mail></Mail>
    
      {openModal && <>
   
        <Reserve setOpen={setopenModal} hotelId={id} />
      </>}
     
     </div>}l
     
   
  
    </div>

};

export default Hotel;