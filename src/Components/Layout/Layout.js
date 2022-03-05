import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../Buttons/logOutButton";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const drawerWidth = 240;
const Layout = ({ children }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h2" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Admin Pannel
                    </Typography>
                    <LogOutButton />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />

                <Divider />
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
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
