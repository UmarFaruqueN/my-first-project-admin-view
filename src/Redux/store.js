import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userData/userData";
import categoryReducer from "./category/category";
import productReducer from "./product/product"
import snackBarStatusReducer from "./snackbar/snackBarStatus";
import snackBarMessageReducer from "./snackbar/snackBarStatus";

export default configureStore({
    reducer: {
        userData: userDataReducer,
        category: categoryReducer,
        product: productReducer,
        snackBarStatus: snackBarStatusReducer,
        snackBarMessage: snackBarMessageReducer,
    },
});
