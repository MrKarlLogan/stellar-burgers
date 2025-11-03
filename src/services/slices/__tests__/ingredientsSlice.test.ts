import ingredientsSlice, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('Проверка начального состояния', () => {
    expect(ingredientsSlice(undefined, { type: '' })).toEqual(initialState);
  });

  it('Обработка экшен запроса', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Обработка успешного экшена', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice(initialState, action);

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Обработка экшена ошибки', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      error: {
        message: errorMessage
      }
    };
    const state = ingredientsSlice(initialState, action);

    expect(state.ingredients).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
