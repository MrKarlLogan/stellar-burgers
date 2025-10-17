import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchCreateOrder = createAsyncThunk(
  'order/create',
  async (ingredientId: string[]) => {
    const responce = await orderBurgerApi(ingredientId);
    return responce.order;
  }
);

export const fetchOrderNumber = createAsyncThunk(
  'order/number',
  async (number: number) => {
    const responce = await getOrderByNumberApi(number);
    return responce.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderRequest: false as boolean,
    createOrderModalData: null as TOrder | null,
    viewOrderModalData: null as TOrder | null,
    error: null as string | null
  },
  reducers: {
    clearOrder(state) {
      state.createOrderModalData = null;
      state.error = null;
    },
    clearViewOrder(state) {
      state.viewOrderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.createOrderModalData = action.payload;
      })
      .addCase(fetchCreateOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка при оформлении заказа';
      })
      .addCase(fetchOrderNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.viewOrderModalData = action.payload;
      })
      .addCase(fetchOrderNumber.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при оформлении заказа';
      });
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderData: (state) => state.createOrderModalData,
    selectViewOrderData: (state) => state.viewOrderModalData,
    errorOrderMessage: (state) => state.error
  }
});

export const {
  selectOrderRequest,
  selectOrderData,
  selectViewOrderData,
  errorOrderMessage
} = orderSlice.selectors;
export const { clearOrder, clearViewOrder } = orderSlice.actions;
export default orderSlice.reducer;
