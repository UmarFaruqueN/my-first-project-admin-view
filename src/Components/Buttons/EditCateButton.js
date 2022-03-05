import React, { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCategory } from "../../utlis/Constants";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setCategory } from "../../Redux/category/category";

const EditCateButton = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    //form validation

    const formSchema = Yup.object().shape({
        categoryCode: Yup.string().required("Category Required"),
        category: Yup.string().required("Category required"),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
        defaultValues: {
            categoryCode: props.data.categoryCode,
            category: props.data.category,
            _id: props.data._id,
        },
    });

    const Submit = handleSubmit((data) => {
        console.log(data);
        axios
            .post(updateCategory, data, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                console.log(response);
                alert(response.data.message);
                dispatch(setCategory({ category: response.data.categoryData }));
                setOpen(false);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            });
    });
    //form validation ends here

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <EditIcon cursor="pointer" onClick={handleClickOpen} color="secondary" />
            <Dialog open={open} onClose={Submit}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent color="secondary">
                    <DialogContentText color="secondary">Category Code</DialogContentText>

                    <div className="form-group mb-3">
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

                        <DialogContentText color="error">{errors.categoryCode?.message}</DialogContentText>
                    </div>

                    <DialogContentText color="secondary">Category</DialogContentText>

                    <div className="form-group mb-3">
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

                        <DialogContentText color="error">{errors.category?.message}</DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        cursor="pointer"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button color="secondary" cursor="pointer" onClick={Submit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditCateButton;
