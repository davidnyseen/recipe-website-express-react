import { createSlice } from "@reduxjs/toolkit";


export const recommendedReducer = createSlice({
    name: "recommendedReducer",
    initialState: {
        status: {},
        recommendedRecipes: [],
    },
    reducers: {
        setStatus: (state, action) => {
            console.log("Setting statu of rec");
            state.status = action.payload;
        },
        setRecommendedRecipes: (state, action) => {
            console.log("Saving recommended recipes");
            state.recommendedRecipes = action.payload;
        }
    },
});

export const { setStatus, setRecommendedRecipes } = recommendedReducer.actions;


export default recommendedReducer.reducer;