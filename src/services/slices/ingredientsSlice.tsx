import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    getIngredientsByType: (state) => ({
      buns: state.ingredients.filter((item) => item.type === 'bun'),
      mains: state.ingredients.filter((item) => item.type === 'main'),
      sauces: state.ingredients.filter((item) => item.type === 'sauce')
    }),
    getIngredientLoading: (state) => state.loading
  }
});

export default ingredientsSlice.reducer;
export const { getIngredients, getIngredientsByType, getIngredientLoading } =
  ingredientsSlice.selectors;
