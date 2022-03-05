import React, { useEffect } from "react";
import {
     Button,
     Typography,
     Box,
     TextField,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableRow,
     Paper,
     TableContainer,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { addCategory, getCategory, deleteCategory } from "../../../utlis/Constants";
import { setCategory } from "../../../Redux/category/category";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCategoryDialouge from "./components/EditCategoryDialouge";
import AddCategoryDialouge from "./components/AddCategoryDialouge";

const CategoryManagement = () => {
     const dispatch = useDispatch();
     const category = useSelector((state) => state.category.value);

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm();

     useEffect(() => {
          axios.get(getCategory, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    // alert(response.data.message)
                    dispatch(setCategory({ category: response.data?.allCategory }));
                    console.log(category);
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
               });
     }, []);

     const DeleteCategory = (catData) => {
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
                    axios.post(deleteCategory, catData, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setCategory({ category: response.data?.categoryData }));
                              console.log(category);
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
                    <AddCategoryDialouge />
               </Box>

               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>Category Name</TableCell>
                                   <TableCell align="right">Update</TableCell>
                                   <TableCell align="right">Delete</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {category?.map((obj) => (
                                   <TableRow key={obj.categoryCode}>
                                        <TableCell component="th" scope="row">
                                             {obj.category}
                                        </TableCell>
                                        <TableCell align="right">
                                             <EditCategoryDialouge data={obj} />
                                        </TableCell>
                                        <TableCell align="right">
                                             <DeleteIcon
                                                  onClick={() => {
                                                       DeleteCategory(obj);
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

export default CategoryManagement;
