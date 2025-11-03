export const getOrderByNumberApi = jest.fn(() => {
  Promise.resolve({ orders: [{ number: 12345 }] });
});

export const orderBurgerApi = jest.fn(() => {
  Promise.resolve({
    success: true,
    order: { number: 12345 },
    name: 'Тестовый бургер на тестовом соусе'
  });
});

export const getFeedsApi = jest.fn(() => {
  Promise.resolve({
    success: true,
    orders: [],
    total: 0,
    totalToday: 0
  });
});

export const getOrdersApi = jest.fn(() => {
  Promise.resolve([]);
});

export const getUserApi = jest.fn(() => {
  Promise.resolve({
    success: true,
    user: { name: 'Test User', email: 'test@test.com' }
  });
});

export const loginUserApi = jest.fn(() =>
  Promise.resolve({
    success: true,
    user: { name: 'Test User', email: 'test@test.com' },
    accessToken: 'test-token',
    refreshToken: 'test-refresh-token'
  })
);

export const logoutApi = jest.fn(() => Promise.resolve({ success: true }));

export const registerUserApi = jest.fn(() =>
  Promise.resolve({
    success: true,
    user: { name: 'Test User', email: 'test@test.com' },
    accessToken: 'test-token',
    refreshToken: 'test-refresh-token'
  })
);

export const updateUserApi = jest.fn(() =>
  Promise.resolve({
    success: true,
    user: { name: 'Updated User', email: 'updated@test.com' }
  })
);
