import { faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
import "./header.css";
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';



const Header = ({type}) => {
    const navigate =useNavigate();
    const [destination, setdestination]=useState();
    const [openDate,setOpenDate] = useState(false);
    const [date, setdate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
    const [options,setOptions] =useState({
        adult: 1,
        children: 0,
        rooms: 1,
    });
    const  {dispatch}= useContext(SearchContext);
     const handleSearch = () => {
      dispatch({type:"NEW_STATE",payload :{destination,date,options}});
    
        navigate("/Hotel",{state: {destination,date,options}})
     }
    const[openOptions,setOpenOptions]=useState(false);

    
    
    const handlebutton = (name, operation) => {
        setOptions((prev) => {
           return {
            ...prev,[name]: operation ==="i" ? options[name]+1 : options[name]-1,
           };
        });
    };

  

    return (
        <div className="Header">
            <div className={type === "list" ? "HeaderContainer listmodev" : "HeaderContainer"}>
                <div className="HeaderList">
                    <div className="HeaderListItems active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                    </div>
                    <div className="HeaderListItems">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                    </div>
                    <div className="HeaderListItems">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                    </div>
                    <div className="HeaderListItems">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                    </div>
                    <div className="HeaderListItems">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport Taxis</span>
                    </div>

                </div>
                { type !== "list" &&  <> 
                <h1 className='HeaderTitle'>A lifeline of Discounts? It's Genius </h1>
                <p className='HeaderDesc'>Get Rewarded for your Travels - unlock instant Savings of 10% or more with a free Account</p>
                <button className='HeaderButton'>SignIn/Register</button>
              
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed}  className='SearchIcon'/>
                        <input type='text' placeholder='Where are you going ?' className="HeaderSearchInput"
                        onChange={e=>setdestination(e.target.value)}></input>
                    </div>
                    <div className="headerSearchItem" >
                        <FontAwesomeIcon icon={faCalendarDay} className='SearchIcon'/>
                        <span  className='HeaderSearchtext' onClick={()=> setOpenDate(!openDate)}> 
                        {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}
                        </span>
                              
                      {openDate &&  <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setdate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="datee"
                            /> }
                    </div>
                    <div className="headerSearchItem" >
                        <FontAwesomeIcon icon={faPerson} className='SearchIcon'/>
                        <span onClick={()=> setOpenOptions(!openOptions)} className='HeaderSearchtext' >{`${options.adult} Adult ${options.children} Children ${options.rooms} Rooms`}</span>
                           { openOptions && <div className='Options'>
                                <div className='optionItem'>
                                    <span>Adult</span>
                                    <div className='optionCounterItem'>
                                    <button disabled={options.adult<=1} className='OptionItemButton' onClick={()=> {handlebutton("adult","d")}}>-</button>
                                    <span>{`${options.adult}`}</span>
                                    <button className='OptionItemButton' onClick={()=> handlebutton("adult","i")}>+</button>
                                    </div>
                                </div>
                                <div className='optionItem'>
                                    <span>Children</span>
                                    <div className='optionCounterItem'>
                                    <button disabled={options.children<=0} className='OptionItemButton' onClick={()=> handlebutton("children","d")}>-</button>
                                    <span>{`${options.children}`}</span>
                                    <button className='OptionItemButton' onClick={()=> handlebutton("children","i")}>+</button>
                                    </div>
                                </div> 

                                <div className='optionItem'>
                                    <span>Rooms</span>
                                    <div className='optionCounterItem'>
                                    <button disabled={options.rooms<=1} className='OptionItemButton' onClick={()=> handlebutton("rooms","d")}>-</button>
                                    <span>{`${options.rooms}`}</span>
                                    <button className='OptionItemButton' onClick={()=> handlebutton("rooms","i")}>+</button>
                                    </div>
                                </div> 
                            </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className='HeaderButton' onClick={handleSearch}>
                    
                        Search</button>
                    </div>
                </div>
        

                </>}
            </div>

        </div>
    )
}

export default Header;