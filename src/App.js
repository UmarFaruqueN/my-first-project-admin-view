import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./utlis/Theme";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import UserHome from "./Pages/UserHome";
import CategoryHome from "./Pages/CategoryHome";
import ProductHome from "./Pages/ProductHome";
import AddImage from "./Components/ProductManagement/Components/AddImage";

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
                         <Route exact path="/test" element={<AddImage />} />
                    </Routes>
               </div>
          </ThemeProvider>
     );
}

export default App;
