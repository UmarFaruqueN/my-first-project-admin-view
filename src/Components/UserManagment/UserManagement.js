import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { getUsers, updateUserStatus, deleteUser } from "../../utlis/Constants";
import EditUSer from "./components/EditUser";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../Redux/userData/userData";

const UserManagement = () => {
     const dispatch = useDispatch();
     const userData = useSelector((state) => state.userData.value);

     useEffect(() => {
          axios.get(getUsers, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    // alert(response.data.message)
                    dispatch(setUserData({ userData: response.data.userData }));
                    console.log(userData);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.data.message);
               });
     }, []);

     const Submit = (userInfo) => {
          console.log("info");
          console.log(userInfo);
          axios.post(updateUserStatus, userInfo, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    alert(response.data.message);
                    dispatch(setUserData({ userData: response.data.userData }));
                    console.log(userData);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.data.message);
               });
     };

     const DeleteUser = (userInfo) => {
          axios.post(deleteUser, userInfo, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    alert(response.data.message);
                    dispatch(setUserData({ userData: response.data.userData }));
                    console.log(userData);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.data.message);
               });
     };

     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="center">Number</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Block/Unblock</TableCell>
                              <TableCell align="center">Edit</TableCell>
                              <TableCell align="center">Delete</TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {userData.map((user) => (
                              <TableRow key={user._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                   <TableCell component="th" scope="row">
                                        {user.name}
                                   </TableCell>
                                   <TableCell align="left">{user.email}</TableCell>
                                   <TableCell align="center">{user.phone}</TableCell>

                                   <TableCell align="center">{user.active ? "Active" : "Blocked"}</TableCell>
                                   <TableCell align="center">
                                        {user.active ? (
                                             <BlockIcon
                                                  cursor="pointer"
                                                  color="error"
                                                  onClick={() => {
                                                       Submit(user);
                                                  }}
                                             />
                                        ) : (
                                             <DoneIcon
                                                  cursor="pointer"
                                                  color="success"
                                                  onClick={() => {
                                                       Submit(user);
                                                  }}
                                             />
                                        )}
                                   </TableCell>

                                   <TableCell align="center">
                                        <EditUSer data={user} />
                                   </TableCell>

                                   <TableCell align="center">
                                        <DeleteIcon
                                             onClick={() => {
                                                  DeleteUser(user);
                                             }}
                                             cursor="pointer"
                                             color="error"
                                        />
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default UserManagement;
