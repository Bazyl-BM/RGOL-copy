/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '../http-comon';

export const createCupboardsBox = createAsyncThunk(
  'cupboardsBox/create',
  async ({ cupboardsBoxName, email }) => {
    const res = await http.post('/myAccount/cupboards', {
      cupboardsBoxName,
      email,
    });

    return res.data;
  }
);

export const updateCupboardsBox = createAsyncThunk(
  'cupboardsBox/update',
  async (data) => {
    const res = await http.put('myAccount/cupboards', { data });
    return res.data;
  }
);

export const deleteCupboardsBox = createAsyncThunk(
  'cupboardsBox/delete',
  async (data) => {
    const id = data.idItem;
    console.log(id);
    await http.delete(`/myAccount/cupboards`, {
      data,
    });
    return { idItem: id };
  }
);
interface Values {
  cupboardsBoxName: string;
  idBox: string;
  product: any[];
}

const initialState: Values[] = [];

export const cupboardsBoxSlice = createSlice({
  name: 'inkove',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createCupboardsBox.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateCupboardsBox.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idBox === action.payload.idItem
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    });
    builder.addCase(deleteCupboardsBox.fulfilled, (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.idBox === action.payload.idItem
      );
      state.splice(index, 1);
    });
  },

  reducers: {
    getAllcupboardsBox: (state, action) => {
      state.push(...action.payload);
    },
  },
});
export const { getAllcupboardsBox } = cupboardsBoxSlice.actions;

export default cupboardsBoxSlice.reducer;
