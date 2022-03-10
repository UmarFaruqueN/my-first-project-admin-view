import React, { useState, useEffect } from "react";
import {
     Box,
     Button,
     Dialog,
     Select,
     MenuItem,
     Slide,
     Container,
     DialogContentText,
     Grid,
     TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { addProduct, ProductAddAppBar, setProducts, setProduct, AddImage } from "../";

const Transition = React.forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
});

const AddProduct = () => {
     const dispatch = useDispatch();
     const [open, setOpen] = useState(false);
     const [imgOpen, setImgOpen] = useState(false);
     const [category, setCategory] = useState(null);
     const [subCategory, setSubCategory] = useState(null);
     const allCategory = useSelector((state) => state.category.value);
     const allSubCategory = useSelector((state) => state.subCategory.value);
     const allType = useSelector((state) => state.type.value);

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
          setImgOpen(false);
     };

     //form validation

     const formSchema = Yup.object().shape({
          ProductName: Yup.string().required("Product Name Required"),
          ModelNumber: Yup.string().required("Model  Number Required"),
          Category: Yup.string().required("Category Required"),
          SubCategory: Yup.string().required("Sub Category Required"),
          Type: Yup.string().required("Type Required"),
          Stock: Yup.number().required("Stock Required"),
          LandingCost: Yup.string().required("LandingCost Required"),
          SellingPrice: Yup.number().required("SellingPrice Required"),
          Description: Yup.string().required("Description Required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          reValidateMode: "onChange",
          defaultValues: {
               CategoryOffer: 0,
               SubCategoryOffer: 0,
               TypeOffer: 0,
               ProductOffer: 0,
               CouponOffer: 0,
               Customers: [],
               Image1: "",
               Image1id: "",
               Image2: "",
               Image2id: "",
               Image3: "",
               Image3id: "",
               Image4: "",
               Image4id: "",
               rating: [],
          },
     });

     // Submiting form data

     const Submit = handleSubmit((data) => {
          axios.post(addProduct, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setProduct({ product: response.data.newProduct }));
                    dispatch(setProducts({ products: response.data.allProduct }));
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    setImgOpen(true);
               })
               .catch((err) => {
                    console.log(err);
                    console.log("ENTHO ERRORE UND");
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         text: err?.response?.data?.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    console.log(err?.response?.data?.message);
               });
     });

     // for dropdown in the form

     const handleChange = (event) => {
          setCategory(event.target.value);
     };

     useEffect(() => {
          const filterData = allSubCategory.filter((obj) => obj.category == category);
          setSubCategory(filterData);
     }, [category]);

     return (
          <div>
               <AddImage open={imgOpen} close={handleClose} />
               <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    Add Products
               </Button>
               <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <ProductAddAppBar Close={handleClose} title={"Add Product"} />
                    <Container sx={{ paddingTop: "10px" }}>
                         <Grid pt={10} container rowSpacing={2} columnSpacing={2}>
                              <Grid item xs={6}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Product Name
                                   </DialogContentText>

                                   <TextField
                                        label="Product Name"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="ProductName"
                                        name="ProductName"
                                        {...register("ProductName", {
                                             required: "Product Name Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.ProductName?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={6}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Model Number
                                   </DialogContentText>

                                   <TextField
                                        label="Model Number"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="ModelNumber"
                                        name="ModelNumber"
                                        {...register("ModelNumber", {
                                             required: "Model  Number Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.ModelNumber?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Category
                                   </DialogContentText>
                                   <Select
                                        label="Category"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Category"
                                        name="Category"
                                        {...register("Category", {
                                             required: "Category Required",
                                        })}
                                        onChange={handleChange}
                                   >
                                        {allCategory?.map((obj) => (
                                             <MenuItem value={obj.category}>{obj.category}</MenuItem>
                                        ))}
                                   </Select>

                                   <DialogContentText color="error">{errors.Category?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Sub Category
                                   </DialogContentText>

                                   <Select
                                        label="SubCategory"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="SubCategory"
                                        name="SubCategory"
                                        {...register("SubCategory", {
                                             required: "SubCategory Required",
                                        })}
                                   >
                                        {subCategory?.map((obj) => (
                                             <MenuItem value={obj.subCategory}>{obj.subCategory}</MenuItem>
                                        ))}
                                   </Select>

                                   <DialogContentText color="error">{errors.SubCategory?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Type
                                   </DialogContentText>

                                   <Select
                                        label="Type"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Type"
                                        name="Type"
                                        {...register("Type", {
                                             required: "Type Required",
                                        })}
                                   >
                                        {allType?.map((obj) => (
                                             <MenuItem key={obj._id} value={obj.type}>
                                                  {obj.type}
                                             </MenuItem>
                                        ))}
                                   </Select>

                                   <DialogContentText color="error">{errors.Type?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Stock
                                   </DialogContentText>

                                   <TextField
                                        label="Stock"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        type="number"
                                        id="Stock"
                                        name="Stock"
                                        {...register("Stock", {
                                             required: "Stock  Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.Stock?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Landing Cost
                                   </DialogContentText>

                                   <TextField
                                        label="LandingCost"
                                        color="secondary"
                                        margin="normal"
                                        type="number"
                                        fullWidth
                                        id="LandingCost"
                                        name="LandingCost"
                                        {...register("LandingCost", {
                                             required: "Landing Cost  Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.LandingCost?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        SellingPrice %
                                   </DialogContentText>

                                   <TextField
                                        label="SellingPrice"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        type="number"
                                        id="SellingPrice"
                                        name="SellingPrice"
                                        {...register("SellingPrice", {
                                             required: "SellingPrice %  Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.SellingPrice?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={12}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Description
                                   </DialogContentText>

                                   <TextField
                                        label="Description"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Description"
                                        name="Description"
                                        {...register("Description", {
                                             required: "Description   Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.Description?.message}</DialogContentText>
                              </Grid>
                              <Grid display="flex" flexDirection="row-reverse" justifyContent="flex-start" item xs={7}>
                                   {" "}
                                   <Button color="secondary" variant="contained" onClick={Submit}>
                                        NEXT
                                   </Button>
                              </Grid>
                         </Grid>
                    </Container>
               </Dialog>
          </div>
     );
};

export default AddProduct;
