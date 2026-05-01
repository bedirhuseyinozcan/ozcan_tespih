import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requests from "../../api/apiClient";
import { act } from "react";


const initialState = {
    cart: null,
    status: "idle"
};

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      return await requests.cart.addItem(productId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async ({ productId, quantity = 1 , key=""}, { rejectWithValue }) => {
    try {
      return await requests.cart.deleteItem(productId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_,thunkAPI) => {
    try {
      return await requests.cart.get();
    } catch (error) {
      return thunkAPI.rejectWithValue({error : error.data});
    }
  }
);

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCart:(state,action) => {
            state.cart=action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(addItemToCart.pending, (state,action) => {
            state.status = "pendingAddItem" + action.meta.arg.productId;
        })

        builder.addCase(addItemToCart.fulfilled, (state,action)=>{
            state.cart=action.payload;
            state.status = "idle";
        })

        builder.addCase(addItemToCart.rejected, (state)=>{
            state.status = "idle"
        })



        builder.addCase(deleteItemFromCart.pending, (state,action) => {
            state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
        })

        builder.addCase(deleteItemFromCart.fulfilled, (state,action)=>{
            state.cart=action.payload;
            state.status = "idle";
        })

        builder.addCase(deleteItemFromCart.rejected, (state)=>{
            state.status = "idle"
        })
         builder.addCase(getCart.fulfilled, (state ,action)=>{
            state.cart = action.payload;
        })


    }
});

export const {setCart} = cartSlice.actions;