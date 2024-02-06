import "./featured.css"
import useFetch from"../../Hooks/useFetch";
const Featured = () => {

    const {data,loading,error} = useFetch("https://bookingbackend-m7ip.onrender.com/hotel/countByCity?cities=berlin,madrid,london");
   
    return <div className="featured">

     { loading ? "its loading " : <> <div className="FeatuedItem">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
            className="featuredImg"/>
            <div className="featuredTitle">
                <h1>Berlin</h1>
                <h2>{data[0]}  Properties </h2>
            </div>
        </div>
        <div className="FeatuedItem">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
            className="featuredImg"/>
            <div className="featuredTitle">
                <h1>Madrid</h1>
                <h2>{data[1]} Properties</h2>
            </div>
        </div><div className="FeatuedItem">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
            className="featuredImg"/>
            <div className="featuredTitle">
                <h1>London</h1>
                <h2>{data[2]} Properties</h2>
            </div>
        </div></>}
    </div>
}

export default Featured;
