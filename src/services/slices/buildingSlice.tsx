import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import uniqueID from '../../utils/generateId';

export const buildingSlice = createSlice({
  name: 'building',
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
    movingIngredient: (state, action) => {
      const stateCopy = [...state.ingredients];
      const { fromIndex, toIndex } = action.payload;
      const [removeIngredient] = stateCopy.splice(fromIndex, 1);
      stateCopy.splice(toIndex, 0, removeIngredient);
      state.ingredients = stateCopy;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  movingIngredient,
  clearConstructor
} = buildingSlice.actions;
export const { getConstructorItems } = buildingSlice.selectors;
export default buildingSlice.reducer;
