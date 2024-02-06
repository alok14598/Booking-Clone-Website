import "./FeaturedPL.css"
import useFetch from "../../Hooks/useFetch";

const FeaturedPL = () => {

    const {data,loading,error} = useFetch("/hotel?featured=true");

    return <div className="featuredPL">

{loading ? ("loading") : (<> {data.map((item) =>(
 <div className="featuredPLItem" key={item._id}>
    <img src="https://cf.bstatic.com/xdata/images/hotel/square600/286659200.webp?k=9206fc9239b3e4538c22d04b85213d6d5e6257015022de8a37effd956fcde4b6&o=&s=1"
    className="featuredPLImg" />
    <span className="featuredPLTitle">{item.name} </span>
    <span className="featuredPLCity">{item.city}</span>
    <span className="featuredPLrate">Starting from ${item.cheapestPrice}</span>
    <div className="featuredPLratings">
        <button className="featuredPLButton">8.9</button>
        <span className="featuredPLtext">Excellent</span>
    </div>
</div>)

)}
</>)}
    </div>

}
export default FeaturedPL;