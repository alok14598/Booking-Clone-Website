import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import List from "./List/List.jsx";
import Hotel from "./Hotel/Hotel.jsx";
import Login from "./LOGIN/login.js";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotel" element={<List/>}/>
      <Route path="/Hotel/:id" element={<Hotel/>}/>
      <Route path="/login" element= {<Login/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
