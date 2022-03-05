import { createSlice } from "@reduxjs/toolkit";
export const snackBarStatusSlice= createSlice({
    name:"snackBarStatus",initialState:{value:false},
    
    reducers:{

        setSnackBarStatus:(state,action)=>{
            state.value=action.payload.snackBarStatus
        }
      
    }
})

export const {setSnackBarStatus}=snackBarStatusSlice.actions;
export default  snackBarStatusSlice.reducer 