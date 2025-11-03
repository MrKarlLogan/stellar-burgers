import feedSlice, { fecthFeeds, fecthOrders } from '../feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

const mockFeedData: TOrdersData = {
  orders: [
    {
      _id: '1',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2025-11-01T10:00:00.000Z',
      updatedAt: '2025-11-01T10:00:00.000Z',
      number: 12345
    }
  ],
  total: 100,
  totalToday: 10
};

const mockOrders: TOrder[] = [
  {
    _id: '2',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0942'],
    status: 'pending',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-11-01T11:00:00.000Z',
    updatedAt: '2025-11-01T11:00:00.000Z',
    number: 123456
  }
];

describe('feedSlice', () => {
  const initialState = {
    feed: {} as TOrdersData,
    orders: [],
    loading: false,
    error: null
  };

  it('Проверка начального состояния', () => {
    expect(feedSlice(undefined, { type: '' })).toEqual(initialState);
  });

  describe('Лента заказов', () => {
    it('Обработка начала загрузки ленты заказов', () => {
      const action = { type: fecthFeeds.pending.type };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешной загрузки ленты заказов', () => {
      const action = {
        type: fecthFeeds.fulfilled.type,
        payload: mockFeedData
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.feed).toEqual(mockFeedData);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки загрузки ленты заказов', () => {
      const errorMessage = 'Не удалось загрузить список заказов';
      const action = {
        type: fecthFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.feed).toEqual(initialState.feed);
    });
  });

  describe('История заказов', () => {
    it('Обработка начала загрузки истории заказов', () => {
      const action = { type: fecthOrders.pending.type };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешной загрузки истории заказов', () => {
      const action = {
        type: fecthOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки загрузки истории заказов', () => {
      const errorMessage = 'Не удалось загрузить список заказов';
      const action = {
        type: fecthOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });
  });

  describe('Раздельная работа экшенов', () => {
    it('fecthFeeds не влияет на orders', () => {
      const action = {
        type: fecthFeeds.fulfilled.type,
        payload: mockFeedData
      };
      const state = feedSlice(initialState, action);

      expect(state.feed).toEqual(mockFeedData);
      expect(state.orders).toEqual([]);
    });

    it('fecthOrders не влияет на feed', () => {
      const action = {
        type: fecthOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = feedSlice(initialState, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.feed).toEqual(initialState.feed);
    });
  });
});
