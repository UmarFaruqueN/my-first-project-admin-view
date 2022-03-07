import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userData/userData";
import categoryReducer from "./category/category";
import subCategoryReducer from "./subCategory/subCategory";
import productReducer from "./product/product";
import typeReducer from "./type/type";
import snackBarStatusReducer from "./snackbar/snackBarStatus";
import snackBarMessageReducer from "./snackbar/snackBarStatus";

export default configureStore({
     reducer: {
          userData: userDataReducer,
          category: categoryReducer,
          subCategory: subCategoryReducer,
          type: typeReducer,
          product: productReducer,
          snackBarStatus: snackBarStatusReducer,
          snackBarMessage: snackBarMessageReducer,
     },
});
