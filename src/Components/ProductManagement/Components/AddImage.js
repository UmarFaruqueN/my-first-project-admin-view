import React, { useState, useRef } from "react";
import { Button, Dialog, Slide, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { makeStyles } from "@mui/styles";

import { ProductAddAppBar,addImage ,setProduct} from "../";


const Transition = React.forwardRef(function Transition(props, ref) {
     return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
     productImgGrid: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
     },
     productImg: { width: "230px", height: "230px" },
});
const AddImage = (props) => {
     const dispatch = useDispatch();
     const classes = useStyles();

     const dummy = "https://picsum.photos/id/870/200/300?grayscale&blur=2";
     const [img1State, setImg1State] = useState(null);
     const [img2State, setImg2State] = useState(null);
     const [img3State, setImg3State] = useState(null);
     const [img4State, setImg4State] = useState(null);

     const img1ref = useRef(null);
     const img2ref = useRef(null);
     const img3ref = useRef(null);
     const img4ref = useRef(null);

     const Submit = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("img1",img1State)
          formData.append("img2",img2State)
          formData.append("img2",img3State)
          formData.append("img3",img4State)
          formData.append("productData",props.ProductData)


          axios.post(addImage, formData, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
               dispatch(setProduct(response.data.allProduct));
               Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    width: "15rem",
               });
     
          })
          .catch((err) => {
               Swal.fire({
                    position: "bottom-end",
                    icon: "error",
                    text: err.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    width: "15rem",
               });
               console.log(err.response.data.message);
          });

          






     };




     const changeRef = (target) => {
          target.current.click();
     };

     const onchangeImg1 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg1State({ img, url });
               console.log(img1State);
          }
     };

     const onchangeImg2 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg2State({ img, url });
               console.log(img1State);
          }
     };
     const onchangeImg3 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg3State({ img, url });
               console.log(img1State);
          }
     };
     const onchangeImg4 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg4State({ img, url });
               console.log(img1State);
          }
     };

     //form validation

     return (
          <div>
               <Dialog  open={props.open} onClose={props.close} TransitionComponent={Transition}>
               <ProductAddAppBar Close={props.close} title={"Add Image"} />
               <Grid pt={3} container rowSpacing={2} columnSpacing={2}>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img className={classes.productImg}
                              onClick={() => {
                                   changeRef(img1ref);
                              }}
                              src={img1State?.url || dummy}
                         />
                         <input hidden ref={img1ref} name="file" type="file" onChange={onchangeImg1} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img className={classes.productImg}
                              onClick={() => {
                                   changeRef(img2ref);
                              }}
                              src={img2State?.url || dummy}
                         />
                         <input hidden ref={img2ref} name="file" type="file" onChange={onchangeImg2} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img className={classes.productImg}
                              onClick={() => {
                                   changeRef(img3ref);
                              }}
                              src={img3State?.url || dummy}
                         />
                         <input hidden ref={img3ref} name="file" type="file" onChange={onchangeImg3} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img className={classes.productImg}
                              onClick={() => {
                                   changeRef(img4ref);
                              }}
                              src={img4State?.url || dummy}
                         />
                         <input hidden ref={img4ref} name="file" type="file" onChange={onchangeImg4} />
                    </Grid>
                    <Grid display="flex" flexDirection="row-reverse" justifyContent="flex-start" item xs={7}>
                         <Button color="secondary" variant="contained" type="submit"  onClick={Submit}>
                              Upload
                         </Button>
                    </Grid>
               </Grid>

               </Dialog>
          </div>
     );
};

export default AddImage;
