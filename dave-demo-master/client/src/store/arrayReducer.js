import { createSlice } from "@reduxjs/toolkit";


export const arrayReducer = createSlice({
  name: "arrayReducer",
  initialState: { value: []},
  reducers: {
    arrayValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { arrayValue } = arrayReducer.actions;

export default arrayReducer.reducer;
