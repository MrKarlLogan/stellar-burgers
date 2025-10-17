import { getIngredientsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const responce = await getIngredientsApi();
    return responce;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [] as TIngredient[],
    loading: false,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientLoading: (state) => state.loading
  }
});

export default ingredientsSlice.reducer;
export const { getIngredients, getIngredientLoading } =
  ingredientsSlice.selectors;

export const getIngredientsByType = createSelector(
  [getIngredients],
  (ingredients) => ({
    buns: ingredients.filter((item) => item.type === 'bun'),
    mains: ingredients.filter((item) => item.type === 'main'),
    sauces: ingredients.filter((item) => item.type === 'sauce')
  })
);
