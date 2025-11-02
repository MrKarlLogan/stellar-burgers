import orderSlice, {
  fetchCreateOrder,
  fetchOrderNumber,
  clearOrder,
  clearViewOrder
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '6905d220a64177001b31c39a',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa0942'
  ],
  status: 'done',
  name: 'Spicy бургер',
  createdAt: '2025-11-01T09:25:52.363Z',
  updatedAt: '2025-11-01T09:25:52.602Z',
  number: 92877
};

const mockViewOrder: TOrder = {
  _id: '6905d220a64177001b31c39b',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
  status: 'pending',
  name: 'Краторный бургер',
  createdAt: '2025-11-01T10:25:52.363Z',
  updatedAt: '2025-11-01T10:25:52.602Z',
  number: 92878
};

describe('orderSlice', () => {
  const initialState = {
    orderRequest: false,
    createOrderModalData: null,
    viewOrderModalData: null,
    error: null
  };

  describe('Создание заказа (fetchCreateOrder)', () => {
    it('Обработка начала создания заказа', () => {
      const action = { type: fetchCreateOrder.pending.type };
      const state = orderSlice(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешного создания заказа', () => {
      const action = {
        type: fetchCreateOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.createOrderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки создания заказа', () => {
      const errorMessage = 'Ошибка при оформлении заказа';
      const action = {
        type: fetchCreateOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderSlice(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Получение заказа по номеру (fetchOrderNumber)', () => {
    it('Обработка начала получения заказа', () => {
      const action = { type: fetchOrderNumber.pending.type };
      const state = orderSlice(initialState, action);

      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(false);
    });

    it('Обработка успешного получения заказа', () => {
      const action = {
        type: fetchOrderNumber.fulfilled.type,
        payload: mockViewOrder
      };
      const state = orderSlice(initialState, action);

      expect(state.viewOrderModalData).toEqual(mockViewOrder);
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(false);
    });

    it('Обработка ошибки получения заказа', () => {
      const errorMessage = 'Заказ не найден';
      const action = {
        type: fetchOrderNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderSlice(initialState, action);

      expect(state.error).toBe(errorMessage);
      expect(state.viewOrderModalData).toBeNull();
      expect(state.orderRequest).toBe(false);
    });
  });

  describe('Очистка данных', () => {
    it('Очистка данных созданного заказа', () => {
      const stateWithOrder = orderSlice(initialState, {
        type: fetchCreateOrder.fulfilled.type,
        payload: mockOrder
      });
      const state = orderSlice(stateWithOrder, clearOrder());

      expect(state.createOrderModalData).toBeNull();
      expect(state.error).toBeNull();

      expect(state.viewOrderModalData).toBeNull();
    });

    it('Очистка данных просматриваемого заказа', () => {
      const stateWithViewOrder = orderSlice(initialState, {
        type: fetchOrderNumber.fulfilled.type,
        payload: mockViewOrder
      });
      const state = orderSlice(stateWithViewOrder, clearViewOrder());

      expect(state.viewOrderModalData).toBeNull();
      expect(state.error).toBeNull();
      expect(state.createOrderModalData).toBeNull();
    });
  });
});
