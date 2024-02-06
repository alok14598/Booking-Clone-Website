import { Link } from "react-router-dom";
import "./lsFeature.css"

const Feature= ({item}) => {

    
    return <div className="lsFeature">
    <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
    className="listImage"
    >
    </img>
    <div className="lsDetails">
        <label className="lstitle">{item.name}</label>
        <span className="lsdist"> {item.distance} from Center</span>
        <button className="lstaxi">Free Airport Taxi</button>
        <span className="lsdesc">Studio Apartment with Air Conditioning</span>
        <span className="desc">Entire studio 1 bathroom 21m full bed</span>
        <span className="cancellation">Free Cancellation</span>
        <span className="later"> You can cancel later, so lock in this price today</span>
    </div>
    <div className="lsDescription">
        <div className="excelllent">
            <span>Excellent</span>
            <button className="btndesc">8.9</button>
        </div>
        <div className="avail">
            <span className="dollar"> ${item.cheapestPrice}</span>
            <span className="tax">Includes Taxes and Services</span>
            <Link to={`/Hotel/${item._id}`}>
            <button className="availbtn">See Availability</button></Link>
        </div>
    </div>
    </div>
}

export default Feature;