import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StatusUpdation from "./Components/StatusUpdation";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { setOrders } from "../../Redux";
import { getAllOrder } from "./index";

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
     }, []);

     console.log(allOrders);

     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell align="left"> Order id</TableCell>
                              <TableCell align="left">Customer</TableCell>
                              <TableCell align="left">Amount</TableCell>
                              <TableCell align="left">Payment</TableCell>
                              <TableCell align="left">Ordered On</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="left">Updated On</TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {allOrders.map((obj) => (
                              <TableRow key={obj._id}>
                                   <TableCell sx={{ cursor: "pointer" }} align="left">
                                        {obj._id.slice(18, 24)}
                                   </TableCell>
                                   <TableCell align="left">{obj.name}</TableCell>
                                   <TableCell align="left">{obj.total}</TableCell>
                                   <TableCell align="left">{obj.paymentType}</TableCell>
                                   <TableCell align="left">{obj.orderTime}</TableCell>
                                   <TableCell align="center">
                                        <StatusUpdation data={obj} />
                                   </TableCell>
                                   <TableCell align="left">{obj.statusTime}</TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default OrderManagement;
