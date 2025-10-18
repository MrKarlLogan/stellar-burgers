import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import uniqueID from '../../utils/generateId';
import { SLICE_NAMES } from '../../utils/config';

export const constructorSlice = createSlice({
  name: SLICE_NAMES.BURDER_CONSTRUCTOR,
  initialState: {
    bun: null as TIngredient | null,
    ingredients: [] as TConstructorIngredient[]
  },
  reducers: {
    addIngredient: (state, action) => {
      const IngredientUniqueID = {
        ...action.payload,
        id: uniqueID(15)
      };

      if (action.payload.type === 'bun') {
        state.bun = IngredientUniqueID;
      } else {
        state.ingredients.push(IngredientUniqueID);
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearBuilding: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems: (state) => state
  }
});

export const { addIngredient, removeIngredient, clearBuilding } =
  constructorSlice.actions;
export const { getConstructorItems } = constructorSlice.selectors;
export default constructorSlice.reducer;
