

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLogin = createAsyncThunk(
  "login/getLogin",        
  async (value) => {

    return fetch('/login', {  
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      }, 
      body: JSON.stringify( value ),
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
      if(action.payload){
        console.log("login reducer user is logged in");
        state.status = "success";
        state.login = action.payload;
      }
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
