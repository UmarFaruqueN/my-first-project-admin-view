import { createSlice } from "@reduxjs/toolkit";
export const snackBarMessageSlice= createSlice({
    name:"snackBarMessage",initialState:{value:" "},
    
    reducers:{

     
        setSnackBarMessage:(state,action)=>{
            state.value=action.payload.snackBarMessage
        }
    }
})

export const {setSnackBarMessage}=snackBarMessageSlice.actions;
export default  snackBarMessageSlice.reducer 