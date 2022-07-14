

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLogin = createAsyncThunk(
  "login/getLogin",        
  async (value) => {

    return fetch('/login', {  
     
    })
        .then(res => res.json())
  }
); 


const loginSlice = createSlice({
  name: "isHeLoggedIn",
  initialState: {
    login: {},
    status: null,
  },
  extraReducers: {
    [getLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.login = action.payload;
      console.log(state.login);
    },
    [getLogin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
  reducers: {
    loginValue: (state, action) => {
      state.login = action.payload;
    },
   
  },
  
});
export const { loginValue } = loginSlice.actions;

export default loginSlice.reducer;
