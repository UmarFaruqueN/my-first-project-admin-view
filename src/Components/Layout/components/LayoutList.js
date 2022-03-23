import React from "react";

import { List, ListItem, ListItemIcon, Divider, ListItemText } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

import { useNavigate } from "react-router-dom";

const LayoutList = () => {
     const navigate = useNavigate();
     return (
          <>
               <List>
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/userManagement");
                         }}
                    >
                         <ListItemIcon>
                              <PersonIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>User Management</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/categoryManagement");
                         }}
                    >
                         <ListItemIcon>
                              <CategoryIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Category Management</ListItemText>
                    </ListItem>
                    <Divider />

                    <ListItem
                         button
                         onClick={() => {
                              navigate("/productManagement");
                         }}
                    >
                         <ListItemIcon>
                              <ProductionQuantityLimitsIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Product Management</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem
                         button
                         onClick={() => {
                              navigate("/bannerManagement");
                         }}
                    >
                         <ListItemIcon>
                              <ViewCarouselIcon color="secondary" />
                         </ListItemIcon>
                         <ListItemText>Banner Management</ListItemText>
                    </ListItem>
                    <Divider />
               </List>
          </>
     );
};

export default LayoutList;
