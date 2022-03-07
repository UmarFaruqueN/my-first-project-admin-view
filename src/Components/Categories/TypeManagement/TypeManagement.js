import React, { useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import { getType, deleteType, setType, AddTypeDialouge, EditTypeDialouge } from "../";

const TypeManagement = () => {
     const dispatch = useDispatch();
     const type = useSelector((state) => state.type.value);

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm();

     useEffect(() => {
          axios.get(getType, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    // alert(response.data.message)
                    dispatch(setType({ type: response.data?.allType }));
                    console.log(type);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
               });
     }, []);

     const DeleteType = (catData) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.post(deleteType, catData, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setType({ type: response.data?.typeData }));
                              console.log(type);
                         })
                         .catch((err) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                              console.log(err.response.data.message);
                         });
               }
          });
     };

     return (
          <>
               <Box
                    component="form"
                    sx={{
                         "& > :not(style)": { m: 1, width: "25ch" },
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-around",
                    }}
                    noValidate
                    autoComplete="off"
               >
                    <AddTypeDialouge />
               </Box>

               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>Type Name</TableCell>
                                   <TableCell align="right">Update</TableCell>
                                   <TableCell align="right">Delete</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {type?.map((obj) => (
                                   <TableRow key={obj.typeCode}>
                                        <TableCell component="th" scope="row">
                                             {obj.type}
                                        </TableCell>
                                        <TableCell align="right">
                                             <EditTypeDialouge data={obj} />
                                        </TableCell>
                                        <TableCell align="right">
                                             <DeleteIcon
                                                  onClick={() => {
                                                       DeleteType(obj);
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
          </>
     );
};

export default TypeManagement;
