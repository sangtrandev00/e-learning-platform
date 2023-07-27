import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

interface AuthState {
  userId: string;
  adminId: string;
  isAuth: boolean;
  isAdminAuth: boolean;
  token: string | null;
  adminToken: string | null;
  isOpenAuthModal: boolean;
}

const initialState: AuthState = {
  userId: '',
  adminId: '',
  isAuth: false,
  isAdminAuth: false,
  token: null,
  adminToken: null,
  isOpenAuthModal: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUserCredentials: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    setAuthenticated(state, action: PayloadAction<string>) {
      state.isAuth = true;
      state.token = action.payload;
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(action.payload);
      state.userId = decodedToken.userId;
    },
    setAdminAuthenticated(state, action: PayloadAction<string>) {
      state.isAdminAuth = true;
      state.adminToken = action.payload;
      const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(action.payload);
      state.adminId = decodedToken.userId;
    },
    setUnauthenticated(state) {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    setAdminUnauthenticated(state) {
      state.isAdminAuth = false;
      state.adminToken = null;
      localStorage.removeItem('adminToken');
    },
    openAuthModal(state) {
      state.isOpenAuthModal = true;
    },
    closeAuthModal(state) {
      state.isOpenAuthModal = false;
    }
  }
});

const authReducer = authSlice.reducer;
export const {
  checkUserCredentials,
  setAuthenticated,
  setUnauthenticated,
  setAdminAuthenticated,
  setAdminUnauthenticated,
  openAuthModal,
  closeAuthModal
} = authSlice.actions;
export default authReducer;
