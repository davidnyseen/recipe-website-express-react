import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "Pizza";

export const searchReducer = createSlice({
  name: "searchReducer",
  initialState: {
  value: initialStateValue,
  
  },
  reducers: {
    searchValue: (state, action) => {
      state.value = action.payload;
    },
   
  },
});

export const { searchValue } = searchReducer.actions;

export default searchReducer.reducer;
