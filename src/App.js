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
import OrderHome from "./Pages/OrderHome";
import DashBoard from "./Pages/Dashboard"
import SalesReport from "./Pages/SalesReport";
import OfferManagement from "./Pages/OfferManagement";

function App() {
     return (
          <ThemeProvider theme={customTheme}>
               <div className="App">
                    <Routes>
                         <Route exact path="/" element={<Login />} />
                         <Route exact path="/dashboard" element={<DashBoard />} />
                         <Route exact path="/userManagement" element={<UserHome />} />
                         <Route exact path="/categoryManagement" element={<CategoryHome />} />
                         <Route exact path="/productManagement" element={<ProductHome />} />
                         <Route exact path="/offerManagement" element={<OfferManagement />} />
                         <Route exact path="/bannerManagement" element={<BannerHome />} />
                         <Route exact path="/orderManagement" element={<OrderHome />} />
                         <Route exact path="/salesReport" element={<SalesReport />} />
                         <Route exact path="/addProduct" element={<AddProducts />} />
                         <Route exact path="/addImage:_id" element={<AddImage />} />
                         <Route exact path="/backFromImage:_id" element={<BackFromImage />} />
                         <Route exact path="/editProduct:_id" element={<EditProduct />} />
                         <Route exact path="/editImage:_id" element={<EditImage />} />
                         <Route
                              path="*"
                              element={
                                   <main style={{ padding: "1rem" }}>
                                        <p>404 Page Note Found</p>
                                   </main>
                              }
                         />
                    </Routes>
               </div>
          </ThemeProvider>
     );
}

export default App;
