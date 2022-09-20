/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '../http-comon';

export const createTutorial = createAsyncThunk(
  'address/create',
  async ({
    email,
    firstName,
    surname,
    companyName,
    street,
    buldingNumber,
    flatNumber,
    city,
    postCode,
    phoneNumber,
  }) => {
    const res = await http.post('/myAccount/adress', {
      email,
      firstName,
      surname,
      companyName,
      street,
      buldingNumber,
      flatNumber,
      city,
      postCode,
      phoneNumber,
    });
    console.log(res.data);
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  'address/update',
  async (data) => {
    console.log(data);
    const res = await http.put('myAccount/adress', { data });
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  'address/delete',
  async (data) => {
    const id = data.idItem;
    await http.delete(`/myAccount/adress`, {
      data,
    });
    return { idItem: id };
  }
);
interface Values {
  firstName: string;
  surname: string;
  companyName: string;
  street: string;
  buldingNumber: string;
  flatNumber: string;
  city: string;
  postCode: string;
  phoneNumber: string;
  email: string;
  idItem: string;
  isDefault?: boolean;
}

const initialState: Values[] = [];

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTutorial.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateTutorial.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idItem === action.payload.idItem
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    });
    builder.addCase(deleteTutorial.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idItem === action.payload.idItem
      );
      state.splice(index, 1);
    });
  },

  reducers: {
    getAllAddress: (state, action) => {
      state.push(...action.payload);
    },
  },
});
export const { getAllAddress } = addressSlice.actions;

export default addressSlice.reducer;
