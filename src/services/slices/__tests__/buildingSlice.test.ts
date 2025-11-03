import buildingSlice, {
  addIngredient,
  removeIngredient,
  movingIngredient
} from '../buildingSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

describe('buildingSlice (Конструктор)', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('Проверка начального состояния', () => {
    expect(buildingSlice(undefined, { type: '' })).toEqual(initialState);
  });

  describe('Добавление игредиентов', () => {
    it('Добавление булки', () => {
      const action = addIngredient(mockBun);
      const state = buildingSlice(initialState, action);

      expect(state.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
      expect(state.ingredients).toHaveLength(0);
    });

    it('Добавление ингредиента', () => {
      const action = addIngredient(mockIngredient);
      const state = buildingSlice(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockIngredient,
        id: expect.any(String)
      });
    });
  });

  it('Изменение порядка ингредиентов', () => {
    let state = buildingSlice(initialState, addIngredient(mockIngredient));
    state = buildingSlice(state, addIngredient(mockSauce));

    const firstIngredient = state.ingredients[0];
    const secondIngredient = state.ingredients[1];

    const action = movingIngredient({ fromIndex: 0, toIndex: 1 });
    state = buildingSlice(state, action);

    expect(state.ingredients[0]).toEqual(secondIngredient);
    expect(state.ingredients[1]).toEqual(firstIngredient);
  });

  it('Удаление ингредиента', () => {
    let state = buildingSlice(initialState, addIngredient(mockIngredient));
    const ingredientToRemove = state.ingredients[0];

    const action = removeIngredient(ingredientToRemove);
    state = buildingSlice(state, action);

    expect(state.ingredients).toHaveLength(0);
  });
});
