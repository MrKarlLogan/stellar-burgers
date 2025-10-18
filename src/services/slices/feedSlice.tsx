import { getFeedsApi, getOrdersApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { SLICE_NAMES } from '../../utils/config';

export const fecthFeeds = createAsyncThunk('feed/fetchFeed', getFeedsApi);

export const fecthOrders = createAsyncThunk('feed/fecthOrders', getOrdersApi);

const feedSlice = createSlice({
  name: SLICE_NAMES.FEED,
  initialState: {
    feed: {} as TOrdersData | null,
    orders: [] as TOrder[],
    loading: false,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fecthFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить список заказов';
      })
      .addCase(fecthOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fecthOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить список заказов';
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getOrders: (state) => state.orders,
    getFeedLoading: (state) => state.loading
  }
});

export default feedSlice.reducer;
export const { getFeed, getOrders, getFeedLoading } = feedSlice.selectors;

export const getFeedOrders = createSelector(
  [getFeed],
  (feed) => feed?.orders || []
);
