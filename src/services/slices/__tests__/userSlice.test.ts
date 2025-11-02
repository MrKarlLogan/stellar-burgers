import userSlice, {
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser,
  setAuth
} from '../userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Игорь',
  email: 'igor29108@list.ru'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuth: false,
    loading: false,
    error: null
  };

  it('Проверка начального состояния', () => {
    expect(userSlice(undefined, { type: '' })).toEqual(initialState);
  });

  describe('Регистрация пользователя', () => {
    it('Обработка начала регистрации', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешной регистрации', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки регистрации', () => {
      const errorMessage = 'Произошла ошибка при регистрации пользователя';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
    });
  });

  describe('Авторизация пользователя', () => {
    it('Обработка начала авторизации', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешной авторизации', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки авторизации', () => {
      const errorMessage = 'Произошла ошибка при авторизации пользователя';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
    });
  });

  describe('Получение данных пользователя', () => {
    it('Обработка начала получения данных', () => {
      const action = { type: fetchUser.pending.type };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка успешного получения данных', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки получения данных', () => {
      const errorMessage = 'Запрашиваемый пользователь не найден';
      const action = {
        type: fetchUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
    });
  });

  describe('Обновление данных пользователя', () => {
    const stateWithUser = {
      user: mockUser,
      isAuth: true,
      loading: false,
      error: null
    };

    it('Обработка начала обновления', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice(stateWithUser, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });

    it('Обработка успешного обновления', () => {
      const updatedUser = { ...mockUser, name: 'Игорёк' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userSlice(stateWithUser, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(updatedUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Обработка ошибки обновления', () => {
      const errorMessage = 'Не удалось обновить профиль пользователя';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice(stateWithUser, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });
  });

  describe('Выход пользователя', () => {
    const stateWithUser = {
      user: mockUser,
      isAuth: true,
      loading: false,
      error: null
    };

    it('Обработка успешного выхода', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('Синхронные экшены', () => {
    it('Установка статуса авторизации', () => {
      const action = setAuth(true);
      const state = userSlice(initialState, action);

      expect(state.isAuth).toBe(true);
      expect(state.user).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('Сброс статуса авторизации', () => {
      const stateWithAuth = { ...initialState, isAuth: true };
      const action = setAuth(false);
      const state = userSlice(stateWithAuth, action);

      expect(state.isAuth).toBe(false);
    });
  });
});
