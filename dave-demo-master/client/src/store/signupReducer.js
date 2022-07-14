

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSignup = createAsyncThunk(
  "signup/getSignup",
  async (value) => {

    return fetch('/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( value ),
    })
      .then(res => res.json())
  }
);


const signupSlice = createSlice({
  name: "isHeSignedUp",
  initialState: {
    signup: {},
    status: null,
  },
  extraReducers: {
    [getSignup.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSignup.fulfilled]: (state, action) => {
      state.status = "success";
      state.signup = action.payload;
      console.log("in register reducer " + state.signup);
    },
    [getSignup.rejected]: (state, action) => {
      state.status = "failed";
    },
  },


});
export default signupSlice.reducer;
