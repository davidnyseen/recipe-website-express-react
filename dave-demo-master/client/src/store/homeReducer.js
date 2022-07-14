import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  fetchPost  from '../utils/fetchPost';
export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (value) => {
   return fetchPost('/', value)
        .then(res => res.json())
        .then((res) => (res))
        .catch(err => (console.log("error getting recipes in home. err msg: "+ err.message)))
  }
); 



const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
    recipesDb: [],
    recipesRecommendation: [],
    status: {},
  },
  reducers: {
    updateRate: (state, action) =>{
      state.recipesDb.ratingAverage = action.payload;
    }
  },
  extraReducers: {
    [getRecipes.pending]: (state, action) => {
      state.status = {loading:"loading"};
      
    },
    [getRecipes.fulfilled]: (state, action) => {
      if(action.payload){
      state.status = {success:"success"};
      state.recipes = action.payload.api.hits;
      state.recipesDb = action.payload.recipesDb;
      // console.log(action.payload);
      }
    },
    [getRecipes.rejected]: (state, action) => {
      state.status = {failed:"failed"};
    },
  },

  
});

export const {updateRate} = recipeSlice.actions;

export default recipeSlice.reducer;
