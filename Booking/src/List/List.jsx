import { useLocation } from "react-router-dom";
import Header from "../components/Header/header.jsx";
import Navbar from "../components/Navbar/navbar.jsx";
import { format, setDate } from 'date-fns';
import { useContext, useState } from "react";
import "./List.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from "react-date-range";
import Feature from "../components/lsFeature/lsFeature.jsx";
import useFetch from "../Hooks/useFetch";


const List = ()=>{

  const locate=useLocation();
  const [destination, setdestination]=useState(locate.state.destination);

  const [date, setdate] = useState(locate.state.date);
  const [opendate,setOpenDate]=useState(false);
  const [options,setOptions] =useState(locate.state.options);
  const [min,setMinPrice] =useState(undefined);
  const [max,setMaxPrice] =useState(undefined);


 const  {data,loading,error,reFetch} = useFetch(`/hotel?city=${destination}&min=${min|| 0}&max=${max|| 999}`);
  
 const searchHotel = () => {
    reFetch();
 }


  return  <div>
        <Navbar/>
        <Header type ="list"/>
        <div className="listContainer">
          <div className="listwrapper">
            <div className="listSearch">
              <span className="listtitle">Search</span>
              <div className="SearchItem">
                <span className="SearchItemTitle">Destination</span>
                <input type="text" placeholder={destination}/>
        
              </div>
              <div className="SearchItem">
                <span className="SearchItemTitle" >Check-In Date</span>
                <span className="sidate" onClick={()=> setOpenDate(!opendate)}> 
                {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
               {opendate && (<DateRange 
                onChange={(item) => setdate([item.selection])}
                ranges={date}
                minDate={new Date()}
                className="date"
                />)}
              </div>
              
              <div className="lisItemOption">
              <label>Options</label>
              <div className="optionItem">
                <span className="lsTitle" >Min Price <small>per Night</small></span>
                <input type="number" onChange={(e)=> setMinPrice(e.target.value)}/>
              </div>
              <div className="optionItem">
                <span className="lsTitle" >Max Price <small>per Night</small></span>
                <input type="number" onChange={(e)=> setMaxPrice(e.target.value)}/>
              </div>
              <div className="optionItem">
                <span className="lsTitle">Adult</span>
                <input type="number" placeholder={options.adult}/>
              </div>
              <div className="optionItem">
                <span className="lsTitle">Children</span>
                <input type="number"/>
              </div>
              <div className="optionItem">
                <span className="lsTitle">Room</span>
                <input type="number"/>
              </div>
               </div>
              <button className="lssearchButton" onClick={searchHotel}>Search</button>
            </div>
              <div className="listResult">
             {loading ? "loading" :   <>

             { data.map(item =>
              <Feature item={item} key={item._id}/>
              
               )
             }</>}
               
               
              </div>
          </div>
        </div>
   </div>
};

export default List;