import React from "react";
import { setSnackBarStatus } from "../../Redux/snackbar/snackBarStatus";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ShowSnackbar = () => {
  const dispatch = useDispatch();
  const msgsnack = useSelector((state)=>state.snackBarMessage.value);
  const status = useSelector((state)=>state.snackBarStatus.value);
  
  

    // const handleClick = (data)=> {
    //     const temp=true
    //     setOpen(temp)
    //     console.log(open+"value of open");
    //     setSnack(data)
    //     console.log(data+"value of data");
    //     setTimeout(() => {
    //         navigate(props.nav)

    //     }, 6000);

    // }
    //snack bar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setSnackBarStatus({snackBarStatus:false}));
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div>
            <Snackbar
                open={status}
                autoHideDuration={60000}
                onClose={handleClose}
                message={msgsnack}
                action={action}
            />
        </div>
    );
};

export default ShowSnackbar;
