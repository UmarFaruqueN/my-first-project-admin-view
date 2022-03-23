import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./utlis/Theme";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import UserHome from "./Pages/UserHome";
import CategoryHome from "./Pages/CategoryHome";
import ProductHome from "./Pages/ProductHome";
import AddImage from "./Components/ProductManagement/Components/AddImage";
import AddProducts from "./Pages/AddProducts";
import BackFromImage from "./Components/ProductManagement/Components/BackFromImage";
import EditProduct from "./Components/ProductManagement/Components/EditProduct";
import EditImage from "./Components/ProductManagement/Components/EditImage";
import BannerHome from "./Pages/BannerHome";

function App() {
     const Token = localStorage.getItem("token");
     useEffect(() => {}, []);

     return (
          <ThemeProvider theme={customTheme}>
               <div className="App">
                    <Routes>
                         <Route exact path="/" element={<Login />} />
                         {Token && <Route exact path="/userManagement" element={<UserHome />} />}
                         {Token && <Route exact path="/categoryManagement" element={<CategoryHome />} />}
                         {Token && <Route exact path="/productManagement" element={<ProductHome />} />}
                         {Token && <Route exact path="/bannerManagement" element={<BannerHome/>} />}T
                         <Route exact path="/addProduct" element={<AddProducts />} />
                         <Route exact path="/addImage:_id" element={<AddImage />} />
                         <Route exact path="/backFromImage:_id" element={<BackFromImage />} />
                         <Route exact path="/editProduct:_id" element={<EditProduct />} />
                         <Route exact path="/editImage:_id" element={<EditImage />} />
                    </Routes>
               </div>
          </ThemeProvider>
     );
}

export default App;
