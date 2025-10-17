import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { SLICE_NAMES } from '../../utils/config';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const responce = await registerUserApi(data);
    localStorage.setItem('refreshToken', responce.refreshToken);
    setCookie('accessToken', responce.accessToken);
    return responce.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const responce = await loginUserApi(data);
    localStorage.setItem('refreshToken', responce.refreshToken);
    setCookie('accessToken', responce.accessToken);
    return responce.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const responce = await getUserApi();
  return responce.user;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const responce = await updateUserApi(data);
    return responce.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState: {
    user: null as TUser | null,
    isAuth: false,
    loading: false,
    error: null as string | null
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          'Произошла ошибка при регистрации пользователя';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          'Произошла ошибка при авторизации пользователя';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.error =
          action.error.message || 'Запрашиваемый пользователь не найден';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось обновить профиль пользователя';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
  selectors: {
    getUserData: (state) => state,
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getStatusLoading: (state) => state.loading
  }
});

export const { setAuth } = userSlice.actions;
export const { getUserData, getUser, getIsAuth, getStatusLoading } =
  userSlice.selectors;
export default userSlice.reducer;
