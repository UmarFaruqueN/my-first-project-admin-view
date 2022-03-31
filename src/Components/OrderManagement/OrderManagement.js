import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";


import { setOrders } from "../../Redux";
import { getAllOrder } from "./index";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import OrderTable from "./Components/OrderTable";

const OrderManagement = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const allOrders = useSelector((state) => state.orders.value);

     useEffect(() => {
          axios.get(getAllOrder, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allOrders);
                    dispatch(setOrders({ orders: response.data.allOrders }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     console.log(allOrders);

     return (
          <>
               <Grid container pb={2}>
                    <Grid
                         item
                         md={12}
                         sx={{
                              backgroundColor: "#ffffff",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pl: 2,
                              pr: 2,
                         }}
                    >
                         <Grid item sx={{ display: "flex", alignItems: "center" }}>
                              <Grid item>
                                   {" "}
                                   <Typography variant="h4"> Filter By:</Typography>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <Button color="secondary" size="small">
                                        Monthly
                                   </Button>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <Button color="secondary" size="small">
                                        Weekly
                                   </Button>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <Button color="error" size="small">
                                        Clear Filter
                                   </Button>
                              </Grid>
                         </Grid>

                         <Grid item sx={{ display: "flex" }}>
                              <Grid item>
                                   <IconButton>
                                        <PictureAsPdfIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                              <Grid item>
                                   <IconButton>
                                        {" "}
                                        <CloudDownloadIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                         </Grid>
                    </Grid>
               </Grid>

               <OrderTable data={allOrders}/>
          </>
     );
};

export default OrderManagement;
