import React, { useEffect } from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { AddProduct, getProduct, deleteProduct, setProducts, setCategory, setSubCategory, setType } from "./";

function ProductManagement() {
     const dispatch = useDispatch();
     const allProducts = useSelector((state) => state.products.value);
     useEffect(() => {
          axios.get(getProduct, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allProduct);
                    dispatch(setProducts({ products: response.data.allProduct }));
                    dispatch(setCategory({ category: response.data.allCategory }));
                    dispatch(setSubCategory({ subCategory: response.data.allSubCategory }));
                    dispatch(setType({ type: response.data.allType }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);

     // useEffect(() => {
     //      axios.get(getProduct, { headers: { "Content-Type": "application/json" } })
     //           .then((response) => {
     //                console.log("success");
     //                console.log(response.data.allProduct);
     //                dispatch(setProduct({ product: response.data.allProduct }));
     //           })
     //           .catch((error) => {
     //                console.log(error);
     //           });
     // }, [products]);

     const DeleteProduct = (productData) => {
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
                    axios.post(deleteProduct, productData, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setProducts({ products: response.data.productData }));
                              console.log(allProducts);
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
               <Box sx={{ display: "flex", justifyContent: "space-around", paddingBottom: "10px" }}>
                    <AddProduct />
               </Box>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                         <TableHead>
                              <TableRow>
                                   <TableCell>Product Name</TableCell>
                                   <TableCell align="right">Model Number</TableCell>
                                   <TableCell align="right">Category</TableCell>
                                   <TableCell align="right">SubCategory</TableCell>
                                   <TableCell align="right">Type</TableCell>
                                   <TableCell align="right">LandingCost</TableCell>
                                   <TableCell align="right">Selling Price</TableCell>
                                   <TableCell align="right">Description</TableCell>
                                   <TableCell align="right">Image</TableCell>
                                   <TableCell align="right">Edit</TableCell>
                                   <TableCell align="right">Delete</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {allProducts?.map((obj) => (
                                   <TableRow key={obj.ModelNumber}>
                                        <TableCell component="th" scope="row">
                                             {obj.ProductName}
                                        </TableCell>
                                        <TableCell align="right">{obj.ModelNumber}</TableCell>
                                        <TableCell align="center">{obj.Category}</TableCell>
                                        <TableCell align="center">{obj.SubCategory}</TableCell>
                                        <TableCell align="center">{obj.Type}</TableCell>
                                        <TableCell align="center">{obj.LandingCost}</TableCell>
                                        <TableCell align="center">{obj.SellingPrice}</TableCell>
                                        <TableCell align="center">{obj.Description}</TableCell>
                                        <TableCell align="center">image</TableCell>
                                        <TableCell align="center">Edit</TableCell>

                                        <TableCell align="center">
                                             {" "}
                                             <DeleteIcon
                                                  onClick={() => {
                                                       DeleteProduct(obj);
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
}

export default ProductManagement;
