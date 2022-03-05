import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { addCategory, getCategory, deleteCategory } from "../../utlis/Constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../Redux/category/category";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCateButton from "../Buttons/EditCateButton";

const CategoryManagement = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category.value);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        axios
            .get(getCategory, { headers: { "Content-Type": "application/json" } })
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

    const Submit = handleSubmit((data) => {
        axios
            .post(addCategory, data, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                dispatch(setCategory({ category: response.data?.allCategory }));
                console.log(category);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            });
    });

    const DeleteCategory = (catData) => {
        console.log(catData);
        axios
            .post(deleteCategory, catData, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                alert(response.data.message);
                dispatch(setCategory({ category: response.data?.categoryData }));
                console.log(category);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Category Code"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    id="categoryCode"
                    name="categoryCode"
                    {...register("categoryCode", {
                        required: "Category Code Required",
                    })}
                />
                <span>{errors.categoryCode?.message}</span>

                <TextField
                    label="Category"
                    color="secondary"
                    margin="normal"
                    fullWidth
                    id="category"
                    name="category"
                    {...register("category", {
                        required: "Category Required",
                    })}
                />
                <span>{errors.category?.message}</span>

                <Button color="secondary" onClick={Submit}>
                    {" "}
                    Add Category
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                            <TableCell align="right">Category code</TableCell>
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
                                <TableCell align="right">{obj.categoryCode}</TableCell>
                                <TableCell align="center">
                                    <EditCateButton data={obj} />
                                </TableCell>
                                <TableCell align="center">
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
