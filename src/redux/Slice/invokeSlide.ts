/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '../http-comon';

export const createInvoke = createAsyncThunk(
  'invoke/create',
  async ({
    email,
    companyName,
    NIP,
    street,
    buldingNumber,
    flatNumber,
    city,
    postCode,
    phoneNumber,
  }) => {
    console.log('email');
    const res = await http.post('/myAccount/invoke', {
      email,
      companyName,
      NIP,
      street,
      buldingNumber,
      flatNumber,
      city,
      postCode,
      phoneNumber,
    });

    return res.data;
  }
);

export const updateInvoke = createAsyncThunk('invoke/update', async (data) => {
  const res = await http.put('myAccount/invoke', { data });
  return res.data;
});

export const deleteInvoke = createAsyncThunk('invoke/delete', async (data) => {
  const id = data.idItem;
  await http.delete(`/myAccount/invoke`, {
    data,
  });
  return { idItem: id };
});
interface Values {
  companyName: string;
  NIP: string;
  street: string;
  buldingNumber: string;
  flatNumber: string;
  city: string;
  postCode: string;
  phoneNumber: string;
  idItem: string;
  email: string;
  isDefault?: boolean;
}

const initialState: Values[] = [];

export const invokeSlice = createSlice({
  name: 'inkove',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createInvoke.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateInvoke.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idItem === action.payload.idItem
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    });
    builder.addCase(deleteInvoke.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idItem === action.payload.idItem
      );
      state.splice(index, 1);
    });
  },

  reducers: {
    getAllInvoke: (state, action) => {
      state.push(...action.payload);
    },
  },
});
export const { getAllInvoke } = invokeSlice.actions;

export default invokeSlice.reducer;
