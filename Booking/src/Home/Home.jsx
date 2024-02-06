import Navbar from "../components/Navbar/navbar.jsx";
import Header from "../components/Header/header.jsx";
import Featured from "../components/Featured/featured.jsx";
import FeaturedPL from "../components/FeaturedPL/FeaturedPL.jsx"
import FeaturedPlaces from "../components/FeaturedPlaces/FeaturedPlaces.jsx";
import Mail from "../components/mail/mail.jsx"
import Footer from "../components/Footer/footer.jsx"
import "./Home.css"
const Home = () =>{
  return  <div>
   <Navbar/>
<Header />
<div className="homeContainer">
  <Featured></Featured>
  <h1 className="homeTitle">Browse by property type</h1>
  <FeaturedPlaces></FeaturedPlaces>
  <h1 className="homeTitle">Home Guest love</h1>
  <FeaturedPL></FeaturedPL>
  <Mail></Mail>
  <Footer></Footer>
</div>
    </div>
};

export default Home;