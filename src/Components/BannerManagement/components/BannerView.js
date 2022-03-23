import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Banner from "../../../assets/Banner.png";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import Swal from "sweetalert2";

import { setBanner, addBanner, getBanner, deleteBanner } from "../";

const BannerView = (props) => {

    const bannerFor = props.title;
     useEffect(() => {
        console.log(bannerFor);
          axios.post(getBanner, bannerFor, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
               console.log(response.data.allBanner);
               setBanner(response.data.allBanner)
          });
     }, []);
     console.log(bannerFor);
     const dispatch = useDispatch();
     const [bannerData , setBannerData]=useState([])
    

     const [loader, SetLoader] = useState(false);
     const img1ref = useRef(null);

     const changeRef = (target) => {
          target.current.click();
     };

     const onchangeImg1 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               SetLoader(true);
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               let formData = new FormData();
               formData.append("img", img);
               formData.append("data", JSON.stringify(props.title));

               axios.post(addBanner, formData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then((response) => {
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              text: response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                         dispatch(setBanner(response.data.allBanner));
                         setBanner(response.data.allBanner)
                         SetLoader(false);
                    })
                    .catch((err) => {
                         console.log(err);
                         SetLoader(false);
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
          }
     };
   

     const temp=["https://res.cloudinary.com/umarfaruquen/image/upload/v1648073523/yq59b8vxuc9ugp8xjchd.png",]
     return (
          <>
               <Grid container sx={{ backgroundColor: "#ffffff", justifyContent: "space-around" }}>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around" }} md={12} pb={2} pt={3}>
                         {" "}
                         {loader ? (
                              <CircularProgress color="secondary" />
                         ) : (
                              <Button
                                   color="secondary"
                                   variant="contained"
                                   onClick={() => {
                                        changeRef(img1ref);
                                   }}
                              >
                                   Add {props.title} Image
                              </Button>
                         )}
                         <input hidden ref={img1ref} name="file" type="file" onChange={onchangeImg1} />
                    </Grid>
                    {bannerData?.map((obj) => 
                         <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                              <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                                   {" "}
                                   <IconButton color="error">
                                        {" "}
                                        <CloseIcon />
                                   </IconButton>{" "}
                              </Grid>
                              <Grid item pb={3}>
                                   {" "}
                                   {/* <img width="100px" height="100px" src={obj.banner} alt="" />{" "} */}
                                   <Typography>{obj.bannerId}</Typography>
                              </Grid>
                         </Grid>
                    )}
               </Grid>
          </>
     );
};

export default BannerView;
