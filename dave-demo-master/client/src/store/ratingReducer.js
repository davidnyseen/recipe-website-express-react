import { createSlice } from "@reduxjs/toolkit";


export const ratingReducer = createSlice({
  name: "ratingReducer",
  initialState: {
    rate: 0,
  
  },
  reducers: {
    saveRate: (state, action) => {
      state.rate = action.payload;
    },
   
  },
});

export const { saveRate } = ratingReducer.actions;

export default ratingReducer.reducer;
