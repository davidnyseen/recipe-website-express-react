import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";
import homeReducer from "./homeReducer";
import loginReducer from "./loginReducer"
import signupReducer from "./signupReducer";
import ratingReducer from "./ratingReducer";
import recommendedReducer from "./recommendedReducer";

export default configureStore({
  reducer: {
    searchReducer: searchReducer,
    recipes: homeReducer,
    login: loginReducer,
    signup: signupReducer,
    rate: ratingReducer,
    recommendedReducer: recommendedReducer,
  },
});
