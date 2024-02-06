import "./FeaturedPlaces.css"
import useFetch from "../../Hooks/useFetch";
const Featuredplaces =()=> {

    
    const {data,loading,error} = useFetch("https://bookingbackend-m7ip.onrender.com/hotel/countByType");
    const images =[
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/119467716.jpeg?k=63b69100225782d08fbd4d0205bf949c0be894ab946a0366edb8ad48e9c0ef46&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&o=",
    ]
    return <div className="featuredplaces">
    { loading ? "loading" : <> {data && images.map((img,i) => (
     <div className="featuredItem" key={i}>
        <img src={img}
        className="featuredPlaceImg"/>
        <div className="featuredPlaceTitle">
        <h1>{data[i]?.type}</h1>
        <h2>{data[i]?.count} {data[i]?.type}</h2>
        </div>
    </div>))}

    </>}
    

    </div>
}

export  default Featuredplaces
