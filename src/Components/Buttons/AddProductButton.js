import React,{useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Box } from "@mui/system";
import { Container, DialogContent, DialogContentText, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { addProduct } from "../../utlis/Constants";
import ShowSnackbar from "../utlis/ShowSnackbar";
import { setSnackBarStatus } from "../../Redux/snackbar/snackBarStatus";
import { setSnackBarMessage } from "../../Redux/snackbar/snackBarMessage";
import { useDispatch ,useSelector} from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProductButton = () => {
    const msg = useSelector((state)=>state.snackBarMessage.value)
    


    const dispatch = useDispatch();
    const [open, setOpen] =useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //form validation

    const formSchema = Yup.object().shape({
        ProductName: Yup.string().required("Product Name Required"),
        ModelNumber: Yup.string().required("Model  Number Required"),
        Category: Yup.string().required("Category Required"),
        SubCategory: Yup.string().required("Sub Category Required"),
        Type: Yup.string().required("Type Required"),
        Stock: Yup.string().required("Stock Required"),
        LandingCost: Yup.string().required("LandingCost Required"),
        Profit: Yup.string().required("Profit Required"),
        Description: Yup.string().required("Description Required"),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
        defaultValues: {},
    });

    const Submit = handleSubmit((data) => {
        axios
            .post(addProduct, data, { headers: { "Content-Type": "application/json" } })
            .then( (response) => {

                
                dispatch(setSnackBarMessage({snackBarMessage:response.data.message}))
                console.log(msg);
                
                dispatch(setSnackBarStatus({snackBarStatus:true}))
             
                setTimeout(() => {
                    dispatch(setSnackBarStatus({snackBarStatus:false}))
             
                    setOpen(false);
                }, 2000);
                
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Add Products
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: "2" }} />

                        <Box sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                            <DashboardCustomizeIcon sx={{ fontSize: 31, color: "text.hint", pr: 1 }} />
                            <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                                ZETETIKOZ
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" color="secondary" component="div">
                                Add Products
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: "2" }} />

                        <Button autoFocus color="inherit" onClick={Submit}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container sx={{ paddingTop: "10px" }}>
                    <Grid container rowSpacing={2} columnSpacing={2}>
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

                            <TextField
                                label="Category"
                                color="secondary"
                                margin="normal"
                                fullWidth
                                id="Category"
                                name="Category"
                                {...register("Category", {
                                    required: "Category  Required",
                                })}
                            />

                            <DialogContentText color="error">{errors.Category?.message}</DialogContentText>
                        </Grid>

                        <Grid item xs={4}>
                            <DialogContentText variant="h3" color="text.hint">
                                Sub Category
                            </DialogContentText>

                            <TextField
                                label="Sub Category"
                                color="secondary"
                                margin="normal"
                                fullWidth
                                id="SubCategory"
                                name="SubCategory"
                                {...register("SubCategory", {
                                    required: "SubCategory  Required",
                                })}
                            />

                            <DialogContentText color="error">{errors.SubCategory?.message}</DialogContentText>
                        </Grid>

                        <Grid item xs={4}>
                            <DialogContentText variant="h3" color="text.hint">
                                Type
                            </DialogContentText>

                            <TextField
                                label="Type"
                                color="secondary"
                                margin="normal"
                                fullWidth
                                id="Type"
                                name="Type"
                                {...register("Type", {
                                    required: "Type  Required",
                                })}
                            />

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
                                Profit %
                            </DialogContentText>

                            <TextField
                                label="Profit"
                                color="secondary"
                                margin="normal"
                                fullWidth
                                id="Profit"
                                name="Profit"
                                {...register("Profit", {
                                    required: "Profit %  Required",
                                })}
                            />

                            <DialogContentText color="error">{errors.Profit?.message}</DialogContentText>
                        </Grid>

                        <Grid item xs={8}>
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
                        <Grid item xs={4}>
                            <DialogContentText variant="h3" color="text.hint">
                                Upload Imag
                            </DialogContentText>

                            <DialogContentText color="error">{errors.Profit?.message}</DialogContentText>
                        </Grid>
                    </Grid>
                    <ShowSnackbar/>
                </Container>
            </Dialog>
        </div>
    );
};

export default AddProductButton;
