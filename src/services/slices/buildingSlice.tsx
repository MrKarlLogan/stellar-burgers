import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import uniqueID from '../../utils/generateId';
import { SLICE_NAMES } from '../../utils/config';

export const buildingSlice = createSlice({
  name: SLICE_NAMES.BUILDING,
  initialState: {
    bun: null as TIngredient | null,
    ingredients: [] as TConstructorIngredient[]
  },
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const IngredientUniqueID: TConstructorIngredient = {
          ...ingredient,
          id: uniqueID(15)
        };
        return { payload: IngredientUniqueID };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
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
