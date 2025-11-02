import { rootReducer } from '../../store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации всех слайсов', () => {
    const initialState = rootReducer(undefined, { type: '' });
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('building');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('user');
  });

  test('Проверка обработки неизвестных экшенов', () => {
    const initialState = rootReducer(undefined, { type: '' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});
