import React, { useEffect } from "react";

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditCateButton from "../Buttons/EditCateButton";
import AddProductButton from "../Buttons/AddProductButton";
import { Box } from "@mui/system";

import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../../Redux/product/product";
import axios from "axios";
import { getProduct, deleteProduct } from "../../utlis/Constants";

function ProductManagement() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.value);
    useEffect(() => {
        axios
            .get(getProduct, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                console.log("success");
                console.log(response.data.allProduct);
                dispatch(setProduct({ product: response.data.allProduct }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DeleteProduct = (productData) => {
        console.log(productData);
        axios
            .post(deleteProduct, productData, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                alert(response.data.message);
                dispatch(setProduct({ product: response.data.productData }));
                console.log(products);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-around", paddingBottom: "10px" }}>
                <AddProductButton />
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
                            <TableCell align="right">Profit</TableCell>
                            <TableCell align="right">Selling Price</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((obj) => (
                            <TableRow key={obj.ModelNumber}>
                                <TableCell component="th" scope="row">
                                    {obj.ProductName}
                                </TableCell>
                                <TableCell align="right">{obj.ModelNumber}</TableCell>
                                <TableCell align="center">{obj.Category}</TableCell>
                                <TableCell align="center">{obj.SubCategory}</TableCell>
                                <TableCell align="center">{obj.Type}</TableCell>

                                <TableCell align="center">{obj.LandingCost}</TableCell>

                                <TableCell align="center">{obj.Profit}</TableCell>

                                <TableCell align="center">{obj.Profit}</TableCell>

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
